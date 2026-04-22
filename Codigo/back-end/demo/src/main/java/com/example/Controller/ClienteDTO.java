package com.example.controller;

import java.time.LocalDate;
import io.micronaut.serde.annotation.Serdeable; 
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Serdeable 
public record ClienteDTO(
    @NotBlank String cpf,
    @NotBlank String nome,
    @NotBlank String rg,
    @NotBlank String emprego,
    @NotBlank String telefone,
    @NotNull LocalDate dataNascimento, 
    @NotBlank @Email String email, 
    @NotBlank String senha,
    
    @NotBlank String ruaCliente,
    @NotBlank String numeroCliente,
    @NotBlank String bairroCliente,
    @NotBlank String cidadeCliente,
    String complementoCliente, 
    Double rendimento 
) {}