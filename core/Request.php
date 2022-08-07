<?php
require_once('../vendor/autoload.php');
require_once('../config.php');

use core\Controllers\ClienteController;
use core\Controllers\ColaboradorController;
use core\Controllers\LoginController;
use core\Controllers\TrabalhoController;
use core\Controllers\MainController;
use core\Controllers\UserController;


if (isset($_POST['accao']) && $_SERVER['REQUEST_METHOD'] == 'POST') {

    session_start();

    $accao = $_POST['accao'];
    switch ($accao) {
        case 'userLogin':
            $objeto = new LoginController();
            $objeto->validate_login();
            break;
        case 'userDetails':
            $objeto = new UserController();
            $objeto->getUserDetails();
            break;
        case 'updateUserDetails';
            $objeto = new UserController();
            $objeto->updateUserDetails();
            break;
        case 'updateUserPass':
            $objeto = new UserController();
            $objeto->updateUserPass();
            break;
        case 'getAllClients':
            $objeto = new ClienteController();
            $objeto->getAllClients();
            break;
        case 'getClienteDetails':
            $objeto = new ClienteController();
            $objeto->getClientDetails();
            break;
        case 'updateClienteDetails':
            $objeto = new ClienteController();
            $objeto->updateClienteDetails();
            break;
        case 'createNewClient':
            $objeto = new ClienteController();
            $objeto->createNewClient();
            break;
        case 'getAllTrabalhosClient':
            $objeto = new TrabalhoController();
            $objeto->getAllTrabalhosClient();
            break;
        case 'getAllColaboradores':
            $objeto = new ColaboradorController();
            $objeto->getAllColaboradores();
            break;
        case 'createWork':
            $objeto = new TrabalhoController();
            $objeto->createWork();
            break;
        case 'softDeleteClient':
            $objeto = new ClienteController();
            $objeto->softDeleteClient();
            break;
        case 'getHistoryAllClients':
            $objeto = new ClienteController();
            $objeto->getAllHistoryClients();
            break;
        case 'getWork':
            $objeto = new TrabalhoController();
            $objeto->getWork();
            break;
        case 'getAllworks':
            $objeto = new TrabalhoController();
            $objeto->getAllworks();
            break;
        case 'updateWork':
            $objeto = new TrabalhoController();
            $objeto->updateWork();
            break;
        case 'deleteWork':
            $objeto = new TrabalhoController();
            $objeto->deleteWork();
            break;
        case 'deleteClient':
            $objeto = new ClienteController();
            $objeto->deleteClient();
            break;
        case 'recoveryClient':
            $objeto = new ClienteController();
            $objeto->recoveryClient();
            break;
    }
}
