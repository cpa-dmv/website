<?php

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

/*
|--------------------------------------------------------------------------
| Local development CORS
|--------------------------------------------------------------------------
*/

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origin === 'http://localhost:3000') {
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
}

/*
|--------------------------------------------------------------------------
| Handle browser preflight
|--------------------------------------------------------------------------
*/

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

date_default_timezone_set('America/New_York');

$dataFile = __DIR__ . '/../api/conference-room-data.php';
$prefix = "<?php exit; ?>\n";

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function json_response($data, $status = 200)
{
    http_response_code($status);
    echo json_encode(
        $data,
        JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES
    );
    exit;
}

function read_bookings($file, $prefix)
{
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

function sort_bookings(&$bookings)
{
    usort($bookings, function ($a, $b) {
        $dateA = ($a['date'] ?? '') . ' ' . ($a['time'] ?? '');
        $dateB = ($b['date'] ?? '') . ' ' . ($b['time'] ?? '');

        return strcmp($dateA, $dateB);
    });
}

/*
|--------------------------------------------------------------------------
| Load bookings
|--------------------------------------------------------------------------
*/

$bookings = read_bookings($dataFile, $prefix);

sort_bookings($bookings);

/*
|--------------------------------------------------------------------------
| GET
|--------------------------------------------------------------------------
|
| GET /conference-room-admin/api.php
|
| Returns:
| - all bookings
| - statistics
|
*/

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $today = date('Y-m-d');

    $upcoming = 0;
    $todayCount = 0;
    $past = 0;

    foreach ($bookings as $booking) {

        $date = $booking['date'] ?? '';

        if ($date === $today) {
            $todayCount++;
        }

        if ($date >= $today) {
            $upcoming++;
        } else {
            $past++;
        }
    }

    json_response([
        'success' => true,
        'stats' => [
            'total' => count($bookings),
            'today' => $todayCount,
            'upcoming' => $upcoming,
            'past' => $past
        ],
        'bookings' => $bookings
    ]);
}

/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
|
| DELETE /conference-room-admin/api.php?id=BOOKING_ID
|
*/

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

    $id = $_GET['id'] ?? '';

    if ($id === '') {
        json_response([
            'success' => false,
            'error' => 'Booking ID is required.'
        ], 422);
    }

    $found = false;

    foreach ($bookings as $index => $booking) {

        if (($booking['id'] ?? '') === $id) {

            unset($bookings[$index]);

            $found = true;

            break;
        }
    }

    if (!$found) {
        json_response([
            'success' => false,
            'error' => 'Booking not found.'
        ], 404);
    }

    $bookings = array_values($bookings);

    $handle = fopen($dataFile, 'c+');

    if (!$handle) {
        json_response([
            'success' => false,
            'error' => 'Unable to open booking data.'
        ], 500);
    }

    if (!flock($handle, LOCK_EX)) {

        fclose($handle);

        json_response([
            'success' => false,
            'error' => 'Unable to lock booking data.'
        ], 500);
    }

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

    json_response([
        'success' => true,
        'message' => 'Booking deleted successfully.'
    ]);
}

/*
|--------------------------------------------------------------------------
| Unsupported method
|--------------------------------------------------------------------------
*/

json_response([
    'success' => false,
    'error' => 'Method not allowed.'
], 405);