package com.tuturial.Backend.springboot.controllers;


import com.tuturial.Backend.springboot.models.entity.Cliente;
import com.tuturial.Backend.springboot.sercives.clienteServices.clienteServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = {"http://localhost:4200"})//tambien se puede colocar "*" sin las llaves
@RestController
@RequestMapping("/api")
public class clienteController {

    @Autowired
    private clienteServiceInterface ClienteServiceInterface;

    @GetMapping("/clientes")
    public List<Cliente> index(){
        return ClienteServiceInterface.findAll();
    }

    @GetMapping("/clientes/page/{page}")
    public Page<Cliente> index(@PathVariable Integer page ){
        return ClienteServiceInterface.findAll(PageRequest.of(page,4));
    }

    @GetMapping("/clientes/{id}")
    public ResponseEntity<?> show(@PathVariable Long id){
        Cliente cliente = null;
        Map<String, Object> response = new HashMap<>();

        try {
            cliente = ClienteServiceInterface.findById(id);

        }catch (DataAccessException e){
            response.put("mensaje","ERROR AL REALIZAR LA CONSULTA EN LA BASE DE DATOS ");
            response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));

            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (cliente == null){
            response.put("mensaje","EL CLIENTE CON ID: ".concat(id.toString()).concat(" NO EXISTE"));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<Cliente>(cliente, HttpStatus.OK);
    }

    @PostMapping("/clientes")
    public ResponseEntity<?> create(@Valid @RequestBody Cliente cliente, BindingResult result){
         Cliente clienteNew = null;
        Map<String, Object> response = new HashMap<>();

        if (result.hasErrors()){

            /*
            es una manera de hacerlo anterior a JAVA 8 ya que la version buena trae STREAM

            List<String> errors = new ArrayList<>();

            for (FieldError err: result.getFieldErrors()){
                errors.add("EL CAMPO '" + err.getField() + "' " + err.getDefaultMessage());
            }*/

            /*
            de JAVA 8 en adelante se puede utlizar esta manera con Stream
             */

            List<String> errors =result.getFieldErrors()
                    .stream()
                    .map(err -> "EL CAMPO '" + err.getField() + "' " + err.getDefaultMessage())
                    .collect(Collectors.toList());

            response.put("erros", errors);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }

        try {
            clienteNew = ClienteServiceInterface.save(cliente);

        }catch (DataAccessException e){
            response.put("mensaje","ERROR AL GUARDAR EN LA BASE DE DATOS ");
            response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));

            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "se ha guardado con exito");
        response.put("cliente", clienteNew);

        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    @PutMapping("/clientes/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody Cliente cliente, BindingResult result, @PathVariable Long id){
        Cliente clienteActual = ClienteServiceInterface.findById(id);
        Cliente clienteUpdate = null;

        Map<String, Object> response = new HashMap<>();

        if (result.hasErrors()){

            List<String> errors =result.getFieldErrors()
                    .stream()
                    .map(err -> "EL CAMPO '" + err.getField() + "' " + err.getDefaultMessage())
                    .collect(Collectors.toList());

            response.put("erros", errors);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }

        if (clienteActual == null){
            response.put("mensaje","EL CLIENTE CON ID: ".concat(id.toString()).concat(" NO EXISTE"));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }
        try {
            clienteActual.setNombre(cliente.getNombre());
            clienteActual.setApellidos(cliente.getApellidos());
            clienteActual.setEmail(cliente.getEmail());
            clienteActual.setTelefono(cliente.getTelefono());

            clienteUpdate = ClienteServiceInterface.save(clienteActual);

        } catch (DataAccessException e){
            response.put("mensaje","ERROR AL ACTUALIZAR REGISTRO EN LA BASE DE DATOS ");
            response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));

            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "se ha actualizado con exito");
        response.put("cliente", clienteUpdate);

        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/clientes/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        Map<String, Object> response = new HashMap<>();
        try {
            ClienteServiceInterface.delete(id);

        }catch (DataAccessException e){
            response.put("mensaje","ERROR AL ELIMINAR EL REGISTRO EN LA BASE DE DATOS ");
            response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));

            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje","REGISTRO ELIMINADO CON EXITO");

        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
    }
}
