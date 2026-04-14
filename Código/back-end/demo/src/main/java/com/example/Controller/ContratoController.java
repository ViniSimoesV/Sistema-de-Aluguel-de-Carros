package com.example.Controller;

import java.util.List;

import com.example.Facade.ClienteFacade;
import com.example.model.Agente;
import com.example.model.Contrato;

import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Put;
import io.micronaut.http.annotation.Status;

@Controller("/contratos")
public class ContratoController {

    private final ClienteFacade facade;

    public ContratoController(ClienteFacade facade) {
        this.facade = facade;
    }

    @Post
    public Contrato create(@Body Contrato contrato) {
        return facade.salvarContrato(contrato);
    }

    @Get
    public List<Contrato> readAll() {
        return facade.listarTodosContratos();
    }

    @Put("/{id}")
    public Contrato update(@PathVariable Long id, @Body Contrato contrato) {
        contrato.setIdContrato(id);
        return facade.salvarContrato(contrato);
    }

    @Get("/{id}")
    public Contrato readOne(@PathVariable Long id) {
        Contrato contrato = facade.buscarContrato(id);
        if (contrato == null) throw new io.micronaut.http.exceptions.HttpStatusException(HttpStatus.NOT_FOUND, "Contrato não encontrado");
        return contrato;
    }

    @Delete("/{id}")
    @Status(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        facade.deletarContrato(id);
    }
}
