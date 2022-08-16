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
}
