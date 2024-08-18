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
  │   ├── Requisitos/            # Documento de requisitos
  │   ├── Diagramas/             # Contém todos os diagramas do projeto
  │   └── Regras de Codificação/ # Regras e padrões de codificação adotados
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
## Definições de Pastas
- **Documentação**: Deve estar na pasta `docs/`. Além de incluir padrões adotados e requisitos.
- **Código**: Deve estar na pasta `src/`. Além disso, ter pastas separadas para desenvolvimento de `back-end` e `front-end`.
  
## Estrutura de Branches
- **`main`**: Branch principal que deve sempre refletir o estado estável e final do projeto. Não deve ser usada para desenvolvimento diário.
- **`development`**: Branch de desenvolvimento onde novas funcionalidades e correções devem ser implementadas. Os merges para `main` devem ser feitos apenas quando todas as funcionalidades e testes estiverem completos e a aplicação estiver estável.

## Regras de Commit
- **Mensagens de Commit**: Para organizar melhor o histórico do projeto e garantir uma compreensão mais clara dos commits, será utilizado um formato de mensagem que identifica o tipo do commit:

  **Tipos**:
  - `feat`: Nova funcionalidade
  - `fix`: Correção de bug
  - `docs`: Alterações na documentação
  - `style`: Alterações que não afetam o funcionamento do código (formatação, espaços, etc.)
  - `refactor`: Refatoração de código sem alterar funcionalidades
  - `test`: Adição ou correção de testes
  - `chore`: Alterações administrativas e de manutenção do projeto

  **Exemplos de Mensagens para commit**:
  - `"[feat]: implementado o método para buscar cliente por CPF"`
  - `"[fix]: correção do erro na consulta de clientes ativos"`
  - `"[docs]: atualização no Documento de Requisitos (Dicionário de Dados) - todos os tipos DATE se tornaram TIMESTAMP"`
  - `"[docs]: adicionadas informações sobre novos requisitos no README"`
  - `"[style]: ajuste na formatação e indentação no código do controller"`
  - `"[refactor]: reorganização de métodos de manipulação de clientes"`
  - `"[test]: correção de testes para consulta de clientes ativos"`
  - `"[chore]: atualização das dependências do projeto para as versões mais recentes"`

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
