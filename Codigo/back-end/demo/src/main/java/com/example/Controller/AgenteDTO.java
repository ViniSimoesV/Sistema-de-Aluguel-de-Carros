package com.example.controller;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotBlank;

@Serdeable
public record AgenteDTO(
    @NotBlank String cnpj,
    @NotBlank String nome,
    @NotBlank String email,
    @NotBlank String telefone,
    @NotBlank String senha,
    @NotBlank String compe,
    @NotBlank String tipo
) {}