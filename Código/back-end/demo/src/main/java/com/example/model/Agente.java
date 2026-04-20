package com.example.model;

import io.micronaut.core.annotation.Introspected;
import jakarta.persistence.Id;
import io.micronaut.data.annotation.MappedEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Introspected

@Entity 
@Table(name = "agente") 
@MappedEntity(value = "agente")
public class Agente {

    @Id
    private String cnpj;
    private String tipo;
    private String nome;
    private String compe;
    private String email;
    private String telefone;
    private String senha;


    public Agente() {}

    public Agente(String cnpj, String tipo, String senha, String nome, String compe, String email, String telefone) {
        this.cnpj = cnpj;
        this.tipo = tipo;
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.senha = senha;
        this.compe = compe;
        
    }

    public String getCnpj() { return cnpj; }
    public void setCnpj(String cnpj) { this.cnpj = cnpj; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }

    public String getCompe() { return compe; }
    public void setCompe(String compe) { this.compe = compe; }
}