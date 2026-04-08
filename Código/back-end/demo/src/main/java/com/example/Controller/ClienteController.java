package com.example.Controller;

import com.example.Facade.ClienteFacade;

import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.HttpStatus;
import java.util.List;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Put;
import jakarta.validation.Valid;

@Controller("/clientes")
public class ClienteController {

    private final ClienteFacade clienteFacade;

    public ClienteController(ClienteFacade clienteFacade) {
        this.clienteFacade = clienteFacade;
    }



    @Post("/")
    public ClienteDTO salvar(@Body @Valid ClienteDTO dto) {
        return clienteFacade.criarCliente(dto);
    }

    @Put("/{cpf}")
    public ClienteDTO atualizar(@PathVariable String cpf, @Body @Valid ClienteDTO dto) {
        return clienteFacade.atualizarCliente(cpf, dto);
    }

    @Get
    public List<ClienteDTO> listar() {
        return clienteFacade.listarTodosClientes();
    }

    @Delete("/{cpf}")
    @Status(HttpStatus.NO_CONTENT) // Retorna o código 204 (Sucesso, mas sem corpo)
    public void deletar(@PathVariable String cpf) {
        clienteFacade.deletarCliente(cpf);
    }
}
