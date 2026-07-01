<?php

declare(strict_types=1);

/**
 * Endpoint de contato — recebe o POST do formulário (JSON) e envia um e-mail
 * pela API do Resend. Servido estaticamente junto do site (Apache + PHP).
 *
 * Os segredos (RESEND_API_KEY / CONTACT_TO / CONTACT_FROM) vêm do ambiente ou
 * de um config.php local que NÃO é commitado. Ver config.example.php.
 */

header('Content-Type: application/json; charset=utf-8');

// Só aceita POST.
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo json_encode(['ok' => false, 'error' => 'method']);
    exit;
}

// Corpo JSON.
$data = json_decode(file_get_contents('php://input') ?: '', true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid']);
    exit;
}

// Honeypot: bots preenchem o campo oculto. Fingimos sucesso e não enviamos.
if (!empty($data['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

// Normaliza entradas.
$name    = trim((string) ($data['name'] ?? ''));
$email   = trim((string) ($data['email'] ?? ''));
$phone   = trim((string) ($data['phone'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));

// Validação no servidor (espelha o cliente — que é burlável).
$errors = [];
if (mb_strlen($name) < 2) {
    $errors[] = 'name';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'email';
}
if (!preg_match('/^(\+244\s?)?[29]\d{2}\s?\d{3}\s?\d{3}$/', $phone)) {
    $errors[] = 'phone';
}
$messageLength = mb_strlen($message);
if ($messageLength < 10 || $messageLength > 300) {
    $errors[] = 'message';
}
if ($errors) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'validation', 'fields' => $errors]);
    exit;
}

// Config / segredos: ambiente primeiro, config.php (não commitado) como fallback.
$cfg = [
    'RESEND_API_KEY' => getenv('RESEND_API_KEY') ?: '',
    'CONTACT_TO'     => getenv('CONTACT_TO') ?: '',
    'CONTACT_FROM'   => getenv('CONTACT_FROM') ?: '',
];
$cfgFile = __DIR__ . '/config.php';
if (is_file($cfgFile)) {
    $local = require $cfgFile;
    if (is_array($local)) {
        foreach ($cfg as $key => $value) {
            if ($value === '' && !empty($local[$key])) {
                $cfg[$key] = (string) $local[$key];
            }
        }
    }
}
if ($cfg['RESEND_API_KEY'] === '' || $cfg['CONTACT_TO'] === '' || $cfg['CONTACT_FROM'] === '') {
    error_log('contact.php: configuração ausente (RESEND_API_KEY / CONTACT_TO / CONTACT_FROM).');
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'config']);
    exit;
}

// Monta o e-mail — escape feito UMA vez, aqui no servidor.
$safeName    = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safeEmail   = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$safePhone   = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

$html = <<<HTML
<!doctype html>
<html lang="pt">
<body style="margin:0;">
<div style="background:#ece8e1;padding:40px 16px;font-family:'Inter',-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;">
    <tr><td style="padding:0 0 18px 0;">
      <span style="font-size:13px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#9a7b5a;">Alpi constrói</span>
    </td></tr>
    <tr><td style="background:#fff;border:1px solid #e2dcd1;border-radius:18px;">
      <div style="padding:34px 36px 26px;border-bottom:1px solid #efeae1;">
        <h1 style="margin:0;font-size:20px;font-weight:700;color:#2a241d;">Novo contato pelo site</h1>
        <p style="margin:4px 0 0;font-size:13px;color:#8a8378;">Recebido pelo formulário</p>
      </div>
      <table role="presentation" width="100%" style="padding:10px 36px;">
        <tr><td style="padding:14px 36px;border-bottom:1px solid #f3efe7;">
          <div style="font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#a59c8d;margin-bottom:5px;">Nome</div>
          <div style="font-size:15px;font-weight:500;color:#2a241d;">{$safeName}</div>
        </td></tr>
        <tr><td style="padding:14px 36px;border-bottom:1px solid #f3efe7;">
          <div style="font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#a59c8d;margin-bottom:5px;">Email</div>
          <div style="font-size:15px;font-weight:500;color:#2a241d;">{$safeEmail}</div>
        </td></tr>
        <tr><td style="padding:14px 36px;border-bottom:1px solid #f3efe7;">
          <div style="font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#a59c8d;margin-bottom:5px;">Telefone</div>
          <div style="font-size:15px;font-weight:500;color:#2a241d;">{$safePhone}</div>
        </td></tr>
      </table>
      <div style="padding:18px 36px 34px;">
        <div style="font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#a59c8d;margin-bottom:10px;">Mensagem</div>
        <div style="background:#f7f4ee;border:1px solid #ece6db;border-radius:12px;padding:18px 20px;font-size:15px;line-height:1.6;color:#3a342b;">{$safeMessage}</div>
        <a href="mailto:{$safeEmail}" style="display:inline-block;margin-top:22px;background:#2a241d;color:#fff;text-decoration:none;font-size:14px;font-weight:600;padding:13px 22px;border-radius:10px;">Responder ao contato →</a>
      </div>
    </td></tr>
  </table>
</div>
</body>
</html>
HTML;

$text = "Novo contato pelo site\n\n"
    . "Nome: {$name}\n"
    . "E-mail: {$email}\n"
    . "Telefone: {$phone}\n\n"
    . "Mensagem:\n{$message}\n";

$payload = json_encode([
    'from'     => $cfg['CONTACT_FROM'],
    'to'       => [$cfg['CONTACT_TO']],
    'reply_to' => $email,
    'subject'  => 'Novo contato do site — ' . $name,
    'html'     => $html,
    'text'     => $text,
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

// Envia via Resend (REST API).
$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer ' . $cfg['RESEND_API_KEY'],
        'Content-Type: application/json',
    ],
]);
$response = curl_exec($ch);
$status   = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
$curlErr  = curl_error($ch);
curl_close($ch);

// Sucesso só com 2xx. Erros são logados internamente; nunca expõem a chave.
if ($response === false || $status < 200 || $status >= 300) {
    error_log('contact.php: falha no envio Resend (HTTP ' . $status . '): ' . ($curlErr !== '' ? $curlErr : (string) $response));
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'send']);
    exit;
}

echo json_encode(['ok' => true]);
