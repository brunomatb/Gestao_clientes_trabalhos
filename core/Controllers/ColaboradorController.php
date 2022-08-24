<?php

namespace core\Controllers;

use core\dao\DaoCliente;
use core\dao\DaoColaborador;
use core\model\ClientModel;
use core\model\ColaboradorModel;
use core\model\Functions;

class ColaboradorController
{
    public function getColaboradores()
    {

        if (!Functions::sessaoIniciada()) {
            Functions::redirecionar("index.php");
            return;
        }

        $valores = [
            'sessaoIniciada' => Functions::sessaoIniciada(),
        ];
        Functions::layout(["header", "../colaboradores", "footer"], $valores);
    }
    public function getAllColaboradores()
    {
        if (!Functions::sessaoIniciada()) {
            echo json_encode(['session' => false]);
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return;
        }
        $daoCliente = new DaoColaborador();

        $resultados = $daoCliente->getColaboradores();
        $colaboradores = [];
        foreach ($resultados as $v) {
            $colaborador = [
                'id_colaborador' => $v->getIdColaborador(),
                'nome_colaborador' => $v->getNomeColaborador(),
                'email_colaborador' => $v->getEmailColaborador(),
                'morada_colaborador' => $v->getMoradaColaborador(),
                'cidade_colaborador' => $v->getCidadeColaborador(),
                'movel_colaborador' => $v->getMovelColaborador(),
                'telefone_colaborador' => $v->getTelefoneColaborador(),
                'data_criacao_colaborador' => $v->getDataCriacaoColaborador(),
                'data_atualizacao_colaborador' => $v->getDataAtalizacaoColaborador(),
                'data_eliminacao_colaborador' => $v->getDataElimicacaoColaborador(),
            ];
            $colaboradores[] = $colaborador;
        }
        echo json_encode($colaboradores);
    }
    public function createColaborador()
    {

        if (!Functions::sessaoIniciada()) {
            echo json_encode(['session' => false]);
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return;
        }
        $fluxControl = "";

        if (
            !isset($_POST['nomeNewColaborador']) &&
            !isset($_POST['moradaNewColaborador']) &&
            !isset($_POST['cidadeNewColaborador']) &&
            !isset($_POST['emailNewColaborador']) &&
            !isset($_POST['movelNewColaborador']) &&
            !isset($_POST['telefoneNewColaborador'])
        ) {
            return;
        }
        if (strlen(trim($_POST['nomeNewColaborador'])) == 0) {
            return;
        }

        if (!filter_var($_POST['emailNewColaborador'], FILTER_VALIDATE_EMAIL) && $_POST['emailNewColaborador'] != "") {
            return;
        }
        $testNumberRegex = '/^[0-9]*$/';
        if (!preg_match($testNumberRegex, $_POST['movelNewColaborador']) && $_POST['movelNewColaborador'] != "") {
            return;
        }
        if (!preg_match($testNumberRegex, $_POST['telefoneNewColaborador']) && $_POST['telefoneNewColaborador'] != "") {
            return;
        }
        $daoColaborador = new DaoColaborador();
        $colaboradorModel = new ColaboradorModel();
        $colaboradorModel->setNomeColaborador(trim(filter_input(INPUT_POST, 'nomeNewColaborador', FILTER_SANITIZE_SPECIAL_CHARS)));
        $colaboradorModel->setEmailColaborador(trim(filter_input(INPUT_POST, 'emailNewColaborador', FILTER_SANITIZE_EMAIL)));
        $colaboradorModel->setMovelColaborador(trim(filter_input(INPUT_POST, 'movelNewColaborador', FILTER_SANITIZE_NUMBER_INT)));
        $colaboradorModel->setTelefoneColaborador(trim(filter_input(INPUT_POST, 'telefoneNewColaborador', FILTER_SANITIZE_NUMBER_INT)));
        $colaboradorModel->setMoradaColaborador(trim(filter_input(INPUT_POST, 'moradaNewColaborador', FILTER_SANITIZE_SPECIAL_CHARS)));
        $colaboradorModel->setCidadeColaborador(trim(filter_input(INPUT_POST, 'cidadeNewColaborador', FILTER_SANITIZE_SPECIAL_CHARS)));
        $resultadoUpdate = $daoColaborador->createColaborador($colaboradorModel);
        if ($resultadoUpdate == 0 || $resultadoUpdate == false) {
            echo json_encode(['status' => 'Erro na criacao']);
            return;
        }
        echo json_encode(['status' => 'Colaborador criado']);
    }
    public function updateColaborador()
    {
        if (!Functions::sessaoIniciada()) {
            echo json_encode(['session' => false]);
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return;
        }

        if (!isset($_POST['id_colaborador'])) {
            return;
        }

        if (
            !isset($_POST['nomeColaboradorUpdate']) &&
            !isset($_POST['moradaColaboradorUpdate']) &&
            !isset($_POST['cidadeColaboradorUpdate']) &&
            !isset($_POST['emailColaboradorUpdate']) &&
            !isset($_POST['movelColaboradorUpdate']) &&
            !isset($_POST['telefoneColaboradorUpdate'])
        ) {
            return;
        }
        if (strlen(trim($_POST['nomeColaboradorUpdate'])) == 0) {
            return;
        }

        if (!filter_var($_POST['emailColaboradorUpdate'], FILTER_VALIDATE_EMAIL) && $_POST['emailColaboradorUpdate'] != "") {
            return;
        }
        $testNumberRegex = '/^[0-9]*$/';
        if (!preg_match($testNumberRegex, $_POST['movelColaboradorUpdate']) && $_POST['movelColaboradorUpdate'] != "") {
            return;
        }
        if (!preg_match($testNumberRegex, $_POST['telefoneColaboradorUpdate']) && $_POST['telefoneColaboradorUpdate'] != "") {
            return;
        }
        $daoColaborador = new DaoColaborador();
        $colaboradorModel = new ColaboradorModel();
        $colaboradorModel->setIdColaborador(Functions::decodeB64(filter_input(INPUT_POST, 'id_colaborador', FILTER_SANITIZE_FULL_SPECIAL_CHARS)));
        $colaboradorModel->setNomeColaborador(trim(filter_input(INPUT_POST, 'nomeColaboradorUpdate', FILTER_SANITIZE_SPECIAL_CHARS)));
        $colaboradorModel->setEmailColaborador(trim(filter_input(INPUT_POST, 'emailColaboradorUpdate', FILTER_SANITIZE_EMAIL)));
        $colaboradorModel->setMovelColaborador(trim(filter_input(INPUT_POST, 'movelColaboradorUpdate', FILTER_SANITIZE_NUMBER_INT)));
        $colaboradorModel->setTelefoneColaborador(trim(filter_input(INPUT_POST, 'telefoneColaboradorUpdate', FILTER_SANITIZE_NUMBER_INT)));
        $colaboradorModel->setMoradaColaborador(trim(filter_input(INPUT_POST, 'moradaColaboradorUpdate', FILTER_SANITIZE_SPECIAL_CHARS)));
        $colaboradorModel->setCidadeColaborador(trim(filter_input(INPUT_POST, 'cidadeColaboradorUpdate', FILTER_SANITIZE_SPECIAL_CHARS)));
        $resultadoUpdate = $daoColaborador->updateColaborador($colaboradorModel);

        if ($resultadoUpdate->rowCount() == 1) {
            echo json_encode(['status' => 'Colaborador atualizado']);
            return;
        } else {
            echo json_encode(['status' => 'Colaborador nao atualizado']);
        }
    }

