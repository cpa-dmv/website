<?php

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$dataFile = dirname(dirname(__DIR__)) . '/data/research.json';
$researchDir = dirname(dirname(__DIR__)) . '/research';

function read_research($file) {
    if (!file_exists($file)) {
        return [];
    }

    $data = json_decode(file_get_contents($file), true);

    return is_array($data) ? $data : [];
}

function save_research($file, $items) {
    $dir = dirname($file);

    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }

    $json = json_encode(
        array_values($items),
        JSON_PRETTY_PRINT |
        JSON_UNESCAPED_SLASHES |
        JSON_UNESCAPED_UNICODE
    );

    return file_put_contents($file, $json, LOCK_EX) !== false;
}

function slugify_research($value) {
    $value = strtolower(trim($value));
    $value = preg_replace('/[^a-z0-9]+/', '-', $value);
    $value = trim($value, '-');

    return $value !== '' ? $value : 'research-paper';
}

/*
 * GET
 *
 * Returns all research publications.
 */
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode(
        read_research($dataFile),
        JSON_UNESCAPED_SLASHES |
        JSON_UNESCAPED_UNICODE
    );
    exit;
}

/*
 * DELETE
 *
 * Delete one research publication by slug.
 */
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

    $slug = isset($_GET['slug'])
        ? trim($_GET['slug'])
        : '';

    if ($slug === '') {
        http_response_code(400);
        echo json_encode([
            'error' => 'Research publication slug is required.'
        ]);
        exit;
    }

    $items = read_research($dataFile);

    $found = false;
    $remaining = [];

    foreach ($items as $item) {
        if (isset($item['slug']) && $item['slug'] === $slug) {
            $found = true;

            /*
             * Remove the associated PDF if it exists.
             */
            if (!empty($item['pdf'])) {
                $pdfPath = parse_url($item['pdf'], PHP_URL_PATH);

                if ($pdfPath) {
                    $filename = basename($pdfPath);
                    $fullPath = $researchDir . '/' . $filename;

                    if (file_exists($fullPath)) {
                        @unlink($fullPath);
                    }
                }
            }

            continue;
        }

        $remaining[] = $item;
    }

    if (!$found) {
        http_response_code(404);
        echo json_encode([
            'error' => 'Research publication not found.'
        ]);
        exit;
    }

    if (!save_research($dataFile, $remaining)) {
        http_response_code(500);
        echo json_encode([
            'error' => 'Could not delete research publication.'
        ]);
        exit;
    }

    echo json_encode([
        'success' => true,
        'message' => 'Research publication deleted.'
    ]);

    exit;
}

