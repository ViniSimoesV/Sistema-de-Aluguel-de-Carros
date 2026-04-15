package com.example.model;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;

@Introspected
@MappedEntity(value = "carro")
public class Carro {

    @Id
    private Long matricula;
    private Integer ano;
    private String marca;
    private String modelo;
    private String placa;
    private String proprietario;
    private String cnpjAgente;
    private Integer numLugares;     
    private String tipoCombustivel; 
    private String tipoCambio;

    public Carro() {}

    public Carro(Long matricula, Integer ano, String marca, String modelo, String placa, String proprietario, String cnpj, Integer numLugares, String tipoCombustivel, String tipoCambio) {
        this.matricula = matricula;
        this.ano = ano;
        this.marca = marca;
        this.modelo = modelo;
        this.placa = placa;
        this.proprietario = proprietario;
        this.cnpjAgente = cnpj;
        this.numLugares = numLugares;
        this.tipoCombustivel = tipoCombustivel;
        this.tipoCambio = tipoCambio;
    }

    public Long getMatricula() { return matricula; }
    public void setMatricula(Long matricula) { this.matricula = matricula; }

    public Integer getAno() { return ano; }
    public void setAno(Integer ano) { this.ano = ano; }

    public String getMarca() { return marca; }
    public void setMarca(String marca) { this.marca = marca; }

    public String getModelo() { return modelo; }
    public void setModelo(String modelo) { this.modelo = modelo; }

    public String getPlaca() { return placa; }
    public void setPlaca(String placa) { this.placa = placa; }

    public Integer getNumLugares() { return numLugares; }
    public void setNumLugares(Integer numLugares) { this.numLugares = numLugares; }

    public String getTipoCombustivel() { return tipoCombustivel; }
    public void setTipoCombustivel(String tipoCombustivel) { this.tipoCombustivel = tipoCombustivel; }

    public String getTipoCambio() { return tipoCambio; }
    public void setTipoCambio(String tipoCambio) { this.tipoCambio = tipoCambio; }


    public String getProprietario() { return proprietario; }
    public void setProprietario(String proprietario) { this.proprietario = proprietario; }
    
    public String getCnpjAgente() { return cnpjAgente; }
    public void setCnpjAgente(String cnpj) { this.cnpjAgente = cnpj; }
}