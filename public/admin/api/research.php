<?php

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$dataFile = dirname(dirname(__DIR__)) . '/data/research.json';

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
|--------------------------------------------------------------------------
| GET
|--------------------------------------------------------------------------
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
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
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

        if (
            isset($item['slug']) &&
            $item['slug'] === $slug
        ) {
            $found = true;
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
|--------------------------------------------------------------------------
| POST
|--------------------------------------------------------------------------
*/

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

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
    |--------------------------------------------------------------------------
    | Backward compatibility for full-array saves
    |--------------------------------------------------------------------------
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
    |--------------------------------------------------------------------------
    | Validate basic publication information
    |--------------------------------------------------------------------------
    */

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

    $description = isset($input['description'])
        ? trim($input['description'])
        : '';

    $slug = isset($input['slug'])
        ? trim($input['slug'])
        : '';

    if ($slug === '') {
        $slug = slugify_research($title);
    }

    /*
    |--------------------------------------------------------------------------
    | Normalise sections
    |--------------------------------------------------------------------------
    */

    $sections = [];

    if (
        isset($input['sections']) &&
        is_array($input['sections'])
    ) {

        foreach ($input['sections'] as $section) {

            if (!is_array($section)) {
                continue;
            }

            $heading = isset($section['heading'])
                ? trim($section['heading'])
                : '';

            $paragraphs = [];

            if (
                isset($section['paragraphs']) &&
                is_array($section['paragraphs'])
            ) {

                foreach ($section['paragraphs'] as $paragraph) {

                    $paragraph = trim((string) $paragraph);

                    if ($paragraph !== '') {
                        $paragraphs[] = $paragraph;
                    }
                }
            }

            if ($heading !== '' || count($paragraphs) > 0) {

                $sections[] = [
                    'heading' => $heading,
                    'paragraphs' => $paragraphs
                ];
            }
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Normalise references
    |--------------------------------------------------------------------------
    */

    $references = [];

    if (
        isset($input['references']) &&
        is_array($input['references'])
    ) {

        foreach ($input['references'] as $reference) {

            if (!is_array($reference)) {
                continue;
            }

            $referenceTitle = isset($reference['title'])
                ? trim($reference['title'])
                : '';

            $source = isset($reference['source'])
                ? trim($reference['source'])
                : '';

            $year = isset($reference['year'])
                ? trim((string) $reference['year'])
                : '';

            if (
                $referenceTitle !== '' ||
                $source !== '' ||
                $year !== ''
            ) {

                $references[] = [
                    'title' => $referenceTitle,
                    'source' => $source,
                    'year' => $year
                ];
            }
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Build clean publication object
    |--------------------------------------------------------------------------
    */

    $publication = [
        'slug' => $slug,
        'title' => $title,
        'shortTitle' => isset($input['shortTitle'])
            ? trim($input['shortTitle'])
            : '',
        'description' => $description,
        'series' => isset($input['series'])
            ? trim($input['series'])
            : 'Research',
        'category' => isset($input['category'])
            ? trim($input['category'])
            : 'Research Article',
        'author' => isset($input['author'])
            ? trim($input['author'])
            : '',
        'publishedDate' => isset($input['publishedDate'])
            ? trim($input['publishedDate'])
            : date('Y-m-d'),
        'featured' => !empty($input['featured']),
        'sections' => $sections,
        'researchNote' => isset($input['researchNote'])
            ? trim($input['researchNote'])
            : '',
        'references' => $references
    ];

    /*
    |--------------------------------------------------------------------------
    | Find existing publication
    |--------------------------------------------------------------------------
    */

    $items = read_research($dataFile);

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

    /*
    |--------------------------------------------------------------------------
    | Update existing publication
    |--------------------------------------------------------------------------
    */

    if ($existingIndex >= 0) {

        $items[$existingIndex] = $publication;

        $message = 'Research publication updated.';

    } else {

        /*
        |--------------------------------------------------------------------------
        | Prevent slug collisions
        |--------------------------------------------------------------------------
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

        $publication['slug'] = $slug;

        $items[] = $publication;

        $message = 'Research publication created.';
    }

    /*
    |--------------------------------------------------------------------------
    | Save
    |--------------------------------------------------------------------------
    */

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
        'article' => $publication
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Unsupported method
|--------------------------------------------------------------------------
*/

http_response_code(405);

echo json_encode([
    'error' => 'Method not allowed.'
]);
