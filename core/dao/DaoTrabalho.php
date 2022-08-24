<?php

namespace core\dao;

use core\model\ClientModel;
use core\model\DaoCrudModel;
use core\model\Functions;
use core\model\TrabalhoModel;

class DaoTrabalho
{
    public function getAllTrabalhosClient(ClientModel $clienteModel)
    {
        $daoCrud = new DaoCrudModel();
        $parametros = [':id_cliente' => $clienteModel->getIdCliente()];

        $sql = "SELECT a.*, b.nome_colaborador, 
                if(convert(datediff(CURRENT_TIMESTAMP(), a.data_estimada_inicio) / datediff(a.data_estimada_fim, a.data_estimada_inicio)*100, decimal) < 0 , 0, convert(datediff(CURRENT_TIMESTAMP(), a.data_estimada_inicio) / datediff(a.data_estimada_fim, a.data_estimada_inicio)*100, decimal)) as percentagem_Inicio_FimTrabalho
                from gestao_clientes.trabalhos a
                left join gestao_clientes.colaborador b on a.id_colaborador = b.id_colaborador
                where a.id_cliente = :id_cliente";
        $resultados =  $daoCrud->select(trim($sql), $parametros);
        $trabalhos = [];
        if (count($resultados) > 0) {
            foreach ($resultados as $v) {
                $trabalhoModel = new TrabalhoModel();
                $trabalhoModel->setidTrabalho(Functions::encodeId64($v->id_trabalho));
                $trabalhoModel->setIdCliente(Functions::encodeId64($v->id_cliente));
                $trabalhoModel->setIdColaborador(Functions::encodeId64($v->id_colaborador));
                $trabalhoModel->setNomeTrabalho($v->nome_trabalho);
                $trabalhoModel->setDescricao($v->descricao_trabalho);
                $trabalhoModel->setMoradaTrabalho($v->morada_trabalho);
                $trabalhoModel->setEstadoTrabalho($v->estado_trabalho);
                $trabalhoModel->setMotivoPendencia($v->motivo_pendencia);
                $trabalhoModel->setDataEstimadaInicio($v->data_estimada_inicio);
                $trabalhoModel->setDataEstimadaFim($v->data_estimada_fim);
                $trabalhoModel->setPercentagemInicioFimTrabalho($v->percentagem_Inicio_FimTrabalho);
                $trabalhoModel->setDataCriacaoTrabalho($v->data_criacao_trabalho);
                $trabalhoModel->setDataAtualizacaoTrabalho($v->data_atualizacao_trabalho);
                $trabalhoModel->setDataElimicacaoTrabalho($v->data_eliminacao_trabalho);
                $trabalhoModel->setNomeColaborador($v->nome_colaborador);
                $trabalhos[] = $trabalhoModel;
            }
        }

        return $trabalhos;
    }

    public function getAllworks(){
        $daoCrud = new DaoCrudModel();
        $sql = "SELECT a.*, b.nome_colaborador, nome_cliente, 
                if(if(convert(datediff(CURRENT_TIMESTAMP(), a.data_estimada_inicio) / datediff(a.data_estimada_fim, a.data_estimada_inicio)*100, decimal) < 0 , 0, convert(datediff(CURRENT_TIMESTAMP(), a.data_estimada_inicio) / datediff(a.data_estimada_fim, a.data_estimada_inicio)*100, decimal)) > 100, 100,
                if(convert(datediff(CURRENT_TIMESTAMP(), a.data_estimada_inicio) / datediff(a.data_estimada_fim, a.data_estimada_inicio)*100, decimal) < 0 , 0, convert(datediff(CURRENT_TIMESTAMP(), a.data_estimada_inicio) / datediff(a.data_estimada_fim, a.data_estimada_inicio)*100, decimal)))  as percentagem_Inicio_FimTrabalho
                from gestao_clientes.trabalhos a
                left join gestao_clientes.colaborador b on a.id_colaborador = b.id_colaborador
                inner join gestao_clientes.clientes c on a.id_cliente = c.id_cliente ORDER BY c.nome_cliente;";
        $resultados =  $daoCrud->select(trim($sql));
        $trabalhos = [];
        if (count($resultados) > 0) {
            foreach ($resultados as $v) {
                $trabalhoModel = new TrabalhoModel();
                $trabalhoModel->setidTrabalho(Functions::encodeId64($v->id_trabalho));
                $trabalhoModel->setIdCliente(Functions::encodeId64($v->id_cliente));
                $trabalhoModel->setIdColaborador(Functions::encodeId64($v->id_colaborador));
                $trabalhoModel->setNomeTrabalho($v->nome_trabalho);
                $trabalhoModel->setDescricao($v->descricao_trabalho);
                $trabalhoModel->setMoradaTrabalho($v->morada_trabalho);
                $trabalhoModel->setEstadoTrabalho($v->estado_trabalho);
                $trabalhoModel->setMotivoPendencia($v->motivo_pendencia);
                $trabalhoModel->setDataEstimadaInicio($v->data_estimada_inicio);
                $trabalhoModel->setDataEstimadaFim($v->data_estimada_fim);
                $trabalhoModel->setPercentagemInicioFimTrabalho($v->percentagem_Inicio_FimTrabalho);
                $trabalhoModel->setDataCriacaoTrabalho($v->data_criacao_trabalho);
                $trabalhoModel->setDataAtualizacaoTrabalho($v->data_atualizacao_trabalho);
                $trabalhoModel->setDataElimicacaoTrabalho($v->data_eliminacao_trabalho);
                $trabalhoModel->setNomeColaborador($v->nome_colaborador);
                $trabalhoModel->setTrabalhoAtivo($v->trabalho_ativo);
                $trabalhoModel->setNome($v->nome_cliente);
                $trabalhos[] = $trabalhoModel;
            }
        }

        return $trabalhos;
    }
    public function createNewWork(TrabalhoModel $trabalhoModel)
    {

        $daoCrud = new DaoCrudModel();
        $parametros = [
            ':id_cliente' => $trabalhoModel->getIdCliente(),
            ':id_colaborador' => $trabalhoModel->getIdColaborador(),
            ':nome_trabalho' => $trabalhoModel->getNomeTrabalho(),
            ':descricao_trabalho' => $trabalhoModel->getDescricao(),
            ':morada_trabalho' => $trabalhoModel->getMoradaTrabalho(),
            ':data_estimada_inicio' => $trabalhoModel->getDataEstimadaInicio(),
            ':data_estimada_fim' => $trabalhoModel->getDataEstimadaFim(),
            ':motivo_pendencia' => "",
        ];

        $sql = "INSERT INTO gestao_clientes.trabalhos (id_cliente, id_colaborador, nome_trabalho, descricao_trabalho, morada_trabalho, motivo_pendencia, data_estimada_inicio, data_estimada_fim) 
        VALUES (:id_cliente, :id_colaborador, :nome_trabalho, :descricao_trabalho, :morada_trabalho, :motivo_pendencia, :data_estimada_inicio, :data_estimada_fim)";
        $resultado = $daoCrud->insert($sql, $parametros);
        return $resultado;
    }