    public function getColaborador()
    {
        if (!Functions::sessaoIniciada()) {
            echo json_encode(['session' => false]);
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return;
        }
        if (!isset($_POST['id_colaborador'])) {
            return;
        }

        $daoColaborador = new DaoColaborador();
        $colaboradorModel = new ColaboradorModel();
        $colaboradorModel->setIdColaborador(Functions::decodeB64(filter_input(INPUT_POST, 'id_colaborador', FILTER_SANITIZE_FULL_SPECIAL_CHARS)));
        $resultado = $daoColaborador->getColaborador($colaboradorModel);

        if (count($resultado) == 1) {

            $colaborador = [
                'id_colaborador' => $resultado[0]->getIdColaborador(),
                'nome_colaborador' => $resultado[0]->getNomeColaborador(),
                'email_colaborador' => $resultado[0]->getEmailColaborador(),
                'morada_colaborador' => $resultado[0]->getMoradaColaborador(),
                'cidade_colaborador' => $resultado[0]->getCidadeColaborador(),
                'movel_colaborador' => $resultado[0]->getMovelColaborador(),
                'telefone_colaborador' => $resultado[0]->getTelefoneColaborador(),
                'data_criacao_colaborador' => $resultado[0]->getDataCriacaoColaborador(),
                'data_atualizacao_colaborador' => $resultado[0]->getDataAtalizacaoColaborador(),
                'data_eliminacao_colaborador' => $resultado[0]->getDataElimicacaoColaborador(),
            ];

            echo json_encode($colaborador);
        } else {
            echo json_encode(Functions::ResultQuery(count($resultado)));
        }
    }

    public function deleteColaborador()
    {
        if (!Functions::sessaoIniciada()) {
            echo json_encode(['session' => false]);
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return;
        }
        if (
            (!isset($_POST['id_colaborador']) || strlen(trim($_POST['id_colaborador'])) == 0)
        ) {
            return;
        }
      
        $daoColaborador = new DaoColaborador();
        $colaboradorModel = new ColaboradorModel();
        $colaboradorModel->setIdColaborador(Functions::decodeB64(filter_input(INPUT_POST, 'id_colaborador', FILTER_SANITIZE_SPECIAL_CHARS)));
        $resultado = $daoColaborador->deleteColaborador($colaboradorModel);
        if ($resultado->rowCount() == 1) {
            echo json_encode(['status' => 'Colaborador apagado']);
        } else {
            echo json_encode(['status' => 'Colaborador nao apagado']);
        }
    }
}
