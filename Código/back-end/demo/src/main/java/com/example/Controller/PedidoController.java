package com.example.Controller;

import java.util.List;

import com.example.Facade.ClienteFacade;
import com.example.model.Contrato;
import com.example.model.Pedido;

import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Put;
import io.micronaut.http.annotation.Status;

@Controller("/pedidos")
public class PedidoController {

    private final ClienteFacade facade;

    public PedidoController(ClienteFacade facade) {
        this.facade = facade;
    }

    @Post
    public Pedido create(@Body Pedido pedido) {
        return facade.salvarPedido(pedido);
    }

    @Get
    public List<Pedido> readAll() {
        return facade.listarTodosPedidos();
    }

    @Get("/{id}")
    public Pedido readOne(@PathVariable Long id) {
        Pedido pedido = facade.buscarPedido(id);
        if (pedido == null) throw new io.micronaut.http.exceptions.HttpStatusException(HttpStatus.NOT_FOUND, "Pedido não encontrado");
        return pedido;
    }

    @Put("/{id}")
    public Pedido update(@PathVariable Long id, @Body Pedido pedido) {
        pedido.setIdPedido(id);
        return facade.salvarPedido(pedido);
    }

    @Delete("/{id}")
    @Status(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        facade.deletarPedido(id);
    }
}
