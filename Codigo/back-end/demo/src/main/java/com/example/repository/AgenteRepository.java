package com.example.repository;

import com.example.model.Agente;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;

@Repository
public interface AgenteRepository extends CrudRepository<Agente, String> {}

