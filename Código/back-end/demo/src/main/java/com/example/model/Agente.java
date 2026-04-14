package com.example.model;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;

@Introspected
@MappedEntity(value = "agente")
public class Agente {

    @Id
    private String cnpj;
    private String tipo;
    private String senha;
    private String nome;
    private String compe;

    public Agente() {}

    public Agente(String cnpj, String tipo, String senha, String nome, String compe) {
        this.cnpj = cnpj;
        this.tipo = tipo;
        this.senha = senha;
        this.nome = nome;
        this.compe = compe;
    }

    public String getCnpj() { return cnpj; }
    public void setCnpj(String cnpj) { this.cnpj = cnpj; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getCompe() { return compe; }
    public void setCompe(String compe) { this.compe = compe; }
}