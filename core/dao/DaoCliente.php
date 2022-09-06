<?php

namespace core\dao;

use core\model\ClientModel;
use core\model\DaoCrudModel;
use core\model\Functions;
use core\model\UserModel;

class DaoCliente
{
    public function getClients()
    {
        $daoCrud = new DaoCrudModel();
        $parametros = [':cliente_ativo' => 1];
        $resultados =  $daoCrud->select("SELECT * FROM clientes WHERE cliente_ativo = :cliente_ativo order by data_criacao_cliente desc", $parametros);

        $cliente = [];
        foreach ($resultados as $v) {
            $clienteModel = new ClientModel();
            $clienteModel->setIdCliente(Functions::encodeId64($v->id_cliente));
            $clienteModel->setNome($v->nome_cliente);
            $clienteModel->setEmail($v->email_cliente);
            $clienteModel->setMovel($v->movel_cliente);
            $clienteModel->setTelefone($v->telefone_cliente);
            $clienteModel->setMorada($v->morada_cliente);
            $clienteModel->setCidade($v->cidade_cliente);
            $clienteModel->setAtivo($v->cliente_ativo);
            $clienteModel->setDataCricao($v->data_criacao_cliente);
            $clienteModel->setDataAtualizacao($v->data_atualizacao_cliente);
            $clienteModel->setDataEliminacao($v->data_eliminacao_cliente);
            $cliente[] = $clienteModel;
        }
        return $cliente;
    }
    public function getClient(ClientModel $clienteModel)
    {
        $daoCrud = new DaoCrudModel();
        $parametros = [':id_cliente' => $clienteModel->getIdCliente(), ':cliente_ativo' => 1];
        $sql = "SELECT * FROM clientes WHERE id_cliente = :id_cliente and cliente_ativo = :cliente_ativo";

        $resultados =  $daoCrud->select($sql, $parametros);

        $cliente = [];
        if (count($resultados) == 1) {
            $clienteModel = new ClientModel();
            $clienteModel->setIdCliente(Functions::encodeId64($resultados[0]->id_cliente));
            $clienteModel->setNome($resultados[0]->nome_cliente);
            $clienteModel->setEmail($resultados[0]->email_cliente);
            $clienteModel->setMovel($resultados[0]->movel_cliente);
            $clienteModel->setTelefone($resultados[0]->telefone_cliente);
            $clienteModel->setMorada($resultados[0]->morada_cliente);
            $clienteModel->setCidade($resultados[0]->cidade_cliente);
            $clienteModel->setAtivo($resultados[0]->cliente_ativo);
            $clienteModel->setDataCricao($resultados[0]->data_criacao_cliente);
            $clienteModel->setDataAtualizacao($resultados[0]->data_atualizacao_cliente);
            $clienteModel->setDataEliminacao($resultados[0]->data_eliminacao_cliente);
            $cliente[] = $clienteModel;
        }

        return $cliente;
    }

    public function getClientWithWorks(ClientModel $clienteModel)
    {
        $daoCrud = new DaoCrudModel();
        $parametros = [':id_cliente' => $clienteModel->getIdCliente()];
        $sql = "SELECT * FROM clientes WHERE id_cliente = :id_cliente";

        $resultados =  $daoCrud->select($sql, $parametros);

        $cliente = [];
        if (count($resultados) == 1) {
            $clienteModel = new ClientModel();

            $clienteModel->setIdCliente(Functions::encodeId64($resultados[0]->id_cliente));
            $clienteModel->setNome($resultados[0]->nome_cliente);
            $clienteModel->setEmail($resultados[0]->email_cliente);
            $clienteModel->setMovel($resultados[0]->movel_cliente);
            $clienteModel->setTelefone($resultados[0]->telefone_cliente);
            $clienteModel->setMorada($resultados[0]->morada_cliente);
            $clienteModel->setCidade($resultados[0]->cidade_cliente);
            $clienteModel->setAtivo($resultados[0]->cliente_ativo);
            $clienteModel->setDataCricao($resultados[0]->data_criacao_cliente);
            $clienteModel->setDataAtualizacao($resultados[0]->data_atualizacao_cliente);
            $clienteModel->setDataEliminacao($resultados[0]->data_eliminacao_cliente);
            $cliente[] = $clienteModel;
        }

        return $cliente;
    }

    public function updateClient(ClientModel $clienteModel)
    {
        $daoCrud = new DaoCrudModel();
        $parametros = [
            ':id_cliente' => $clienteModel->getIdCliente(),
            ':nome_cliente' => $clienteModel->getNome(),
            ':email_cliente' => $clienteModel->getEmail(),
            ':movel_cliente' => $clienteModel->getMovel(),
            ':telefone_cliente' => $clienteModel->getTelefone(),
            ':morada_cliente' => $clienteModel->getMorada(),
            ':cidade_cliente' => $clienteModel->getCidade(),
        ];

        $sql = "UPDATE clientes SET nome_cliente = :nome_cliente, email_cliente = :email_cliente, movel_cliente = :movel_cliente, telefone_cliente = :telefone_cliente, morada_cliente = :morada_cliente, cidade_cliente = :cidade_cliente  where id_cliente = :id_cliente";
        $resultado = $daoCrud->update($sql, $parametros);
        return $resultado;
    }

