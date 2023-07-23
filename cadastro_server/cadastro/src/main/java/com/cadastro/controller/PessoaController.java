package com.cadastro.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cadastro.dto.PessoaDTO;
import com.cadastro.service.PessoaService;

@RestController
@RequestMapping(path = "/pessoas")
public class PessoaController {

    private final PessoaService pessoaService;

    @Autowired
    public PessoaController(PessoaService pessoaService) {
        this.pessoaService = pessoaService;
    }

    // Endpoint para buscar todas as pessoas
    @GetMapping
    public ResponseEntity<List<PessoaDTO>> buscarTodasPessoas() {
        List<PessoaDTO> pessoasDTO = pessoaService.buscarTodasPessoas();
        return ResponseEntity.ok(pessoasDTO);
    }

    // Endpoint para cadastrar uma nova pessoa
    @PostMapping("/cadastrarPessoa")
    public ResponseEntity<PessoaDTO> cadastrarPessoa(@RequestBody PessoaDTO pessoaDTO) {
        PessoaDTO novaPessoaDTO = pessoaService.cadastrarPessoa(pessoaDTO);
        return new ResponseEntity<>(novaPessoaDTO, HttpStatus.CREATED);
    }

    @PutMapping("/atualizarPessoa/{id}")
    public ResponseEntity<PessoaDTO> atualizarPessoa(@PathVariable Long id, @RequestBody PessoaDTO pessoaDTO) {
        try {
            PessoaDTO pessoaAtualizada = pessoaService.atualizarPessoa(id, pessoaDTO);
            return ResponseEntity.ok(pessoaAtualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint para buscar uma pessoa por ID
    @GetMapping("/buscarPessoaPorId/{id}")
    public ResponseEntity<PessoaDTO> buscarPessoaPorId(@PathVariable Long id) {
        Optional<PessoaDTO> pessoaDTOOptional = pessoaService.buscarPessoaDTOPorId(id);
        return pessoaDTOOptional.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/buscarPorNomeOrRazaoSocial")
    public ResponseEntity<List<PessoaDTO>> buscarPorNomeOrRazaoSocial(@RequestParam String nome) {
        List<PessoaDTO> pessoasDTO = pessoaService.buscarPorNomeOrRazaoSocial(nome);
        return ResponseEntity.ok(pessoasDTO);
    }

    @DeleteMapping("/excluirPessoaPorId/{id}")
    public ResponseEntity<Void> excluirPessoaPorId(@PathVariable Long id) {
        boolean pessoaExcluida = pessoaService.excluirPessoaPorId(id);

        if (pessoaExcluida) {
            return ResponseEntity.noContent().build(); // Retorna 204
        } else {
            return ResponseEntity.notFound().build(); // Retorna 404
        }
    }

}
