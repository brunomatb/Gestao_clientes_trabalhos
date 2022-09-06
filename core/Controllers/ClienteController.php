<?php

namespace core\Controllers;

use core\dao\DaoCliente;
use core\model\ClientModel;
use core\model\Functions;

class ClienteController
{
    public function getClients()
    {

        if (!Functions::sessaoIniciada()) {
            Functions::redirecionar("index.php");
            return;
        }

        $valores = [
            'sessaoIniciada' => Functions::sessaoIniciada(),
        ];
        Functions::layout(["header", "../clients", "footer"], $valores);
    }
    public function getAllClients()
    {
        if (!Functions::sessaoIniciada()) {
            echo json_encode(['session' => false]);
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return;
        }
        $daoCliente = new DaoCliente();

        $resultados = $daoCliente->getClients();
        $clientes = [];
        foreach ($resultados as $v) {
            $cliente = [
                'id_cliente' => $v->getIdCliente(),
                'nome_cliente' => $v->getNome(),
                'email_cliente' => $v->getEmail(),
                'movel_cliente' => $v->getMovel(),
                'telefone_cliente' => $v->getTelefone(),
                'morada_cliente' => $v->getMorada(),
                'cidade_cliente' => $v->getCidade(),
                'cliente_ativo' => $v->getAtivo(),
                'data_criacao_cliente' => $v->getDataCricao(),
                'data_atualizacao_cliente' => $v->getDataAtualizacao(),
                'data_eliminacao_cliente' => $v->getDataEliminacao()
            ];
            $clientes[] = $cliente;
        }
        echo json_encode($clientes);
    }

    public function getClient()
    {
        if (!Functions::sessaoIniciada()) {
            Functions::redirecionar("index.php");
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            Functions::redirecionar("index.php");
            return;
        }
        if (!isset($_GET['id'])) {
            Functions::redirecionar("index.php");
            return;
        }
        $id = Functions::decodeB64($_GET['id']);

        $modelCliente = new ClientModel();
        $modelCliente->setIdCliente($id);
        $daoCliente = new DaoCliente();
        $resultado = $daoCliente->getClient($modelCliente);
        if (count($resultado) == 1) {
            $cliente = $resultado[0];
            $cliente = (object)$cliente;
        } else {
            Functions::redirecionar("index.php");
        }

        $valores = [
            'sessaoIniciada' => Functions::sessaoIniciada(),
            'cliente' => $cliente,
        ];
        Functions::layout(["header", "../client", "footer"], $valores);
    }

    function getClientDetails()
    {

        if (!Functions::sessaoIniciada()) {
            echo json_encode(['session' => false]);
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return;
        }
        if (!isset($_POST['id'])) {
            return;
        }

        $id = Functions::decodeB64($_POST['id']);

        $modelCliente = new ClientModel();
        $modelCliente->setIdCliente($id);
        $daoCliente = new DaoCliente();
        $resultado = $daoCliente->getClient($modelCliente);

        if (count($resultado) == 1) {

            $cliente = [
                'id_cliente' => $resultado[0]->getIdCliente(),
                'nome_cliente' => $resultado[0]->getNome(),
                'email_cliente' => $resultado[0]->getEmail(),
                'movel_cliente' => $resultado[0]->getMovel(),
                'telefone_cliente' => $resultado[0]->getTelefone(),
                'morada_cliente' => $resultado[0]->getMorada(),
                'cidade_cliente' => $resultado[0]->getCidade(),
                'cliente_ativo' => $resultado[0]->getAtivo(),
                'data_criacao_cliente' => $resultado[0]->getDataCricao(),
                'data_atualizacao_cliente' => $resultado[0]->getDataAtualizacao(),
                'data_eliminacao_cliente' => $resultado[0]->getDataEliminacao()
            ];

            echo json_encode($cliente);
        } else {
            echo json_encode(Functions::ResultQuery(count($resultado)));
        }
    }
    public function updateCliente()
    {

        if (!Functions::sessaoIniciada()) {
            echo json_encode(['session' => false]);
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return;
        }
        if (
            !isset($_POST['id']) && !isset($_POST['nomeClienteUpdate']) &&
            !isset($_POST['emailClienteUpdate']) &&
            !isset($_POST['movelClienteUpdate']) &&
            !isset($_POST['telefoneClienteUpdate']) &&
            !isset($_POST['moradaClienteUpdate']) &&
            !isset($_POST['cidadeClienteUpdate'])
        ) {
            return;
        }
        if (trim($_POST['nomeClienteUpdate']) == "" && trim($_POST['moradaClienteUpdate'])) {
            return;
        }

        if (!filter_var($_POST['emailClienteUpdate'], FILTER_VALIDATE_EMAIL) && $_POST['emailClienteUpdate'] != "") {
            return;
        }
        $testNumberRegex = '/^[0-9]*$/';
        if (!preg_match($testNumberRegex, $_POST['movelClienteUpdate']) && $_POST['movelClienteUpdate'] != "") {
            return;
        }
        if (!preg_match($testNumberRegex, $_POST['telefoneClienteUpdate']) && $_POST['telefoneClienteUpdate'] != "") {
            return;
        }

        $modelCliente = new ClientModel();
        $daoCliente = new DaoCliente();
        $modelCliente->setIdCliente(Functions::decodeB64($_POST['id']));
        $modelCliente->setNome(trim($_POST['nomeClienteUpdate']));
        $modelCliente->setEmail(trim($_POST['emailClienteUpdate']));
        $modelCliente->setMovel(trim($_POST['movelClienteUpdate']));
        $modelCliente->setTelefone(trim($_POST['telefoneClienteUpdate']));
        $modelCliente->setMorada(trim($_POST['moradaClienteUpdate']));
        $modelCliente->setCidade(trim($_POST['cidadeClienteUpdate']));
        $resultadoUpdate = $daoCliente->updateClient($modelCliente);

        if($resultadoUpdate == false){
            echo json_encode(['status' => 'Erro na alteracao']);
            return;
        }
        if ($resultadoUpdate->rowCount() == 1) {
            echo json_encode(['status' => 'Alteracao efetuada']);
            return;
        } else {
            echo json_encode(['status' => 'Nenhuma alteracao efetuada']);
            return;
        }
    }

