<?php

namespace core\Controllers;

use core\dao\DaoTrabalho;
use core\model\ClientModel;
use core\model\DaoMain;
use core\model\Functions;
use core\model\TrabalhoModel;

class TrabalhoController
{
    public function getWorks()
    {

        if (!Functions::sessaoIniciada()) {
            Functions::redirecionar("index.php");
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            return;
        }

        $valores = [
            'sessaoIniciada' => Functions::sessaoIniciada(),
        ];
        Functions::layout(["header", "../trabalhos", "footer"], $valores);
    }
    public function getAllworks()
    {
        if (!Functions::sessaoIniciada()) {
            echo json_encode(['session' => false]);
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return;
        }

        $daoTrabalho = new DaoTrabalho();

        $resultados = $daoTrabalho->getAllworks();
        $trabalhos = [];
        foreach ($resultados as $v) {
            $trabalho = [
                'id_trabalho' => $v->getIdTrabalho(),
                'id_cliente' => $v->getIdCliente(),
                'id_colaborador' => $v->getIdColaborador(),
                'nome_trabalho' => $v->getNomeTrabalho(),
                'descricao_trabalho' => $v->getDescricao(),
                'morada_trabalho' => $v->getMoradaTrabalho(),
                'estado_trabalho' => $v->getEstadoTrabalho(),
                'motivo_pendencia' => $v->getMotivoPendencia(),
                'data_estimada_inicio' => $v->getDataEstimadaInicio(),
                'data_estimada_fim' => $v->getDataEstimadaFim(),
                'percentagem_Inicio_FimTrabalho' => $v->getPercentagemInicioFimTrabalho(),
                'data_criacao_trabalho' => $v->getDataCriacaoTrabalho(),
                'data_atualizacao_trabalho' => $v->getDataAtualizacaoTrabalho(),
                'data_eliminacao_trabalho' => $v->getDataElimicacaoTrabalho(),
                'colaborador' => $v->getNomeColaborador(),
                'trabalho_ativo' => $v->getTrabalhoAtivo(),
                'nome_cliente' => $v->getNome()
            ];
            $trabalhos[] = $trabalho;
        }
        echo json_encode($trabalhos);
    }
    public function getAllTrabalhosClient()
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

