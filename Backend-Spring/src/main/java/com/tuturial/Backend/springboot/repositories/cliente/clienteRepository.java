package com.tuturial.Backend.springboot.repositories.cliente;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tuturial.Backend.springboot.models.entity.Cliente;

import java.util.List;

public interface clienteRepository extends JpaRepository<Cliente, Long> {


}
