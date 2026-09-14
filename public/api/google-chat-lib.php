<?php
declare(strict_types=1);

if (realpath($_SERVER['SCRIPT_FILENAME'] ?? '') === __FILE__) {
    http_response_code(404);
    exit;
}

const WEBSITE_CHAT_DATA = __DIR__ . '/website-chat-data.php';
const WEBSITE_CHAT_PREFIX = "<?php exit; ?>\n";

function chat_json(array $payload, int $status = 200): never {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

function chat_config(): array {
    $path = __DIR__ . '/google-chat-config.php';
    if (!is_file($path)) {
        throw new RuntimeException('Google Chat has not been configured on this server yet.');
    }
    $config = require $path;
    foreach (['space_id', 'project_number', 'client_email', 'private_key'] as $key) {
        if (empty($config[$key]) || str_starts_with((string)$config[$key], 'YOUR_')) {
            throw new RuntimeException('Google Chat configuration is incomplete.');
        }
    }
    return $config;
}

function chat_data_update(callable $callback): mixed {
    $handle = fopen(WEBSITE_CHAT_DATA, 'c+');
    if (!$handle || !flock($handle, LOCK_EX)) {
        throw new RuntimeException('Chat storage is unavailable.');
    }
    $raw = stream_get_contents($handle);
    $json = str_starts_with($raw, WEBSITE_CHAT_PREFIX) ? substr($raw, strlen(WEBSITE_CHAT_PREFIX)) : '[]';
    $data = json_decode($json ?: '[]', true);
    if (!is_array($data)) $data = [];
    $result = $callback($data);
    rewind($handle);
    ftruncate($handle, 0);
    fwrite($handle, WEBSITE_CHAT_PREFIX . json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
    return $result;
}

function chat_data_read(): array {
    return chat_data_update(fn(array &$data) => $data);
}

function base64url(string $value): string {
    return rtrim(strtr(base64_encode($value), '+/', '-_'), '=');
}

function google_access_token(array $config): string {
    $now = time();
    $header = base64url(json_encode(['alg' => 'RS256', 'typ' => 'JWT']));
    $claims = base64url(json_encode([
        'iss' => $config['client_email'],
        'scope' => 'https://www.googleapis.com/auth/chat.bot',
        'aud' => 'https://oauth2.googleapis.com/token',
        'iat' => $now,
        'exp' => $now + 3600,
    ]));
    $unsigned = $header . '.' . $claims;
    if (!openssl_sign($unsigned, $signature, $config['private_key'], OPENSSL_ALGO_SHA256)) {
        throw new RuntimeException('Could not sign the Google credential.');
    }
    $assertion = $unsigned . '.' . base64url($signature);
    $curl = curl_init('https://oauth2.googleapis.com/token');
    curl_setopt_array($curl, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
        CURLOPT_POSTFIELDS => http_build_query([
            'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            'assertion' => $assertion,
        ]),
    ]);
    $body = curl_exec($curl);
    $status = (int)curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);
    $decoded = json_decode((string)$body, true);
    if ($status >= 300 || empty($decoded['access_token'])) {
        $detail = $decoded['error_description'] ?? $decoded['error'] ?? 'Unknown authentication error';
        error_log('CPA-DMV Google Chat authentication failed: ' . $status . ' ' . (is_string($detail) ? $detail : json_encode($detail)));
        throw new RuntimeException('Google authentication failed (' . $status . ').');
    }
    return $decoded['access_token'];
}

function google_send_message(array $conversation, string $message, bool $first): ?string {
    $config = chat_config();
    $token = google_access_token($config);
    $space = preg_replace('#[^A-Za-z0-9_\-/]#', '', (string)$config['space_id']);
    $url = "https://chat.googleapis.com/v1/{$space}/messages?messageReplyOption=REPLY_MESSAGE_FALLBACK_TO_NEW_THREAD";
    $intro = $first
        ? "New website chat\nVisitor: {$conversation['name']}\nEmail: {$conversation['email']}\nConversation: {$conversation['id']}\n\nReply in this thread and @mention the website chat app.\n\n"
        : "{$conversation['name']}: ";
    $payload = ['text' => $intro . $message, 'thread' => ['threadKey' => $conversation['id']]];
    $curl = curl_init($url);
    curl_setopt_array($curl, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $token, 'Content-Type: application/json'],
        CURLOPT_POSTFIELDS => json_encode($payload),
    ]);
    $body = curl_exec($curl);
    $status = (int)curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);
    $decoded = json_decode((string)$body, true);
    if ($status >= 300) {
        $detail = $decoded['error']['message'] ?? 'Google Chat rejected the request.';
        error_log('CPA-DMV Google Chat message failed: ' . $status . ' ' . $detail);
        throw new RuntimeException('Google Chat error ' . $status . ': ' . $detail);
    }
    return $decoded['thread']['name'] ?? null;
}

function verify_google_chat_request(string $projectNumber): void {
    $authorization = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if ($authorization === '' && function_exists('getallheaders')) {
        foreach (getallheaders() as $name => $value) {
            if (strcasecmp((string)$name, 'Authorization') === 0) {
                $authorization = (string)$value;
                break;
            }
        }
    }
    if (!preg_match('/^Bearer\s+(.+)$/i', $authorization, $match)) chat_json(['error' => 'Unauthorized'], 401);
    $parts = explode('.', $match[1]);
    if (count($parts) !== 3) chat_json(['error' => 'Unauthorized'], 401);
    $decode = fn(string $part) => base64_decode(strtr($part . str_repeat('=', (4 - strlen($part) % 4) % 4), '-_', '+/'));
    $header = json_decode($decode($parts[0]), true);
    $claims = json_decode($decode($parts[1]), true);
    if (($header['alg'] ?? '') !== 'RS256' || ($claims['iss'] ?? '') !== 'chat@system.gserviceaccount.com' ||
        (string)($claims['aud'] ?? '') !== $projectNumber || (int)($claims['exp'] ?? 0) < time()) {
        chat_json(['error' => 'Unauthorized'], 401);
    }
    $cachePath = sys_get_temp_dir() . '/cpa-dmv-google-chat-certs.json';
    $certJson = is_file($cachePath) && filemtime($cachePath) > time() - 1800
        ? file_get_contents($cachePath)
        : false;
    if (!$certJson) {
        $certCurl = curl_init('https://www.googleapis.com/service_accounts/v1/metadata/x509/chat@system.gserviceaccount.com');
        curl_setopt_array($certCurl, [CURLOPT_RETURNTRANSFER => true, CURLOPT_CONNECTTIMEOUT => 3, CURLOPT_TIMEOUT => 5]);
        $certJson = curl_exec($certCurl);
        curl_close($certCurl);
        if ($certJson) @file_put_contents($cachePath, $certJson, LOCK_EX);
    }
    $certs = json_decode((string)$certJson, true);
    $cert = is_array($certs) ? ($certs[$header['kid'] ?? ''] ?? null) : null;
    if (!$cert || openssl_verify($parts[0] . '.' . $parts[1], $decode($parts[2]), $cert, OPENSSL_ALGO_SHA256) !== 1) {
        chat_json(['error' => 'Unauthorized'], 401);
    }
}
