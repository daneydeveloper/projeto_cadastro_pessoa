package com.cadastro.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cadastro.dto.PessoaDTO;
import com.cadastro.model.Pessoa;
import com.cadastro.model.PessoaFisica;
import com.cadastro.model.PessoaJuridica;
import com.cadastro.repository.PessoaRepository;

@Service
public class PessoaService {

    private final PessoaRepository pessoaRepository;

    @Autowired
    public PessoaService(PessoaRepository pessoaRepository) {
        this.pessoaRepository = pessoaRepository;
    }

    // Métodos de conversão
    private PessoaDTO convertToDto(Pessoa pessoa) {
        PessoaDTO pessoaDTO = new PessoaDTO();
        pessoaDTO.setId(pessoa.getId());
        pessoaDTO.setEmail(pessoa.getEmail());
        pessoaDTO.setTelefone(pessoa.getTelefone());

        if (pessoa instanceof PessoaFisica) {
            PessoaFisica pessoaFisica = (PessoaFisica) pessoa;
            pessoaDTO.setNome(pessoaFisica.getNome());
            pessoaDTO.setCpf(pessoaFisica.getCpf());
        }

        if (pessoa instanceof PessoaJuridica) {
            PessoaJuridica pessoaJuridica = (PessoaJuridica) pessoa;
            pessoaDTO.setRazaoSocial(pessoaJuridica.getRazaoSocial());
            pessoaDTO.setCnpj(pessoaJuridica.getCnpj());
        }

        pessoaDTO.setEnderecos(pessoa.getEnderecos());

        return pessoaDTO;
    }

    private Pessoa convertToEntity(PessoaDTO pessoaDTO) {
        Pessoa pessoa;

        if (pessoaDTO.getNome() != null && pessoaDTO.getCpf() != null) {
            // É PessoaFisica
            pessoa = new PessoaFisica();
            ((PessoaFisica) pessoa).setNome(pessoaDTO.getNome());
            ((PessoaFisica) pessoa).setCpf(pessoaDTO.getCpf());
        } else {
            // É PessoaJuridica
            pessoa = new PessoaJuridica();
            ((PessoaJuridica) pessoa).setRazaoSocial(pessoaDTO.getRazaoSocial());
            ((PessoaJuridica) pessoa).setCnpj(pessoaDTO.getCnpj());
        }

        pessoa.setId(pessoaDTO.getId());
        pessoa.setEmail(pessoaDTO.getEmail());
        pessoa.setTelefone(pessoaDTO.getTelefone());
        pessoa.setEnderecos(pessoaDTO.getEnderecos());

        return pessoa;
    }

    public Optional<Pessoa> buscarById(Long id) {
        return pessoaRepository.findById(id);
    }

    // Cadastrar uma nova pessoa
    public PessoaDTO cadastrarPessoa(PessoaDTO pessoaDTO) {
        Pessoa pessoa = convertToEntity(pessoaDTO);
        pessoa = pessoaRepository.save(pessoa);
        return convertToDto(pessoa);
    }

    // Buscar uma pessoa por ID
    public Optional<PessoaDTO> buscarPessoaDTOPorId(Long id) {
        Optional<Pessoa> pessoa = pessoaRepository.findById(id);
        if (pessoa.isPresent()) {
            return pessoa.map(this::convertToDto);
        } else {
            throw new RuntimeException("Pessoa não encontrada com o ID fornecido.");
        }
    }

    @Transactional(readOnly = true)
    public List<PessoaDTO> buscarPorNomeOrRazaoSocial(String nome) {
        List<Pessoa> pessoas = pessoaRepository.findByNomeOrRazaoSocialContainingIgnoreCase(nome);
        return pessoas.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Buscar todas as pessoas
    public List<PessoaDTO> buscarTodasPessoas() {
        List<Pessoa> pessoas = pessoaRepository.findAll();
        return pessoas.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Atualizar os dados de uma pessoa existente
    public PessoaDTO atualizarPessoa(Long id, PessoaDTO pessoaDTO) {
        Optional<Pessoa> optionalPessoa = pessoaRepository.findById(id);
        if (optionalPessoa.isPresent()) {
            Pessoa pessoaAtualizada = convertToEntity(pessoaDTO);
            pessoaAtualizada.setId(id);
            pessoaAtualizada = pessoaRepository.save(pessoaAtualizada);
            return convertToDto(pessoaAtualizada);
        } else {
            throw new RuntimeException("Pessoa não encontrada com o ID fornecido.");
        }
    }

    public boolean excluirPessoaPorId(Long id) {
        Optional<Pessoa> optionalPessoa = pessoaRepository.findById(id);
        if (optionalPessoa.isPresent()) {
            Pessoa pessoa = optionalPessoa.get();
            pessoa.getEnderecos().clear();
            pessoaRepository.deleteById(id);
            
            return true; 
        } else {
            return false; 
        }
    }
}
