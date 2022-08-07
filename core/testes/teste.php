<?php

namespace core\Controllers;

use core\model\DaoCrud;
use core\model\DaoCrudModel;
use core\model\DaoMain;
use core\model\Functions;
use core\model\PesquisaModel;
use PDO;

class MainController
{
    public function index()
    {

        $daoCrud = new DaoCrudModel();
        $parametros = [
            ':nome_cliente' => 'luis',
            ':email_cliente' =>'tex@te'
        ];
        $clientes = $daoCrud->callSP("call selectAlslClients()");

        if ($clientes > 0) {
                if(isset($clientes[0]->rowAfected)){
                    echo json_encode($clientes);
                    return false;
                }
                echo '<pre>';
            $clientes += [(array_key_last($clientes)+1)=>Functions::ResultQuery("true")];
            print_r(json_encode($clientes));
        } else {
            echo json_encode([Functions::ResultQuery($clientes)]);
        }
    }
}
