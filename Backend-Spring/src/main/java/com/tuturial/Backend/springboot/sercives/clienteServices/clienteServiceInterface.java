package com.tuturial.Backend.springboot.sercives.clienteServices;

import com.tuturial.Backend.springboot.models.entity.Cliente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface clienteServiceInterface {

    public List<Cliente> findAll();
    public Page<Cliente> findAll(Pageable pageable); // para paginar los registros
    public Cliente findById(Long id);
    public Cliente save(Cliente cliente);
    public void delete(Long id);

}
