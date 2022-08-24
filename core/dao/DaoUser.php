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
            ':pass' => $userModel->getPass(),
            ':ativo' => 1
        ];
        $resultado = $daoCrud->update("UPDATE users SET pass = :pass where id_user = :idUser and email = :email and ativo = :ativo", $parametros);
        return $resultado;

    }

    public function updatePurlUser(UserModel $userModel)
    {
        $daoCrud = new DaoCrudModel();
        $parametros = [
            ':id_user' => $userModel->getIdUuser(),
            ':purl' => $userModel->getPurl(),
            ':ativo' => 1,
        ];
        $resultado = $daoCrud->update("UPDATE users SET purl = :purl where id_user = :id_user and ativo = :ativo", $parametros);
        if($resultado->rowCount() == 1){
            $parametrosEvent = [
                ':purl' => 0,
                ':id_user' => $userModel->getIdUuser(),
            ];
            $event = "DROP EVENT IF EXISTS updateUserPurl".$userModel->getIdUuser().";
                      CREATE EVENT updateUserPurl".$userModel->getIdUuser()."
                      ON SCHEDULE AT NOW() + INTERVAL 30 MINUTE
                      DO 
                      BEGIN
                      UPDATE users SET purl = :purl WHERE id_user = :id_user;
                      END;";
                      $resultado = $daoCrud->create($event, $parametrosEvent);

        }
        return $resultado;
    }
}
