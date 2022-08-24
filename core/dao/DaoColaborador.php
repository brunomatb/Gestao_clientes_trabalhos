<?php

namespace core\dao;

use core\model\ClientModel;
use core\model\ColaboradorModel;
use core\model\DaoCrudModel;
use core\model\Functions;
use core\model\UserModel;

class DaoColaborador
{

    public function getColaboradores()
    {
        $daoCrud = new DaoCrudModel();

        $resultados = $daoCrud->select("SELECT id_colaborador, 
                                               nome_colaborador, 
                                               if(email_colaborador <> 'null', email_colaborador, '') as email_colaborador,
                                               if(morada_colaborador <> 'null', morada_colaborador, '') as morada_colaborador,
                                               if(cidade_colaborador <> 'null', cidade_colaborador, '') as cidade_colaborador,
                                               if(movel_colaborador <> 'null', movel_colaborador, '') as movel_colaborador,
                                               if(telefone_colaborador <> 'null', telefone_colaborador, '') as telefone_colaborador,
                                               data_criacao_colaborador,
                                               data_atualizacao_colaborador,
                                               data_eliminacao_colaborador 
                                               FROM colaborador");
        $colaborador = [];
        if (count($resultados) > 0) {
            foreach ($resultados as $v) {
                $colaboradorModel = new ColaboradorModel();
                $colaboradorModel->setIdColaborador(Functions::encodeId64($v->id_colaborador));
                $colaboradorModel->setNomeColaborador($v->nome_colaborador);
                $colaboradorModel->setEmailColaborador($v->email_colaborador);
                $colaboradorModel->setMoradaColaborador($v->morada_colaborador);
                $colaboradorModel->setCidadeColaborador($v->cidade_colaborador);
                $colaboradorModel->setMovelColaborador($v->movel_colaborador);
                $colaboradorModel->setTelefoneColaborador($v->telefone_colaborador);
                $colaboradorModel->setDataCriacaoColaborador($v->data_criacao_colaborador);
                $colaboradorModel->setDataAtalizacaoColaborador($v->data_atualizacao_colaborador);
                $colaboradorModel->setDataElimicacaoColaborador($v->data_eliminacao_colaborador);
                $colaborador[] = $colaboradorModel;
            }
        }
        return $colaborador;
    }

    public function createColaborador(ColaboradorModel $colaboradorModel)
    {
        $parametros = [
            ':nome_colaborador' => $colaboradorModel->getNomeColaborador(),
            ':email_colaborador' => $colaboradorModel->getEmailColaborador(),
            ':morada_colaborador' => $colaboradorModel->getMoradaColaborador(),
            ':cidade_colaborador' => $colaboradorModel->getCidadeColaborador(),
            ':movel_colaborador' => $colaboradorModel->getMovelColaborador(),
            ':telefone_colaborador' => $colaboradorModel->getTelefoneColaborador()
        ];
        $sql = "INSERT INTO colaborador (nome_colaborador, email_colaborador, morada_colaborador, cidade_colaborador, movel_colaborador, telefone_colaborador)
                VALUES (:nome_colaborador, :email_colaborador, :morada_colaborador, :cidade_colaborador, :movel_colaborador, :telefone_colaborador)";
        $daoCrud = new DaoCrudModel();
        $resultado =  $daoCrud->insert($sql, $parametros);
        return $resultado;
    }

    public function updateColaborador(ColaboradorModel $colaboradorModel)
    {
        $parametros = [
            ':id_colaborador' => $colaboradorModel->getIdColaborador(),
            ':nome_colaborador' => $colaboradorModel->getNomeColaborador(),
            ':email_colaborador' => $colaboradorModel->getEmailColaborador(),
            ':morada_colaborador' => $colaboradorModel->getMoradaColaborador(),
            ':cidade_colaborador' => $colaboradorModel->getCidadeColaborador(),
            ':movel_colaborador' => $colaboradorModel->getMovelColaborador(),
            ':telefone_colaborador' => $colaboradorModel->getTelefoneColaborador()
            
        ];
        $sql = "UPDATE colaborador SET nome_colaborador = :nome_colaborador,
                email_colaborador = :email_colaborador,
                morada_colaborador = :morada_colaborador,
                cidade_colaborador = :cidade_colaborador,
                movel_colaborador = :movel_colaborador,
                telefone_colaborador = :telefone_colaborador
                WHERE id_colaborador = :id_colaborador";
        $daoCrud = new DaoCrudModel();
        $resultado = $daoCrud->update($sql, $parametros);
        return $resultado;
    }

    public function deleteColaborador(ColaboradorModel $colaboradorModel)
    {
        $parametros = [
            ':id_colaborador' => $colaboradorModel->getIdColaborador()
        ];
        $sql = "DELETE FROM colaborador WHERE id_colaborador = :id_colaborador";
        $daoCrud = new DaoCrudModel();
        $resultado =  $daoCrud->delete($sql, $parametros);
        return $resultado;
    }

    public function getColaborador(ColaboradorModel $colaboradorModel)
    {
        $daoCrud = new DaoCrudModel();

        $parametros = [':id_colaborador' => $colaboradorModel->getIdColaborador()];
        $resultado = $daoCrud->select("SELECT id_colaborador, 
                                               nome_colaborador, 
                                               if(email_colaborador <> 'null', email_colaborador, '') as email_colaborador,
                                               if(morada_colaborador <> 'null', morada_colaborador, '') as morada_colaborador,
                                               if(cidade_colaborador <> 'null', cidade_colaborador, '') as cidade_colaborador,
                                               if(movel_colaborador <> 'null', movel_colaborador, '') as movel_colaborador,
                                               if(telefone_colaborador <> 'null', telefone_colaborador, '') as telefone_colaborador,
                                               data_criacao_colaborador,
                                               data_atualizacao_colaborador,
                                               data_eliminacao_colaborador 
                                               FROM colaborador where id_colaborador = :id_colaborador", $parametros);
        $colaborador = [];
        if (count($resultado) == 1) {

            $colaboradorModel = new ColaboradorModel();
            $colaboradorModel->setIdColaborador(Functions::encodeId64($resultado[0]->id_colaborador));
            $colaboradorModel->setNomeColaborador($resultado[0]->nome_colaborador);
            $colaboradorModel->setEmailColaborador($resultado[0]->email_colaborador);
            $colaboradorModel->setMoradaColaborador($resultado[0]->morada_colaborador);
            $colaboradorModel->setCidadeColaborador($resultado[0]->cidade_colaborador);
            $colaboradorModel->setMovelColaborador($resultado[0]->movel_colaborador);
            $colaboradorModel->setTelefoneColaborador($resultado[0]->telefone_colaborador);
            $colaboradorModel->setDataCriacaoColaborador($resultado[0]->data_criacao_colaborador);
            $colaboradorModel->setDataAtalizacaoColaborador($resultado[0]->data_atualizacao_colaborador);
            $colaboradorModel->setDataElimicacaoColaborador($resultado[0]->data_eliminacao_colaborador);
            $colaborador[] = $colaboradorModel;
        }

        return $colaborador;
    }
}
