<?php

namespace core\model;

use PDO;
use PDOException;

class Conexao
{

    private function connetion(): PDO
    {
        $ligacao = new PDO(
            'mysql:dbname=' . MYSQL_DATABASE . ';' .
                'host=' . MYSQL_SERVER . ';' .
                'charset=utf8',
            MYSQL_USER,
            MYSQL_PASS
        );
        array(PDO::ATTR_PERSISTENT => true);
        return $ligacao;
    }

    public function ligar()
    {
        try {
            $conexao = new Conexao();
            $ligacao = $conexao->connetion();
        } catch (PDOException $erro) {
            echo $erro->getMessage();
        }
        return $ligacao;
    }

    public function desligar()
    {
        try {
            $conexao = new Conexao();
            $conexao = $conexao->connetion();
            $conexao = null;
        } catch (PDOException $erro) {
            echo $erro->getMessage();
        }

        return $conexao;
    }
}
