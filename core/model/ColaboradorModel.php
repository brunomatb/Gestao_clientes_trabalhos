<?php
namespace core\model;

class ColaboradorModel extends ClientModel
{
    private $idColaborador;
    private $nomeColaborador;
    private $emailColaborador;
    private $moradaColaborador;
    private $cidadeColaborador;
    private $movelColaborador;
    private $telefoneColaborador;
    private $dataCriacaoColaborador;
    private $dataAtalizacaoColaborador;
    private $dataElimicacaoColaborador;


    /**
     * Get the value of idColaborador
     */ 
    public function getIdColaborador()
    {
        return $this->idColaborador;
    }

    /**
     * Set the value of idColaborador
     *
     * @return  self
     */ 
    public function setIdColaborador($idColaborador)
    {
        $this->idColaborador = $idColaborador;

        return $this;
    }

    /**
     * Get the value of nomeColaborador
     */ 
    public function getNomeColaborador()
    {
        return $this->nomeColaborador;
    }

    /**
     * Set the value of nomeColaborador
     *
     * @return  self
     */ 
    public function setNomeColaborador($nomeColaborador)
    {
        $this->nomeColaborador = $nomeColaborador;

        return $this;
    }

    /**
     * Get the value of emailColaborador
     */ 
    public function getEmailColaborador()
    {
        return $this->emailColaborador;
    }

    /**
     * Set the value of emailColaborador
     *
     * @return  self
     */ 
    public function setEmailColaborador($emailColaborador)
    {
        $this->emailColaborador = $emailColaborador;

        return $this;
    }

    /**
     * Get the value of moradaColaborador
     */ 
    public function getMoradaColaborador()
    {
        return $this->moradaColaborador;
    }

    /**
     * Set the value of moradaColaborador
     *
     * @return  self
     */ 
    public function setMoradaColaborador($moradaColaborador)
    {
        $this->moradaColaborador = $moradaColaborador;

        return $this;
    }

    /**
     * Get the value of cidadeColaborador
     */ 
    public function getCidadeColaborador()
    {
        return $this->cidadeColaborador;
    }

    /**
     * Set the value of cidadeColaborador
     *
     * @return  self
     */ 
    public function setCidadeColaborador($cidadeColaborador)
    {
        $this->cidadeColaborador = $cidadeColaborador;

        return $this;
    }

    /**
     * Get the value of movelColaborador
     */ 
    public function getMovelColaborador()
    {
        return $this->movelColaborador;
    }

    /**
     * Set the value of movelColaborador
     *
     * @return  self
     */ 
    public function setMovelColaborador($movelColaborador)
    {
        $this->movelColaborador = $movelColaborador;

        return $this;
    }

    /**
     * Get the value of telefoneCliente
     */ 
    public function getTelefoneColaborador()
    {
        return $this->telefoneColaborador;
    }

    /**
     * Set the value of telefoneCliente
     *
     * @return  self
     */ 
    public function setTelefoneColaborador($telefoneColaborador)
    {
        $this->telefoneColaborador = $telefoneColaborador;

        return $this;
    }

    /**
     * Get the value of dataCriacaoColaborador
     */ 
    public function getDataCriacaoColaborador()
    {
        return $this->dataCriacaoColaborador;
    }

    /**
     * Set the value of dataCriacaoColaborador
     *
     * @return  self
     */ 
    public function setDataCriacaoColaborador($dataCriacaoColaborador)
    {
        $this->dataCriacaoColaborador = $dataCriacaoColaborador;

        return $this;
    }

    /**
     * Get the value of dataAtalizacaoColaborador
     */ 
    public function getDataAtalizacaoColaborador()
    {
        return $this->dataAtalizacaoColaborador;
    }

    /**
     * Set the value of dataAtalizacaoColaborador
     *
     * @return  self
     */ 
    public function setDataAtalizacaoColaborador($dataAtalizacaoColaborador)
    {
        $this->dataAtalizacaoColaborador = $dataAtalizacaoColaborador;

        return $this;
    }

    /**
     * Get the value of dataElimicacaoColaborador
     */ 
    public function getDataElimicacaoColaborador()
    {
        return $this->dataElimicacaoColaborador;
    }

    /**
     * Set the value of dataElimicacaoColaborador
     *
     * @return  self
     */ 
    public function setDataElimicacaoColaborador($dataElimicacaoColaborador)
    {
        $this->dataElimicacaoColaborador = $dataElimicacaoColaborador;

        return $this;
    }
}