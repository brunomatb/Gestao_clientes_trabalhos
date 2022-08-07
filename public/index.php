<?php

use core\Controllers\MainController;
use core\model\Conexao;
use core\model\Dao;
use core\model\Database;
use core\model\Functions;

//open session//
session_start();

//autoload namespace com o composer //
require_once('../vendor/autoload.php');
//inclue as rotas //
require_once('../core/Rotas.php');

require_once('../core/Request.php');

 