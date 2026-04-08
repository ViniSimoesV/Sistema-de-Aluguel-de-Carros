package com.example.Facade;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


import com.example.Controller.ClienteDTO;
import com.example.model.Cliente;
import com.example.Service.ClienteService;
import jakarta.inject.Singleton;

@Singleton
public class ClienteFacade {

    private final ClienteService clienteService;

    public ClienteFacade(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    public ClienteDTO criarCliente(ClienteDTO dto) {
        Cliente cliente = new Cliente(dto.cpf(), dto.nome(), dto.rg(), dto.emprego());
        Cliente salvo = clienteService.salvar(cliente);
        return new ClienteDTO(salvo.getCpf(), salvo.getNome(), salvo.getRg(), salvo.getEmprego());
    }

    public ClienteDTO atualizarCliente(String cpf, ClienteDTO dto) {
        Cliente cliente = new Cliente(cpf, dto.nome(), dto.rg(), dto.emprego());
        Cliente atualizado = clienteService.atualizar(cliente);
        return new ClienteDTO(atualizado.getCpf(), atualizado.getNome(), atualizado.getRg(), atualizado.getEmprego());
    }
    
    public List<ClienteDTO> listarTodosClientes() {
    Iterable<Cliente> clientes = clienteService.listarTodos();
    // Converte a lista de Model para DTO
    return StreamSupport.stream(clientes.spliterator(), false)
            .map(c -> new ClienteDTO(c.getCpf(), c.getNome(), c.getRg(), c.getEmprego()))
            .collect(Collectors.toList());
    }

    public void deletarCliente(String cpf) {
        clienteService.deletar(cpf);
    }
    // Outros métodos de listagem podem ser adicionados aqui seguindo a mesma lógica
}