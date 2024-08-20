-- Este script é específico para PostgreSQL

-- Primeiro crie um Database e se conecte à ele, depois execute essas queries.

-- Criação do schema (se necessário, substitua "mercado" pelo nome do seu schema)
CREATE SCHEMA IF NOT EXISTS mercado;

-- Table: mercado.clientes
CREATE TABLE IF NOT EXISTS mercado.clientes
(
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    datacadastro TIMESTAMP NOT NULL,
    CONSTRAINT clientes_pkey PRIMARY KEY (cpf),
    CONSTRAINT clientes_cpf_key UNIQUE (cpf),
    CONSTRAINT clientes_email_key UNIQUE (email),
    CONSTRAINT clientes_telefone_key UNIQUE (telefone)
);

-- Table: mercado.enderecos
CREATE TABLE IF NOT EXISTS mercado.enderecos
(
    codigo SERIAL PRIMARY KEY,
    nome_rua VARCHAR(200) NOT NULL,
    numero INTEGER NOT NULL,
    complemento VARCHAR(50),
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    cep VARCHAR(8) NOT NULL,
    cpf_cliente VARCHAR(11) NOT NULL,
    CONSTRAINT fk_cliente FOREIGN KEY (cpf_cliente)
        REFERENCES mercado.clientes (cpf)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- Table: mercado.funcionarios
CREATE TABLE IF NOT EXISTS mercado.funcionarios
(
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cargo VARCHAR(50) NOT NULL CHECK (cargo IN ('gerente', 'vendedor')),
    salario NUMERIC(10,2) NOT NULL CHECK (salario > 0),
    dataadmissao TIMESTAMP NOT NULL,
    CONSTRAINT funcionarios_pkey PRIMARY KEY (cpf),
    CONSTRAINT funcionario_cpf_key UNIQUE (cpf),
    CONSTRAINT funcionario_email_key UNIQUE (email)
);

-- Table: mercado.produtos
CREATE TABLE IF NOT EXISTS mercado.produtos
(
    codigo SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    valor NUMERIC(10,2) NOT NULL CHECK (valor > 0),
    quantidade VARCHAR(10) NOT NULL CHECK (quantidade ~ '^[0-9]+(g|kg|ml|l)$')
);

-- Table: mercado.vendas
CREATE TABLE IF NOT EXISTS mercado.vendas
(
    codigo SERIAL PRIMARY KEY,
    cpf_cliente VARCHAR(11) NOT NULL,
    cpf_funcionario VARCHAR(11) NOT NULL,
    codigoproduto INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    logradouro VARCHAR(100) NOT NULL,
    datavenda TIMESTAMP NOT NULL,
    valortotal NUMERIC(10,2) NOT NULL CHECK (valortotal > 0),
    CONSTRAINT fk_clientes FOREIGN KEY (cpf_cliente)
        REFERENCES mercado.clientes (cpf)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_funcionarios FOREIGN KEY (cpf_funcionario)
        REFERENCES mercado.funcionarios (cpf)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_produtos FOREIGN KEY (codigoproduto)
        REFERENCES mercado.produtos (codigo)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);