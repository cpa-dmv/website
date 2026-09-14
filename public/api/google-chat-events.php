<?php
declare(strict_types=1);
require __DIR__ . '/google-chat-lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') chat_json(['error' => 'Method not allowed.'], 405);
$config = chat_config();
$providedSecret = (string)($_GET['key'] ?? '');
$configuredSecret = (string)($config['webhook_secret'] ?? '');
$hasValidSecret = $configuredSecret !== '' && hash_equals($configuredSecret, $providedSecret);
if (!$hasValidSecret) verify_google_chat_request((string)$config['project_number']);
$event = json_decode(file_get_contents('php://input'), true) ?: [];
$isWorkspaceAddon = isset($event['chat']) && is_array($event['chat']);
$addonMessagePayload = $event['chat']['messagePayload'] ?? null;
$addonAddedPayload = $event['chat']['addedToSpacePayload'] ?? null;
$type = $event['type'] ?? $event['eventType'] ?? '';
if (is_array($addonMessagePayload)) $type = 'MESSAGE';
if (is_array($addonAddedPayload)) $type = 'ADDED_TO_SPACE';

if ($type === 'ADDED_TO_SPACE') {
    if ($isWorkspaceAddon) {
        http_response_code(200);
        exit;
    }
    chat_json(['text' => 'Website chat is connected.']);
}
if ($type !== 'MESSAGE') {
    http_response_code(200);
    exit;
}

$message = is_array($addonMessagePayload)
    ? ($addonMessagePayload['message'] ?? [])
    : ($event['message'] ?? []);
$text = trim((string)($message['argumentText'] ?? $message['text'] ?? ''));
$threadName = (string)($message['thread']['name'] ?? '');
$threadKey = (string)($event['threadKey'] ?? $message['thread']['threadKey'] ?? '');
if ($text === '') {
    http_response_code(200);
    exit;
}

$saved = chat_data_update(function (array &$data) use ($text, $threadName, $threadKey) {
    foreach ($data as &$conversation) {
        if (($threadName !== '' && ($conversation['threadName'] ?? '') === $threadName) ||
            ($threadKey !== '' && $conversation['id'] === $threadKey)) {
            $conversation['messages'][] = ['id' => bin2hex(random_bytes(8)), 'sender' => 'support', 'text' => $text, 'createdAt' => gmdate('c')];
            $conversation['updatedAt'] = gmdate('c');
            return true;
        }
    }
    return false;
});

if ($isWorkspaceAddon) {
    // Workspace add-ons require a DataActions response for message triggers.
    // A blank response is delivered to the website but appears as "not responding" in Chat.
    chat_json([
        'hostAppDataAction' => [
            'chatDataAction' => [
                'createMessageAction' => [
                    'message' => [
                        'text' => $saved
                            ? '✓ Reply delivered to the website visitor.'
                            : 'This reply could not be matched to a website conversation.',
                    ],
                ],
            ],
        ],
    ]);
}
chat_json(['text' => $saved ? 'Reply delivered to the website visitor.' : 'I could not match this thread to a website visitor.']);
