<?php

namespace core\Controllers;

use core\dao\DaoLogin;
use core\model\Functions;
use core\model\UserModel;

class LoginController
{
    public function login()
    {
        if (Functions::sessaoIniciada()) {
            Functions::redirecionar("index.php");
            return;
        }

        $valores= [
            'sessaoIniciada' => Functions::sessaoIniciada(),
        ];
        Functions::layout(["header", "../login", "footer"], $valores);
    }
    public function validate_login()
    {
        if (Functions::sessaoIniciada()) {
            echo json_encode(['session' => true]);
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return;
        }
        if ((!isset($_POST['emailLogin']) || trim($_POST['emailLogin']) == "") || (!isset($_POST['passLogin']) || trim($_POST['passLogin']) == "")) {
            return;
        }
        if (!filter_var($_POST['emailLogin'], FILTER_VALIDATE_EMAIL)) {
            return;
        }

        $userModel = new UserModel();
        $daoUser = new DaoLogin();
        $userModel->setEmail($_POST['emailLogin']);
        $userModel->setPass($_POST['passLogin']);
        $ResultadoLogin = $daoUser->login($userModel);
        if ($ResultadoLogin[0]['statusResponse'] == true) {
            $_SESSION['user'] = $ResultadoLogin[1];
        }
        echo json_encode($ResultadoLogin);
        return;
    }
}
