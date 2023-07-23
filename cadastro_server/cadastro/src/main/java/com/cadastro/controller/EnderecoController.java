package com.cadastro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cadastro.service.EnderecoService;

@RestController
@RequestMapping("/api/enderecos")
public class EnderecoController {

    private final EnderecoService enderecoService;

    @Autowired
    public EnderecoController(EnderecoService enderecoService) {
        this.enderecoService = enderecoService;
    }

    @DeleteMapping("/excluirEnderecoPorId/{id}")
    public ResponseEntity<Void> excluirEnderecoPorId(@PathVariable Long id) {
        enderecoService.deletarEnderecoPorId(id);
        return ResponseEntity.noContent().build(); // Retorna 204 
    }
}
