<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

date_default_timezone_set('America/New_York');

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

$allowedOrigins = [
    'http://localhost:3000',
    'https://cpa-dmv.com',
    'https://www.cpa-dmv.com'
];

if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: {$origin}");
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Vary: Origin');
}

/*
|--------------------------------------------------------------------------
| OPTIONS
|--------------------------------------------------------------------------
*/

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

/*
|--------------------------------------------------------------------------
| Only POST
|--------------------------------------------------------------------------
*/

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);

    echo json_encode([
        'success' => false,
        'error' => 'Method not allowed.'
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Configuration
|--------------------------------------------------------------------------
*/

$dataFile = __DIR__ . '/careers-data.php';
$dataPrefix = "<?php exit; ?>\n";

$uploadDirectory = __DIR__ . '/career-files/';

$maxFileSize = 5 * 1024 * 1024;

/*
|--------------------------------------------------------------------------
| Open positions
|--------------------------------------------------------------------------
*/

$positions = [

    'ai-automation-specialist' => [
        'title' => 'AI & Automation Specialist – RPA, Help Desk & Voice Agent',
        'department' => 'Technology / Automation',
        'type' => 'Full-Time / Contract',
        'location' => 'Remote / Hybrid'
    ],

    'civil-engineer-autocad' => [
        'title' => 'Civil Engineer – AutoCAD',
        'department' => 'Engineering / Design',
        'type' => 'Full-Time',
        'location' => 'India'
    ]

];

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
        JSON_UNESCAPED_SLASHES |
        JSON_UNESCAPED_UNICODE
    );

    exit;
}

