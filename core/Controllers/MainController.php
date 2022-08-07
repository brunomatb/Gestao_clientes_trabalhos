<?php

namespace core\Controllers;

use core\model\DaoCrud;
use core\model\DaoMain;
use core\model\Functions;
use core\model\PesquisaModel;
use PDO;

class MainController
{
    public function index(){
        if(!Functions::sessaoIniciada()){
            Functions::redirecionar("index.php?a=login");
            return;
        }
        $valores= [
            'sessaoIniciada' => Functions::sessaoIniciada(),
        ];
        Functions::layout(["header","../index","footer"], $valores);
    }

}
