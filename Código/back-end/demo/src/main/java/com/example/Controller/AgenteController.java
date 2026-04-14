package com.example.Controller;

import com.example.Facade.ClienteFacade;
import com.example.model.Agente;
import io.micronaut.http.annotation.*;
import io.micronaut.http.HttpStatus;
import java.util.List;

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
