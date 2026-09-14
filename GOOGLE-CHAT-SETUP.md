# Google Chat website bridge setup

The website code is ready for space `spaces/AAQApGNj7o0` in project `783447904096`.

1. In Google Cloud, configure the Google Chat API app with an **HTTP endpoint**. Set the interaction endpoint to `https://cpa-dmv.com/api/google-chat-events.php?key=YOUR_RANDOM_WEBHOOK_SECRET`, using the same random value as `webhook_secret` in the PHP config.
2. Set **Authentication audience** to **Project number** and use `783447904096`.
3. Add the Chat app to the Google Chat space.
4. On Hostinger, copy `public_html/api/google-chat-config.example.php` to `public_html/api/google-chat-config.php`.
5. Open your service-account JSON on your own computer. Copy its `client_email` value into the config. Copy its `private_key` value between the existing quotes, preserving the `\n` line breaks. Do not upload the JSON file into `public_html` and do not commit the completed config.
6. Confirm PHP has the `curl` and `openssl` extensions enabled.

When a visitor sends the first message, a new thread appears in the configured space. To answer the visitor, reply inside that thread and mention the Google Chat app. The reply then appears in that visitor's website chat within a few seconds.
