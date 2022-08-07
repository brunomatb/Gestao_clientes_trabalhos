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

        $resultados = $daoCrud->select("SELECT * FROM colaborador");
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
