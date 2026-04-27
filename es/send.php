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
  exit('Datos del formulario no válidos.');
}

$to = 'teatrocontactwarsaw@gmail.com';
$subject = 'Nuevo contacto - Viva Polaco #' . date('YmdHis');
$message = "Nuevo contacto desde Viva Polaco:\n\n";
$message .= "Nombre: {$name}\n";
$message .= "Teléfono: {$phone}\n";
$message .= "Correo: {$email}\n";
$message .= "Nivel u objetivo: {$level}\n\n";
$message .= "Mensaje:\n" . ($messageNote ?: '- sin mensaje -') . "\n";

$headers = "From: Viva Polaco <no-reply@teatroidiomas.pl>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

mail($to, $subject, $message, $headers);

header('Location: contact.php?sent=1');
exit;
