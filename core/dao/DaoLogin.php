<?php 
namespace core\dao;

use core\model\DaoCrudModel;
use core\model\Functions;
use core\model\UserModel;

class DaoLogin
{
    private function getUserEmail(UserModel $userModel){
        $daoCrud = new DaoCrudModel();
        $parametros = [':email' =>$userModel->getEmail()];
        return $daoCrud->select("SELECT pass FROM users where email = :email and ativo = 1", $parametros);
    }
    public function login(UserModel $userModel){
        $resultadoGetEmail =  $this->getUserEmail($userModel);
        if(count($resultadoGetEmail)==1){
            $verificaPass = password_verify($userModel->getPass(), $resultadoGetEmail[0]->pass);
            if($verificaPass){
                $daoCrud = new DaoCrudModel();
                $parametros = [':email' =>$userModel->getEmail()];
                $resultado =  $daoCrud->select("SELECT id_user, email, nome, foto_User FROM users where email = :email and ativo = 1", $parametros);
                array_unshift($resultado, Functions::ResultQuery(true));
                return $resultado;
            }else{
                return [Functions::ResultQuery($verificaPass)];
            }
        }else{
            return [Functions::ResultQuery(count($resultadoGetEmail))];
        }
    }

}
