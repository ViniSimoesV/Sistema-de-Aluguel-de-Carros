package com.example.repository;

import com.example.model.Contrato;

import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;

@Repository
public interface ContratoRepository extends CrudRepository<Contrato, Long> {}
