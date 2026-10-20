<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');

function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function clean_string(mixed $value, int $maxLength): string
{
    if (!is_string($value)) {
        return '';
    }

    $value = trim(preg_replace('/[\x00-\x1F\x7F]/u', ' ', $value) ?? '');
    return mb_substr($value, 0, $maxLength);
}

function html(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function format_money(int $amount): string
{
    return number_format($amount, 0, ',', ' ') . ' kr';
}

function smtp_read($socket, array $expectedCodes): string
{
    $response = '';
    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (strlen($line) < 4 || $line[3] === ' ') {
            break;
        }
    }

    $code = (int) substr($response, 0, 3);
    if (!in_array($code, $expectedCodes, true)) {
        throw new RuntimeException('SMTP-fel: ' . trim($response));
    }

    return $response;
}

function smtp_write($socket, string $command, array $expectedCodes): string
{
    if (fwrite($socket, $command . "\r\n") === false) {
        throw new RuntimeException('Kunde inte skriva till SMTP-servern.');
    }
    return smtp_read($socket, $expectedCodes);
}

function encode_header(string $value): string
{
    return mb_encode_mimeheader($value, 'UTF-8', 'B', "\r\n");
}

function build_message(array $config, string $to, string $replyTo, string $subject, string $htmlBody, string $textBody, string $messageId): string
{
    $boundary = 'vass_' . bin2hex(random_bytes(12));
    $fromName = encode_header((string) $config['from_name']);
    $headers = [
        'Date: ' . date(DATE_RFC2822),
        'From: ' . $fromName . ' <' . $config['from_email'] . '>',
        'To: <' . $to . '>',
        'Reply-To: <' . $replyTo . '>',
        'Subject: ' . encode_header($subject),
        'Message-ID: <' . $messageId . '@vass-sliperi.se>',
        'MIME-Version: 1.0',
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
        'X-Mailer: VASS Booking',
    ];

    return implode("\r\n", $headers)
        . "\r\n\r\n--{$boundary}\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($textBody))
        . "\r\n--{$boundary}\r\n"
        . "Content-Type: text/html; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($htmlBody))
        . "\r\n--{$boundary}--\r\n";
}

function send_messages(array $config, array $messages): void
{
    $host = (string) $config['smtp_host'];
    $port = (int) $config['smtp_port'];
    $socket = stream_socket_client("tcp://{$host}:{$port}", $errorNumber, $errorMessage, 15, STREAM_CLIENT_CONNECT);
    if ($socket === false) {
        throw new RuntimeException("Kunde inte ansluta till SMTP: {$errorNumber} {$errorMessage}");
    }

    stream_set_timeout($socket, 15);
    try {
        smtp_read($socket, [220]);
        smtp_write($socket, 'EHLO vass-sliperi.se', [250]);
        smtp_write($socket, 'STARTTLS', [220]);
        if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            throw new RuntimeException('Kunde inte starta en krypterad SMTP-anslutning.');
        }
        smtp_write($socket, 'EHLO vass-sliperi.se', [250]);
        smtp_write($socket, 'AUTH LOGIN', [334]);
        smtp_write($socket, base64_encode((string) $config['smtp_username']), [334]);
        smtp_write($socket, base64_encode((string) $config['smtp_password']), [235]);

        foreach ($messages as $message) {
            smtp_write($socket, 'MAIL FROM:<' . $config['from_email'] . '>', [250]);
            smtp_write($socket, 'RCPT TO:<' . $message['to'] . '>', [250, 251]);
            smtp_write($socket, 'DATA', [354]);
            $data = preg_replace('/(?m)^\./', '..', $message['raw']) ?? $message['raw'];
            fwrite($socket, $data . "\r\n.\r\n");
            smtp_read($socket, [250]);
        }

        smtp_write($socket, 'QUIT', [221]);
    } finally {
        fclose($socket);
    }
}

