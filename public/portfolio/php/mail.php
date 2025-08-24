<?php
$subject    = 'Portfolio message'; // Subject of your email
$to         = 'nathan@modron.com'; //Your e-mail address
$headers    = 'MIME-Version: 1.0' . "\r\n" .
              'Content-type: text/html; charset=iso-8859-1' . "\r\n" .
              'From: portfolio@modron.com' . "\r\n" .
              'Reply-To: portfolio@modron.com' . "\r\n" .
              'X-Mailer: PHP/' . phpversion();


$message    = 'Name: ' . $_POST['name'] . ' <br/>' .
              'E-mail: ' . $_POST['email'] . ' <br/>' .
              'Phone: ' . $_POST['phone'] . ' <br/>' .
              'Website: ' . $_POST['website'] . ' <br/>' .
              'Message: ' . $_POST['message'];

if (@mail($to, $subject, $message, $headers))
{
  echo 'sent';
}
else
{
  echo 'failed';
}
?>