    public function getWorkDetails(TrabalhoModel $trabalhoModel)
    {
        $daoCrud = new DaoCrudModel();
        $parametros = [':id_trabalho' => $trabalhoModel->getIdTrabalho(), ':trabalho_ativo' => 1];
        $sql = "SELECT a.*, b.nome_colaborador
                from gestao_clientes.trabalhos a 
                left join gestao_clientes.colaborador b on b.id_colaborador = a.id_colaborador
                where id_trabalho = :id_trabalho and trabalho_ativo = :trabalho_ativo";

        $resultados = $daoCrud->select($sql, $parametros);
        $trabalho = [];
        if (count($resultados) == 1) {
            $trabalhoModel = new TrabalhoModel();
            $trabalhoModel->setidTrabalho(Functions::encodeId64($resultados[0]->id_trabalho));
            $trabalhoModel->setIdCliente(Functions::encodeId64($resultados[0]->id_cliente));
            $trabalhoModel->setIdColaborador(Functions::encodeId64($resultados[0]->id_colaborador));
            $trabalhoModel->setNomeTrabalho($resultados[0]->nome_trabalho);
            $trabalhoModel->setDescricao($resultados[0]->descricao_trabalho);
            $trabalhoModel->setMoradaTrabalho($resultados[0]->morada_trabalho);
            $trabalhoModel->setEstadoTrabalho($resultados[0]->estado_trabalho);
            $trabalhoModel->setMotivoPendencia($resultados[0]->motivo_pendencia);
            $trabalhoModel->setDataEstimadaInicio($resultados[0]->data_estimada_inicio);
            $trabalhoModel->setDataEstimadaFim($resultados[0]->data_estimada_fim);
            $trabalhoModel->setDataCriacaoTrabalho($resultados[0]->data_criacao_trabalho);
            $trabalhoModel->setDataAtualizacaoTrabalho($resultados[0]->data_atualizacao_trabalho);
            $trabalhoModel->setDataElimicacaoTrabalho($resultados[0]->data_eliminacao_trabalho);
            $trabalhoModel->setNomeColaborador($resultados[0]->nome_colaborador);
            $trabalho[] = $trabalhoModel;
        }

        return $trabalho;
    }


    public function updateWork(TrabalhoModel $trabalhoModel)
    {

        $daoCrud = new DaoCrudModel();
        $parametros = [
            ':id_cliente' => $trabalhoModel->getIdCliente(),
            ':id_colaborador' => $trabalhoModel->getIdColaborador(),
            ':id_trabalho' => $trabalhoModel->getIdTrabalho(),
            ':nome_trabalho' => $trabalhoModel->getNomeTrabalho(),
            ':descricao_trabalho' => $trabalhoModel->getDescricao(),
            ':morada_trabalho' => $trabalhoModel->getMoradaTrabalho(),
            ':estado_trabalho' => $trabalhoModel->getEstadoTrabalho(),
            ':motivo_pendencia' => $trabalhoModel->getMotivoPendencia(),
            ':data_estimada_inicio' => $trabalhoModel->getDataEstimadaInicio(),
            ':data_estimada_fim' => $trabalhoModel->getDataEstimadaFim(),
            ':trabalho_ativo' => 1
        ];

        $sql = "UPDATE trabalhos SET id_colaborador = :id_colaborador,
                nome_trabalho = :nome_trabalho, 
                descricao_trabalho = :descricao_trabalho,
                morada_trabalho = :morada_trabalho,
                estado_trabalho = :estado_trabalho,
                motivo_pendencia = :motivo_pendencia,
                data_estimada_inicio = :data_estimada_inicio,
                data_estimada_fim = :data_estimada_fim WHERE id_trabalho = :id_trabalho and id_cliente = :id_cliente and trabalho_ativo = :trabalho_ativo";
        $resultado = $daoCrud->update($sql, $parametros);
        return $resultado;
    }

    public function deleteWork(TrabalhoModel $trabalhoModel)
    {
        $resultado = "";
        $daoCrud = new DaoCrudModel();
        $parametros = [
            ':id_trabalho' => $trabalhoModel->getIdTrabalho(),
            ':id_cliente' => $trabalhoModel->getIdCliente()
        ];
        $sql = "DELETE from trabalhos WHERE id_trabalho = :id_trabalho and id_cliente = :id_cliente";
        $resultado = $daoCrud->delete($sql, $parametros);
        return $resultado;
    }

}
