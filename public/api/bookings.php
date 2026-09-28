<?php

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

date_default_timezone_set('America/New_York');

$dataFile = __DIR__ . '/booking-data.php';
$prefix = "<?php exit; ?>\n";

/*
|--------------------------------------------------------------------------
| Booking configuration
|--------------------------------------------------------------------------
|
| Booking window:
| 11:00 AM - 7:00 PM
|
| Slots are every 15 minutes.
| The final bookable slot is 6:45 PM.
|
*/

$times = [];

for ($minutes = 11 * 60; $minutes < 19 * 60; $minutes += 15) {
    $times[] = sprintf(
        '%02d:%02d',
        intdiv($minutes, 60),
        $minutes % 60
    );
}


/*
|--------------------------------------------------------------------------
| Read bookings
|--------------------------------------------------------------------------
*/

function read_bookings($file, $prefix)
{
    if (!file_exists($file)) {
        return [];
    }

    $content = file_get_contents($file);

    if ($content === false) {
        return [];
    }

    if (str_starts_with($content, $prefix)) {
        $content = substr($content, strlen($prefix));
    }

    $items = json_decode($content, true);

    return is_array($items) ? $items : [];
}


/*
|--------------------------------------------------------------------------
| Validate date
|--------------------------------------------------------------------------
*/

function valid_date($date)
{
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

    return (
        $parsed >= $today &&
        $parsed <= $today->modify('+90 days')
    );
}


/*
|--------------------------------------------------------------------------
| Format time
|--------------------------------------------------------------------------
*/

function format_time($time)
{
    $parsed = DateTimeImmutable::createFromFormat(
        'H:i',
        $time,
        new DateTimeZone('America/New_York')
    );

    return $parsed ? $parsed->format('g:i A') : $time;
}


/*
|--------------------------------------------------------------------------
| Generate 2-3 occupied demo slots per date
|--------------------------------------------------------------------------
|
| IMPORTANT:
| This is deterministic.
|
| That means:
| - refreshing the page does NOT change the occupied slots
| - each date gets its own different pattern
| - approximately 2-3 slots are occupied per date
|
| These are placeholder/availability blocks, not actual bookings.
|
*/

function get_demo_blocked_times($date, $times)
{
    if (empty($times)) {
        return [];
    }

    /*
     * Decide whether this date gets 2 or 3 blocked slots.
     * The result is based on the date, so it stays stable.
     */
    $countSeed = crc32(
        $date . '|cpa-dmv-demo-count-v2'
    );

    $blockedCount = 2 + ($countSeed % 2);


    /*
     * Give every slot a deterministic score.
     *
     * We then sort the slots by that score and take the first
     * 2 or 3 slots.
     */
    $scoredSlots = [];

    foreach ($times as $time) {
        $score = crc32(
            $date . '|' . $time . '|cpa-dmv-demo-slot-v2'
        );

        $scoredSlots[] = [
            'time' => $time,
            'score' => $score
        ];
    }


    usort(
        $scoredSlots,
        function ($a, $b) {
            if ($a['score'] === $b['score']) {
                return strcmp($a['time'], $b['time']);
            }

            return $a['score'] <=> $b['score'];
        }
    );


    $blocked = [];

    for ($index = 0; $index < $blockedCount; $index++) {
        $blocked[] = $scoredSlots[$index]['time'];
    }

    return $blocked;
}


/*
|--------------------------------------------------------------------------
| Check whether a time is a demo-blocked slot
|--------------------------------------------------------------------------
*/

function is_demo_blocked($date, $time, $times)
{
    $blocked = get_demo_blocked_times($date, $times);

    return in_array($time, $blocked, true);
}


/*
|--------------------------------------------------------------------------
| Check whether a real booking already exists
|--------------------------------------------------------------------------
*/

function is_real_booking_blocked($bookings, $date, $time)
{
    foreach ($bookings as $booking) {
        if (
            ($booking['date'] ?? '') === $date &&
            ($booking['time'] ?? '') === $time
        ) {
            return true;
        }
    }

    return false;
}


