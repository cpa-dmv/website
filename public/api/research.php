<?php

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$dataFile = dirname(__DIR__) . '/data/research.json';
$researchDir = dirname(__DIR__) . '/research';

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
        $items,
        JSON_PRETTY_PRINT |
        JSON_UNESCAPED_SLASHES |
        JSON_UNESCAPED_UNICODE
    );

    return file_put_contents($file, $json, LOCK_EX) !== false;
}

/*
 * GET
 * Returns the current research publication.
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
 * POST
 *
 * Supports:
 * 1. JSON metadata update
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

        /*
         * Maximum PDF size: 25 MB
         */
        if ($file['size'] > 25 * 1024 * 1024) {
            http_response_code(400);
            echo json_encode([
                'error' => 'PDF is too large. Maximum size is 25 MB.'
            ]);
            exit;
        }

        /*
         * Verify extension
         */
        $originalName = basename($file['name']);
        $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

        if ($extension !== 'pdf') {
            http_response_code(400);
            echo json_encode([
                'error' => 'Only PDF files are allowed.'
            ]);
            exit;
        }

        /*
         * Verify MIME type
         */
        $mime = '';

        if (function_exists('finfo_open')) {
            $finfo = finfo_open(FILEINFO_MIME_TYPE);

            if ($finfo) {
                $mime = finfo_file($finfo, $file['tmp_name']);
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
         * Read current research publication
         */
        $items = read_research($dataFile);

        if (count($items) === 0) {
            http_response_code(404);
            echo json_encode([
                'error' => 'No research publication exists yet.'
            ]);
            exit;
        }

        /*
         * Use the existing slug for the filename.
         */
        $slug = isset($items[0]['slug']) ? $items[0]['slug'] : 'research-paper';

        /*
         * Keep filename safe.
         */
        $slug = preg_replace('/[^a-zA-Z0-9_-]/', '-', $slug);
        $slug = trim($slug, '-');

        if ($slug === '') {
            $slug = 'research-paper';
        }

        $filename = $slug . '.pdf';
        $destination = $researchDir . '/' . $filename;

        /*
         * Create research directory if needed.
         */
        if (!is_dir($researchDir)) {
            if (!mkdir($researchDir, 0755, true)) {
                http_response_code(500);
                echo json_encode([
                    'error' => 'Could not create research directory.'
                ]);
                exit;
            }
        }

        /*
         * Move uploaded PDF.
         */
        if (!move_uploaded_file($file['tmp_name'], $destination)) {
            http_response_code(500);
            echo json_encode([
                'error' => 'Could not save the uploaded PDF.'
            ]);
            exit;
        }

        /*
         * Update PDF path automatically.
         */
        $items[0]['pdf'] = '/research/' . $filename;

        if (!save_research($dataFile, $items)) {
            http_response_code(500);
            echo json_encode([
                'error' => 'PDF uploaded, but research data could not be updated.'
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
     * Existing JSON metadata update
     */
    $input = json_decode(file_get_contents('php://input'), true);

    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode([
            'error' => 'Invalid research data.'
        ]);
        exit;
    }

    if (!save_research($dataFile, $input)) {
        http_response_code(500);
        echo json_encode([
            'error' => 'Could not save research publication.'
        ]);
        exit;
    }

    echo json_encode([
        'success' => true,
        'message' => 'Research publication saved.'
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