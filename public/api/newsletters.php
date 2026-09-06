<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
$file = dirname(__DIR__) . '/data/newsletters.json';
$method = $_SERVER['REQUEST_METHOD'];

function read_newsletters($file) {
    if (!file_exists($file)) return [];
    $data = json_decode(file_get_contents($file), true);
    return is_array($data) ? $data : [];
}
function save_newsletters($file, $items) {
    $handle = fopen($file, 'c+');
    if (!$handle || !flock($handle, LOCK_EX)) return false;
    ftruncate($handle, 0); rewind($handle);
    $ok = fwrite($handle, json_encode(array_values($items), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
    fflush($handle); flock($handle, LOCK_UN); fclose($handle);
    return $ok !== false;
}
if ($method === 'GET') { echo json_encode(read_newsletters($file), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); exit; }
if ($method === 'POST') {
    $item = json_decode(file_get_contents('php://input'), true);
    if (!is_array($item) || empty($item['slug']) || empty($item['title']) || empty($item['sections'])) { http_response_code(422); echo json_encode(['error' => 'Title and at least one section are required.']); exit; }
    $items = read_newsletters($file);
    foreach ($items as &$existing) $existing['featured'] = false;
    unset($existing); $item['featured'] = true; $replaced = false;
    foreach ($items as $index => $existing) if (($existing['slug'] ?? '') === $item['slug']) { $items[$index] = $item; $replaced = true; break; }
    if (!$replaced) array_unshift($items, $item);
    if (!save_newsletters($file, $items)) { http_response_code(500); echo json_encode(['error' => 'Could not save the newsletter.']); exit; }
    echo json_encode($item, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); exit;
}
if ($method === 'DELETE') {
    $slug = $_GET['slug'] ?? '';
    $items = array_values(array_filter(read_newsletters($file), fn($item) => ($item['slug'] ?? '') !== $slug));
    if (count($items) && !array_filter($items, fn($item) => !empty($item['featured']))) $items[0]['featured'] = true;
    if (!save_newsletters($file, $items)) { http_response_code(500); echo json_encode(['error' => 'Could not delete the newsletter.']); exit; }
    echo json_encode(['deleted' => $slug]); exit;
}
http_response_code(405); echo json_encode(['error' => 'Method not allowed.']);