    public function createNewClient()
    {

        if (!Functions::sessaoIniciada()) {
            echo json_encode(['session' => false]);
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return;
        }

        if (
            !isset($_POST['nomeNewCliente']) &&
            !isset($_POST['emailNewCliente']) &&
            !isset($_POST['movelNewCliente']) &&
            !isset($_POST['telefoneNewCliente']) &&
            !isset($_POST['moradaNewCliente']) &&
            !isset($_POST['cidadeNewCliente'])
        ) {
            return;
        }
        if (strlen(trim($_POST['nomeNewCliente'])) == 0 && trim($_POST['moradaNewCliente'])) {
            return;
        }

        if (!filter_var($_POST['emailNewCliente'], FILTER_VALIDATE_EMAIL) && $_POST['emailNewCliente'] != "") {
            return;
        }
        $testNumberRegex = '/^[0-9]*$/';
        if (!preg_match($testNumberRegex, $_POST['movelNewCliente']) && $_POST['movelNewCliente'] != "") {
            return;
        }
        if (!preg_match($testNumberRegex, $_POST['telefoneNewCliente']) && $_POST['telefoneNewCliente'] != "") {
            return;
        }
        $daoCliente = new DaoCliente();
        $modelCliente = new ClientModel();
        $modelCliente->setNome(filter_input(INPUT_POST, 'nomeNewCliente', FILTER_SANITIZE_SPECIAL_CHARS));
        $modelCliente->setEmail(filter_input(INPUT_POST, 'emailNewCliente', FILTER_SANITIZE_EMAIL));
        $modelCliente->setMovel(filter_input(INPUT_POST, 'movelNewCliente', FILTER_SANITIZE_NUMBER_INT));
        $modelCliente->setTelefone(filter_input(INPUT_POST, 'telefoneNewCliente', FILTER_SANITIZE_NUMBER_INT));
        $modelCliente->setMorada(filter_input(INPUT_POST, 'moradaNewCliente', FILTER_SANITIZE_SPECIAL_CHARS));
        $modelCliente->setCidade(filter_input(INPUT_POST, 'cidadeNewCliente', FILTER_SANITIZE_SPECIAL_CHARS));

        $resultadoUpdate = $daoCliente->createNewClient($modelCliente);

        if ($resultadoUpdate == false) {
            echo json_encode(['status' => 'Erro na criacao']);
            return;
        }
        if($resultadoUpdate->rowCount() == 1){
            echo json_encode(['status' => 'Cliente criado']);
            return;
        }else{
            echo json_encode(['status' => 'Erro na criacao']);
            return;
        }
        
    }
    public function softDeleteClient()
    {
        if (!Functions::sessaoIniciada()) {
            echo json_encode(['session' => false]);
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return;
        }
        if (!isset($_POST['id_cliente']) || strlen(trim($_POST['id_cliente'])) == 0) {
            return;
        }
        $daoCliente = new DaoCliente();
        $modelCliente = new ClientModel();
        $modelCliente->setIdCliente(Functions::decodeB64(filter_input(INPUT_POST, 'id_cliente', FILTER_SANITIZE_FULL_SPECIAL_CHARS)));
        $resultadoCliente = $daoCliente->getClient($modelCliente);
        if (count($resultadoCliente) != 1) {
            echo json_encode(['status' => 'Soft deleted']);
            return;
        }

        $resultado = $daoCliente->softDeleteClient($modelCliente);
        if ($resultado == 0 || $resultado == false) {
            echo json_encode(['status' => $resultado]);
            return;
        }
        echo json_encode(['status' => 'Soft deleted']);
    }
    public function recoveryClient()
    {
        if (!Functions::sessaoIniciada()) {
            echo json_encode(['session' => false]);
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return;
        }
        if (!isset($_POST['id_cliente']) || strlen(trim($_POST['id_cliente'])) == 0) {
            return;
        }
        $daoCliente = new DaoCliente();
        $modelCliente = new ClientModel();
        $modelCliente->setIdCliente(Functions::decodeB64(filter_input(INPUT_POST, 'id_cliente', FILTER_SANITIZE_FULL_SPECIAL_CHARS)));
        $resultadoCliente = $daoCliente->getDeletedClient($modelCliente);
        if (count($resultadoCliente) != 1) {
            echo json_encode(['status' => 'Cliente recuperado']);
            return;
        }

        $resultado = $daoCliente->recoveryClient($modelCliente);
        if ($resultado == 0 || $resultado == false) {
            echo json_encode(['status' => $resultado]);
            return;
        }
        echo json_encode(['status' => 'Cliente recuperado']);
    }
    public function getHistoryClients()
    {

        if (!Functions::sessaoIniciada()) {
            Functions::redirecionar("index.php");
            return;
        }

        $valores = [
            'sessaoIniciada' => Functions::sessaoIniciada(),
        ];
        Functions::layout(["header", "../history_clients", "footer"], $valores);
    }
    public function getAllHistoryClients()
    {
        if (!Functions::sessaoIniciada()) {
            echo json_encode(['session' => false]);
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return;
        }
        $daoCliente = new DaoCliente();

        $resultados = $daoCliente->getHistoryClients();
        $clientes = [];
        foreach ($resultados as $v) {
            $cliente = [
                'id_cliente' => $v->getIdCliente(),
                'nome_cliente' => $v->getNome(),
                'email_cliente' => $v->getEmail(),
                'movel_cliente' => $v->getMovel(),
                'telefone_cliente' => $v->getTelefone(),
                'morada_cliente' => $v->getMorada(),
                'cidade_cliente' => $v->getCidade(),
                'cliente_ativo' => $v->getAtivo(),
                'data_criacao_cliente' => $v->getDataCricao(),
                'data_atualizacao_cliente' => $v->getDataAtualizacao(),
                'data_eliminacao_cliente' => $v->getDataEliminacao()
            ];
            $clientes[] = $cliente;
        }
        echo json_encode($clientes);
    }

