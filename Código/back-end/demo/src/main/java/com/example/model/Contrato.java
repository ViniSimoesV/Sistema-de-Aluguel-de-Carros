package com.example.model;

import io.micronaut.core.annotation.Introspected;
import jakarta.persistence.Id;
import io.micronaut.data.annotation.MappedEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Introspected
@Entity 
@Table(name = "contrato") 
@MappedEntity(value = "contrato")
public class Contrato {

    @Id
    private Long idContrato;
    private String tipo;
    private Long idPedido;

    public Contrato() {}

    public Contrato(Long idContrato, String tipo, Long idPedido) {
        this.idContrato = idContrato;
        this.tipo = tipo;
        this.idPedido = idPedido;
    }

    public Long getIdContrato() { return idContrato; }
    public void setIdContrato(Long idContrato) { this.idContrato = idContrato; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public Long getIdPedido() { return idPedido; }
    public void setIdPedido(Long idPedido) { this.idPedido = idPedido; }
}
