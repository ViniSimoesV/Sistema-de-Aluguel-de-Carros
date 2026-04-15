package com.example.Controller;

import java.util.Date;
import java.util.List;
import io.micronaut.core.annotation.Introspected;
import io.micronaut.core.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Introspected
public record ClienteDTO(
    @NotBlank String cpf,
    @NotBlank String nome,
    @NotBlank String rg,
    @NotBlank String telefone,
    @NotBlank @Email String email,
    @NotBlank String senha,
    
    // Campos de Perfil Profissional
    @NotBlank String emprego,
    @Nullable List<String> entidadeEmpregadora,
    @Nullable Double rendimento,
    
    // Campo de Data de Nascimento
    @NotNull Date dataNascimento, 

    // Campos de Endereço
    @NotBlank String ruaCliente,
    @NotBlank String numeroCliente,
    @NotBlank String bairroCliente,
    @Nullable String complementoCliente,
    @NotBlank String cidadeCliente
) {}
