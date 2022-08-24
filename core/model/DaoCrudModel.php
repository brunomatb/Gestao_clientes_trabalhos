<?php

namespace core\model;

use core\model\Conexao;
use Exception;
use PDO;
use PDOException;

class DaoCrudModel
{

    //metodo select

    public function select($sql, $parametros = null)
    {
        $resultados = null;
        if (!preg_match("/^select/i", $sql)) {
            return;
        }
        try {
            $ligacao = new Conexao();
            $executar = $ligacao->ligar()->prepare($sql);
            if ($parametros != null) {
                $executar->execute($parametros);
                $resultados = $executar->fetchAll(PDO::FETCH_CLASS);
            } else {
                $executar->execute();
                $resultados = $executar->fetchAll(PDO::FETCH_CLASS);
            }
        } catch (PDOException $e) {
            return false;
        } finally {
            $ligacao->desligar();
        }

        return $resultados;
    }
    public function delete($sql, $parametros = null)
    {
        $executar = "";
        if (!preg_match("/^delete/i", $sql)) {
            return;
        }
        try {
            $ligacao = new Conexao();
            $executar = $ligacao->ligar()->prepare($sql);
            if ($parametros != null) {
                $executar->execute($parametros);
            } else {
                $executar->execute();
            }
        } catch (PDOException $e) {
            return false;
        } finally {
            $ligacao->desligar();
        }
        return $executar;
    }
    public function update($sql, $parametros = null)
    {
        $executar = null;
        if (!preg_match("/^update/i", $sql)) {
            return;
        }
        try {
            $ligacao = new Conexao();
            $executar = $ligacao->ligar()->prepare($sql);
            if ($parametros != null) {
                $executar->execute($parametros);
            } else {
                $executar->execute();
            }
        } catch (PDOException $e) {
            return false;
        } finally {
            $ligacao->desligar();
        }
        return $executar;
    }

    public function insert($sql, $parametros = null)
    {
        $resultado = null;
        if (!preg_match("/^insert/i", $sql)) {
            return;
        }
        try {
            $ligacao = new Conexao();
            $executar = $ligacao->ligar()->prepare($sql);
            if ($parametros != null) {
                $resultado = $executar->execute($parametros);
            } else {
                $resultado = $executar->execute();
            }
        } catch (PDOException $e) {
            return false;
        } finally {
            $ligacao->desligar();
        }
        return $resultado;
    }
    public function callSP($sql, $parametros = null)
    {

        if (!preg_match("/^call/i", $sql)) {
            return;
        }
        $resultado = null;
        try {
            $ligacao = new Conexao();
            $executar = $ligacao->ligar()->prepare($sql);
            if ($parametros != null) {
                $resultado = $executar->execute($parametros);
                $countResultados = $executar->fetchAll(PDO::FETCH_OBJ);
                if (count($countResultados) > 0) {
                    $resultado = $countResultados;
                }
            } else {
                $resultado = $executar->execute();
                $countResultados = $executar->fetchAll(PDO::FETCH_OBJ);
                if (count($countResultados) > 0) {
                    $resultado = $countResultados;
                }
            }
        } catch (PDOException $e) {
            return false;
        } finally {
            $ligacao->desligar();
        }
        return $resultado;
    }

    public function create($sql, $parametros = null)
    {
        $executar = null;
        if (!preg_match("/^DROP EVENT/i", $sql)) {
            return;
        }
        try {
            $ligacao = new Conexao();
            $executar = $ligacao->ligar()->prepare($sql);
            if ($parametros != null) {
                $executar->execute($parametros);
            } else {
                $executar->execute();
            }
        } catch (PDOException $e) {
            echo $e;
            return false;
        } finally {
            $ligacao->desligar();
        }
        return $executar;
    }
}
