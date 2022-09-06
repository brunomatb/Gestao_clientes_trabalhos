<?php

namespace core\model;

use PDO;
use PDOException;

class Conexao
{

    private function connetion()
    {
        $ligacao = null;
        try {

            $ligacao = new PDO(
                'mysql:dbname=' . MYSQL_DATABASE . ';' .
                    'host=' . MYSQL_SERVER . ';' .
                    'charset=utf8',
                MYSQL_USER,
                MYSQL_PASS
            );
            array(PDO::ATTR_PERSISTENT => true);
        } catch (PDOException $e) {
            $ligacao = null;
        }

        return $ligacao;
    }

    public function ligar()
    {

        $conexao = new Conexao();
        $ligacao = $conexao->connetion();
        return $ligacao;
    }

    public function desligar()
    {

        $conexao = new Conexao();
        $conexao = $conexao->connetion();
        $conexao = null;
        return $conexao;
    }
}
