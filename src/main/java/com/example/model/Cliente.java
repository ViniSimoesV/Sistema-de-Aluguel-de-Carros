package com.example.model;

import java.util.List;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;
import jakarta.persistence.Column;

@Introspected
@MappedEntity
public class Cliente {

    @Id
    @Column(name = "cpf", length = 14) 
    private String cpf;

    private String nome;
    private String endereco;
    private String rg;
    private String emprego;

    // Mapeados como coleções básicas (precisa de suporte do banco ou conversão)
    private List<String> entidadeEmpregadora;
    private List<Double> rendimento;

    // Relacionamento com a classe Pedido (Um cliente tem vários pedidos)
    //@Relation(value = Relation.Kind.ONE_TO_MANY, mappedBy = "cliente")
    //private List<Pedido> listaPedido;

    // Construtores, Getters e Setters
    // 1. CONSTRUTOR VAZIO (Obrigatório para o Micronaut/Hibernate)
    public Cliente() {
    }

    // 2. CONSTRUTOR COM ARGUMENTOS (O que a Facade está tentando usar)
    public Cliente(String cpf, String nome, String rg, String emprego) {
        this.cpf = cpf;
        this.nome = nome;
        this.rg = rg;
        this.emprego = emprego;
    }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getRg() { return rg; }
    public void setRg(String rg) { this.rg = rg; }

    public String getEmprego() { return emprego; }
    public void setEmprego(String emprego) { this.emprego = emprego; }

    public List<String> getEntidadeEmpregadora() { return entidadeEmpregadora; }
    public void setEntidadeEmpregadora(List<String> entidadeEmpregadora) { this.entidadeEmpregadora = entidadeEmpregadora; }

    public List<Double> getRendimento() { return rendimento; }
    public void setRendimento(List<Double> rendimento) { this.rendimento = rendimento; }

    //public List<Pedido> getListaPedido() { return listaPedido; }
    //public void setListaPedido(List<Pedido> listaPedido) { this.listaPedido = listaPedido; }
}
