<?php

namespace core\model;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class Functions
{

    // função para efetuar include do layout header, pagina e footer
    public static function layout($htmlLayout, $data = null)
    {
        if (is_array($data) && !empty($data)) {
            extract($data);
        }
        if (is_array($htmlLayout)) {

            foreach ($htmlLayout as $htmlLayouts) {
                include_once('../core/views/layout/' . $htmlLayouts . '.php');
            }
        }
    }
    // verifica se existe sessão, se exister devolve a sessao cliente
    public static function sessaoIniciada()
    {
        return isset($_SESSION['user']);
    }

    // retorna um JSON com informação com resulta ok da query
    public static function ResultQuery($resultado)
    {
        $resultados = ['statusResponse' => $resultado];
        return $resultados;
    }

    public static function decodeIDSession()
    {
        if (!isset($_SESSION['cliente'])) {
            return;
        }
        $decode = base64_decode(($_SESSION['cliente']['id_user']));
        $idDecode = substr($decode, 16, strlen($decode));
        return $idDecode;
    }


    public static function decodeB64($valor)
    {
        if (!isset($valor)) {
            return;
        }
        $decode64 = base64_decode($valor);

        return substr($decode64, 16, strlen($decode64));
    }

    public static function pearl()
    {
        $pearl = "0123456789abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWYZ0123456789abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWYZ0123456789";
        return substr(str_shuffle($pearl), 0, 16);
    }
    public static function encodeId64($id)
    {
        if (!isset($id)) {
            return;
        }
        return base64_encode(Functions::pearl() . $id);
    }

    public static function redirecionar($rota)
    {
        header('Location:' . $rota);
    }

    public static function sessao()
    {

        if (isset($_SESSION['cliente'])) {
            return $_SESSION['cliente'];
        } else {
            functions::redirecionar("index.php");
            return;
        }
    }
    public static function enviarPearl($emailTo, $purl)
    {
        require '../vendor/autoload.php';
        $mail = new PHPMailer(TRUE);
        $rota = "http://localhost/gestaoclientes/public/?a=confirmar_conta&purl=" . $purl;

        try {
            //Server settings

            $mail->SMTPDebug = SMTP::DEBUG_OFF;
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com';
            $mail->SMTPAuth   = true;
            $mail->CharSet    = 'UTF-8';
            $mail->Username   = EMAIL_WEBMASTER;
            $mail->Password   = PASS_WEB_MASTER;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = 587;

            //Recipients
            $mail->setFrom(EMAIL_WEBMASTER, APP_NAME);
            $mail->addAddress($emailTo);     //Add a recipient

            //Attachments
            // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
            // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = 'Bem-vindo à Comunidade RPA';
            $html = '<p>Obrigado pelo seu registo, para confirmar a sua ativação clique no link abaixo.</p>';
            $html .= '<a href="' . $rota . '">Confirmar email</a>';
            $mail->Body = $html;
            $mail->send();
            echo 1;
        } catch (Exception $e) {
            echo "Mensagem nao enviada, erro: {$mail->ErrorInfo}";
        }
    }
}
