package com.example.controller;

import java.util.List;

import com.example.facade.ClienteFacade;
import com.example.model.Agente;

import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Put;
import io.micronaut.http.annotation.Status;
import io.micronaut.http.server.cors.CrossOrigin;

@Controller("/agentes")
public class AgenteController {

    private final ClienteFacade facade;

    public AgenteController(ClienteFacade facade) {
        this.facade = facade;
    }

    @Post
    public Agente create(@Body Agente agente) {
        return facade.salvarAgente(agente);
    }

    @Get
    public List<Agente> readAll() {
        return facade.listarTodosAgentes();
    }

    @Put("/{cnpj}")
    public Agente update(@PathVariable String cnpj, @Body Agente agente) {
        agente.setCnpj(cnpj);
        return facade.salvarAgente(agente);
    }

    @Get("/{cnpj}")
    public Agente readOne(@PathVariable String cnpj) {
        Agente agente = facade.buscarAgente(cnpj);
        if (agente == null) throw new io.micronaut.http.exceptions.HttpStatusException(HttpStatus.NOT_FOUND, "Agente não encontrado");
        return agente;
}

    @Delete("/{cnpj}")
    @Status(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String cnpj) {
        facade.deletarAgente(cnpj);
    }
}
