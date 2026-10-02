<?php
// Обработчик форм заявки (Hero и Final CTA).
// - Серверная валидация, honeypot, защита от слишком быстрой отправки, rate limit по IP.
// - Получатель берётся из send-config.php рядом с этим файлом. Этот файл создаётся ТОЛЬКО на сервере
//   (шаблон: scripts/send-config.example.php), в git и в dist/ его нет.
// - Успех возвращается только если письмо реально передано почтовой системе — никакого «фейкового» успеха.
declare(strict_types=1);

const RATE_LIMIT = 5;          // заявок
const RATE_WINDOW = 600;       // за 10 минут с одного IP
const MIN_FILL_SECONDS = 3;    // быстрее — скорее всего бот

$wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');

function respond(int $status, bool $ok, string $message, array $errors = []): never {
    global $wantsJson;
    http_response_code($status);
    header('X-Robots-Tag: noindex, nofollow');
    header('Cache-Control: no-store');
    if ($wantsJson) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'message' => $message, 'errors' => (object) $errors], JSON_UNESCAPED_UNICODE);
        exit;
    }
    header('Content-Type: text/html; charset=utf-8');
    $title = $ok ? 'Thank you' : 'Request not sent';
    $list = '';
    foreach ($errors as $e) {
        $list .= '<li>' . htmlspecialchars($e) . '</li>';
    }
    echo '<!doctype html><html lang="en-CA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
        . '<meta name="robots" content="noindex"><title>' . $title . ' | Mold Removal Oakville</title>'
        . '<style>body{font-family:system-ui,sans-serif;background:#faf7f1;color:#2e2a26;display:grid;place-items:center;min-height:100vh;margin:0;padding:24px}'
        . 'main{max-width:520px;background:#fff;border-radius:28px;padding:40px;box-shadow:0 18px 50px -28px rgba(46,42,38,.3)}'
        . 'a{color:#9a5235;font-weight:600}</style></head><body><main>'
        . '<h1>' . $title . '</h1><p>' . htmlspecialchars($message) . '</p>' . ($list ? "<ul>$list</ul>" : '')
        . '<p><a href="/">Back to the website</a></p></main></body></html>';
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'Please use the form on the website.');
}

// --- anti-spam ---
if (trim((string) ($_POST['website'] ?? '')) !== '') {
    respond(400, false, 'Your request could not be accepted.');
}
$ts = (int) ($_POST['ts'] ?? 0);
if ($ts > 0 && (time() - intdiv($ts, 1000)) < MIN_FILL_SECONDS) {
    respond(429, false, 'That was very fast — please wait a moment and send the form again.');
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/moldremoval-rate-' . sha1($ip);
$now = time();
$hits = [];
if (is_file($rateFile)) {
    $hits = array_filter(
        array_map('intval', explode(',', (string) file_get_contents($rateFile))),
        fn ($t) => $t > $now - RATE_WINDOW
    );
}
if (count($hits) >= RATE_LIMIT) {
    respond(429, false, 'Too many requests from your connection. Please try again in a few minutes or call us.');
}

// --- validation (same rules as the browser) ---
$clean = fn (string $k, int $max) => mb_substr(trim(str_replace(["\r", "\0"], '', (string) ($_POST[$k] ?? ''))), 0, $max);
$name = preg_replace('/\s+/', ' ', $clean('name', 100));
$phone = $clean('phone', 30);
$email = $clean('email', 150);
$property = $clean('property_type', 60);
$message = $clean('message', 2000);
$formId = in_array($_POST['form_id'] ?? '', ['hero', 'final'], true) ? $_POST['form_id'] : 'unknown';

$errors = [];
if (mb_strlen($name) < 2) $errors['name'] = 'Please enter your name.';
$digits = strlen(preg_replace('/\D/', '', $phone));
if ($digits < 10 || $digits > 15) $errors['phone'] = 'Please enter a valid phone number, including area code.';
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Please enter a valid email address or leave it blank.';
if ($property === '') $errors['property_type'] = 'Please choose a property type.';
if (mb_strlen($message) < 5) $errors['message'] = 'Please describe briefly what you are seeing.';
if ($errors) {
    respond(422, false, 'Please check the highlighted fields.', $errors);
}

// --- delivery ---
$configFile = __DIR__ . '/send-config.php';
$config = is_file($configFile) ? require $configFile : null;
if (!is_array($config) || empty($config['to'])) {
    respond(503, false, 'Online requests are temporarily unavailable. Please call us instead.');
}

$subject = 'New estimate request — ' . str_replace("\n", ' ', $name);
$body = "New request from moldremovaloakville.ca ($formId form)\n\n"
    . "Name: $name\nPhone: $phone\nEmail: " . ($email ?: '—') . "\nProperty type: $property\n\n"
    . "Message:\n$message\n\n---\nIP: $ip\nTime: " . date('Y-m-d H:i:s T') . "\n";
$from = $config['from'] ?? 'no-reply@moldremovaloakville.ca';
$headers = [
    'From' => 'Mold Removal Oakville <' . $from . '>',
    'Content-Type' => 'text/plain; charset=UTF-8',
];
if ($email !== '') $headers['Reply-To'] = $email;

$sent = mail((string) $config['to'], '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers, '-f' . $from);
if (!$sent) {
    respond(502, false, 'Sorry, your request could not be sent right now. Please try again or call us.');
}

$hits[] = $now;
@file_put_contents($rateFile, implode(',', $hits), LOCK_EX);
respond(200, true, 'Thank you — your request has been sent. We will contact you shortly.');
