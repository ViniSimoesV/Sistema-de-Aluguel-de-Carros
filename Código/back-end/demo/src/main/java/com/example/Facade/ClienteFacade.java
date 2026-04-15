package com.example.Facade;

import java.util.List;
import java.time.LocalDate;
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
        Cliente cliente = new Cliente();
        
        // Campos básicos
        cliente.setCpf(dto.cpf());
        cliente.setNome(dto.nome());
        cliente.setRg(dto.rg());
        cliente.setTelefone(dto.telefone());
        cliente.setEmail(dto.email());
        cliente.setSenha(dto.senha());
        cliente.setEmprego(dto.emprego());
        cliente.setDataNascimento(dto.dataNascimento());

        // Campos endereço
        cliente.setruaCliente(dto.ruaCliente());
        cliente.setnumeroCliente(dto.numeroCliente());
        cliente.setbairroCliente(dto.bairroCliente());
        cliente.setcomplementoCliente(dto.complementoCliente());
        cliente.setcidadeCliente(dto.cidadeCliente());

        // Listas (Rendimento e Entidade)
        cliente.setEntidadeEmpregadora(dto.entidadeEmpregadora());
        cliente.setRendimento(dto.rendimento());
        
        Cliente salvo = clienteService.salvar(cliente);
        return converterParaDTO(salvo);
    }

    public ClienteDTO atualizarCliente(String cpf, ClienteDTO dto) {
        Cliente cliente = new Cliente();
        
        // Campos básicos
        cliente.setCpf(dto.cpf());
        cliente.setNome(dto.nome());
        cliente.setRg(dto.rg());
        cliente.setTelefone(dto.telefone());
        cliente.setEmail(dto.email());
        cliente.setSenha(dto.senha());
        cliente.setEmprego(dto.emprego());
        cliente.setDataNascimento(dto.dataNascimento());

        // Campos endereço
        cliente.setruaCliente(dto.ruaCliente());
        cliente.setnumeroCliente(dto.numeroCliente());
        cliente.setbairroCliente(dto.bairroCliente());
        cliente.setcomplementoCliente(dto.complementoCliente());
        cliente.setcidadeCliente(dto.cidadeCliente());

        // Listas (Rendimento e Entidade)
        cliente.setEntidadeEmpregadora(dto.entidadeEmpregadora());
        cliente.setRendimento(dto.rendimento());
        
        Cliente atualizado = clienteService.atualizar(cliente);
        return converterParaDTO(atualizado);
    }
    
    public List<ClienteDTO> listarTodosClientes() {
        return StreamSupport.stream(clienteService.listarTodos().spliterator(), false)
                .map(c -> converterParaDTO(c))
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

    // converter para DTO
    private ClienteDTO converterParaDTO(Cliente cliente) {
        return new ClienteDTO(
            cliente.getCpf(),                // 1. @NotBlank String cpf
            cliente.getNome(),               // 2. @NotBlank String nome
            cliente.getRg(),                 // 3. @NotBlank String rg
            cliente.getTelefone(),           // 4. @NotBlank String telefone
            cliente.getEmail(),              // 5. @NotBlank @Email String email
            cliente.getSenha(),              // 6. @NotBlank String senha
            
            // Perfil Profissional
            cliente.getEmprego(),            // 7. @NotBlank String emprego
            cliente.getEntidadeEmpregadora(),// 8. @Nullable List<String> entidadeEmpregadora
            cliente.getRendimento(),         // 9. @Nullable Double rendimento
            
            // Data
            cliente.getDataNascimento(),     // 10. @NotNull Date dataNascimento
            
            // Endereço
            cliente.getruaCliente(),         // 11. @NotBlank String ruaCliente
            cliente.getnumeroCliente(),      // 12. @NotBlank String numeroCliente
            cliente.getbairroCliente(),      // 13. @NotBlank String bairroCliente
            cliente.getcomplementoCliente(), // 14. @Nullable String complementoCliente
            cliente.getcidadeCliente()
        );
    }
}