function clean_text(
    string $value,
    int $maxLength = 5000
): string {

    $value = trim($value);

    $value = preg_replace(
        '/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u',
        '',
        $value
    );

    return mb_substr(
        $value,
        0,
        $maxLength
    );
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

    $json = json_encode(
        $applications,
        JSON_PRETTY_PRINT |
        JSON_UNESCAPED_SLASHES |
        JSON_UNESCAPED_UNICODE
    );

    if ($json === false) {
        flock($handle, LOCK_UN);
        fclose($handle);
        return false;
    }

    ftruncate(
        $handle,
        0
    );

    rewind($handle);

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
| Applicant information
|--------------------------------------------------------------------------
*/

$fullName = clean_text(
    (string) ($_POST['fullName'] ?? $_POST['name'] ?? ''),
    150
);

$email = trim(
    (string) ($_POST['email'] ?? '')
);

$phone = clean_text(
    (string) ($_POST['phone'] ?? ''),
    50
);

$positionKey = clean_text(
    (string) ($_POST['position'] ?? ''),
    100
);

$linkedin = clean_text(
    (string) ($_POST['linkedin'] ?? ''),
    500
);

$coverLetter = clean_text(
    (string) ($_POST['coverLetter'] ?? ''),
    10000
);

/*
|--------------------------------------------------------------------------
| Validation
|--------------------------------------------------------------------------
*/

if ($fullName === '') {

    json_response([
        'success' => false,
        'error' => 'Full name is required.'
    ], 422);
}

if (
    $email === '' ||
    !filter_var($email, FILTER_VALIDATE_EMAIL)
) {

    json_response([
        'success' => false,
        'error' => 'Please enter a valid email address.'
    ], 422);
}

if ($phone === '') {

    json_response([
        'success' => false,
        'error' => 'Phone number is required.'
    ], 422);
}

if (!isset($positions[$positionKey])) {

    json_response([
        'success' => false,
        'error' => 'Please select a valid open position.'
    ], 422);
}

if ($coverLetter === '') {

    json_response([
        'success' => false,
        'error' => 'Cover letter is required.'
    ], 422);
}

/*
|--------------------------------------------------------------------------
| LinkedIn validation
|--------------------------------------------------------------------------
*/

if ($linkedin !== '') {

    if (
        !filter_var(
            $linkedin,
            FILTER_VALIDATE_URL
        )
    ) {

        json_response([
            'success' => false,
            'error' => 'Please enter a valid LinkedIn URL.'
        ], 422);
    }
}

/*
|--------------------------------------------------------------------------
| Resume validation
|--------------------------------------------------------------------------
*/

if (
    !isset($_FILES['resume']) ||
    !is_array($_FILES['resume'])
) {

    json_response([
        'success' => false,
        'error' => 'Please upload your resume.'
    ], 422);
}

$resume = $_FILES['resume'];

if (
    ($resume['error'] ?? UPLOAD_ERR_NO_FILE)
    !== UPLOAD_ERR_OK
) {

    json_response([
        'success' => false,
        'error' => 'Resume upload failed.'
    ], 422);
}

if (
    ($resume['size'] ?? 0)
    > $maxFileSize
) {

    json_response([
        'success' => false,
        'error' => 'Resume must be 5 MB or smaller.'
    ], 422);
}

/*
|--------------------------------------------------------------------------
| Resume filename
|--------------------------------------------------------------------------
*/

$originalFilename = basename(
    (string) ($resume['name'] ?? '')
);

$extension = strtolower(
    pathinfo(
        $originalFilename,
        PATHINFO_EXTENSION
    )
);

$allowedExtensions = [
    'pdf',
    'doc',
    'docx'
];

if (
    !in_array(
        $extension,
        $allowedExtensions,
        true
    )
) {

    json_response([
        'success' => false,
        'error' => 'Resume must be a PDF, DOC, or DOCX file.'
    ], 422);
}

/*
|--------------------------------------------------------------------------
| MIME validation
|--------------------------------------------------------------------------
*/

$finfo = finfo_open(
    FILEINFO_MIME_TYPE
);

$mimeType = $finfo
    ? finfo_file(
        $finfo,
        $resume['tmp_name']
    )
    : '';

if ($finfo) {
    finfo_close($finfo);
}

$allowedMimeTypes = [

    'pdf' => [
        'application/pdf'
    ],

    'doc' => [
        'application/msword'
    ],

    'docx' => [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/zip'
    ]

];

if (
    !isset($allowedMimeTypes[$extension]) ||
    !in_array(
        $mimeType,
        $allowedMimeTypes[$extension],
        true
    )
) {

    json_response([
        'success' => false,
        'error' => 'The uploaded resume file type is not valid.'
    ], 422);
}

/*
|--------------------------------------------------------------------------
| Create secure upload directory
|--------------------------------------------------------------------------
*/

if (!is_dir($uploadDirectory)) {

    if (
        !mkdir(
            $uploadDirectory,
            0755,
            true
        )
    ) {

        json_response([
            'success' => false,
            'error' => 'Unable to create resume storage directory.'
        ], 500);
    }
}

/*
|--------------------------------------------------------------------------
| Application ID
|--------------------------------------------------------------------------
*/

$applicationId =
    'CPA-' .
    date('Ymd') .
    '-' .
    strtoupper(
        bin2hex(
            random_bytes(4)
        )
    );

/*
|--------------------------------------------------------------------------
| Secure resume filename
|--------------------------------------------------------------------------
*/

$storedFilename =
    $applicationId .
    '.' .
    $extension;

$destination =
    $uploadDirectory .
    $storedFilename;

/*
|--------------------------------------------------------------------------
| Save resume
|--------------------------------------------------------------------------
*/

if (
    !move_uploaded_file(
        $resume['tmp_name'],
        $destination
    )
) {

    json_response([
        'success' => false,
        'error' => 'Unable to save the uploaded resume.'
    ], 500);
}

/*
|--------------------------------------------------------------------------
| Load existing applications
|--------------------------------------------------------------------------
*/

$applications = read_applications(
    $dataFile,
    $dataPrefix
);

/*
|--------------------------------------------------------------------------
| Position information
|--------------------------------------------------------------------------
*/

$position = $positions[$positionKey];

/*
|--------------------------------------------------------------------------
| Application record
|--------------------------------------------------------------------------
*/

$application = [

    'id' => $applicationId,

    'status' => 'New',

    'appliedAt' => date('c'),

    'positionKey' => $positionKey,

    'position' => $position['title'],

    'department' => $position['department'],

    'employmentType' => $position['type'],

    'location' => $position['location'],

    'fullName' => $fullName,

    'email' => $email,

    'phone' => $phone,

    'linkedin' => $linkedin,

    'coverLetter' => $coverLetter,

    'resume' => [

        'originalName' => $originalFilename,

        'storedName' => $storedFilename,

        'extension' => $extension,

        'size' => (int) $resume['size']

    ],

    'statusUpdatedAt' => date('c')

];

/*
|--------------------------------------------------------------------------
| Save application
|--------------------------------------------------------------------------
*/

$applications[] = $application;

if (
    !write_applications(
        $dataFile,
        $dataPrefix,
        $applications
    )
) {

    if (file_exists($destination)) {
        unlink($destination);
    }

    json_response([
        'success' => false,
        'error' => 'Unable to save your application.'
    ], 500);
}

/*
|--------------------------------------------------------------------------
| Notify CPA-DMV
|--------------------------------------------------------------------------
*/

$adminHeaders =
    "From: CPA-DMV Careers <no-reply@cpa-dmv.com>\r\n" .
    "Reply-To: {$email}\r\n" .
    "Content-Type: text/plain; charset=UTF-8";

$adminMessage =
    "New CPA-DMV Careers Application\n\n" .

    "Application ID: {$applicationId}\n" .

    "Position: {$position['title']}\n" .

    "Department: {$position['department']}\n" .

    "Employment Type: {$position['type']}\n" .

    "Location: {$position['location']}\n\n" .

    "Applicant\n" .

    "Name: {$fullName}\n" .

    "Email: {$email}\n" .

    "Phone: {$phone}\n" .

    "LinkedIn: {$linkedin}\n\n" .

    "Resume: {$originalFilename}\n\n" .

    "Cover Letter:\n" .

    "{$coverLetter}\n\n" .

    "Submitted: " .

    date('l, F j, Y \a\t g:i A T');

@mail(
    'support@cpa-dmv.com',
    "New Careers Application — {$position['title']}",
    $adminMessage,
    $adminHeaders
);

/*
|--------------------------------------------------------------------------
| Applicant confirmation
|--------------------------------------------------------------------------
*/

$applicantHeaders =
    "From: CPA-DMV Careers <no-reply@cpa-dmv.com>\r\n" .
    "Reply-To: support@cpa-dmv.com\r\n" .
    "Content-Type: text/plain; charset=UTF-8";

$applicantMessage =
    "Hello {$fullName},\n\n" .

    "Thank you for your interest in CPA-DMV.\n\n" .

    "We have successfully received your application for:\n" .

    "{$position['title']}\n\n" .

    "Application ID: {$applicationId}\n\n" .

    "Our team will review your application and contact you if your profile is selected for the next stage.\n\n" .

    "Please keep your Application ID for your records.\n\n" .

    "Regards,\n" .

    "CPA-DMV\n" .

    "support@cpa-dmv.com";

@mail(
    $email,
    "Application Received — {$position['title']}",
    $applicantMessage,
    $applicantHeaders
);

/*
|--------------------------------------------------------------------------
| Response
|--------------------------------------------------------------------------
*/

json_response([

    'success' => true,

    'message' => 'Your application has been submitted successfully.',

    'applicationId' => $applicationId,

    'position' => $position['title']

]);