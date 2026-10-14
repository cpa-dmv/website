<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/config.php';


header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, private');
header('X-Content-Type-Options: nosniff');

$allowedOrigins = [
    'http://localhost:3000',
    'https://cpa-dmv.com',
    'https://www.cpa-dmv.com',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Credentials: true');
    header('Vary: Origin');
}

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token');

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    http_response_code(204);
    exit;
}


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

function admin_auth_response(array $data, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_SLASHES);
    exit;
}

function admin_auth_csrf(): string
{
    if (empty($_SESSION['chat_csrf'])) {
        $_SESSION['chat_csrf'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['chat_csrf'];
}

function admin_auth_require_csrf(): void
{
    $provided = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    $expected = $_SESSION['chat_csrf'] ?? '';

    if (
        !is_string($provided) ||
        !is_string($expected) ||
        $expected === '' ||
        !hash_equals($expected, $provided)
    ) {
        admin_auth_response([
            'success' => false,
            'message' => 'Security token expired. Refresh the page.',
        ], 403);
    }
}

try {
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    $action = (string) ($_GET['action'] ?? '');

    if ($action === 'session' && $method === 'GET') {
        admin_auth_response([
            'success' => true,
            'authenticated' => !empty($_SESSION['chat_admin_authenticated']),
            'csrf_token' => admin_auth_csrf(),
        ]);
    }

    if ($method !== 'POST') {
        header('Allow: GET, POST');

        admin_auth_response([
            'success' => false,
            'message' => 'Method not allowed.',
        ], 405);
    }

    $input = json_decode(
        file_get_contents('php://input') ?: '',
        true
    );

    if (!is_array($input)) {
        admin_auth_response([
            'success' => false,
            'message' => 'Invalid request body.',
        ], 400);
    }

    if ($action === 'login') {
        admin_auth_require_csrf();

        $email = strtolower(trim((string) ($input['email'] ?? '')));
        $password = (string) ($input['password'] ?? '');

      $configuredEmail = strtolower(trim(
    defined('CHAT_ADMIN_EMAIL') ? (string) CHAT_ADMIN_EMAIL : ''
));

$configuredHash = defined('CHAT_ADMIN_PASSWORD_HASH')
    ? (string) CHAT_ADMIN_PASSWORD_HASH
    : '';

        if ($configuredEmail === '' || $configuredHash === '') {
            error_log('CPA-DMV chat admin credentials are not configured.');

            admin_auth_response([
                'success' => false,
                'message' => 'Admin login is not configured yet.',
            ], 503);
        }

        if (
            !filter_var($email, FILTER_VALIDATE_EMAIL) ||
            $password === '' ||
            strlen($password) > 1024 ||
            !hash_equals($configuredEmail, $email) ||
            !password_verify($password, $configuredHash)
        ) {
            usleep(350000);

            admin_auth_response([
                'success' => false,
                'message' => 'Invalid email or password.',
            ], 401);
        }

        session_regenerate_id(true);
        $_SESSION['chat_admin_authenticated'] = true;
        $_SESSION['chat_admin_email'] = $configuredEmail;
        $_SESSION['chat_csrf'] = bin2hex(random_bytes(32));

        admin_auth_response([
            'success' => true,
            'authenticated' => true,
            'csrf_token' => $_SESSION['chat_csrf'],
        ]);
    }

    if ($action === 'logout') {
        admin_auth_require_csrf();

        unset(
            $_SESSION['chat_admin_authenticated'],
            $_SESSION['chat_admin_email']
        );

        $_SESSION['chat_csrf'] = bin2hex(random_bytes(32));

        admin_auth_response([
            'success' => true,
            'authenticated' => false,
            'csrf_token' => $_SESSION['chat_csrf'],
        ]);
    }

    admin_auth_response([
        'success' => false,
        'message' => 'Unknown action.',
    ], 404);

} catch (Throwable $e) {
    error_log('CPA-DMV chat admin authentication error: ' . $e->getMessage());

    admin_auth_response([
        'success' => false,
        'message' => 'Authentication service encountered an error.',
    ], 500);
}
