package com.example.Controller;

import java.util.Date;

import io.micronaut.core.annotation.Introspected;
import jakarta.validation.constraints.NotBlank;

@Introspected
public record ClienteDTO(
    @NotBlank String cpf,
    @NotBlank String nome,
    @NotBlank String rg,
    @NotBlank String emprego,
    @NotBlank String telefone,
    @NotBlank Date dataNascimento
) {}