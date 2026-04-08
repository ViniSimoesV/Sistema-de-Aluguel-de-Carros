package com.example.Controller;

import com.example.Facade.ClienteFacade;

import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Put;
import jakarta.validation.Valid;

@Controller("/clientes")
public class ClienteController {

    private final ClienteFacade clienteFacade;

    public ClienteController(ClienteFacade clienteFacade) {
        this.clienteFacade = clienteFacade;
    }

    @Post
    public ClienteDTO salvar(@Body @Valid ClienteDTO dto) {
        return clienteFacade.criarCliente(dto);
    }

    @Put("/{cpf}")
    public ClienteDTO atualizar(@PathVariable String cpf, @Body @Valid ClienteDTO dto) {
        return clienteFacade.atualizarCliente(cpf, dto);
    }
}
