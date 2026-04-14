package com.example.Facade;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import com.example.Controller.ClienteDTO;
import com.example.Service.AgenteService;
import com.example.Service.CarroService;
import com.example.Service.ClienteService;
import com.example.Service.ContratoService;
import com.example.Service.PedidoService;
import com.example.model.Agente;
import com.example.model.Carro;
import com.example.model.Cliente;
import com.example.model.Contrato;
import com.example.model.Pedido;

import jakarta.inject.Singleton;

@Singleton
public class ClienteFacade {

    private final ClienteService clienteService;
    private final PedidoService pedidoService;
    private final AgenteService agenteService;
    private final CarroService carroService;
    private final ContratoService contratoService;

    // O Micronaut injeta automaticamente todos os services no construtor
    public ClienteFacade(ClienteService clienteService, 
                         PedidoService pedidoService, 
                         AgenteService agenteService, 
                         CarroService carroService, 
                         ContratoService contratoService) {
        this.clienteService = clienteService;
        this.pedidoService = pedidoService;
        this.agenteService = agenteService;
        this.carroService = carroService;
        this.contratoService = contratoService;
    }

    // --- MÉTODOS DE CLIENTE ---
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
        return StreamSupport.stream(clienteService.listarTodos().spliterator(), false)
                .map(c -> new ClienteDTO(c.getCpf(), c.getNome(), c.getRg(), c.getEmprego()))
                .collect(Collectors.toList());
    }

    public void deletarCliente(String cpf) {
        clienteService.deletar(cpf);
    }

    // --- MÉTODOS DE AGENTE ---
    public Agente salvarAgente(Agente agente) {
        return agenteService.salvar(agente);
    }

    public List<Agente> listarTodosAgentes() {
        return StreamSupport.stream(agenteService.listarTodos().spliterator(), false)
                .collect(Collectors.toList());
    }

    public void deletarAgente(String cnpj) {
        agenteService.deletar(cnpj);
    }

    // --- MÉTODOS DE CARRO ---
    public Carro salvarCarro(Carro carro) {
        return carroService.salvar(carro);
    }

    public List<Carro> listarTodosCarros() {
        return StreamSupport.stream(carroService.listarTodos().spliterator(), false)
                .collect(Collectors.toList());
    }

    public void deletarCarro(Long matricula) {
        carroService.deletar(matricula);
    }

    // --- MÉTODOS DE PEDIDO ---
    public Pedido salvarPedido(Pedido pedido) {
        return pedidoService.salvar(pedido);
    }

    public List<Pedido> listarTodosPedidos() {
        return StreamSupport.stream(pedidoService.listarTodos().spliterator(), false)
                .collect(Collectors.toList());
    }

    public void deletarPedido(Long idPedido) {
        pedidoService.deletar(idPedido);
    }

    // --- MÉTODOS DE CONTRATO ---
    public Contrato salvarContrato(Contrato contrato) {
        return contratoService.salvar(contrato);
    }

    public List<Contrato> listarTodosContratos() {
        return StreamSupport.stream(contratoService.listarTodos().spliterator(), false)
                .collect(Collectors.toList());
    }

    public void deletarContrato(Long idContrato) {
        contratoService.deletar(idContrato);
    }

        // Métodos para buscar um único registro
    public Agente buscarAgente(String cnpj) {
        return agenteService.buscarPorCnpj(cnpj).orElse(null);
    }

    public Carro buscarCarro(Long matricula) {
        return carroService.buscarPorMatricula(matricula).orElse(null);
    }

    public Pedido buscarPedido(Long id) {
        return pedidoService.buscarPorId(id).orElse(null);
    }

    public Contrato buscarContrato(Long id) {
        return contratoService.buscarPorId(id).orElse(null);
    }
}