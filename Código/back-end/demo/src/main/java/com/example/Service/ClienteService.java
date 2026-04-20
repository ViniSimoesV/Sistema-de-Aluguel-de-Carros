package com.example.service;

import java.util.Optional;

import com.example.model.Cliente;
import com.example.repository.ClienteRepository;

import jakarta.inject.Singleton;

@Singleton
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public Cliente salvar(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public Iterable<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> buscarPorCpf(String cpf) {
        return clienteRepository.findById(cpf);
    }

    public Optional<Cliente> buscarPorEmail(String email) {
        return clienteRepository.findByEmail(email);
    }

    public Cliente atualizar(Cliente cliente) {
        return clienteRepository.update(cliente);
    }

    public void deletar(String cpf) {
        clienteRepository.deleteById(cpf);
    }
}
