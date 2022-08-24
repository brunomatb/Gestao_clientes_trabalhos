<?php

namespace core\model;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class SendEmail
{
    public function sendEmail(UserModel $userModel)
    {
   
        require '../vendor/autoload.php';
        $mail = new PHPMailer(TRUE);
        $rota = URL_BASE. "index.php?a=passRecover&purl=" . $userModel->getPurl();
        $resultado = "";

        try {
            //Server settings
            $mail->SMTPDebug  = 0;
            $mail->isSMTP();
            $mail->Host       = 'smtp.office365.com';
            //port
            $mail->SMTPAuth   = true;
            $mail->CharSet    = 'UTF-8';
            $mail->Username   = EMAIL_WEBMASTER;
            $mail->Password   = PASS_WEB_MASTER;
            $mail->Port       = 995;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            //Recipients
            $mail->setFrom(EMAIL_WEBMASTER, APP_NAME);
            $mail->addAddress($userModel->getEmail());     //Add a recipient

            //Attachments
            // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
            // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = 'Réinitialiser le mot de passe';
            $html = '<p>Bonjour <b>'.$userModel->getNome().'</b></p>';
            $html .= '<p>Pour réinitialiser votre mot de passe, cliquez sur le lien ci-dessous.</p>';
            $html .= '<a href="' . $rota . '">Confirmar email</a>';
            $html .= "<p>Merci<br><br>Meilleures salutations<br><b>l'administrateur</b></p>";
            $mail->Body = $html;
            $mail->send();
           
            $resultado = 1;
        } catch (Exception $e) {
            $resultado = $e->getMessage();
         
        }
        return $resultado;

    }
}
