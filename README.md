# Sistema de Caixa de Supermercado

## Descrição
O Sistema de Caixa de Supermercado é uma aplicação desenvolvida para facilitar o processo de passagem de produtos no caixa e a realização de vendas. O sistema permite o cadastro e gerenciamento de produtos, clientes, funcionários, endereços de entrega e vendas, proporcionando uma solução completa para supermercados.

## Requisitos Funcionais Obrigatórios
- Cadastrar Produto
- Listar Produto
- Alterar Produto
- Deletar Produto
_______________________
  
- Cadastrar Cliente
- Listar Cliente
- Alterar Cliente
- Deletar Cliente
_______________________
  
- Cadastrar Funcionário
- Listar Funcionário
- Alterar Funcionário
- Deletar Funcionários
_______________________
  
- Cadastrar Endereço
- Listar Endereço
- Alterar Endereço
- Deletar Endereço

_______________________
Tabela de VENDAS (Envolve 3 ou mais tabelas)
- Cadastrar Venda
- Listar Venda
- Alterar Venda
- Deletar Venda

## Requisitos Não-Funcionais
- Gerar Relatório em menos de 1 segundo
- Tempo de resposta na Autenticação
- Proteção contra Acesso não Autorizado
- Organização e Clareza na Leitura

## Estrutura do Projeto

```plaintext
gerenciamento-caixa-de-supermercado/
  ├── docs/                    
  │   ├── Padrões adotados/      # Detalha as três regras utilizadas na Especificação de Requisitos
  │   └── Requisitos/            # Documento de requisitos
  │
  ├── node_modules/              # Pacotes e dependências instaladas
  │
  ├── src/
  │   ├── back-end/
  │   │   ├── controllers/       # Lida com a lógica de controle da aplicação
  │   │   ├── repositories/      # Comunicação com o banco de dados
  │   │   ├── routes/            # Define as rotas da aplicação
  │   │   └── services/          # Lógica de negócios
  │   │
  │   └── front-end/
  │       └── views/             # Templates para renderização no front-end
  │
  ├── .gitignore                 # Arquivos e pastas a serem ignorados pelo Git
  ├── package-lock.json          # Bloqueia as versões exatas das dependências instaladas
  ├── package.json               # Dependências e scripts do projeto
  ├── README.md                  # Informações sobre o projeto
  └── server.js                  # Ponto de entrada da aplicação
```



## Tecnologias Utilizadas
- **Linguagem de Programação:** Node.js versão 18.17.1
- **Banco de Dados:** postgreSQL versão 16.3.2
- **Front-End:** HTML, CSS, JS e React versão 18.0
- **Outras Tecnologias:**
  - Postman versão 11.6.2
  - pgAdmin4 versão 8.10
 
## Colaboradores
- Leonardo Gonçalves Flora
- Luis Gustavo Morais Cardoso
- Maicon Querino Jesus de Souza
