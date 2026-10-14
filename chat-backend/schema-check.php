<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/config.php';

try {
    $db = chat_db();

    $tables = $db->query(
        "SHOW TABLES LIKE 'chat_%'"
    )->fetchAll(PDO::FETCH_COLUMN);

    echo json_encode([
        'success' => true,
        'message' => 'Database connection successful.',
        'tables' => $tables,
    ], JSON_PRETTY_PRINT);
} catch (Throwable $e) {
    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed. Check server configuration.',
    ], JSON_PRETTY_PRINT);
}