/*
 * POST
 *
 * Supports:
 * 1. JSON create/update
 * 2. PDF upload using multipart/form-data
 */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    /*
     * PDF upload
     */
    if (isset($_FILES['pdf'])) {

        $file = $_FILES['pdf'];

        if ($file['error'] !== UPLOAD_ERR_OK) {
            http_response_code(400);
            echo json_encode([
                'error' => 'PDF upload failed.'
            ]);
            exit;
        }

        if ($file['size'] > 25 * 1024 * 1024) {
            http_response_code(400);
            echo json_encode([
                'error' => 'PDF is too large. Maximum size is 25 MB.'
            ]);
            exit;
        }

        $originalName = basename($file['name']);
        $extension = strtolower(
            pathinfo($originalName, PATHINFO_EXTENSION)
        );

        if ($extension !== 'pdf') {
            http_response_code(400);
            echo json_encode([
                'error' => 'Only PDF files are allowed.'
            ]);
            exit;
        }

        /*
         * Verify MIME type when available.
         */
        $mime = '';

        if (function_exists('finfo_open')) {
            $finfo = finfo_open(FILEINFO_MIME_TYPE);

            if ($finfo) {
                $mime = finfo_file(
                    $finfo,
                    $file['tmp_name']
                );

                finfo_close($finfo);
            }
        }

        if ($mime !== '' && $mime !== 'application/pdf') {
            http_response_code(400);
            echo json_encode([
                'error' => 'The uploaded file is not a valid PDF.'
            ]);
            exit;
        }

        /*
         * The frontend sends the research slug.
         */
        $slug = isset($_POST['slug'])
            ? trim($_POST['slug'])
            : '';

        if ($slug === '') {
            http_response_code(400);
            echo json_encode([
                'error' => 'Research publication slug is required.'
            ]);
            exit;
        }

        $items = read_research($dataFile);

        $foundIndex = -1;

        foreach ($items as $index => $item) {
            if (
                isset($item['slug']) &&
                $item['slug'] === $slug
            ) {
                $foundIndex = $index;
                break;
            }
        }

        if ($foundIndex === -1) {
            http_response_code(404);
            echo json_encode([
                'error' => 'Research publication not found.'
            ]);
            exit;
        }

        $safeSlug = preg_replace(
            '/[^a-zA-Z0-9_-]/',
            '-',
            $slug
        );

        $safeSlug = trim($safeSlug, '-');

        if ($safeSlug === '') {
            $safeSlug = 'research-paper';
        }

        $filename = $safeSlug . '.pdf';
        $destination = $researchDir . '/' . $filename;

        if (!is_dir($researchDir)) {
            if (!mkdir($researchDir, 0755, true)) {
                http_response_code(500);
                echo json_encode([
                    'error' => 'Could not create research directory.'
                ]);
                exit;
            }
        }

        if (
            !move_uploaded_file(
                $file['tmp_name'],
                $destination
            )
        ) {
            http_response_code(500);
            echo json_encode([
                'error' => 'Could not save the uploaded PDF.'
            ]);
            exit;
        }

        /*
         * Replace the old PDF path.
         */
        $items[$foundIndex]['pdf'] =
            '/research/' . $filename;

        if (!save_research($dataFile, $items)) {
            http_response_code(500);
            echo json_encode([
                'error' =>
                    'PDF uploaded, but research data could not be updated.'
            ]);
            exit;
        }

        echo json_encode([
            'success' => true,
            'message' => 'Research paper uploaded successfully.',
            'pdf' => '/research/' . $filename
        ]);

        exit;
    }

    /*
     * JSON create/update.
     */
    $input = json_decode(
        file_get_contents('php://input'),
        true
    );

    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode([
            'error' => 'Invalid research data.'
        ]);
        exit;
    }

    /*
     * Backward compatibility:
     * If an array is sent, preserve the old behavior.
     */
    if (array_is_list($input)) {
        if (!save_research($dataFile, $input)) {
            http_response_code(500);
            echo json_encode([
                'error' => 'Could not save research publications.'
            ]);
            exit;
        }

        echo json_encode([
            'success' => true,
            'message' => 'Research publications saved.'
        ]);

        exit;
    }

    /*
     * Single research publication create/update.
     */
    $items = read_research($dataFile);

    $title = isset($input['title'])
        ? trim($input['title'])
        : '';

    if ($title === '') {
        http_response_code(400);
        echo json_encode([
            'error' => 'Research title is required.'
        ]);
        exit;
    }

    $slug = isset($input['slug'])
        ? trim($input['slug'])
        : '';

    if ($slug === '') {
        $slug = slugify_research($title);
    }

    $input['slug'] = $slug;

    $existingIndex = -1;

    foreach ($items as $index => $item) {
        if (
            isset($item['slug']) &&
            $item['slug'] === $slug
        ) {
            $existingIndex = $index;
            break;
        }
    }

    if ($existingIndex >= 0) {
        /*
         * Preserve the existing PDF if no new PDF
         * was uploaded.
         */
        if (
            empty($input['pdf']) &&
            !empty($items[$existingIndex]['pdf'])
        ) {
            $input['pdf'] = $items[$existingIndex]['pdf'];
        }

        $items[$existingIndex] = $input;
        $message = 'Research publication updated.';
    } else {

        /*
         * Make sure a new slug does not collide with
         * an existing publication.
         */
        $baseSlug = $slug;
        $counter = 2;

        while (true) {
            $collision = false;

            foreach ($items as $item) {
                if (
                    isset($item['slug']) &&
                    $item['slug'] === $slug
                ) {
                    $collision = true;
                    break;
                }
            }

            if (!$collision) {
                break;
            }

            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        $input['slug'] = $slug;
        $items[] = $input;

        $message = 'Research publication created.';
    }

    if (!save_research($dataFile, $items)) {
        http_response_code(500);
        echo json_encode([
            'error' => 'Could not save research publication.'
        ]);
        exit;
    }

    echo json_encode([
        'success' => true,
        'message' => $message,
        'article' => $input
    ]);

    exit;
}

/*
 * Unsupported method
 */
http_response_code(405);

echo json_encode([
    'error' => 'Method not allowed.'
]);