package com.example.Controller;

import java.util.List;

import com.example.Facade.ClienteFacade;
import com.example.model.Carro;

import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Put;
import io.micronaut.http.annotation.Status;

@Controller("/carros")
public class CarroController {

    private final ClienteFacade facade;

    public CarroController(ClienteFacade facade) {
        this.facade = facade;
    }

    @Post
    public Carro create(@Body Carro carro) {
        return facade.salvarCarro(carro);
    }

    @Get
    public List<Carro> readAll() {
        return facade.listarTodosCarros();
    }

    @Put("/{matricula}")
    public Carro update(@PathVariable Long matricula, @Body Carro carro) {
        carro.setMatricula(matricula);
        return facade.salvarCarro(carro);
    }

    @Get("/{matricula}")
    public Carro readOne(@PathVariable Long matricula) {
        Carro carro = facade.buscarCarro(matricula);
        if (carro == null) throw new io.micronaut.http.exceptions.HttpStatusException(HttpStatus.NOT_FOUND, "Carro não encontrado");
        return carro;
    }

    @Delete("/{matricula}")
    @Status(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long matricula) {
        facade.deletarCarro(matricula);
    }
}