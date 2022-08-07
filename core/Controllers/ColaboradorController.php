<?php

namespace core\Controllers;

use core\dao\DaoCliente;
use core\dao\DaoColaborador;
use core\model\ClientModel;
use core\model\Functions;

class ColaboradorController
{
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
}
