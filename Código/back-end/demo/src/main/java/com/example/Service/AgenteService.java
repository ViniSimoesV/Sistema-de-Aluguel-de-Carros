package com.example.Service;

import com.example.model.Agente;
import com.example.repository.AgenteRepository;
import jakarta.inject.Singleton;
import java.util.Optional;

@Singleton
public class AgenteService {
    private final AgenteRepository repository;

    public AgenteService(AgenteRepository repository) {
        this.repository = repository;
    }

    public Agente salvar(Agente agente) { return repository.save(agente); }
    public Iterable<Agente> listarTodos() { return repository.findAll(); }
    public Optional<Agente> buscarPorCnpj(String cnpj) { return repository.findById(cnpj); }
    public void deletar(String cnpj) { repository.deleteById(cnpj); }
    public Agente atualizar(Agente agente) { return repository.update(agente); }
}