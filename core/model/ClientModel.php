<?php
namespace core\model;

class ClientModel
{
    private $idCliente;
    private $nome;
    private $email;
    private $movel;
    private $telefone;
    private $morada;
    private $cidade;
    private $ativo;
    private $dataCricao;
    private $dataAtualizacao;
    private $dataEliminacao;


    /**
     * Get the value of idCliente
     */ 
    
    public function getIdCliente()
    {
        return $this->idCliente;
    }

    /**
     * Set the value of idCliente
     *
     * @return  self
     */ 
    public function setIdCliente($idCliente)
    {
        
        $this->idCliente = $idCliente;

        return $this;
    }

    /**
     * Get the value of nome
     */ 
    public function getNome()
    {
        
        return $this->nome;
    }

    /**
     * Set the value of nome
     *
     * @return  self
     */ 
    public function setNome($nome)
    {
        $this->nome = $nome;

        return $this;
    }

    /**
     * Get the value of email
     */ 
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set the value of email
     *
     * @return  self
     */ 
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get the value of movel
     */ 
    public function getMovel()
    {
        return $this->movel;
    }

    /**
     * Set the value of movel
     *
     * @return  self
     */ 
    public function setMovel($movel)
    {
        $this->movel = $movel;

        return $this;
    }

    /**
     * Get the value of telefone
     */ 
    public function getTelefone()
    {
        return $this->telefone;
    }

    /**
     * Set the value of telefone
     *
     * @return  self
     */ 
    public function setTelefone($telefone)
    {
        $this->telefone = $telefone;

        return $this;
    }

    /**
     * Get the value of morada
     */ 
    public function getMorada()
    {
        return $this->morada;
    }

    /**
     * Set the value of morada
     *
     * @return  self
     */ 
    public function setMorada($morada)
    {
        $this->morada = $morada;

        return $this;
    }

    /**
     * Get the value of cidade
     */ 
    public function getCidade()
    {
        return $this->cidade;
    }

    /**
     * Set the value of cidade
     *
     * @return  self
     */ 
    public function setCidade($cidade)
    {
        $this->cidade = $cidade;

        return $this;
    }

    /**
     * Get the value of ativo
     */ 
    public function getAtivo()
    {
        return $this->ativo;
    }

    /**
     * Set the value of ativo
     *
     * @return  self
     */ 
    public function setAtivo($ativo)
    {
        $this->ativo = $ativo;

        return $this;
    }

    /**
     * Get the value of dataCricao
     */ 
    public function getDataCricao()
    {
        return $this->dataCricao;
    }

    /**
     * Set the value of dataCricao
     *
     * @return  self
     */ 
    public function setDataCricao($dataCricao)
    {
        $this->dataCricao = $dataCricao;

        return $this;
    }

    /**
     * Get the value of dataAtualizacao
     */ 
    public function getDataAtualizacao()
    {
        return $this->dataAtualizacao;
    }

    /**
     * Set the value of dataAtualizacao
     *
     * @return  self
     */ 
    public function setDataAtualizacao($dataAtualizacao)
    {
        $this->dataAtualizacao = $dataAtualizacao;

        return $this;
    }

    /**
     * Get the value of dataEliminacao
     */ 
    public function getDataEliminacao()
    {
        return $this->dataEliminacao;
    }

    /**
     * Set the value of dataEliminacao
     *
     * @return  self
     */ 
    public function setDataEliminacao($dataEliminacao)
    {
        $this->dataEliminacao = $dataEliminacao;

        return $this;
    }
}