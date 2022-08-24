<?php

namespace core\model;



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
   
}
