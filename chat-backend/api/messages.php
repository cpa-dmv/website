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

function messages_response(array $data, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_SLASHES);
    exit;
}

function messages_csrf_check(): void
{
    $provided = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    $expected = $_SESSION['chat_csrf'] ?? '';

    if (
        !is_string($provided) ||
        !is_string($expected) ||
        $expected === '' ||
        !hash_equals($expected, $provided)
    ) {
        messages_response([
            'success' => false,
            'message' => 'Security token expired. Refresh and try again.',
        ], 403);
    }
}

function messages_require_client(): int
{
    $id = filter_var(
        $_SESSION['chat_client_id'] ?? null,
        FILTER_VALIDATE_INT
    );

    if (!$id || empty($_SESSION['chat_authenticated'])) {
        messages_response([
            'success' => false,
            'message' => 'Please log in to continue.',
        ], 401);
    }

    return (int) $id;
}

function messages_get_conversation(PDO $db, int $clientId): array
{
    $stmt = $db->prepare(
        "SELECT id, status
         FROM chat_conversations
         WHERE client_id = ?
         ORDER BY created_at DESC, id DESC
         LIMIT 1"
    );
    $stmt->execute([$clientId]);

    $conversation = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$conversation) {
        $insert = $db->prepare(
            "INSERT INTO chat_conversations (client_id, status)
             VALUES (?, 'open')"
        );
        $insert->execute([$clientId]);

        return [
            'id' => (int) $db->lastInsertId(),
            'status' => 'open',
        ];
    }

    return [
        'id' => (int) $conversation['id'],
        'status' => (string) $conversation['status'],
    ];
}

try {
    $action = (string) ($_GET['action'] ?? '');
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

    if ($method !== 'GET' && $method !== 'POST') {
        header('Allow: GET, POST');

        messages_response([
            'success' => false,
            'message' => 'Method not allowed.',
        ], 405);
    }

    if ($method === 'POST') {
        messages_csrf_check();
    }

    $clientId = messages_require_client();
    $db = chat_db();

    $conversation = messages_get_conversation($db, $clientId);
    $conversationId = $conversation['id'];

    /*
     * GET /api/messages.php?action=list
     */
    if ($action === 'list' && $method === 'GET') {
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
               AND sender_type = 'admin'
               AND read_at IS NULL"
        );
        $markRead->execute([$conversationId]);

        messages_response([
            'success' => true,
            'conversation' => $conversation,
            'messages' => $messages,
        ]);
    }

    /*
     * POST /api/messages.php?action=send
     * JSON body: {"message":"Hello"}
     */
    if ($action === 'send' && $method === 'POST') {
        $input = json_decode(
            file_get_contents('php://input') ?: '',
            true
        );

        if (!is_array($input)) {
            messages_response([
                'success' => false,
                'message' => 'Invalid request body.',
            ], 400);
        }

        $message = trim((string) ($input['message'] ?? ''));

        if ($message === '' || mb_strlen($message) > 5000) {
            messages_response([
                'success' => false,
                'message' => 'Messages must contain 1–5000 characters.',
            ], 422);
        }

        if ($conversation['status'] !== 'open') {
            messages_response([
                'success' => false,
                'message' => 'This conversation is closed.',
            ], 409);
        }

        $insert = $db->prepare(
            "INSERT INTO chat_messages
                (conversation_id, sender_type, sender_id, message)
             VALUES (?, 'client', ?, ?)"
        );
        $insert->execute([
            $conversationId,
            $clientId,
            $message,
        ]);

        $update = $db->prepare(
            'UPDATE chat_conversations
             SET last_message_at = NOW()
             WHERE id = ? AND client_id = ?'
        );
        $update->execute([$conversationId, $clientId]);

        messages_response([
            'success' => true,
            'message' => [
                'id' => (int) $db->lastInsertId(),
                'sender_type' => 'client',
                'sender_id' => $clientId,
                'message' => $message,
                'read_at' => null,
                'created_at' => date('Y-m-d H:i:s'),
            ],
        ], 201);
    }

    messages_response([
        'success' => false,
        'message' => 'Unknown action.',
    ], 404);

} catch (PDOException $e) {
    error_log('CPA-DMV chat messages database error: ' . $e->getMessage());

    messages_response([
        'success' => false,
        'message' => 'Unable to process messages right now.',
    ], 500);

} catch (Throwable $e) {
    error_log('CPA-DMV chat messages error: ' . $e->getMessage());

    messages_response([
        'success' => false,
        'message' => 'An unexpected error occurred.',
    ], 500);
}
