<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/config.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

try {
    $pdo = chat_db();

    echo json_encode([
        'success' => true,
        'message' => 'Database connection successful.',
        'database' => $pdo->query('SELECT DATABASE()')->fetchColumn()
    ]);
} catch (Throwable $e) {
    error_log('CPA-DMV chat DB check failed: ' . $e->getMessage());

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'error_type' => get_class($e),
        'error_code' => (string) $e->getCode(),
        'message' => $e->getMessage()
    ]);
}
