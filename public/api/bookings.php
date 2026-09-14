<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
date_default_timezone_set('America/New_York');

$dataFile = __DIR__ . '/booking-data.php';
$prefix = "<?php exit; ?>\n";
$times = [];
for ($minutes = 11 * 60; $minutes < 17 * 60; $minutes += 15) $times[] = sprintf('%02d:%02d', intdiv($minutes, 60), $minutes % 60);

function read_bookings($file, $prefix) {
    if (!file_exists($file)) return [];
    $content = file_get_contents($file);
    if (str_starts_with($content, $prefix)) $content = substr($content, strlen($prefix));
    $items = json_decode($content, true);
    return is_array($items) ? $items : [];
}
function is_weekend($date) {
    $day = (int)(new DateTimeImmutable($date, new DateTimeZone('America/New_York')))->format('N');
    return $day >= 6;
}
function is_capacity_blocked($date, $time) {
    return (abs(crc32($date . '|' . $time . '|cpa-dmv')) % 10) < 7;
}
function valid_date($date) {
    $parsed = DateTimeImmutable::createFromFormat('!Y-m-d', $date, new DateTimeZone('America/New_York'));
    if (!$parsed || $parsed->format('Y-m-d') !== $date) return false;
    $today = new DateTimeImmutable('today', new DateTimeZone('America/New_York'));
    return $parsed >= $today && $parsed <= $today->modify('+90 days');
}
function format_time($time) {
    return DateTimeImmutable::createFromFormat('H:i', $time)->format('g:i A');
}
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $date = $_GET['date'] ?? '';
    if (!valid_date($date)) { http_response_code(422); echo json_encode(['error' => 'Choose a valid date within the next 90 days.']); exit; }
    $bookings = read_bookings($dataFile, $prefix);
    $slots = [];
    foreach ($times as $time) {
        $reserved = false;
        foreach ($bookings as $booking) if (($booking['date'] ?? '') === $date && ($booking['time'] ?? '') === $time) { $reserved = true; break; }
        $available = is_weekend($date) && !is_capacity_blocked($date, $time) && !$reserved;
        $slots[] = ['time' => $time, 'label' => format_time($time), 'available' => $available];
    }
    echo json_encode(['date' => $date, 'weekend' => is_weekend($date), 'slots' => $slots]); exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $name = trim($input['name'] ?? '');
    $email = filter_var(trim($input['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $date = $input['date'] ?? '';
    $time = $input['time'] ?? '';
    if ($name === '' || !$email || !valid_date($date) || !is_weekend($date) || !in_array($time, $times, true) || is_capacity_blocked($date, $time)) { http_response_code(422); echo json_encode(['error' => 'Please choose an available weekend slot and enter a valid name and email.']); exit; }
    $handle = fopen($dataFile, 'c+');
    if (!$handle || !flock($handle, LOCK_EX)) { http_response_code(500); echo json_encode(['error' => 'Booking service is temporarily unavailable.']); exit; }
    $content = stream_get_contents($handle); $json = str_starts_with($content, $prefix) ? substr($content, strlen($prefix)) : $content;
    $bookings = json_decode($json, true); if (!is_array($bookings)) $bookings = [];
    foreach ($bookings as $booking) if (($booking['date'] ?? '') === $date && ($booking['time'] ?? '') === $time) { flock($handle, LOCK_UN); fclose($handle); http_response_code(409); echo json_encode(['error' => 'That slot was just booked. Please choose another.']); exit; }
    $booking = ['id' => bin2hex(random_bytes(8)), 'name' => $name, 'email' => $email, 'date' => $date, 'time' => $time, 'createdAt' => date(DATE_ATOM)];
    $bookings[] = $booking; ftruncate($handle, 0); rewind($handle); fwrite($handle, $prefix . json_encode($bookings, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)); fflush($handle); flock($handle, LOCK_UN); fclose($handle);
    $when = (new DateTimeImmutable($date . ' ' . $time, new DateTimeZone('America/New_York')))->format('l, F j, Y \a\t g:i A T');
    $headers = "From: CPA-DMV Website <no-reply@cpa-dmv.com>\r\nReply-To: support@cpa-dmv.com\r\nContent-Type: text/plain; charset=UTF-8";
    mail($email, 'Your CPA-DMV consultation is booked', "Hello {$name},\n\nYour 15-minute consultation is booked for {$when}.\n\nYou will receive the meeting link shortly.\n\nIf you need to make a change, reply to this email.\n\nCPA-DMV", $headers);
    $adminHeaders = "From: CPA-DMV Website <no-reply@cpa-dmv.com>\r\nReply-To: {$email}\r\nContent-Type: text/plain; charset=UTF-8";
    mail('support@cpa-dmv.com', 'New 15-minute consultation booking', "Name: {$name}\nEmail: {$email}\nAppointment: {$when}\n", $adminHeaders);
    echo json_encode(['booked' => true, 'when' => $when]); exit;
}

http_response_code(405); echo json_encode(['error' => 'Method not allowed.']);
