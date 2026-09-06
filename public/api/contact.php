<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request.']);
    exit;
}

if (!empty($data['website'])) {
    echo json_encode(['sent' => true]);
    exit;
}

$email = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$message = trim($data['message'] ?? '');
$name = trim($data['name'] ?? '');
$organization = trim($data['organization'] ?? '');

if (!$email || $message === '') {
    http_response_code(422);
    echo json_encode(['error' => 'A valid email and message are required.']);
    exit;
}

$name = preg_replace('/[\r\n]+/', ' ', $name);
$organization = preg_replace('/[\r\n]+/', ' ', $organization);
$safeName = $name !== '' ? $name : 'Website visitor';
$subject = 'New CPA-DMV website inquiry from ' . $safeName;
$body = "New website inquiry\n\n";
$body .= "Name: " . ($name !== '' ? $name : 'Not provided') . "\n";
$body .= "Email: " . $email . "\n";
$body .= "Organization: " . ($organization !== '' ? $organization : 'Not provided') . "\n\n";
$body .= "Message:\n" . $message . "\n";

$headers = [
    'From: CPA-DMV Website <no-reply@cpa-dmv.com>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];

if (!mail('support@cpa-dmv.com', $subject, $body, implode("\r\n", $headers))) {
    http_response_code(500);
    echo json_encode(['error' => 'The message could not be sent.']);
    exit;
}

echo json_encode(['sent' => true]);
