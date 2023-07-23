CREATE SCHEMA cadastro_pessoa ;

CREATE TABLE pessoa (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL
);

CREATE TABLE pessoa_fisica (
    id BIGINT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    FOREIGN KEY (id) REFERENCES pessoa(id)
);

CREATE TABLE pessoa_juridica (
    id BIGINT PRIMARY KEY,
    razao_social VARCHAR(100) NOT NULL,
    cnpj VARCHAR(18) NOT NULL,
    FOREIGN KEY (id) REFERENCES pessoa(id)
);

CREATE TABLE endereco (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    logradouro VARCHAR(100) NOT NULL,
    is_residencial BOOLEAN NOT NULL,
    pessoa_id BIGINT NOT NULL,
    FOREIGN KEY (pessoa_id) REFERENCES pessoa(id)
);
