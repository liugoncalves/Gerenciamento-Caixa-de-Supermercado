# 🛒 **Sistema de Caixa de Supermercado** — Gerencie Produtos, Clientes e Vendas! 📦💾

> Um sistema completo para a operação de caixa de supermercados, permitindo cadastro de produtos, clientes, funcionários e vendas de forma prática e rápida.

---

## 💡 Sobre o Projeto

O **Sistema de Caixa de Supermercado** foi desenvolvido para facilitar a rotina de operações em estabelecimentos comerciais.  
Ele permite o gerenciamento de produtos, clientes, funcionários, endereços de entrega e o controle de vendas, tudo de forma simples e organizada.

Ideal para supermercados de pequeno a médio porte que desejam melhorar o fluxo de trabalho e a organização das informações.

---

## 🎯 Principais Funcionalidades

- 🛙️ Cadastro, listagem, atualização e exclusão de **produtos**.
- 👥 Gerenciamento completo de **clientes** e **funcionários**.
- 📍 Cadastro de **endereços** para entregas.
- 💾 Registro e controle de **vendas**, conectando produtos, clientes e funcionários.
- 📁 Geração de relatórios rápidos.
- 🔐 Controle de autenticação para acesso seguro ao sistema.

---

## ⚙️ Tecnologias Utilizadas

- **Node.js** — Backend principal (versão 18.17.1)
- **PostgreSQL** — Banco de dados relacional (versão 16.3.2)
- **Express.js** — Framework para construção das APIs
- **Postman** — Testes de API (versão 11.6.2)
- **pgAdmin4** — Gerenciamento de banco de dados (versão 8.10)


---

## 📚 Manual de Instalação

### 1. Clone o Repositório
```bash
git clone https://github.com/liugoncalves/Gerenciamento-Caixa-de-Supermercado.git
cd Gerenciamento-Caixa-de-Supermercado
```

### 2. Crie e Ative um Ambiente Virtual Node.js
*Recomendado para isolar as dependências do projeto.*

Caso use **nvm** (Node Version Manager):
```bash
nvm install 18.17.1
nvm use 18.17.1
```

Ou apenas crie um ambiente isolado manualmente:
```bash
# Se quiser, use "corepack" para isolar dependências (recomendado)
corepack enable
```

### 3. Instale as Dependências do Projeto
```bash
cd codigos/back-end
npm install
```

### 4. Configure o Banco de Dados
- Certifique-se que o PostgreSQL esteja instalado e rodando.
- Crie um banco de dados chamado `supermercado`.
- Atualize as configurações de conexão no arquivo `.env`.

### 5. Execute o Servidor Backend
```bash
npm start
```

Pronto! O servidor estará rodando e as APIs disponíveis.


---

## 💼 Estrutura do Projeto

```plaintext
Gerenciamento-Caixa-de-Supermercado/
 ├── database/          # Scripts de criação do banco de dados
 ├── docs/              # Documentação geral do projeto
 ├── codigos/
 │    ├── back-end/    # Código-fonte principal da aplicação
 │    └── uploads/      # Pasta para arquivos de notas fiscais (se houver)
 ├── .gitignore        # Arquivos ignorados no Git
 ├── README.md          # Este arquivo :)
```

---

## 📆 Padrão de Mensagens de Commit

### Formato:
```text
<tipo>: <descrição curta>
```

### Tipos:
- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Mudanças na documentação
- **style**: Alteração de estilo/formatacão
- **refactor**: Refatorar código
- **test**: Adicionar/ajustar testes
- **chore**: Manutenção geral

### Exemplos:
```text
feat: Cadastro de novos produtos
fix: Correção no endpoint de deletar cliente
docs: Atualização do manual de instalação
```
## 👤 Integrantes do Projeto

- Leonardo Gonçalves Flora
- Luis Gustavo Morais Cardoso
- Maicon Querino Jesus de Souza

---

