package com.example.repository;

import com.example.model.Cliente;

import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;

// O segundo parâmetro DEVE ser String, pois o CPF é String
@Repository
public interface ClienteRepository extends CrudRepository<Cliente, String> {
}