
# 🛒 Sistema de Caixa de Supermercado — Gerencie Produtos, Clientes e Vendas! 📦💾

> Uma aplicação completa para controle de operações em supermercados, com foco em cadastro, autenticação, gerenciamento e vendas.

---

## 💡 Sobre o Projeto

O **Sistema de Caixa de Supermercado** foi desenvolvido para facilitar o gerenciamento diário de estabelecimentos comerciais, especialmente supermercados de pequeno e médio porte.  
A plataforma permite o cadastro e gerenciamento de produtos, clientes, funcionários, endereços e vendas de forma prática, intuitiva e segura.

---

## 🎯 Funcionalidades Principais

- 🛒 Cadastro, listagem, atualização e remoção de **produtos**.
- 👤 Gerenciamento completo de **clientes** e **funcionários**.
- 📍 Cadastro e vinculação de **endereços de entrega**.
- 💰 Registro e controle de **vendas**, relacionando produtos, clientes e operadores.
- 🧾 Armazenamento e consulta de **notas fiscais**.
- 🔐 **Autenticação** para segurança do sistema.
- 📊 Geração de **relatórios** com base nas informações registradas.

---

## ⚙️ Tecnologias Utilizadas

- **Node.js** — Plataforma backend (v18.17.1)
- **Express.js** — Framework de rotas e middlewares
- **PostgreSQL** — Banco de dados relacional (v16.3.2)
- **pgAdmin4** — Interface gráfica para gerenciar o banco
- **Postman** — Testes das APIs (v11.6.2)

---

## 📁 Estrutura do Projeto

```plaintext
Gerenciamento-Caixa-de-Supermercado/
├── codigos/
│   └── back-end/
│       ├── src/
│       │   ├── config/              # Configurações do projeto e conexão com o banco
│       │   ├── controllers/         # Lógica dos endpoints
│       │   ├── middlewares/         # Middlewares de autenticação e validação
│       │   ├── repositories/        # Acesso direto ao banco de dados (CRUD)
│       │   ├── routes/              # Definição das rotas da API
│       │   ├── services/            # Regras de negócio
│       │   └── utils/               # Funções auxiliares
│       ├── .env                     # Configurações de ambiente
│       ├── app.js                   # Configuração e integração dos módulos
│       └── server.js                # Inicialização do servidor
├── database/                        # Scripts SQL para criação das tabelas
├── docs/                            # Documentação adicional
├── uploads/
│   └── notas-fiscais/              # Armazenamento de arquivos de notas fiscais
└── README.md                        # Documentação principal do projeto
```

---

## 🛠️ Como Executar o Projeto

### 1. Clone o Repositório

```bash
git clone https://github.com/liugoncalves/Gerenciamento-Caixa-de-Supermercado.git
cd Gerenciamento-Caixa-de-Supermercado
```

### 2. Configure o Ambiente

Recomenda-se usar o `nvm` para garantir a versão correta do Node.js:

```bash
nvm install 18.17.1
nvm use 18.17.1
```

### 3. Instale as Dependências

```bash
cd codigos/back-end
npm install
```

### 4. Configure o Banco de Dados

- Crie um banco de dados chamado `mercado` no PostgreSQL.
- Execute o script `database/criar-tabelas.sql`.
- Preencha o arquivo `.env` com suas credenciais de conexão.

### 5. Execute o Servidor

```bash
npm start
```

Servidor iniciado! As APIs estarão disponíveis em `http://localhost:3000`.

### 6. Teste os Endpoints

Utilize o Postman para enviar requisições para endpoints como:

- `GET /produtos/listar`
- `POST /clientes/cadastrar`
- `GET /vendas/listar`
- etc.

---

## 📖 Convenção de Commits

```text
<tipo>: <mensagem>
```

**Tipos**:

- `feat`: Nova funcionalidade
- `fix`: Correção de erro
- `docs`: Alterações na documentação
- `style`: Mudança de formatação ou estilo
- `refactor`: Refatoração de código
- `test`: Inclusão ou ajuste de testes
- `chore`: Tarefas de manutenção

**Exemplos**:

```bash
feat: Implementar cadastro de cliente
fix: Corrigir validação de CPF
docs: Adicionar seção de instalação no README
```

---

## 👨‍💻 Desenvolvedores

- Leonardo Gonçalves Flora

---