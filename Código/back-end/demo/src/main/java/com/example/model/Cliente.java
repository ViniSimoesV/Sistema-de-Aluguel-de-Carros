package com.example.model;

import java.util.Date;
import java.util.List;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;
import io.micronaut.data.annotation.Relation;
import jakarta.persistence.Column;

@Introspected
@MappedEntity
public class Cliente {

    @Id
    @Column(name = "cpf", length = 14) 
    private String cpf;

    private String nome;
    private String rg;

    private String telefone;
    private String email;
    private String senha;

    private String emprego;
    private Date dataNascimento;

    private String ruaCliente;
    private String numeroCliente;
    private String bairroCliente;
    private String complementoCliente;
    private String cidadeCliente;


    // Mapeados como coleções básicas (precisa de suporte do banco ou conversão)
    private List<String> entidadeEmpregadora;
    private Double rendimento;

    // Relacionamento com a classe Pedido (Um cliente tem vários pedidos)
    @Relation(value = Relation.Kind.ONE_TO_MANY, mappedBy = "cliente")
    private List<Pedido> listaPedido;

    // Construtores, Getters e Setters
    // 1. CONSTRUTOR VAZIO (Obrigatório para o Micronaut/Hibernate)
    public Cliente() {
    }

    // 2. CONSTRUTOR COM ARGUMENTOS (O que a Facade está tentando usar)
    public Cliente(String cpf, String nome, String rg, String emprego, String telefone, Date data, String email, String senha) {
        this.cpf = cpf;
        this.nome = nome;
        this.rg = rg;
        this.emprego = emprego;
        this.telefone = telefone;
        this.dataNascimento = data;
        this.email = email;
        this.senha = senha;
    }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getruaCliente() { return ruaCliente; }
    public void setruaCliente(String ruaCliente) { this.ruaCliente = ruaCliente; }

    public String getnumeroCliente() { return numeroCliente; }
    public void setnumeroCliente(String numeroCliente) { this.numeroCliente = numeroCliente; }

    public String getbairroCliente() { return bairroCliente; }
    public void setbairroCliente(String bairroCliente) { this.bairroCliente = bairroCliente; }

    public String getcomplementoCliente() { return complementoCliente; }
    public void setcomplementoCliente(String complementoCliente) { this.complementoCliente = complementoCliente; }

    public String getcidadeCliente() { return cidadeCliente; }
    public void setcidadeCliente(String cidadeCliente) { this.cidadeCliente = cidadeCliente; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getRg() { return rg; }
    public void setRg(String rg) { this.rg = rg; }

    public Date getDataNascimento() { return dataNascimento; }
    public void setDataNascimento(Date data) { this.dataNascimento = data; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }


    public String getEmprego() { return emprego; }
    public void setEmprego(String emprego) { this.emprego = emprego; }

    public List<String> getEntidadeEmpregadora() { return entidadeEmpregadora; }
    public void setEntidadeEmpregadora(List<String> entidadeEmpregadora) { this.entidadeEmpregadora = entidadeEmpregadora; }

    public Double getRendimento() { return rendimento; }
    public void setRendimento(Double rendimento) { this.rendimento = rendimento; }

    public List<Pedido> getListaPedido() { return listaPedido; }
    public void setListaPedido(List<Pedido> listaPedido) { this.listaPedido = listaPedido; }
}
