package com.example.model;

import java.time.LocalDate;

import io.micronaut.core.annotation.Introspected;
import jakarta.persistence.Id;
import io.micronaut.data.annotation.MappedEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Introspected

@Entity
@Table(name = "pedido") 
@MappedEntity(value = "pedido")
public class Pedido {

    @Id
    private Long idPedido;
    private String cpfCliente;
    private String cnpjAgente;
    private Float valor;
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private String status;
    private Long matriculaCarro;

    public Pedido() {}

    public Pedido(Long idPedido, String cpfCliente, String cnpjAgente, Float valor, LocalDate dataInicio, LocalDate dataFim, String status, Long matriculaCarro) {
        this.idPedido = idPedido;
        this.cpfCliente = cpfCliente;
        this.cnpjAgente = cnpjAgente;
        this.valor = valor;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.status = status;
        this.matriculaCarro = matriculaCarro;
    }

    public Long getIdPedido() { return idPedido; }
    public void setIdPedido(Long idPedido) { this.idPedido = idPedido; }

    public String getCpfCliente() { return cpfCliente; }
    public void setCpfCliente(String cpfCliente) { this.cpfCliente = cpfCliente; }

    public String getCnpjAgente() { return cnpjAgente; }
    public void setCnpjAgente(String cnpjAgente) { this.cnpjAgente = cnpjAgente; }

    public Float getValor() { return valor; }
    public void setValor(Float valor) { this.valor = valor; }

    public LocalDate getDataInicio() { return dataInicio; }
    public void setDataInicio(LocalDate dataInicio) { this.dataInicio = dataInicio; }

    public LocalDate getDataFim() { return dataFim; }
    public void setDataFim(LocalDate dataFim) { this.dataFim = dataFim; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getMatriculaCarro() { return matriculaCarro; }
    public void setMatriculaCarro(Long matriculaCarro) { this.matriculaCarro = matriculaCarro; }
}