    public function getDeletedClient()
    {
        if (!Functions::sessaoIniciada()) {
            Functions::redirecionar("index.php");
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            Functions::redirecionar("index.php");
            return;
        }
        if (!isset($_GET['id'])) {
            Functions::redirecionar("index.php");
            return;
        }
        $id = Functions::decodeB64($_GET['id']);

        $modelCliente = new ClientModel();
        $modelCliente->setIdCliente($id);
        $daoCliente = new DaoCliente();
        $resultado = $daoCliente->getDeletedClient($modelCliente);
        if (count($resultado) == 1) {
            $cliente = $resultado[0];
            $cliente = (object)$cliente;
        } else {
            Functions::redirecionar("index.php");
        }

        $valores = [
            'sessaoIniciada' => Functions::sessaoIniciada(),
            'cliente' => $cliente,
        ];
        Functions::layout(["header", "../deleted_client", "footer"], $valores);
    }

    public function deleteClient()
    {
        if (!Functions::sessaoIniciada()) {
            echo json_encode(['session' => false]);
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return;
        }
        if (!isset($_POST['id_cliente']) || strlen(trim($_POST['id_cliente'])) == 0) {
            return;
        }
        $daoCliente = new DaoCliente();
        $modelCliente = new ClientModel();
        $modelCliente->setIdCliente(Functions::decodeB64(filter_input(INPUT_POST, 'id_cliente', FILTER_SANITIZE_FULL_SPECIAL_CHARS)));
        $resultado = $daoCliente->deleteClient($modelCliente);
        if ($resultado->rowCount() == 1) {
            echo json_encode(['status' => 'Cliente apagado']);
        } else {
            echo json_encode(['status' => 'Cliente nao apagado']);
        }
    }
}