/*
|--------------------------------------------------------------------------
| GET
|--------------------------------------------------------------------------
|
| /api/bookings.php?date=2026-09-29
|
*/

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $date = $_GET['date'] ?? '';

    if (!valid_date($date)) {
        http_response_code(422);

        echo json_encode([
            'error' => 'Choose a valid date within the next 90 days.'
        ]);

        exit;
    }


    $bookings = read_bookings(
        $dataFile,
        $prefix
    );


    $demoBlockedTimes = get_demo_blocked_times(
        $date,
        $times
    );


    $slots = [];


    foreach ($times as $time) {

        $realBooking = is_real_booking_blocked(
            $bookings,
            $date,
            $time
        );


        $demoBlocked = in_array(
            $time,
            $demoBlockedTimes,
            true
        );


        /*
         * A slot is available only if:
         *
         * - it isn't one of our 2-3 placeholder blocked slots
         * - it hasn't already been booked by a real customer
         */
        $available = !$demoBlocked && !$realBooking;


        $slots[] = [
            'time' => $time,
            'label' => format_time($time),
            'available' => $available
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
| POST
|--------------------------------------------------------------------------
|
| Create a real booking.
|
*/

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $input = json_decode(
        file_get_contents('php://input'),
        true
    );


    if (!is_array($input)) {
        http_response_code(400);

        echo json_encode([
            'error' => 'Invalid booking request.'
        ]);

        exit;
    }


    $name = trim(
        $input['name'] ?? ''
    );


    $email = filter_var(
        trim($input['email'] ?? ''),
        FILTER_VALIDATE_EMAIL
    );


    $date = $input['date'] ?? '';
    $time = $input['time'] ?? '';


    /*
     * Basic validation
     */

    if (
        $name === '' ||
        !$email ||
        !valid_date($date) ||
        !in_array($time, $times, true)
    ) {

        http_response_code(422);

        echo json_encode([
            'error' => 'Please choose an available slot and enter a valid name and email.'
        ]);

        exit;
    }


    /*
     * Do not allow users to book one of the
     * intentionally occupied demo slots.
     */

    if (
        is_demo_blocked(
            $date,
            $time,
            $times
        )
    ) {

        http_response_code(409);

        echo json_encode([
            'error' => 'That slot is no longer available. Please choose another time.'
        ]);

        exit;
    }


    /*
     * Open data file safely.
     */

    $handle = fopen(
        $dataFile,
        'c+'
    );


    if (
        !$handle ||
        !flock($handle, LOCK_EX)
    ) {

        http_response_code(500);

        echo json_encode([
            'error' => 'Booking service is temporarily unavailable.'
        ]);

        exit;
    }


    /*
     * Read existing bookings while the file is locked.
     */

    rewind($handle);

    $content = stream_get_contents($handle);

    if ($content === false) {
        $content = '';
    }


    if (str_starts_with($content, $prefix)) {
        $json = substr(
            $content,
            strlen($prefix)
        );
    } else {
        $json = $content;
    }


    $bookings = json_decode(
        $json,
        true
    );


    if (!is_array($bookings)) {
        $bookings = [];
    }


    /*
     * Prevent double booking.
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
                'error' => 'That slot was just booked. Please choose another.'
            ]);

            exit;
        }
    }


    /*
     * Create booking.
     */

    $booking = [
        'id' => bin2hex(
            random_bytes(8)
        ),

        'name' => $name,

        'email' => $email,

        'date' => $date,

        'time' => $time,

        'createdAt' => date(
            DATE_ATOM
        )
    ];


    $bookings[] = $booking;


    /*
     * Save booking.
     */

    $newContent =
        $prefix .
        json_encode(
            $bookings,
            JSON_PRETTY_PRINT |
            JSON_UNESCAPED_SLASHES
        );


    ftruncate(
        $handle,
        0
    );

    rewind($handle);

    fwrite(
        $handle,
        $newContent
    );

    fflush($handle);

    flock(
        $handle,
        LOCK_UN
    );

    fclose($handle);


    /*
     * Format appointment time.
     */

    $when = (
        new DateTimeImmutable(
            $date . ' ' . $time,
            new DateTimeZone('America/New_York')
        )
    )->format(
        'l, F j, Y \a\t g:i A T'
    );


    /*
     * Email customer.
     */

    $headers =
        "From: CPA-DMV Website <no-reply@cpa-dmv.com>\r\n" .
        "Reply-To: support@cpa-dmv.com\r\n" .
        "Content-Type: text/plain; charset=UTF-8";


    mail(
        $email,
        'Your CPA-DMV consultation is booked',
        "Hello {$name},\n\n" .
        "Your 15-minute consultation is booked for {$when}.\n\n" .
        "You will receive the meeting link shortly.\n\n" .
        "If you need to make a change, reply to this email.\n\n" .
        "CPA-DMV",
        $headers
    );


    /*
     * Email admin.
     */

    $adminHeaders =
        "From: CPA-DMV Website <no-reply@cpa-dmv.com>\r\n" .
        "Reply-To: {$email}\r\n" .
        "Content-Type: text/plain; charset=UTF-8";


    mail(
        'support@cpa-dmv.com',
        'New 15-minute consultation booking',
        "Name: {$name}\n" .
        "Email: {$email}\n" .
        "Appointment: {$when}\n",
        $adminHeaders
    );


    /*
     * Return success.
     */

    echo json_encode([
        'booked' => true,
        'when' => $when
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