function email_shell(string $eyebrow, string $title, string $intro, string $content, string $footer): string
{
    return '<!doctype html><html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>'
        . '<body style="margin:0;background:#f4f4f5;color:#18181b;font-family:Arial,Helvetica,sans-serif;">'
        . '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f5;padding:28px 12px;"><tr><td align="center">'
        . '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e4e4e7;">'
        . '<tr><td style="background:#18181b;padding:26px 32px;color:#ffffff;"><div style="font-size:26px;font-weight:800;letter-spacing:.12em;">VASS</div><div style="margin-top:5px;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#a1a1aa;">Sliperi &amp; knivservice</div></td></tr>'
        . '<tr><td style="padding:34px 32px 12px;"><div style="font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#71717a;">' . $eyebrow . '</div><h1 style="margin:10px 0 12px;font-size:28px;line-height:1.15;">' . $title . '</h1><p style="margin:0;color:#52525b;font-size:15px;line-height:1.65;">' . $intro . '</p></td></tr>'
        . '<tr><td style="padding:18px 32px 34px;">' . $content . '</td></tr>'
        . '<tr><td style="border-top:1px solid #e4e4e7;padding:22px 32px;color:#71717a;font-size:12px;line-height:1.6;">' . $footer . '</td></tr>'
        . '</table></td></tr></table></body></html>';
}

function detail_row(string $label, string $value): string
{
    return '<tr><td style="padding:9px 0;color:#71717a;font-size:13px;vertical-align:top;">' . html($label) . '</td><td align="right" style="padding:9px 0;color:#18181b;font-size:13px;font-weight:700;vertical-align:top;">' . html($value) . '</td></tr>';
}

// På Simply ligger filen i /api, och konfigurationen ligger på kontots rot, utanför alla publika mappar.
$configPath = dirname(__DIR__) . '/booking-config.php';
if (!is_file($configPath)) {
    $configPath = dirname(__DIR__, 2) . '/booking-config.php';
}
if (!is_file($configPath)) {
    error_log('VASS booking: konfigurationsfil saknas.');
    respond(503, ['ok' => false, 'message' => 'Bokningstjänsten konfigureras just nu. Försök igen senare.']);
}

$config = require $configPath;
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = $config['allowed_origins'] ?? [];
if (!is_string($origin) || !in_array($origin, $allowedOrigins, true)) {
    respond(403, ['ok' => false, 'message' => 'Otillåten begäran.']);
}

header('Access-Control-Allow-Origin: ' . $origin);
header('Vary: Origin');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Max-Age: 600');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST, OPTIONS');
    respond(405, ['ok' => false, 'message' => 'Metoden stöds inte.']);
}

$contentType = strtolower($_SERVER['CONTENT_TYPE'] ?? '');
if (!str_starts_with($contentType, 'application/json')) {
    respond(415, ['ok' => false, 'message' => 'Ogiltigt format.']);
}

$body = file_get_contents('php://input');
if ($body === false || strlen($body) > 30000) {
    respond(413, ['ok' => false, 'message' => 'Bokningen är för stor.']);
}
$payload = json_decode($body, true);
if (!is_array($payload)) {
    respond(400, ['ok' => false, 'message' => 'Bokningen kunde inte läsas.']);
}

// Ett dolt fält som vanliga besökare aldrig fyller i.
if (clean_string($payload['website'] ?? '', 100) !== '') {
    respond(200, ['ok' => true, 'bookingId' => 'VASS-' . date('ymd')]);
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/vass-booking-' . hash('sha256', $ip) . '.json';
$attempts = [];
if (is_file($rateFile)) {
    $attempts = json_decode((string) file_get_contents($rateFile), true) ?: [];
}
$cutoff = time() - 600;
$attempts = array_values(array_filter($attempts, static fn ($timestamp) => is_int($timestamp) && $timestamp >= $cutoff));
if (count($attempts) >= 5) {
    respond(429, ['ok' => false, 'message' => 'För många försök. Vänta en stund och försök igen.']);
}
$attempts[] = time();
file_put_contents($rateFile, json_encode($attempts), LOCK_EX);

$customerPayload = is_array($payload['customer'] ?? null) ? $payload['customer'] : [];
$customer = [
    'name' => clean_string($customerPayload['name'] ?? '', 100),
    'address' => clean_string($customerPayload['address'] ?? '', 180),
    'phone' => clean_string($customerPayload['phone'] ?? '', 40),
    'email' => strtolower(clean_string($customerPayload['email'] ?? '', 160)),
];
if ($customer['name'] === '' || $customer['address'] === '' || $customer['phone'] === '' || !filter_var($customer['email'], FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'message' => 'Kontrollera namn, adress, telefonnummer och e-postadress.']);
}