        $id = Functions::decodeB64(filter_input(INPUT_POST, 'id', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
        $daoTrabalho = new DaoTrabalho();
        $clienteModel = new ClientModel();
        $clienteModel->setIdCliente($id);
        $resultados = $daoTrabalho->getAllTrabalhosClient($clienteModel);

        if (count($resultados) > 0) {
            $trabalhos = [];
            foreach ($resultados as $v) {

                $trabalho = [
                    'id_trabalho' => $v->getIdTrabalho(),
                    'id_cliente' => $v->getIdCliente(),
                    'id_colaborador' => $v->getIdColaborador(),
                    'nome_trabalho' => $v->getNomeTrabalho(),
                    'descricao_trabalho' => $v->getDescricao(),
                    'morada_trabalho' => $v->getMoradaTrabalho(),
                    'estado_trabalho' => $v->getEstadoTrabalho(),
                    'motivo_pendencia' => $v->getMotivoPendencia(),
                    'data_estimada_inicio' => $v->getDataEstimadaInicio(),
                    'data_estimada_fim' => $v->getDataEstimadaFim(),
                    'percentagem_Inicio_FimTrabalho' => $v->getPercentagemInicioFimTrabalho(),
                    'data_criacao_trabalho' => $v->getDataCriacaoTrabalho(),
                    'data_atualizacao_trabalho' => $v->getDataAtualizacaoTrabalho(),
                    'data_eliminacao_trabalho' => $v->getDataElimicacaoTrabalho(),
                    'colaborador' => $v->getNomeColaborador()
                ];
                $trabalhos[] = $trabalho;
            }

            echo json_encode($trabalhos);
        } else {
            echo json_encode(['status' => count($resultados)]);
        }
    }
    public function createWork()
    {
        if (!Functions::sessaoIniciada()) {
            echo json_encode(['session' => false]);
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return;
        }
        if (
            (!isset($_POST['id_cliente']) || strlen(trim($_POST['id_cliente'])) == 0) ||
            (!isset($_POST['id_colaborador']) || strlen(trim($_POST['id_colaborador'])) == 0) ||
            (!isset($_POST['descricaoCreateWork']) || strlen(trim($_POST['descricaoCreateWork'])) == 0) ||
            (!isset($_POST['moradaCreateWork']) || strlen(trim($_POST['moradaCreateWork'])) == 0) ||
            (!isset($_POST['dataInicioCreateWork']) || strlen(trim($_POST['dataInicioCreateWork'])) == 0) ||
            (!isset($_POST['dataFimCreateWork']) || strlen(trim($_POST['dataFimCreateWork'])) == 0) ||
            (!isset($_POST['colaboradorCreateWork']) || strlen(trim($_POST['colaboradorCreateWork'])) == 0) ||
            !isset($_POST['informacaoCreateWork'])
        ) {
            return;
        }
        $daoTrabalho = new DaoTrabalho();
        $trabalhoModel = new TrabalhoModel();
        $trabalhoModel->setIdCliente(Functions::decodeB64(filter_input(INPUT_POST, 'id_cliente', FILTER_SANITIZE_FULL_SPECIAL_CHARS)));
        $trabalhoModel->setIdColaborador(Functions::decodeB64(filter_input(INPUT_POST, 'id_colaborador', FILTER_SANITIZE_FULL_SPECIAL_CHARS)));
        $trabalhoModel->setNomeTrabalho(filter_input(INPUT_POST, 'descricaoCreateWork', FILTER_SANITIZE_SPECIAL_CHARS));
        $trabalhoModel->setMoradaTrabalho(filter_input(INPUT_POST, 'moradaCreateWork', FILTER_SANITIZE_SPECIAL_CHARS));
        $trabalhoModel->setDataEstimadaInicio(trim($_POST['dataInicioCreateWork']));
        $trabalhoModel->setDataEstimadaFim(trim($_POST['dataFimCreateWork']));
        $trabalhoModel->setDescricao(filter_input(INPUT_POST, 'informacaoCreateWork', FILTER_SANITIZE_SPECIAL_CHARS));
        $resultado = $daoTrabalho->createNewWork($trabalhoModel);
        if ($resultado == 0 || $resultado == false) {
            echo json_encode(['status' => 'Erro na criacao']);
            return;
        }
        echo json_encode(['status' => 'Trabalho criado']);
    }

    public function getWork()
    {
        if (!Functions::sessaoIniciada()) {
            echo json_encode(['session' => false]);
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return;
        }
        if (!isset($_POST['id_trabalho'])) {
            return;
        }

        $daoTrabalho = new DaoTrabalho();
        $trabalhoModel = new TrabalhoModel();
        $trabalhoModel->setIdTrabalho(Functions::decodeB64(filter_input(INPUT_POST, 'id_trabalho', FILTER_SANITIZE_FULL_SPECIAL_CHARS)));
        $resultado = $daoTrabalho->getWorkDetails($trabalhoModel);

        if (count($resultado) == 1) {

            $trabalho = [
                'id_trabalho' => $resultado[0]->getIdTrabalho(),
                'id_cliente' => $resultado[0]->getIdCliente(),
                'id_colaborador' => $resultado[0]->getIdColaborador(),
                'nome_trabalho' => $resultado[0]->getNomeTrabalho(),
                'descricao_trabalho' => $resultado[0]->getDescricao(),
                'morada_trabalho' => $resultado[0]->getMoradaTrabalho(),
                'estado_trabalho' => $resultado[0]->getEstadoTrabalho(),
                'motivo_pendencia' => $resultado[0]->getMotivoPendencia(),
                'data_estimada_inicio' => $resultado[0]->getDataEstimadaInicio(),
                'data_estimada_fim' => $resultado[0]->getDataEstimadaFim(),
                'data_criacao_trabalho' => $resultado[0]->getDataCriacaoTrabalho(),
                'data_atualizacao_trabalho' => $resultado[0]->getDataAtualizacaoTrabalho(),
                'data_eliminacao_trabalho' => $resultado[0]->getDataElimicacaoTrabalho(),
                'colaborador' => $resultado[0]->getNomeColaborador()
            ];

            echo json_encode($trabalho);
        } else {
            echo json_encode(Functions::ResultQuery(count($resultado)));
        }
    }
    public function updateWork()
    {

        if (!Functions::sessaoIniciada()) {
            echo json_encode(['session' => false]);
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return;
        }
        if (
            (!isset($_POST['id_cliente']) || strlen(trim($_POST['id_cliente'])) == 0) ||
            (!isset($_POST['id_colaborador']) || strlen(trim($_POST['id_colaborador'])) == 0) ||
            (!isset($_POST['id_trabalho']) || strlen(trim($_POST['id_trabalho'])) == 0) ||
            (!isset($_POST['descricaoEditWork']) || strlen(trim($_POST['descricaoEditWork'])) == 0) ||
            (!isset($_POST['estadoEditWork']) || strlen(trim($_POST['estadoEditWork'])) == 0) ||
            (!isset($_POST['motivoPendenciaEditWork'])) ||
            (!isset($_POST['moradaEditWork']) || strlen(trim($_POST['moradaEditWork'])) == 0) ||
            (!isset($_POST['dataInicioEditWork']) || strlen(trim($_POST['dataInicioEditWork'])) == 0) ||
            (!isset($_POST['dataFimEditWork']) || strlen(trim($_POST['dataFimEditWork'])) == 0) ||
            !isset($_POST['informacaoEditWork'])
        ) {
            return;
        }
        $daoTrabalho = new DaoTrabalho();
        $trabalhoModel = new TrabalhoModel();
        $trabalhoModel->setIdCliente(Functions::decodeB64(filter_input(INPUT_POST, 'id_cliente', FILTER_SANITIZE_FULL_SPECIAL_CHARS)));
        $trabalhoModel->setIdColaborador(Functions::decodeB64(filter_input(INPUT_POST, 'id_colaborador', FILTER_SANITIZE_FULL_SPECIAL_CHARS)));
        $trabalhoModel->setIdTrabalho(Functions::decodeB64(filter_input(INPUT_POST, 'id_trabalho', FILTER_SANITIZE_FULL_SPECIAL_CHARS)));
        $trabalhoModel->setNomeTrabalho(filter_input(INPUT_POST, 'descricaoEditWork', FILTER_SANITIZE_SPECIAL_CHARS));
        $trabalhoModel->setEstadoTrabalho(filter_input(INPUT_POST, 'estadoEditWork', FILTER_SANITIZE_SPECIAL_CHARS));
        $trabalhoModel->setMotivoPendencia(filter_input(INPUT_POST, 'motivoPendenciaEditWork', FILTER_SANITIZE_SPECIAL_CHARS));
        $trabalhoModel->setMoradaTrabalho(filter_input(INPUT_POST, 'moradaEditWork', FILTER_SANITIZE_SPECIAL_CHARS));
        $trabalhoModel->setDataEstimadaInicio(trim($_POST['dataInicioEditWork']));
        $trabalhoModel->setDataEstimadaFim(trim($_POST['dataFimEditWork']));
        $trabalhoModel->setDescricao(filter_input(INPUT_POST, 'informacaoEditWork', FILTER_SANITIZE_SPECIAL_CHARS));
        $resultado = $daoTrabalho->updateWork($trabalhoModel);
        if ($resultado->rowCount() == 1) {
            echo json_encode(['status' => 'Trabalho atualizado']);
        } else {
            echo json_encode(['status' => 'Trabalho nao alterado']);
        }
    }

    public function deleteWork()
    {
        if (!Functions::sessaoIniciada()) {
            echo json_encode(['session' => false]);
            return;
        }
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            return;
        }
        if (
            (!isset($_POST['id_cliente']) || strlen(trim($_POST['id_cliente'])) == 0) ||
            (!isset($_POST['id_trabalho']) || strlen(trim($_POST['id_trabalho'])) == 0)
        ) {
            return;
        }
        $trabalhoModel = new TrabalhoModel();
        $trabalhoModel->setIdCliente(Functions::decodeB64(filter_input(INPUT_POST, 'id_cliente', FILTER_SANITIZE_FULL_SPECIAL_CHARS)));
        $trabalhoModel->setIdTrabalho(Functions::decodeB64(filter_input(INPUT_POST, 'id_trabalho', FILTER_SANITIZE_FULL_SPECIAL_CHARS)));
        $daoTrabalho = new DaoTrabalho();
        $resultado = $daoTrabalho->deleteWork($trabalhoModel);
        if ($resultado->rowCount() == 1) {
            echo json_encode(['status' => 'Trabalho apagado']);
        } else {
            echo json_encode(['status' => 'Trabalho nao apagado']);
        }
    }
}
