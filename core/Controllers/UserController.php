<?php

namespace core\Controllers;

use core\dao\DaoUser;
use core\model\Functions;
use core\model\SendEmail;
use core\model\UserModel;

class UserController
{
    public function userOptions()
    {
        if (!Functions::sessaoIniciada()) {
            Functions::redirecionar("index.php?a=login");
            return;
        }

        $valores = [
            'sessaoIniciada' => Functions::sessaoIniciada(),
        ];

        Functions::layout(["header", "../user_options", "footer"], $valores);
    }
    public function getUserDetails()
    {
        if (!Functions::sessaoIniciada()) {
            echo json_encode(['session' => false]);
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return;
        }
        $UserModel = new UserModel();
        $daoUser = new DaoUser();
        $UserModel->setEmail($_SESSION['user']->email);
        $resultado = $daoUser->getUserDetails($UserModel);
        echo json_encode($resultado);
    }
    public function updateUserDetails()
    {
        if (!Functions::sessaoIniciada()) {
            echo json_encode(['session' => false]);
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            session_destroy();
            return;
        }


        if ((!isset($_POST['nameUserUpdate']) || trim($_POST['nameUserUpdate']) == "") || (!isset($_POST['emailUserUpdate']) || trim($_POST['emailUserUpdate']) == "")) {
            return;
        }
        if (!filter_var($_POST['emailUserUpdate'], FILTER_VALIDATE_EMAIL)) {
            return;
        }
        // verifica se email da sessao do user é correto
        $UserModel = new UserModel();
        $daoUser = new DaoUser();
        $UserModel->setEmail($_SESSION['user']->email);
        $resultado = $daoUser->getUserDetails($UserModel);
        $userDetails = $resultado[1];

        if ($resultado[0]['statusResponse'] != 1) {
            return;
        }

        if ($userDetails->nome == trim($_POST['nameUserUpdate']) && $userDetails->email == trim($_POST['emailUserUpdate'])) {
            echo json_encode(['status' => 'Nenhuma alteracao efetuada']);
            return;
        }
        //verifica se já existe email
        $UserModel->setEmail(trim($_POST['emailUserUpdate']));
        $resultadoEmailExiste = $daoUser->getUserDetails($UserModel);
        if ($resultadoEmailExiste[0]['statusResponse'] == 1 && trim($_POST['emailUserUpdate']) != $_SESSION['user']->email) {
            echo json_encode(['status' => 'Email existe']);
            return;
        }
        $UserModel->setEmail(trim($_POST['emailUserUpdate']));
        $UserModel->setNome(trim($_POST['nameUserUpdate']));
        $UserModel->setIdUuser($_SESSION['user']->id_user);
        $updateResult = $daoUser->updateUser($UserModel);
        if ($updateResult == 0 || $updateResult == false) {
            echo json_encode(['status' => 'Erro na alteraçao']);
            return;
        }

        echo json_encode(['status' => 'alteracao efetuada']);
        session_destroy();
    }
    public function updateUserPass()
    {
        if (!Functions::sessaoIniciada()) {
            echo json_encode(['session' => false]);
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            session_destroy();
            return;
        }
        if ((!isset($_POST['passAtualUserUpdate']) || trim($_POST['passAtualUserUpdate']) == "") || (!isset($_POST['passUserUpdate']) || trim($_POST['passUserUpdate']) == "") || (!isset($_POST['confirmPassUserUpdate']) || trim($_POST['confirmPassUserUpdate']) == "")) {
            return;
        }
        $pattern = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/';
        $passUserUpdate = trim($_POST['passUserUpdate']);

        if (preg_match($pattern, $passUserUpdate) == false) {
            return;
        }
        if ($passUserUpdate != $_POST['confirmPassUserUpdate']) {
            return;
        }

        $UserModel = new UserModel();
        $daoUser = new DaoUser();
        $UserModel->setEmail($_SESSION['user']->email);
        $UserModel->setIdUuser($_SESSION['user']->id_user);
        $resultado = $daoUser->confirmPass($UserModel);
        if ($resultado[0]['statusResponse'] != 1) {
            return;
        }
        if (!password_verify($_POST['passAtualUserUpdate'], $resultado[1]->pass)) {
            echo json_encode(['status' => 'Pass atual errada']);
            return;
        }
        if (password_verify($_POST['passUserUpdate'], $resultado[1]->pass)) {
            echo json_encode(['status' => 'Pass atual e nova iguais']);
            return;
        }
        $UserModel2 = new UserModel();
        $UserModel2->setEmail($_SESSION['user']->email);
        $UserModel2->setIdUuser($_SESSION['user']->id_user);
        $UserModel2->setPass(password_hash($_POST['passUserUpdate'], PASSWORD_DEFAULT));
        $resultado = $daoUser->updatePass($UserModel2);
        if ($resultado == 0 || $resultado == false) {
            echo json_encode(['status' => 'Erro na alteraçao da pass']);
            return;
        }
        echo json_encode(['status' => 'Alteracao efetuada']);
        session_destroy();
    }

    public function setLogout()
    {
        if (!Functions::sessaoIniciada()) {
            echo json_encode(['session' => false]);
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            session_destroy();
            return;
        }
        session_destroy();
    }

    public function sendEmailRecoveryPass()
    {
        if (Functions::sessaoIniciada()) {
            echo json_encode(['session' => true]);
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return;
        }
        if(!isset($_POST['emailRecovey']) && strlen(trim($_POST['emailRecovey'])) == 0){
            return;
        }
        if (!filter_var($_POST['emailRecovey'], FILTER_VALIDATE_EMAIL)) {
            return;
        }
        $UserModel = new UserModel();
        $daoUser = new DaoUser();
        $UserModel->setEmail(filter_input(INPUT_POST, 'emailRecovey', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
        $resultado = $daoUser->getUserDetails($UserModel);
        if($resultado[0]['statusResponse']!==1){
            echo json_encode(['status'=>'Mail nao existe']);
            return;
        }
        $sendEmail = new SendEmail();
        $UserModel->setNome($resultado[1]->nome);
        $UserModel->setIdUuser($resultado[1]->id_user);
        $UserModel->setPurl(Functions::pearl());
        //$resultadoSendEmail = $sendEmail->sendEmail($UserModel);
        //if($resultadoSendEmail !== 1){
        //    echo json_encode(['status'=>$resultadoSendEmail]);
        //    return;
        // }
        $daoUser->updatePurlUser($UserModel);
        echo json_encode(['status'=>'Mail enviado']);

    }
    public function passRecover(){
        echo 'aqui';
    }
}
