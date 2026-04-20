package com.example.service;

import java.util.Optional;

import com.example.model.Contrato;
import com.example.repository.ContratoRepository;

import jakarta.inject.Singleton;

@Singleton
public class ContratoService {
    private final ContratoRepository repository;

    public ContratoService(ContratoRepository repository) {
        this.repository = repository;
    }

    public Contrato salvar(Contrato contrato) { return repository.save(contrato); }
    public Iterable<Contrato> listarTodos() { return repository.findAll(); }
    public Optional<Contrato> buscarPorId(Long id) { return repository.findById(id); }
    public void deletar(Long id) { repository.deleteById(id); }
    public Contrato atualizar(Contrato contrato) { return repository.update(contrato); }
}
