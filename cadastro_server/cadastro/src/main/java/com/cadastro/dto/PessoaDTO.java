package com.cadastro.dto;

import java.util.List;

import com.cadastro.model.Endereco;

public class PessoaDTO {
    // Atributos de Pessoa
    private Long id;
    private String email;
    private String telefone;

    // Atributos de PessoaFisica
    private String nome;
    private String cpf;

    // Atributos de PessoaJuridica
    private String razaoSocial;
    private String cnpj;

    // Lista de enderecos associados à pessoa
    private List<Endereco> enderecos;

    // Construtores
    public PessoaDTO() {
    }

    public PessoaDTO(Long id, String email, String telefone, String nome, String cpf, String razaoSocial, String cnpj, List<Endereco> enderecos) {
        this.id = id;
        this.email = email;
        this.telefone = telefone;
        this.nome = nome;
        this.cpf = cpf;
        this.razaoSocial = razaoSocial;
        this.cnpj = cnpj;
        this.enderecos = enderecos;
    }

    // Métodos getters e setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public List<Endereco> getEnderecos() {
        return enderecos;
    }

    public void setEnderecos(List<Endereco> enderecos) {
        this.enderecos = enderecos;
    }
}
