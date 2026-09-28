<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

date_default_timezone_set('America/New_York');

$dataFile = __DIR__ . '/conference-room-data.php';
$prefix = "<?php exit; ?>\n";

$timezone = new DateTimeZone('America/New_York');

/*
|--------------------------------------------------------------------------
| Conference room configuration
|--------------------------------------------------------------------------
*/

$times = [];

for ($hour = 8; $hour < 17; $hour++) {
    $times[] = sprintf('%02d:00', $hour);
}

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function read_bookings($file, $prefix) {
    if (!file_exists($file)) {
        return [];
    }

    $content = file_get_contents($file);

    if (str_starts_with($content, $prefix)) {
        $content = substr($content, strlen($prefix));
    }

    $items = json_decode($content, true);

    return is_array($items) ? $items : [];
}

function valid_date($date) {
    $timezone = new DateTimeZone('America/New_York');

    $parsed = DateTimeImmutable::createFromFormat(
        '!Y-m-d',
        $date,
        $timezone
    );

    if (!$parsed || $parsed->format('Y-m-d') !== $date) {
        return false;
    }

    $today = new DateTimeImmutable('today', $timezone);

    return $parsed >= $today;
}

function format_time($time) {
    $date = DateTimeImmutable::createFromFormat('H:i', $time);

    return $date->format('g:i A');
}

function format_date_time($date, $time) {
    $timezone = new DateTimeZone('America/New_York');

    return new DateTimeImmutable(
        $date . ' ' . $time,
        $timezone
    )->format('l, F j, Y \a\t g:i A T');
}

