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

function client_auth_response(array $data, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_SLASHES);
    exit;
}

function client_auth_csrf(): string
{
    if (empty($_SESSION['chat_csrf'])) {
        $_SESSION['chat_csrf'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['chat_csrf'];
}

function client_auth_check_csrf(): void
{
    $provided = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    $expected = $_SESSION['chat_csrf'] ?? '';

    if (
        !is_string($provided) ||
        !is_string($expected) ||
        $expected === '' ||
        !hash_equals($expected, $provided)
    ) {
        client_auth_response([
            'success' => false,
            'message' => 'Security token expired. Refresh the page.',
        ], 403);
    }
}

function client_auth_input(): array
{
    $input = json_decode(file_get_contents('php://input') ?: '', true);

    if (!is_array($input)) {
        client_auth_response([
            'success' => false,
            'message' => 'Invalid request body.',
        ], 400);
    }

    return $input;
}

function client_auth_start(PDO $db, array $client): void
{
    session_regenerate_id(true);

    $_SESSION['chat_authenticated'] = true;
    $_SESSION['chat_client_id'] = (int) $client['id'];
    $_SESSION['chat_csrf'] = bin2hex(random_bytes(32));

    client_auth_response([
        'success' => true,
        'authenticated' => true,
        'csrf_token' => $_SESSION['chat_csrf'],
        'client' => [
            'id' => (int) $client['id'],
            'name' => (string) $client['name'],
            'email' => (string) $client['email'],
        ],
    ]);
}

try {
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    $action = (string) ($_GET['action'] ?? '');

    if ($action === 'session' && $method === 'GET') {
        $authenticated = !empty($_SESSION['chat_authenticated']);
        $client = null;

        if ($authenticated) {
            $db = chat_db();

            $stmt = $db->prepare(
                'SELECT id, name, email
                 FROM chat_clients
                 WHERE id = ?
                 LIMIT 1'
            );
            $stmt->execute([
                (int) ($_SESSION['chat_client_id'] ?? 0),
            ]);

            $client = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$client) {
                unset(
                    $_SESSION['chat_authenticated'],
                    $_SESSION['chat_client_id']
                );
                $authenticated = false;
            }
        }

        client_auth_response([
            'success' => true,
            'authenticated' => $authenticated,
            'csrf_token' => client_auth_csrf(),
            'client' => $client ?: null,
        ]);
    }

    if ($method !== 'POST') {
        header('Allow: GET, POST');

        client_auth_response([
            'success' => false,
            'message' => 'Method not allowed.',
        ], 405);
    }

    client_auth_check_csrf();
    $input = client_auth_input();
    $db = chat_db();

    if ($action === 'register') {
        $name = trim((string) ($input['name'] ?? ''));
        $email = strtolower(trim((string) ($input['email'] ?? '')));
        $password = (string) ($input['password'] ?? '');

        if (
            $name === '' ||
            mb_strlen($name) > 150 ||
            preg_match('/[\x00-\x1F\x7F]/u', $name)
        ) {
            client_auth_response([
                'success' => false,
                'message' => 'Enter a valid name (maximum 150 characters).',
            ], 422);
        }

        if (
            !filter_var($email, FILTER_VALIDATE_EMAIL) ||
            strlen($email) > 254
        ) {
            client_auth_response([
                'success' => false,
                'message' => 'Enter a valid email address.',
            ], 422);
        }

        if (
            strlen($password) < 12 ||
            strlen($password) > 72
        ) {
            client_auth_response([
                'success' => false,
                'message' => 'Choose a password between 12 and 72 bytes.',
            ], 422);
        }

        $hash = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $db->prepare(
            'INSERT INTO chat_clients (name, email, password_hash)
             VALUES (?, ?, ?)'
        );

        try {
            $stmt->execute([$name, $email, $hash]);
        } catch (PDOException $e) {
            if ($e->getCode() === '23000') {
                client_auth_response([
                    'success' => false,
                    'message' => 'An account with that email may already exist.',
                ], 409);
            }

            throw $e;
        }

        $client = [
            'id' => (int) $db->lastInsertId(),
            'name' => $name,
            'email' => $email,
        ];

        client_auth_start($db, $client);
    }

    if ($action === 'login') {
        $email = strtolower(trim((string) ($input['email'] ?? '')));
        $password = (string) ($input['password'] ?? '');

        if (
            !filter_var($email, FILTER_VALIDATE_EMAIL) ||
            $password === '' ||
            strlen($password) > 1024
        ) {
            client_auth_response([
                'success' => false,
                'message' => 'Invalid email or password.',
            ], 401);
        }

        $stmt = $db->prepare(
            'SELECT id, name, email, password_hash
             FROM chat_clients
             WHERE email = ?
             LIMIT 1'
        );
        $stmt->execute([$email]);

        $client = $stmt->fetch(PDO::FETCH_ASSOC);

        if (
            !$client ||
            empty($client['password_hash']) ||
            !password_verify($password, $client['password_hash'])
        ) {
            usleep(350000);

            client_auth_response([
                'success' => false,
                'message' => 'Invalid email or password.',
            ], 401);
        }

        client_auth_start($db, $client);
    }

    if ($action === 'logout') {
        client_auth_check_csrf();

        unset(
            $_SESSION['chat_authenticated'],
            $_SESSION['chat_client_id']
        );

        session_regenerate_id(true);
        $_SESSION['chat_csrf'] = bin2hex(random_bytes(32));

        client_auth_response([
            'success' => true,
            'authenticated' => false,
            'csrf_token' => $_SESSION['chat_csrf'],
        ]);
    }

    client_auth_response([
        'success' => false,
        'message' => 'Unknown action.',
    ], 404);

} catch (PDOException $e) {
    error_log('CPA-DMV client chat authentication error: ' . $e->getMessage());

    client_auth_response([
        'success' => false,
        'message' => 'Unable to process authentication right now.',
    ], 500);

} catch (Throwable $e) {
    error_log('CPA-DMV client chat error: ' . $e->getMessage());

    client_auth_response([
        'success' => false,
        'message' => 'An unexpected error occurred.',
    ], 500);
}
