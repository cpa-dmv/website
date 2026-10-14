<?php
declare(strict_types=1);

/*
 * CPA-DMV Chat database configuration.
 * Fill in the database password locally.
 * Never upload this file with placeholder credentials.
 */

function chat_db(): PDO
{
    $host = 'localhost';
    $name = 'u806174258_cpadm_chat';
    $user = 'u806174258_cpadm_chatuser';
    $pass = 'Mysql@CPA-DMV2026';

    if (trim($pass) === '') {
    throw new RuntimeException('Chat database password is not configured.');
}

    $dsn = "mysql:host={$host};port=3306;dbname={$name};charset=utf8mb4";

    return new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
}


/*
 * Admin chat credentials.
 * Generate the password hash separately; never store a plain-text password.
 */
if (!defined('CHAT_ADMIN_EMAIL')) {
    define('CHAT_ADMIN_EMAIL', 'support@cpa-dmv.com');
}


if (!defined('CHAT_ADMIN_PASSWORD_HASH')) {
    define('CHAT_ADMIN_PASSWORD_HASH', '$2y$12$yGQvKzA373pIl9TSm6Im1.Kv.yzFyVoWNwmvOsVe4n65kGXZvh17S');
}

