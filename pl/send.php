<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(403);
  exit;
}

if (!empty($_POST['website'])) {
  exit;
}

$formTime = intval($_POST['form_time'] ?? 0);
if ($formTime && (time() - $formTime < 3)) {
  exit;
}

function clean($value) {
  return htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
}

$name = clean($_POST['name'] ?? '');
$phone = clean($_POST['phone'] ?? '');
$email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$level = clean($_POST['level'] ?? '');
$messageNote = clean($_POST['message'] ?? '');

if (!$name || !$phone || !$email || !$level) {
  exit('Niepoprawne dane formularza.');
}

$to = 'teatrocontactwarsaw@gmail.com';
$subject = 'Nowy kontakt - Viva Polaco #' . date('YmdHis');
$message = "Nowy kontakt ze strony Viva Polaco:\n\n";
$message .= "ImiÄ™ i nazwisko: {$name}\n";
$message .= "Telefon: {$phone}\n";
$message .= "E-mail: {$email}\n";
$message .= "Poziom lub cel: {$level}\n\n";
$message .= "WiadomoĹ›Ä‡:\n" . ($messageNote ?: '- brak -') . "\n";

$headers = "From: Viva Polaco <no-reply@teatroidiomas.pl>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

mail($to, $subject, $message, $headers);

header('Location: kontakt.php?sent=1');
exit;

