<?php
declare(strict_types=1);
require __DIR__ . '/google-chat-lib.php';

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

function public_conversation(array $conversation): array {
    return [
        'id' => $conversation['id'],
        'name' => $conversation['name'],
        'messages' => $conversation['messages'],
    ];
}

function find_by_token(array $data, string $token): ?array {
    $hash = hash('sha256', $token);
    foreach ($data as $conversation) {
        if (hash_equals($conversation['tokenHash'] ?? '', $hash)) return $conversation;
    }
    return null;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $token = trim($_GET['token'] ?? '');
    if ($token === '') chat_json(['error' => 'Missing chat token.'], 400);
    $conversation = find_by_token(chat_data_read(), $token);
    if (!$conversation) chat_json(['error' => 'Chat not found.'], 404);
    chat_json(['conversation' => public_conversation($conversation)]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') chat_json(['error' => 'Method not allowed.'], 405);
$input = json_decode(file_get_contents('php://input'), true) ?: [];
$action = $input['action'] ?? '';

if ($action === 'start') {
    $name = trim((string)($input['name'] ?? ''));
    $email = filter_var(trim((string)($input['email'] ?? '')), FILTER_VALIDATE_EMAIL);
    if ($name === '' || strlen($name) > 100 || !$email) chat_json(['error' => 'Enter a valid name and email address.'], 422);
    $token = bin2hex(random_bytes(24));
    $conversation = [
        'id' => 'WEB-' . strtoupper(bin2hex(random_bytes(4))),
        'tokenHash' => hash('sha256', $token),
        'name' => $name,
        'email' => $email,
        'threadName' => null,
        'createdAt' => gmdate('c'),
        'updatedAt' => gmdate('c'),
        'messages' => [],
    ];
    chat_data_update(function (array &$data) use ($conversation) { $data[] = $conversation; });
    chat_json(['token' => $token, 'conversation' => public_conversation($conversation)], 201);
}

if ($action === 'message') {
    $token = trim((string)($input['token'] ?? ''));
    $text = trim((string)($input['text'] ?? ''));
    if ($text === '' || strlen($text) > 2000) chat_json(['error' => 'Message must be between 1 and 2,000 characters.'], 422);
    $conversation = find_by_token(chat_data_read(), $token);
    if (!$conversation) chat_json(['error' => 'Chat not found.'], 404);
    $last = end($conversation['messages']);
    if ($last && ($last['sender'] ?? '') === 'visitor' && time() - strtotime($last['createdAt']) < 2) {
        chat_json(['error' => 'Please wait a moment before sending another message.'], 429);
    }
    try {
        $threadName = google_send_message($conversation, $text, count($conversation['messages']) === 0);
        $conversation = chat_data_update(function (array &$data) use ($conversation, $threadName, $text) {
            foreach ($data as &$item) if ($item['id'] === $conversation['id']) {
                if ($threadName) $item['threadName'] = $threadName;
                $item['messages'][] = ['id' => bin2hex(random_bytes(8)), 'sender' => 'visitor', 'text' => $text, 'createdAt' => gmdate('c')];
                $item['updatedAt'] = gmdate('c');
                return $item;
            }
            return $conversation;
        });
    } catch (Throwable $error) {
        chat_json(['error' => $error->getMessage()], 503);
    }
    chat_json(['conversation' => public_conversation($conversation)], 201);
}

chat_json(['error' => 'Unknown action.'], 400);
