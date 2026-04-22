package com.example.controller;

import java.time.LocalDate;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Introspected
@Serdeable
public record ClienteDTO(
    @NotBlank String cpf,
    @NotBlank String nome,
    @NotBlank String rg,
    @NotBlank String emprego,
    @NotBlank String telefone,
    @NotBlank LocalDate dataNascimento,
    @NotBlank @Email String email, 
    @NotBlank String senha
) {}