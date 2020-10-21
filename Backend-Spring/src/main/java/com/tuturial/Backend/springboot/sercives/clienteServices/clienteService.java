package com.tuturial.Backend.springboot.sercives.clienteServices;

import com.tuturial.Backend.springboot.models.entity.Cliente;
import com.tuturial.Backend.springboot.repositories.cliente.clienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class clienteService implements clienteServiceInterface {
    @Autowired

    private clienteRepository ClienteRepository;
    @Override
    public List<Cliente> findAll() {
        return (List<Cliente>) ClienteRepository.findAll();
    }

    @Override
    public Page<Cliente> findAll(Pageable pageable) {
        return ClienteRepository.findAll(pageable);
    }

    @Override
    public Cliente findById(Long id) {
        return ClienteRepository.findById(id).orElse(null);
    }

    @Override
    public Cliente save(Cliente cliente) {
        return ClienteRepository.save(cliente);
    }

    @Override
    public void delete(Long id) {
        ClienteRepository.deleteById(id);

    }
}