/*
|--------------------------------------------------------------------------
| GET — Check availability
|--------------------------------------------------------------------------
*/

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $date = $_GET['date'] ?? '';

    if (!valid_date($date)) {
        http_response_code(422);

        echo json_encode([
            'error' => 'Please choose a valid date.'
        ]);

        exit;
    }

    $bookings = read_bookings($dataFile, $prefix);

    $slots = [];

    foreach ($times as $time) {

        $reserved = false;

        foreach ($bookings as $booking) {

            if (
                ($booking['date'] ?? '') === $date &&
                ($booking['time'] ?? '') === $time
            ) {
                $reserved = true;
                break;
            }
        }

        $slots[] = [
            'time' => $time,
            'label' => format_time($time),
            'available' => !$reserved
        ];
    }

    echo json_encode([
        'date' => $date,
        'slots' => $slots
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| POST — Create booking
|--------------------------------------------------------------------------
*/

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $input = json_decode(
        file_get_contents('php://input'),
        true
    );

    $name = trim($input['name'] ?? '');
    $organization = trim($input['organization'] ?? '');
    $email = filter_var(
        trim($input['email'] ?? ''),
        FILTER_VALIDATE_EMAIL
    );
    $phone = trim($input['phone'] ?? '');
    $attendees = trim($input['attendees'] ?? '');
    $purpose = trim($input['purpose'] ?? '');
    $date = $input['date'] ?? '';
    $time = $input['time'] ?? '';

    /*
    |--------------------------------------------------------------------------
    | Validate
    |--------------------------------------------------------------------------
    */

    if (
        $name === '' ||
        !$email ||
        !valid_date($date) ||
        !in_array($time, $times, true)
    ) {

        http_response_code(422);

        echo json_encode([
            'error' => 'Please complete the required booking information.'
        ]);

        exit;
    }

    /*
    |--------------------------------------------------------------------------
    | Open booking data with exclusive lock
    |--------------------------------------------------------------------------
    */

    $handle = fopen($dataFile, 'c+');

    if (!$handle || !flock($handle, LOCK_EX)) {

        http_response_code(500);

        echo json_encode([
            'error' => 'The booking service is temporarily unavailable.'
        ]);

        exit;
    }

    $content = stream_get_contents($handle);

    if (str_starts_with($content, $prefix)) {
        $content = substr($content, strlen($prefix));
    }

    $bookings = json_decode($content, true);

    if (!is_array($bookings)) {
        $bookings = [];
    }

    /*
    |--------------------------------------------------------------------------
    | Prevent double booking
    |--------------------------------------------------------------------------
    */

    foreach ($bookings as $booking) {

        if (
            ($booking['date'] ?? '') === $date &&
            ($booking['time'] ?? '') === $time
        ) {

            flock($handle, LOCK_UN);
            fclose($handle);

            http_response_code(409);

            echo json_encode([
                'error' => 'That time has just been booked. Please choose another time.'
            ]);

            exit;
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Create booking
    |--------------------------------------------------------------------------
    */

    $booking = [
        'id' => bin2hex(random_bytes(8)),
        'name' => $name,
        'organization' => $organization,
        'email' => $email,
        'phone' => $phone,
        'attendees' => $attendees,
        'purpose' => $purpose,
        'date' => $date,
        'time' => $time,
        'createdAt' => date(DATE_ATOM)
    ];

    $bookings[] = $booking;

    /*
    |--------------------------------------------------------------------------
    | Save
    |--------------------------------------------------------------------------
    */

    ftruncate($handle, 0);
    rewind($handle);

    fwrite(
        $handle,
        $prefix . json_encode(
            $bookings,
            JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES
        )
    );

    fflush($handle);

    flock($handle, LOCK_UN);
    fclose($handle);

    /*
    |--------------------------------------------------------------------------
    | Booking details
    |--------------------------------------------------------------------------
    */

    $when = format_date_time($date, $time);

    /*
    |--------------------------------------------------------------------------
    | Confirmation email to customer
    |--------------------------------------------------------------------------
    */

    $customerHeaders =
        "From: CPA-DMV Conference Room <no-reply@cpa-dmv.com>\r\n" .
        "Reply-To: support@cpa-dmv.com\r\n" .
        "Content-Type: text/plain; charset=UTF-8";

    $customerMessage =
        "Hello {$name},\n\n" .
        "Your CPA-DMV conference room reservation is confirmed.\n\n" .
        "Date & Time:\n{$when}\n\n" .
        "Location:\n" .
        "10521 Judicial Dr #100\n" .
        "Fairfax, VA 22030\n\n";

    if ($organization !== '') {
        $customerMessage .=
            "Organization:\n{$organization}\n\n";
    }

    if ($attendees !== '') {
        $customerMessage .=
            "Number of attendees:\n{$attendees}\n\n";
    }

    if ($purpose !== '') {
        $customerMessage .=
            "Meeting purpose:\n{$purpose}\n\n";
    }

    $customerMessage .=
        "Your reservation has been automatically confirmed.\n\n" .
        "If you need to make a change, please contact support@cpa-dmv.com.\n\n" .
        "CPA-DMV";

    mail(
        $email,
        'Your CPA-DMV Conference Room Reservation',
        $customerMessage,
        $customerHeaders
    );

    /*
    |--------------------------------------------------------------------------
    | Notification email to CPA-DMV
    |--------------------------------------------------------------------------
    */

    $adminHeaders =
        "From: CPA-DMV Conference Room <no-reply@cpa-dmv.com>\r\n" .
        "Reply-To: {$email}\r\n" .
        "Content-Type: text/plain; charset=UTF-8";

    $adminMessage =
        "New conference room reservation\n\n" .
        "Name: {$name}\n" .
        "Email: {$email}\n" .
        "Phone: {$phone}\n" .
        "Organization: {$organization}\n" .
        "Attendees: {$attendees}\n" .
        "Purpose: {$purpose}\n" .
        "Date & Time: {$when}\n\n" .
        "Location:\n" .
        "10521 Judicial Dr #100\n" .
        "Fairfax, VA 22030\n";

    mail(
        'support@cpa-dmv.com',
        'New Conference Room Reservation',
        $adminMessage,
        $adminHeaders
    );

    /*
    |--------------------------------------------------------------------------
    | Response
    |--------------------------------------------------------------------------
    */

    echo json_encode([
        'booked' => true,
        'id' => $booking['id'],
        'when' => $when,
        'location' => '10521 Judicial Dr #100, Fairfax, VA 22030'
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Unsupported method
|--------------------------------------------------------------------------
*/

http_response_code(405);

echo json_encode([
    'error' => 'Method not allowed.'
]);