$services = [
    'grund-kniv' => ['label' => 'Grundslipning av kniv', 'price' => 99, 'discount' => true],
    'grund-sax' => ['label' => 'Grundslipning av sax', 'price' => 119, 'discount' => true],
    'brodkniv' => ['label' => 'Slipning av brödkniv', 'price' => 139, 'discount' => true],
    'spets' => ['label' => 'Reparation av spets', 'price' => 69, 'discount' => false],
    'hack' => ['label' => 'Reparation av hack', 'price' => 99, 'discount' => false],
    'latt-tunning' => ['label' => 'Lätt tunning', 'price' => 99, 'discount' => false],
    'storre-tunning' => ['label' => 'Större tunning', 'price' => 199, 'discount' => false],
];
$quantities = is_array($payload['quantities'] ?? null) ? $payload['quantities'] : [];
$selected = [];
$itemCount = 0;
$subtotal = 0;
$eligibleCount = 0;
$eligibleSubtotal = 0;
foreach ($services as $key => $service) {
    $quantity = filter_var($quantities[$key] ?? 0, FILTER_VALIDATE_INT, ['options' => ['min_range' => 0, 'max_range' => 20]]);
    if ($quantity === false) {
        respond(422, ['ok' => false, 'message' => 'Ett antal i bokningen är ogiltigt.']);
    }
    if ($quantity === 0) {
        continue;
    }
    $lineTotal = $service['price'] * $quantity;
    $selected[] = ['label' => $service['label'], 'quantity' => $quantity, 'unitPrice' => $service['price'], 'lineTotal' => $lineTotal];
    $itemCount += $quantity;
    $subtotal += $lineTotal;
    if ($service['discount']) {
        $eligibleCount += $quantity;
        $eligibleSubtotal += $lineTotal;
    }
}
if ($itemCount < 1 || $itemCount > 100) {
    respond(422, ['ok' => false, 'message' => 'Bokningen måste innehålla minst en tjänst.']);
}

$dropOff = clean_string($payload['dropOff'] ?? '', 20);
$returnMethod = clean_string($payload['returnMethod'] ?? '', 20);
$paymentMethod = clean_string($payload['paymentMethod'] ?? '', 20);
if (!in_array($dropOff, ['self', 'pickup'], true) || !in_array($returnMethod, ['self', 'delivery'], true) || !in_array($paymentMethod, ['cash', 'swish'], true) || ($payload['termsAccepted'] ?? false) !== true) {
    respond(422, ['ok' => false, 'message' => 'Bokningen saknar ett eller flera val.']);
}

$discount = $eligibleCount >= 4 ? (int) round($eligibleSubtotal * 0.15) : 0;
$pickupFee = $dropOff === 'pickup' && $itemCount < 3 ? 69 : 0;
$deliveryFee = $returnMethod === 'delivery' ? 69 : 0;
$total = $subtotal - $discount + $pickupFee + $deliveryFee;
$bookingId = 'VASS-' . date('ymd') . '-' . strtoupper(bin2hex(random_bytes(2)));
$dropOffLabel = $dropOff === 'pickup' ? ($pickupFee === 0 ? 'Fri upphämtning' : 'Upphämtning') : 'Lämnar själv';
$returnLabel = $returnMethod === 'delivery' ? 'Avlämning' : 'Hämtar själv';
$paymentLabel = $paymentMethod === 'swish' ? 'Swish när arbetet är klart' : 'Kontant när arbetet är klart';

$serviceRows = '';
$plainServices = [];
foreach ($selected as $service) {
    $serviceRows .= detail_row($service['quantity'] . ' × ' . $service['label'], format_money($service['lineTotal']));
    $plainServices[] = $service['quantity'] . ' × ' . $service['label'] . ' – ' . format_money($service['lineTotal']);
}
if ($discount > 0) {
    $serviceRows .= detail_row('Mängdrabatt 15 %', '−' . format_money($discount));
}
if ($dropOff === 'pickup') {
    $serviceRows .= detail_row($dropOffLabel, $pickupFee === 0 ? '0 kr' : format_money($pickupFee));
}
if ($returnMethod === 'delivery') {
    $serviceRows .= detail_row('Avlämning', format_money($deliveryFee));
}

$summaryTable = '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-top:1px solid #e4e4e7;border-bottom:1px solid #e4e4e7;">'
    . $serviceRows
    . '<tr><td style="padding:16px 0;font-size:15px;font-weight:800;">Totalt</td><td align="right" style="padding:16px 0;font-size:20px;font-weight:800;">' . html(format_money($total)) . '</td></tr></table>';

