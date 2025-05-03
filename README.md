
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
│       │   ├── config/
│       │   ├── controllers/
│       │   ├── middlewares/
│       │   ├── repositories/
│       │   ├── routes/
│       │   ├── services/
│       │   └── utils/
│       ├── .env
│       ├── app.js
│       └── server.js
├── database/
│   └── criar-tabelas.sql
├── docs/
├── uploads/
│   └── notas-fiscais/
└── README.md
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

Certifique-se de que o PostgreSQL está instalado e em execução.

#### ➤ Crie o banco de dados e o schema:

Abra seu terminal ou cliente SQL (como pgAdmin ou DBeaver) e execute os comandos abaixo:

```sql
CREATE DATABASE mercado;
\c mercado
CREATE SCHEMA mercado;
```

> 🛑 **Importante:** o schema `mercado` deve existir antes de rodar a aplicação, pois ele será usado como o schema padrão via `search_path` no código da aplicação.

#### ➤ Execute o script de criação das tabelas:

```bash
psql -U seu_usuario -d mercado -f database/criar-tabelas.sql
```

#### ➤ Configure as variáveis de ambiente:

Crie um arquivo `.env` na pasta `codigos/back-end/` com as seguintes configurações:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=mercado
```

#### ➤ Confirmação no código:

O schema `mercado` já é definido automaticamente na conexão, através do parâmetro `search_path` no arquivo `src/config/db.js`:

```js
const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  options: '-c search_path=mercado'
});
```

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

## 👨‍💻 Desenvolvedor

- Leonardo Gonçalves Flora