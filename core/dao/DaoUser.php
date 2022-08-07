<?php

namespace core\dao;

use core\model\DaoCrudModel;
use core\model\Functions;
use core\model\UserModel;

class DaoUser
{
    public function getUserDetails(UserModel $userModel)
    {
        $daoCrud = new DaoCrudModel();
        $parametros = [':email' => $userModel->getEmail()];
        $resultado = $daoCrud->select("SELECT id_user, email, nome, foto_User, ativo, data_criacao_user, data_atualizacao_user FROM users where email = :email and ativo = 1", $parametros);
        array_unshift($resultado, Functions::ResultQuery(count($resultado)));
        return $resultado;
    }
    public function updateUser(UserModel $userModel)
    {
        $daoCrud = new DaoCrudModel();
        $parametros = [
            ':email' => $userModel->getEmail(),
            ':nome' => $userModel->getNome(),
            ':idUser' => $userModel->getIdUuser()
        ];
        $resultado = $daoCrud->update("UPDATE users SET nome = :nome, email = :email  where id_user = :idUser and ativo = 1", $parametros);
        return $resultado;
    }
    public function confirmPass(UserModel $userModel)
    {
        $parametros = [
            ':email' => $userModel->getEmail(),
            ':idUser' => $userModel->getIdUuser()
        ];
        $daoCrud = new DaoCrudModel();
        $resultado = $daoCrud->select("SELECT pass FROM users where email = :email and id_user = :idUser and ativo = 1", $parametros);
        array_unshift($resultado, Functions::ResultQuery(count($resultado)));
        return $resultado;
    }
    public function updatePass(UserModel $userModel){
        $daoCrud = new DaoCrudModel();
        $parametros = [
            ':email' => $userModel->getEmail(),
            ':idUser' => $userModel->getIdUuser(),
            ':pass' => $userModel->getPass()
        ];
        $resultado = $daoCrud->update("UPDATE users SET pass = :pass where id_user = :idUser and email = :email and ativo = 1", $parametros);
        return $resultado;

    }
}
