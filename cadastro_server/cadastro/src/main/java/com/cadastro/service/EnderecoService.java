package com.cadastro.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cadastro.model.Endereco;
import com.cadastro.model.Pessoa;
import com.cadastro.repository.EnderecoRepository;

@Service
public class EnderecoService {

    private final EnderecoRepository enderecoRepository;
    private final PessoaService pessoaService;

    @Autowired
    public EnderecoService(EnderecoRepository enderecoRepository, PessoaService pessoaService) {
        this.enderecoRepository = enderecoRepository;
        this.pessoaService = pessoaService;
    }

    // Cadastrar um novo endereço para uma pessoa
    public Endereco cadastrarEndereco(Long pessoaId, Endereco endereco) {
        Pessoa pessoa = pessoaService.buscarById(pessoaId).orElse(null);
        if (pessoa == null) {
            throw new IllegalArgumentException("Pessoa não encontrada");
        }

        endereco.setPessoa(pessoa);
        return enderecoRepository.save(endereco);
    }

    // Buscar todos os endereços de uma pessoa por seu ID
    public List<Endereco> buscarEnderecosPorPessoaId(Long pessoaId) {
        Optional<Pessoa> optionalPessoa = pessoaService.buscarById(pessoaId);
        if (optionalPessoa.isPresent()) {
            Pessoa pessoa = optionalPessoa.get();
            return pessoa.getEnderecos();
        } else {
            throw new RuntimeException("Pessoa não encontrada com o ID fornecido.");
        }
    }

    // Atualizar os dados de um endereço existente
    public Endereco atualizarEndereco(Long id, Endereco enderecoAtualizado) {
        Optional<Endereco> optionalEndereco = enderecoRepository.findById(id);
        if (optionalEndereco.isPresent()) {
            Endereco enderecoExistente = optionalEndereco.get();
            enderecoExistente.setLogradouro(enderecoAtualizado.getLogradouro());
            enderecoExistente.setResidencial(enderecoAtualizado.isResidencial());
            return enderecoRepository.save(enderecoExistente);
        } else {
            throw new RuntimeException("Endereço não encontrado com o ID fornecido.");
        }
    }

    // Deletar um endereço por ID
    public void deletarEnderecoPorId(Long id) {
        enderecoRepository.deleteById(id);
    }
}
