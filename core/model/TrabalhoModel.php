<?php
namespace core\model;

class TrabalhoModel extends ColaboradorModel
{
    private $idTrabalho;
    private $idCliente;
    private $idColaborador;
    private $nomeTrabalho;
    private $descricao;
    private $moradaTrabalho;
    private $estadoTrabalho;
    private $motivoPendencia;
    private $dataEstimadaInicio;
    private $dataEstimadaFim;
    private $percentagemInicioFimTrabalho;
    private $dataCriacaoTrabalho;
    private $dataAtualizacaoTrabalho;
    private $dataElimicacaoTrabalho;
    private $trabalhoAtivo;

    /**
     * Get the value of idTrabalho
     */ 
    public function getIdTrabalho()
    {
        return $this->idTrabalho;
    }

    /**
     * Set the value of idTrabalho
     *
     * @return  self
     */ 
    public function setIdTrabalho($idTrabalho)
    {
        $this->idTrabalho = $idTrabalho;

        return $this;
    }

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
     * Get the value of nomeTrabalho
     */ 
    public function getNomeTrabalho()
    {
        return $this->nomeTrabalho;
    }

    /**
     * Set the value of nomeTrabalho
     *
     * @return  self
     */ 
    public function setNomeTrabalho($nomeTrabalho)
    {
        $this->nomeTrabalho = $nomeTrabalho;

        return $this;
    }

    /**
     * Get the value of descricao
     */ 
    public function getDescricao()
    {
        return $this->descricao;
    }

    /**
     * Set the value of descricao
     *
     * @return  self
     */ 
    public function setDescricao($descricao)
    {
        $this->descricao = $descricao;

        return $this;
    }

    /**
     * Get the value of moaradaTrabalho
     */ 
    public function getMoradaTrabalho()
    {
        return $this->moradaTrabalho;
    }

    /**
     * Set the value of moaradaTrabalho
     *
     * @return  self
     */ 
    public function setMoradaTrabalho($moradaTrabalho)
    {
        $this->moradaTrabalho = $moradaTrabalho;

        return $this;
    }

    /**
     * Get the value of estadoTrabalho
     */ 
    public function getEstadoTrabalho()
    {
        return $this->estadoTrabalho;
    }

    /**
     * Set the value of estadoTrabalho
     *
     * @return  self
     */ 
    public function setEstadoTrabalho($estadoTrabalho)
    {
        $this->estadoTrabalho = $estadoTrabalho;

        return $this;
    }

    /**
     * Get the value of motivoPendencia
     */ 
    public function getMotivoPendencia()
    {
        return $this->motivoPendencia;
    }

    /**
     * Set the value of motivoPendencia
     *
     * @return  self
     */ 
    public function setMotivoPendencia($motivoPendencia)
    {
        $this->motivoPendencia = $motivoPendencia;

        return $this;
    }

    /**
     * Get the value of dataCriacaoTrabalho
     */ 
    public function getDataCriacaoTrabalho()
    {
        return $this->dataCriacaoTrabalho;
    }

    /**
     * Set the value of dataCriacaoTrabalho
     *
     * @return  self
     */ 
    public function setDataCriacaoTrabalho($dataCriacaoTrabalho)
    {
        $this->dataCriacaoTrabalho = $dataCriacaoTrabalho;

        return $this;
    }

    /**
     * Get the value of dataAtualizacaoTrabalho
     */ 
    public function getDataAtualizacaoTrabalho()
    {
        return $this->dataAtualizacaoTrabalho;
    }

    /**
     * Set the value of dataAtualizacaoTrabalho
     *
     * @return  self
     */ 
    public function setDataAtualizacaoTrabalho($dataAtualizacaoTrabalho)
    {
        $this->dataAtualizacaoTrabalho = $dataAtualizacaoTrabalho;

        return $this;
    }

    /**
     * Get the value of dataElimicacaoTrabalho
     */ 
    public function getDataElimicacaoTrabalho()
    {
        return $this->dataElimicacaoTrabalho;
    }

    /**
     * Set the value of dataElimicacaoTrabalho
     *
     * @return  self
     */ 
    public function setDataElimicacaoTrabalho($dataElimicacaoTrabalho)
    {
        $this->dataElimicacaoTrabalho = $dataElimicacaoTrabalho;

        return $this;
    }

    /**
     * Get the value of dataEstimadaInicio
     */ 
    public function getDataEstimadaInicio()
    {
        return $this->dataEstimadaInicio;
    }

    /**
     * Set the value of dataEstimadaInicio
     *
     * @return  self
     */ 
    public function setDataEstimadaInicio($dataEstimadaInicio)
    {
        $this->dataEstimadaInicio = $dataEstimadaInicio;

        return $this;
    }

    /**
     * Get the value of dataEstimadaFim
     */ 
    public function getDataEstimadaFim()
    {
        return $this->dataEstimadaFim;
    }

    /**
     * Set the value of dataEstimadaFim
     *
     * @return  self
     */ 
    public function setDataEstimadaFim($dataEstimadaFim)
    {
        $this->dataEstimadaFim = $dataEstimadaFim;

        return $this;
    }

    /**
     * Get the value of percentagemInicioFimTrabalho
     */ 
    public function getPercentagemInicioFimTrabalho()
    {
        return $this->percentagemInicioFimTrabalho;
    }

    /**
     * Set the value of percentagemInicioFimTrabalho
     *
     * @return  self
     */ 
    public function setPercentagemInicioFimTrabalho($percentagemInicioFimTrabalho)
    {
        $this->percentagemInicioFimTrabalho = $percentagemInicioFimTrabalho;

        return $this;
    }

    /**
     * Get the value of trabalhoAtivo
     */ 
    public function getTrabalhoAtivo()
    {
        return $this->trabalhoAtivo;
    }

    /**
     * Set the value of trabalhoAtivo
     *
     * @return  self
     */ 
    public function setTrabalhoAtivo($trabalhoAtivo)
    {
        $this->trabalhoAtivo = $trabalhoAtivo;

        return $this;
    }
}