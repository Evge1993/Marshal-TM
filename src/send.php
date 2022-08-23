<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// Файлы PHPMailer
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

$mail = new PHPMailer(true);

try {

    $mail->isSMTP();
    $mail->Host       = 'smtp.mail.com';
    $mail->SMTPAuth   = true;                    
    $mail->Username   = 'zapasnaya_pochta_95'; 
    $mail->Password   = 'rf0Jgf2wvwJeBCzcKFNs';
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;

    $mail->CharSet = 'UTF-8';
    $mail->setFrom('zapasnaya_pochta_95@mail.ru', 'Сообщение с сайта');
    $mail->addAddress('kompaniya.metiznaya@mail.ru');

    $mail->isHTML(true);
    $mail->Subject = 'Сообщение с сайта';
    $body = '<h2>Сообщение с сайта</h2>';

    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }

    if(trim(!empty($_POST['email']))){
        $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
    }

    if(trim(!empty($_POST['phone']))){
        $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
    }

    if(trim(!empty($_POST['message']))){
        $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
    }

    $mail->Body = $body;  

    $mail->send();
    echo 'Сообщение отправлено';
} catch (Exception $e) {
    echo "Ошибка: {$mail->ErrorInfo}";
}
?>