$customerContent = $summaryTable
    . '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:22px;border-collapse:collapse;">'
    . detail_row('Bokningsnummer', $bookingId)
    . detail_row('Inlämning', $dropOffLabel)
    . detail_row('Återlämning', $returnLabel)
    . detail_row('Betalning', $paymentLabel)
    . '</table>'
    . '<div style="margin-top:24px;padding:20px;background:#f4f4f5;border-radius:12px;color:#3f3f46;font-size:13px;line-height:1.7;"><strong style="color:#18181b;">Nästa steg</strong><br>'
    . ($dropOff === 'pickup'
        ? 'Jag kontaktar dig för att boka en tid för upphämtning.'
        : 'Lämna de säkert förpackade redskapen på Rapidgatan 38, 521 32 Falköping. Lägg med en lapp med ditt telefonnummer.')
    . '<br>Jag hör av mig när slipningen är klar.</div>';

$customerText = "Tack för din bokning hos VASS Sliperi!\n\nBokningsnummer: {$bookingId}\n\n"
    . implode("\n", $plainServices)
    . ($discount > 0 ? "\nMängdrabatt 15 %: -" . format_money($discount) : '')
    . "\nTotalt: " . format_money($total)
    . "\n\nInlämning: {$dropOffLabel}\nÅterlämning: {$returnLabel}\nBetalning: {$paymentLabel}\n\n"
    . ($dropOff === 'pickup' ? 'Jag kontaktar dig för att boka upphämtning.' : 'Lämna redskapen på Rapidgatan 38, 521 32 Falköping.')
    . "\nJag hör av mig när slipningen är klar.\n\nKontakt: kontakt@vass-sliperi.se | 072-974 33 79";

$businessContent = '<div style="padding:18px 20px;background:#18181b;border-radius:12px;color:#ffffff;">'
    . '<div style="font-size:11px;text-transform:uppercase;letter-spacing:.16em;color:#a1a1aa;">Kund</div>'
    . '<div style="margin-top:8px;font-size:18px;font-weight:800;">' . html($customer['name']) . '</div>'
    . '<div style="margin-top:7px;font-size:13px;line-height:1.7;color:#d4d4d8;">' . html($customer['address']) . '<br>' . html($customer['phone']) . '<br><a style="color:#ffffff;" href="mailto:' . html($customer['email']) . '">' . html($customer['email']) . '</a></div></div>'
    . '<div style="margin-top:22px;">' . $summaryTable . '</div>'
    . '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:22px;border-collapse:collapse;">'
    . detail_row('Bokningsnummer', $bookingId)
    . detail_row('Inlämning', $dropOffLabel)
    . detail_row('Återlämning', $returnLabel)
    . detail_row('Betalning', $paymentLabel)
    . '</table>';

$businessText = "NY BOKNING {$bookingId}\n\nKund: {$customer['name']}\nAdress: {$customer['address']}\nTelefon: {$customer['phone']}\nE-post: {$customer['email']}\n\n"
    . implode("\n", $plainServices)
    . "\nTotalt: " . format_money($total)
    . "\n\nInlämning: {$dropOffLabel}\nÅterlämning: {$returnLabel}\nBetalning: {$paymentLabel}";

$footer = 'VASS Sliperi &amp; Knivservice · Rapidgatan 38, 521 32 Falköping<br>072-974 33 79 · kontakt@vass-sliperi.se';
$customerHtml = email_shell('Bokningsbekräftelse', 'Tack ' . html($customer['name']) . '!', 'Din bokning är registrerad. Ingen betalning har gjorts nu.', $customerContent, $footer);
$businessHtml = email_shell('Ny bokning', $bookingId, 'En ny bokning har kommit in via vass-sliperi.se.', $businessContent, $footer);

try {
    $messages = [
        [
            'to' => $customer['email'],
            'raw' => build_message($config, $customer['email'], (string) $config['from_email'], 'Bokningsbekräftelse ' . $bookingId, $customerHtml, $customerText, strtolower($bookingId) . '-kund'),
        ],
        [
            'to' => (string) $config['business_email'],
            'raw' => build_message($config, (string) $config['business_email'], $customer['email'], 'Ny bokning ' . $bookingId . ' – ' . $customer['name'], $businessHtml, $businessText, strtolower($bookingId) . '-foretag'),
        ],
    ];
    send_messages($config, $messages);
} catch (Throwable $exception) {
    error_log('VASS booking mail error: ' . $exception->getMessage());
    respond(502, ['ok' => false, 'message' => 'Bokningen kunde inte skickas just nu. Försök igen eller kontakta mig på 072-974 33 79.']);
}

respond(201, ['ok' => true, 'bookingId' => $bookingId]);
