package com.example.Controller;

import com.example.Service.ClienteService;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;

@Controller("/auth")
public class AuthController {
    private final ClienteService clienteService;

    public AuthController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @Post("/login")
    public HttpResponse<?> login(@Body LoginDTO login) {
        return clienteService.buscarPorEmail(login.email())
            .filter(cliente -> cliente.getSenha().equals(login.senha()))
            .map(cliente -> HttpResponse.ok(cliente)) // Retorna os dados do cliente em caso de sucesso
            .orElse(HttpResponse.status(HttpStatus.UNAUTHORIZED));
    }
}

// DTO simples apenas para o login
record LoginDTO(String email, String senha) {}