<?php

declare(strict_types=1);

session_start();

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

/*
|--------------------------------------------------------------------------
| CPA-DMV Careers Administration API
|--------------------------------------------------------------------------
|
| GET
|   Returns authenticated applicant records.
|
| POST
|   login
|   logout
|   update_status
|
| DELETE
|   Delete an applicant by ID.
|
|--------------------------------------------------------------------------
*/

date_default_timezone_set('America/New_York');

/*
|--------------------------------------------------------------------------
| ADMIN CREDENTIALS
|--------------------------------------------------------------------------
|
| IMPORTANT:
| Change these before production deployment.
|
*/

const ADMIN_USERNAME = 'admin_careers2026';

const ADMIN_PASSWORD = 'CPA-DMV@careers2026';

/*
|--------------------------------------------------------------------------
| Storage
|--------------------------------------------------------------------------
|
| Applicant records are stored in a PHP-protected data file.
|
*/

$dataFile = __DIR__ . '/careers-data.php';

$dataPrefix = "<?php exit; ?>\n";

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (
    $origin === 'http://localhost:3000' ||
    $origin === 'https://cpa-dmv.com' ||
    $origin === 'https://www.cpa-dmv.com'
) {
    header("Access-Control-Allow-Origin: {$origin}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}

/*
|--------------------------------------------------------------------------
| Preflight
|--------------------------------------------------------------------------
*/

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function json_response(
    array $data,
    int $status = 200
): void {

    http_response_code($status);

    echo json_encode(
        $data,
        JSON_PRETTY_PRINT |
        JSON_UNESCAPED_SLASHES |
        JSON_UNESCAPED_UNICODE
    );

    exit;
}

function is_authenticated(): bool
{
    return (
        isset($_SESSION['cpa_careers_admin']) &&
        $_SESSION['cpa_careers_admin'] === true
    );
}

function require_authentication(): void
{
    if (!is_authenticated()) {
        json_response(
            [
                'success' => false,
                'error' => 'Authentication required.'
            ],
            401
        );
    }
}

function read_applications(
    string $file,
    string $prefix
): array {

    if (!file_exists($file)) {
        return [];
    }

    $content = file_get_contents($file);

    if ($content === false) {
        return [];
    }

    if (str_starts_with($content, $prefix)) {
        $content = substr(
            $content,
            strlen($prefix)
        );
    }

    $data = json_decode(
        $content,
        true
    );

    return is_array($data)
        ? $data
        : [];
}

function write_applications(
    string $file,
    string $prefix,
    array $applications
): bool {

    $handle = fopen(
        $file,
        'c+'
    );

    if (!$handle) {
        return false;
    }

    if (!flock($handle, LOCK_EX)) {
        fclose($handle);
        return false;
    }

    ftruncate(
        $handle,
        0
    );

    rewind($handle);

    $json = json_encode(
        $applications,
        JSON_PRETTY_PRINT |
        JSON_UNESCAPED_SLASHES |
        JSON_UNESCAPED_UNICODE
    );

    if ($json === false) {
        flock(
            $handle,
            LOCK_UN
        );

        fclose($handle);

        return false;
    }

    fwrite(
        $handle,
        $prefix . $json
    );

    fflush($handle);

    flock(
        $handle,
        LOCK_UN
    );

    fclose($handle);

    return true;
}

/*
|--------------------------------------------------------------------------
| Load applications
|--------------------------------------------------------------------------
*/

$applications = read_applications(
    $dataFile,
    $dataPrefix
);

/*
|--------------------------------------------------------------------------
| GET
|--------------------------------------------------------------------------
|
| Returns all applicant records.
|
*/

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    require_authentication();

    usort(
        $applications,
        function ($a, $b) {

            $dateA = $a['appliedAt'] ?? '';
            $dateB = $b['appliedAt'] ?? '';

            return strcmp(
                $dateB,
                $dateA
            );
        }
    );

    json_response(
        [
            'success' => true,
            'applications' => $applications
        ]
    );
}

/*
|--------------------------------------------------------------------------
| POST
|--------------------------------------------------------------------------
*/

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $rawInput = file_get_contents(
        'php://input'
    );

    $input = json_decode(
        $rawInput ?: '{}',
        true
    );

    if (!is_array($input)) {
        json_response(
            [
                'success' => false,
                'error' => 'Invalid request.'
            ],
            400
        );
    }

    $action = trim(
        (string) ($input['action'] ?? '')
    );

    /*
    |--------------------------------------------------------------------------
    | LOGIN
    |--------------------------------------------------------------------------
    */

    if ($action === 'login') {

        $username = trim(
            (string) ($input['username'] ?? '')
        );

        $password = (string) (
            $input['password'] ?? ''
        );

        if (
            hash_equals(
                ADMIN_USERNAME,
                $username
            ) &&
            hash_equals(
                ADMIN_PASSWORD,
                $password
            )
        ) {

            session_regenerate_id(true);

            $_SESSION['cpa_careers_admin'] = true;
            $_SESSION['cpa_careers_admin_login'] = time();

            json_response(
                [
                    'success' => true,
                    'message' => 'Login successful.'
                ]
            );
        }

        usleep(300000);

        json_response(
            [
                'success' => false,
                'error' => 'Invalid username or password.'
            ],
            401
        );
    }

    /*
    |--------------------------------------------------------------------------
    | LOGOUT
    |--------------------------------------------------------------------------
    */

    if ($action === 'logout') {

        $_SESSION = [];

        if (ini_get('session.use_cookies')) {

            $params = session_get_cookie_params();

            setcookie(
                session_name(),
                '',
                time() - 42000,
                $params['path'],
                $params['domain'],
                $params['secure'],
                $params['httponly']
            );
        }

        session_destroy();

        json_response(
            [
                'success' => true,
                'message' => 'Logged out successfully.'
            ]
        );
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE STATUS
    |--------------------------------------------------------------------------
    */

    if ($action === 'update_status') {

        require_authentication();

        $id = trim(
            (string) ($input['id'] ?? '')
        );

        $status = trim(
            (string) ($input['status'] ?? '')
        );

        $allowedStatuses = [
            'New',
            'Under Review',
            'Shortlisted',
            'Interview',
            'Rejected'
        ];

        if ($id === '') {
            json_response(
                [
                    'success' => false,
                    'error' => 'Application ID is required.'
                ],
                422
            );
        }

        if (!in_array(
            $status,
            $allowedStatuses,
            true
        )) {
            json_response(
                [
                    'success' => false,
                    'error' => 'Invalid application status.'
                ],
                422
            );
        }

        $found = false;

        foreach (
            $applications
            as &$application
        ) {

            if (
                ($application['id'] ?? '') === $id
            ) {

                $application['status'] = $status;

                $application['statusUpdatedAt'] =
                    date('c');

                $found = true;

                break;
            }
        }

        unset($application);

        if (!$found) {
            json_response(
                [
                    'success' => false,
                    'error' => 'Application not found.'
                ],
                404
            );
        }

        if (!write_applications(
            $dataFile,
            $dataPrefix,
            $applications
        )) {

            json_response(
                [
                    'success' => false,
                    'error' => 'Unable to save application status.'
                ],
                500
            );
        }

        json_response(
            [
                'success' => true,
                'message' => 'Application status updated.'
            ]
        );
    }

    json_response(
        [
            'success' => false,
            'error' => 'Unsupported action.'
        ],
        400
    );
}

/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

    require_authentication();

    $id = trim(
        (string) (
            $_GET['id'] ?? ''
        )
    );

    if ($id === '') {
        json_response(
            [
                'success' => false,
                'error' => 'Application ID is required.'
            ],
            422
        );
    }

    $found = false;

    foreach (
        $applications as $index => $application
    ) {

        if (
            ($application['id'] ?? '') === $id
        ) {

            unset(
                $applications[$index]
            );

            $found = true;

            break;
        }
    }

    if (!$found) {
        json_response(
            [
                'success' => false,
                'error' => 'Application not found.'
            ],
            404
        );
    }

    $applications = array_values(
        $applications
    );

    if (!write_applications(
        $dataFile,
        $dataPrefix,
        $applications
    )) {

        json_response(
            [
                'success' => false,
                'error' => 'Unable to update applicant records.'
            ],
            500
        );
    }

    json_response(
        [
            'success' => true,
            'message' => 'Application deleted successfully.'
        ]
    );
}

/*
|--------------------------------------------------------------------------
| Unsupported HTTP method
|--------------------------------------------------------------------------
*/

json_response(
    [
        'success' => false,
        'error' => 'Method not allowed.'
    ],
    405
);