<?php
namespace core\model;

class UserModel
{
    private $idUser;
    private $email;
    private $pass;
    private $nome;
    private $fotoUser;
    private $purl;
    private $ativo;
    private $dataCriacaoUser;
    private $dataAtualizacaoUser;
    private $dataElimicacaoUser;


    /**
     * Get the value of idUser
     */ 
    public function getIdUuser()
    {
        return $this->idUser;
    }

    /**
     * Set the value of idUser
     *
     * @return  self
     */ 
    public function setIdUuser($idUser)
    {
        $this->idUser = $idUser;

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
     * Get the value of pass
     */ 
    public function getPass()
    {
        return $this->pass;
    }

    /**
     * Set the value of pass
     *
     * @return  self
     */ 
    public function setPass($pass)
    {
        $this->pass = $pass;

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
     * Get the value of fotoUser
     */ 
    public function getFotoUser()
    {
        return $this->fotoUser;
    }

    /**
     * Set the value of fotoUser
     *
     * @return  self
     */ 
    public function setFotoUser($fotoUser)
    {
        $this->fotoUser = $fotoUser;

        return $this;
    }

    /**
     * Get the value of purl
     */ 
    public function getPurl()
    {
        return $this->purl;
    }

    /**
     * Set the value of purl
     *
     * @return  self
     */ 
    public function setPurl($purl)
    {
        $this->purl = $purl;

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
     * Get the value of dataCriacaoUser
     */ 
    public function getDataCriacaoUser()
    {
        return $this->dataCriacaoUser;
    }

    /**
     * Set the value of dataCriacaoUser
     *
     * @return  self
     */ 
    public function setDataCriacaoUser($dataCriacaoUser)
    {
        $this->dataCriacaoUser = $dataCriacaoUser;

        return $this;
    }

    /**
     * Get the value of dataAtualizacaoUser
     */ 
    public function getDataAtualizacaoUser()
    {
        return $this->dataAtualizacaoUser;
    }

    /**
     * Set the value of dataAtualizacaoUser
     *
     * @return  self
     */ 
    public function setDataAtualizacaoUser($dataAtualizacaoUser)
    {
        $this->dataAtualizacaoUser = $dataAtualizacaoUser;

        return $this;
    }

    /**
     * Get the value of dataElimicacaoUser
     */ 
    public function getDataElimicacaoUser()
    {
        return $this->dataElimicacaoUser;
    }

    /**
     * Set the value of dataElimicacaoUser
     *
     * @return  self
     */ 
    public function setDataElimicacaoUser($dataElimicacaoUser)
    {
        $this->dataElimicacaoUser = $dataElimicacaoUser;

        return $this;
    }
}
