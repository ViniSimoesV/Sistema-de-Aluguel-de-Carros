package com.example.Service;

import com.example.model.Carro;
import com.example.repository.CarroRepository;
import jakarta.inject.Singleton;
import java.util.Optional;

@Singleton
public class CarroService {
    private final CarroRepository repository;

    public CarroService(CarroRepository repository) {
        this.repository = repository;
    }

    public Carro salvar(Carro carro) { return repository.save(carro); }
    public Iterable<Carro> listarTodos() { return repository.findAll(); }
    public Optional<Carro> buscarPorMatricula(Long matricula) { return repository.findById(matricula); }
    public void deletar(Long matricula) { repository.deleteById(matricula); }
    public Carro atualizar(Carro carro) { return repository.update(carro); }
}