    public function createNewClient(ClientModel $clienteModel)
    {

        $daoCrud = new DaoCrudModel();
        $parametros = [
            ':nome_cliente' => $clienteModel->getNome(),
            ':email_cliente' => $clienteModel->getEmail(),
            ':movel_cliente' => $clienteModel->getMovel(),
            ':telefone_cliente' => $clienteModel->getTelefone(),
            ':morada_cliente' => $clienteModel->getMorada(),
            ':cidade_cliente' => $clienteModel->getCidade(),
        ];

        $sql = "INSERT INTO clientes (nome_cliente, email_cliente, movel_cliente, telefone_cliente, morada_cliente, cidade_cliente) VALUES (:nome_cliente, :email_cliente, :movel_cliente, :telefone_cliente, :morada_cliente, :cidade_cliente)";
        $resultado = $daoCrud->insert($sql, $parametros);

        return $resultado;
    }
    public function softDeleteClient(ClientModel $clienteModel)
    {
        $daoCrud = new DaoCrudModel();
        $parametros = [
            ':id_cliente' => $clienteModel->getIdCliente(),
        ];

        $sql = "CALL softDeleteClient(:id_cliente) ";
        $resultado = $daoCrud->callSP($sql, $parametros);
        return $resultado;
    }
    public function recoveryClient(ClientModel $clienteModel)
    {
        $daoCrud = new DaoCrudModel();
        $parametros = [
            ':id_cliente' => $clienteModel->getIdCliente(),
        ];

        $sql = "CALL ativarClientFromSoftDelete(:id_cliente) ";
        $resultado = $daoCrud->callSP($sql, $parametros);
        return $resultado;
    }
    public function getHistoryClients()
    {
        $daoCrud = new DaoCrudModel();
        $parametros = [':cliente_ativo' => 0];
        $resultados =  $daoCrud->select("SELECT * FROM clientes WHERE cliente_ativo = :cliente_ativo", $parametros);

        $cliente = [];
        foreach ($resultados as $v) {
            $clienteModel = new ClientModel();
            $clienteModel->setIdCliente(Functions::encodeId64($v->id_cliente));
            $clienteModel->setNome($v->nome_cliente);
            $clienteModel->setEmail($v->email_cliente);
            $clienteModel->setMovel($v->movel_cliente);
            $clienteModel->setTelefone($v->telefone_cliente);
            $clienteModel->setMorada($v->morada_cliente);
            $clienteModel->setCidade($v->cidade_cliente);
            $clienteModel->setAtivo($v->cliente_ativo);
            $clienteModel->setDataCricao($v->data_criacao_cliente);
            $clienteModel->setDataAtualizacao($v->data_atualizacao_cliente);
            $clienteModel->setDataEliminacao($v->data_eliminacao_cliente);
            $cliente[] = $clienteModel;
        }
        return $cliente;
    }
    public function getDeletedClient(ClientModel $clienteModel)
    {
        $daoCrud = new DaoCrudModel();
        $parametros = [':id_cliente' => $clienteModel->getIdCliente(), ':cliente_ativo' => 0];
        $sql = "SELECT * FROM clientes WHERE id_cliente = :id_cliente and cliente_ativo = :cliente_ativo";

        $resultados =  $daoCrud->select($sql, $parametros);

        $cliente = [];
        if (count($resultados) == 1) {
            $clienteModel = new ClientModel();
            $clienteModel->setIdCliente(Functions::encodeId64($resultados[0]->id_cliente));
            $clienteModel->setNome($resultados[0]->nome_cliente);
            $clienteModel->setEmail($resultados[0]->email_cliente);
            $clienteModel->setMovel($resultados[0]->movel_cliente);
            $clienteModel->setTelefone($resultados[0]->telefone_cliente);
            $clienteModel->setMorada($resultados[0]->morada_cliente);
            $clienteModel->setCidade($resultados[0]->cidade_cliente);
            $clienteModel->setAtivo($resultados[0]->cliente_ativo);
            $clienteModel->setDataCricao($resultados[0]->data_criacao_cliente);
            $clienteModel->setDataAtualizacao($resultados[0]->data_atualizacao_cliente);
            $clienteModel->setDataEliminacao($resultados[0]->data_eliminacao_cliente);
            $cliente[] = $clienteModel;
        }

        return $cliente;
    }
    public function deleteClient(ClientModel $clienteModel)
    {
        $daoCrud = new DaoCrudModel();
        $parametros = [
            ':id_cliente' => $clienteModel->getIdCliente(),
            ':cliente_ativo' => 0
        ];

        $sql = "DELETE from clientes where id_cliente = :id_cliente and cliente_ativo = :cliente_ativo ";
        $resultado = $daoCrud->delete($sql, $parametros);
        return $resultado;
    }
}
