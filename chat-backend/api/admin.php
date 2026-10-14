<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/config.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, private');
header('X-Content-Type-Options: nosniff');

$isHttps = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';

session_name('cpadm_chat_session');
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'secure' => $isHttps,
    'httponly' => true,
    'samesite' => 'Lax',
]);

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

function admin_chat_response(array $data, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_SLASHES);
    exit;
}

function admin_chat_csrf_check(): void
{
    $provided = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    $expected = $_SESSION['chat_csrf'] ?? '';

    if (
        !is_string($provided) ||
        !is_string($expected) ||
        $expected === '' ||
        !hash_equals($expected, $provided)
    ) {
        admin_chat_response([
            'success' => false,
            'message' => 'Security token expired. Refresh and try again.',
        ], 403);
    }
}

function admin_chat_require_auth(): void
{
    if (empty($_SESSION['chat_admin_authenticated'])) {
        admin_chat_response([
            'success' => false,
            'message' => 'Admin login required.',
        ], 401);
    }
}

try {
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    $action = (string) ($_GET['action'] ?? '');

    if ($method !== 'GET' && $method !== 'POST') {
        header('Allow: GET, POST');

        admin_chat_response([
            'success' => false,
            'message' => 'Method not allowed.',
        ], 405);
    }

    if ($method === 'POST') {
        admin_chat_csrf_check();
    }

    admin_chat_require_auth();

    $db = chat_db();

    if ($action === 'conversations' && $method === 'GET') {
        $stmt = $db->query(
            "SELECT
                c.id,
                c.client_id,
                c.status,
                c.created_at,
                c.updated_at,
                c.last_message_at,
                cl.name AS client_name,
                cl.email AS client_email,
                (
                    SELECT m.message
                    FROM chat_messages m
                    WHERE m.conversation_id = c.id
                    ORDER BY m.id DESC
                    LIMIT 1
                ) AS last_message,
                (
                    SELECT COUNT(*)
                    FROM chat_messages m
                    WHERE m.conversation_id = c.id
                      AND m.sender_type = 'client'
                      AND m.read_at IS NULL
                ) AS unread_count
             FROM chat_conversations c
             INNER JOIN chat_clients cl ON cl.id = c.client_id
             ORDER BY
                COALESCE(c.last_message_at, c.created_at) DESC,
                c.id DESC
             LIMIT 200"
        );

        admin_chat_response([
            'success' => true,
            'conversations' => $stmt->fetchAll(PDO::FETCH_ASSOC),
        ]);
    }

    if ($action === 'messages' && $method === 'GET') {
        $conversationId = filter_var(
            $_GET['conversation_id'] ?? null,
            FILTER_VALIDATE_INT
        );

        if (!$conversationId || $conversationId < 1) {
            admin_chat_response([
                'success' => false,
                'message' => 'A valid conversation ID is required.',
            ], 422);
        }

        $check = $db->prepare(
            'SELECT id FROM chat_conversations WHERE id = ?'
        );
        $check->execute([$conversationId]);

        if (!$check->fetchColumn()) {
            admin_chat_response([
                'success' => false,
                'message' => 'Conversation not found.',
            ], 404);
        }

        $stmt = $db->prepare(
            "SELECT id, sender_type, sender_id, message, created_at, read_at
             FROM chat_messages
             WHERE conversation_id = ?
             ORDER BY id ASC
             LIMIT 500"
        );
        $stmt->execute([$conversationId]);

        $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $markRead = $db->prepare(
            "UPDATE chat_messages
             SET read_at = NOW()
             WHERE conversation_id = ?
               AND sender_type = 'client'
               AND read_at IS NULL"
        );
        $markRead->execute([$conversationId]);

        admin_chat_response([
            'success' => true,
            'messages' => $messages,
        ]);
    }

    if ($action === 'reply' && $method === 'POST') {
        $input = json_decode(
            file_get_contents('php://input') ?: '',
            true
        );

        if (!is_array($input)) {
            admin_chat_response([
                'success' => false,
                'message' => 'Invalid request body.',
            ], 400);
        }

        $conversationId = filter_var(
            $input['conversation_id'] ?? null,
            FILTER_VALIDATE_INT
        );

        $message = trim((string) ($input['message'] ?? ''));

        if (!$conversationId || $conversationId < 1) {
            admin_chat_response([
                'success' => false,
                'message' => 'A valid conversation ID is required.',
            ], 422);
        }

        if ($message === '' || mb_strlen($message) > 5000) {
            admin_chat_response([
                'success' => false,
                'message' => 'Replies must contain 1–5000 characters.',
            ], 422);
        }

        $check = $db->prepare(
            "SELECT id, status
             FROM chat_conversations
             WHERE id = ?"
        );
        $check->execute([$conversationId]);
        $conversation = $check->fetch(PDO::FETCH_ASSOC);

        if (!$conversation) {
            admin_chat_response([
                'success' => false,
                'message' => 'Conversation not found.',
            ], 404);
        }

        if ($conversation['status'] !== 'open') {
            admin_chat_response([
                'success' => false,
                'message' => 'This conversation is closed.',
            ], 409);
        }

        $insert = $db->prepare(
            "INSERT INTO chat_messages
                (conversation_id, sender_type, sender_id, message)
             VALUES (?, 'admin', 0, ?)"
        );
        $insert->execute([$conversationId, $message]);

        $update = $db->prepare(
            'UPDATE chat_conversations
             SET last_message_at = NOW()
             WHERE id = ?'
        );
        $update->execute([$conversationId]);

        admin_chat_response([
            'success' => true,
            'message' => [
                'id' => (int) $db->lastInsertId(),
                'sender_type' => 'admin',
                'sender_id' => 0,
                'message' => $message,
                'read_at' => null,
                'created_at' => date('Y-m-d H:i:s'),
            ],
        ], 201);
    }

    if ($action === 'status' && $method === 'POST') {
        $input = json_decode(
            file_get_contents('php://input') ?: '',
            true
        );

        if (!is_array($input)) {
            admin_chat_response([
                'success' => false,
                'message' => 'Invalid request body.',
            ], 400);
        }

        $conversationId = filter_var(
            $input['conversation_id'] ?? null,
            FILTER_VALIDATE_INT
        );

        $status = (string) ($input['status'] ?? '');

        if (
            !$conversationId ||
            $conversationId < 1 ||
            !in_array($status, ['open', 'closed'], true)
        ) {
            admin_chat_response([
                'success' => false,
                'message' => 'Invalid conversation or status.',
            ], 422);
        }

        $update = $db->prepare(
            'UPDATE chat_conversations SET status = ? WHERE id = ?'
        );
        $update->execute([$status, $conversationId]);

        if ($update->rowCount() === 0) {
            $check = $db->prepare(
                'SELECT id FROM chat_conversations WHERE id = ?'
            );
            $check->execute([$conversationId]);

            if (!$check->fetchColumn()) {
                admin_chat_response([
                    'success' => false,
                    'message' => 'Conversation not found.',
                ], 404);
            }
        }

        admin_chat_response([
            'success' => true,
            'message' => 'Conversation status updated.',
        ]);
    }

    admin_chat_response([
        'success' => false,
        'message' => 'Unknown action.',
    ], 404);

} catch (PDOException $e) {
    error_log('CPA-DMV admin chat database error: ' . $e->getMessage());

    admin_chat_response([
        'success' => false,
        'message' => 'Unable to process this request right now.',
    ], 500);

} catch (Throwable $e) {
    error_log('CPA-DMV admin chat error: ' . $e->getMessage());

    admin_chat_response([
        'success' => false,
        'message' => 'An unexpected error occurred.',
    ], 500);
}
