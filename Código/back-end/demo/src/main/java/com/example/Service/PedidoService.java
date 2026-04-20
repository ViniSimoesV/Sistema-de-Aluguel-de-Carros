package com.example.service;

import java.util.Optional;

import com.example.model.Pedido;
import com.example.repository.PedidoRepository;

import jakarta.inject.Singleton;

@Singleton
public class PedidoService {
    private final PedidoRepository repository;

    public PedidoService(PedidoRepository repository) {
        this.repository = repository;
    }

    public Pedido salvar(Pedido pedido) { return repository.save(pedido); }
    public Iterable<Pedido> listarTodos() { return repository.findAll(); }
    public Optional<Pedido> buscarPorId(Long id) { return repository.findById(id); }
    public void deletar(Long id) { repository.deleteById(id); }
    public Pedido atualizar(Pedido pedido) { return repository.update(pedido); }
}