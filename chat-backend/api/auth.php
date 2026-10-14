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

function auth_response(array $data, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_SLASHES);
    exit;
}

function auth_input(): array
{
    $data = json_decode(file_get_contents('php://input') ?: '', true);
    return is_array($data) ? $data : [];
}

function auth_csrf_check(): void
{
    $provided = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    $expected = $_SESSION['chat_csrf'] ?? '';

    if (
        !is_string($provided) ||
        !is_string($expected) ||
        $expected === '' ||
        !hash_equals($expected, $provided)
    ) {
        auth_response([
            'success' => false,
            'message' => 'Security token expired. Refresh the page and try again.',
        ], 403);
    }
}

function auth_csrf_token(): string
{
    if (empty($_SESSION['chat_csrf'])) {
        $_SESSION['chat_csrf'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['chat_csrf'];
}

function auth_client(PDO $db, int $id): ?array
{
    $stmt = $db->prepare(
        'SELECT id, name, email, phone, created_at
         FROM chat_clients
         WHERE id = ?
         LIMIT 1'
    );
    $stmt->execute([$id]);

    $client = $stmt->fetch(PDO::FETCH_ASSOC);

    return $client ?: null;
}

function auth_login(PDO $db, int $clientId): array
{
    session_regenerate_id(true);

    $_SESSION['chat_client_id'] = $clientId;
    $_SESSION['chat_authenticated'] = true;
    $_SESSION['chat_csrf'] = bin2hex(random_bytes(32));

    $client = auth_client($db, $clientId);

    if (!$client) {
        $_SESSION = [];
        session_regenerate_id(true);

        auth_response([
            'success' => false,
            'message' => 'Unable to establish your session.',
        ], 500);
    }

    return [
        'success' => true,
        'authenticated' => true,
        'client' => $client,
        'user' => [
            'id' => (int) $client['id'],
            'name' => $client['name'],
            'email' => $client['email'],
        ],
        'csrfToken' => $_SESSION['chat_csrf'],
        'csrf_token' => $_SESSION['chat_csrf'],
    ];
}

try {
    $action = (string) ($_GET['action'] ?? '');
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

    if ($method === 'GET' && $action === 'csrf') {
        auth_response([
            'success' => true,
            'csrfToken' => auth_csrf_token(),
            'csrf_token' => auth_csrf_token(),
        ]);
    }

    if ($method === 'GET' && $action === 'me') {
        $clientId = filter_var(
            $_SESSION['chat_client_id'] ?? null,
            FILTER_VALIDATE_INT
        );

        if (!$clientId || empty($_SESSION['chat_authenticated'])) {
            auth_response([
                'success' => true,
                'authenticated' => false,
                'csrfToken' => auth_csrf_token(),
                'csrf_token' => auth_csrf_token(),
            ]);
        }

        $db = chat_db();
        $client = auth_client($db, (int) $clientId);

        if (!$client) {
            $_SESSION = [];
            session_regenerate_id(true);

            auth_response([
                'success' => true,
                'authenticated' => false,
                'csrfToken' => auth_csrf_token(),
                'csrf_token' => auth_csrf_token(),
            ]);
        }

        auth_response([
            'success' => true,
            'authenticated' => true,
            'client' => $client,
            'user' => [
                'id' => (int) $client['id'],
                'name' => $client['name'],
                'email' => $client['email'],
            ],
            'csrfToken' => auth_csrf_token(),
            'csrf_token' => auth_csrf_token(),
        ]);
    }

    if ($method !== 'POST') {
        header('Allow: GET, POST');

        auth_response([
            'success' => false,
            'message' => 'Method not allowed.',
        ], 405);
    }

    $input = auth_input();
    $action = (string) ($input['action'] ?? $action);

    auth_csrf_check();

    $db = chat_db();

    /*
     * Register: name, email, optional phone.
     * No client password is required.
     */
    if ($action === 'register') {
        $name = trim((string) ($input['name'] ?? ''));
        $email = strtolower(trim((string) ($input['email'] ?? '')));
        $phone = trim((string) ($input['phone'] ?? ''));

        if (mb_strlen($name) < 2 || mb_strlen($name) > 150) {
            auth_response([
                'success' => false,
                'message' => 'Enter a name between 2 and 150 characters.',
            ], 422);
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254) {
            auth_response([
                'success' => false,
                'message' => 'Enter a valid email address.',
            ], 422);
        }

        if (mb_strlen($phone) > 30) {
            auth_response([
                'success' => false,
                'message' => 'Phone number must be 30 characters or fewer.',
            ], 422);
        }

        $check = $db->prepare(
            'SELECT id FROM chat_clients WHERE email = ? LIMIT 1'
        );
        $check->execute([$email]);

        if ($check->fetch()) {
            auth_response([
                'success' => false,
                'message' => 'An account with this email already exists. Please sign in instead.',
            ], 409);
        }

        /*
         * Keep compatibility with databases where password_hash is NOT NULL.
         * This random hash is never used for client authentication.
         */
        $unusedPasswordHash = password_hash(
            bin2hex(random_bytes(32)),
            PASSWORD_DEFAULT
        );

        $db->beginTransaction();

        try {
            $insert = $db->prepare(
                'INSERT INTO chat_clients (name, email, password_hash, phone)
                 VALUES (?, ?, ?, ?)'
            );
            $insert->execute([
                $name,
                $email,
                $unusedPasswordHash,
                $phone !== '' ? $phone : null,
            ]);

            $clientId = (int) $db->lastInsertId();

            $conversation = $db->prepare(
                "INSERT INTO chat_conversations (client_id, status)
                 VALUES (?, 'open')"
            );
            $conversation->execute([$clientId]);

            $db->commit();
        } catch (Throwable $e) {
            if ($db->inTransaction()) {
                $db->rollBack();
            }
            throw $e;
        }

        auth_response(auth_login($db, $clientId), 201);
    }

    /*
     * Password-free sign-in: exact email and name match.
     */
    if ($action === 'login') {
        $name = trim((string) ($input['name'] ?? ''));
        $email = strtolower(trim((string) ($input['email'] ?? '')));

        if (
            $name === '' ||
            !filter_var($email, FILTER_VALIDATE_EMAIL)
        ) {
            auth_response([
                'success' => false,
                'message' => 'Enter your full name and a valid email address.',
            ], 422);
        }

        $stmt = $db->prepare(
            'SELECT id FROM chat_clients
             WHERE email = ? AND name = ?
             LIMIT 1'
        );
        $stmt->execute([$email, $name]);

        $account = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$account) {
            auth_response([
                'success' => false,
                'message' => 'No matching account was found. Check your details or create an account.',
            ], 401);
        }

        auth_response(auth_login($db, (int) $account['id']));
    }

    /*
     * Session compatibility for the existing frontend.
     */
    if ($action === 'session') {
        $clientId = filter_var(
            $_SESSION['chat_client_id'] ?? null,
            FILTER_VALIDATE_INT
        );

        if (!$clientId || empty($_SESSION['chat_authenticated'])) {
            auth_response([
                'success' => true,
                'authenticated' => false,
                'csrfToken' => auth_csrf_token(),
                'csrf_token' => auth_csrf_token(),
            ]);
        }

        $client = auth_client($db, (int) $clientId);

        if (!$client) {
            $_SESSION = [];
            session_regenerate_id(true);

            auth_response([
                'success' => true,
                'authenticated' => false,
                'csrfToken' => auth_csrf_token(),
                'csrf_token' => auth_csrf_token(),
            ]);
        }

        auth_response([
            'success' => true,
            'authenticated' => true,
            'client' => $client,
            'user' => [
                'id' => (int) $client['id'],
                'name' => $client['name'],
                'email' => $client['email'],
            ],
            'csrfToken' => auth_csrf_token(),
            'csrf_token' => auth_csrf_token(),
        ]);
    }

    if ($action === 'logout') {
        $_SESSION = [];

        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();

            setcookie(session_name(), '', [
                'expires' => time() - 42000,
                'path' => $params['path'],
                'secure' => $params['secure'],
                'httponly' => $params['httponly'],
                'samesite' => $params['samesite'] ?? 'Lax',
            ]);
        }

        session_destroy();

        auth_response([
            'success' => true,
            'message' => 'Logged out successfully.',
        ]);
    }

    auth_response([
        'success' => false,
        'message' => 'Unknown authentication action.',
    ], 404);

} catch (PDOException $e) {
    error_log('CPA-DMV chat authentication database error: ' . $e->getMessage());

    auth_response([
        'success' => false,
        'message' => 'The request could not be completed. Please try again.',
    ], 500);

} catch (Throwable $e) {
    error_log('CPA-DMV chat authentication error: ' . $e->getMessage());

    auth_response([
        'success' => false,
        'message' => 'An unexpected error occurred.',
    ], 500);
}
