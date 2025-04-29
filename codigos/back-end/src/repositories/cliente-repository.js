import pg from 'pg';

import dotenv from 'dotenv';

dotenv.config();

// Função para conectar ao banco de dados
async function Conectar() {
    const pool = new pg.Pool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    const conn = await pool.connect();

    // Setando o search_path para o schema 'mercado'
    await conn.query('SET search_path TO mercado, public;');

    return conn;
}


// Função para cadastrar um novo cliente
async function CadastrarCliente(cliente) {
    const conn = await Conectar();

    try {
        const sql = `
            INSERT INTO clientes (cpf, nome, telefone, email, dataCadastro)
            VALUES ($1, $2, $3, $4, NOW())
        `;
        await conn.query(sql, [
            cliente.cpf,
            cliente.nome,
            cliente.telefone,
            cliente.email
        ]);

        return { mensagem: 'Cliente cadastrado com sucesso.' };
    } catch (err) {
        throw new Error('Erro ao cadastrar cliente: ' + err.message);
    } finally {
        conn.release();
    }
}

// Função para listar todos os clientes
async function ListarClientes() {
    const conn = await Conectar();

    try {
        const sql = 'SELECT cpf, nome, telefone, email, TO_CHAR(dataCadastro, \'YYYY-MM-DD HH24:MI:SS\') as dataCadastro FROM clientes';
        const resultado = await conn.query(sql);

        if (resultado.rowCount === 0) {
            return { mensagem: 'Nenhum cliente cadastrado.' };
        }

        return resultado.rows;
    } catch (err) {
        throw new Error('Erro ao listar clientes: ' + err.message);
    } finally {
        conn.release();
    }
}

// Função para ordenar a lista de clientes com base em um critério
async function OrdenarListaClientes(criterio) {
    const conn = await Conectar();

    try {
        let sql = 'SELECT cpf, nome, telefone, email, TO_CHAR(dataCadastro, \'YYYY-MM-DD HH24:MI:SS\') as dataCadastro FROM clientes';
        
        switch (criterio) {
            case 'nome':
                sql += ' ORDER BY nome';
                break;
            case 'cpf':
                sql += ' ORDER BY cpf';
                break;
            case 'data_cadastro':
                sql += ' ORDER BY dataCadastro';
                break;
            default:
                throw new Error('Critério de ordenação inválido.');
        }
        
        const resultado = await conn.query(sql);

        if (resultado.rowCount === 0) {
            return { mensagem: 'Nenhum cliente cadastrado.' };
        }

        return resultado.rows;
    } catch (err) {
        throw new Error('Erro ao ordenar clientes: ' + err.message);
    } finally {
        conn.release();
    }
}

// Função para consultar um cliente pelo CPF
async function ConsultarCliente(cpf) {
    const conn = await Conectar();

    try {
        const sql = `
            SELECT cpf, nome, telefone, email, TO_CHAR(dataCadastro, 'YYYY-MM-DD HH24:MI:SS') as dataCadastro
            FROM clientes
            WHERE cpf = $1
        `;
        const resultado = await conn.query(sql, [cpf]);

        if (resultado.rowCount === 0) {
            return { mensagem: 'Cliente não encontrado.' };
        }

        return resultado.rows[0];
    } catch (err) {
        throw new Error('Erro ao consultar cliente: ' + err.message);
    } finally {
        conn.release();
    }
}

// Função para alterar os dados de um cliente
async function AlterarCliente(cpfAntigo, cliente) {
    const conn = await Conectar();

    try {
        const sql = `
            UPDATE clientes
            SET cpf = $1, nome = $2, telefone = $3, email = $4
            WHERE cpf = $5
            RETURNING *;
        `;
        const valores = [
            cliente.cpf,
            cliente.nome,
            cliente.telefone,
            cliente.email,
            cpfAntigo
        ];
        const resultado = await conn.query(sql, valores);

        if (resultado.rowCount === 0) {
            return { mensagem: 'Cliente não encontrado.' };
        }

        return { mensagem: 'Cliente alterado com sucesso.' };
    } catch (err) {
        throw new Error('Erro ao alterar cliente: ' + err.message);
    } finally {
        conn.release();
    }
}

// Função para deletar um cliente pelo CPF
async function DeletarCliente(cpf) {
    const conn = await Conectar();

    try {
        const sql = 'DELETE FROM clientes WHERE cpf = $1';
        const resultado = await conn.query(sql, [cpf]);

        if (resultado.rowCount === 0) {
            return { mensagem: 'Cliente não encontrado para exclusão.' };
        }

        return { mensagem: 'Cliente deletado com sucesso.' };
    } catch (err) {
        throw new Error('Erro ao deletar cliente: ' + err.message);
    } finally {
        conn.release();
    }
}

export default {
    CadastrarCliente,
    ListarClientes,
    OrdenarListaClientes,
    ConsultarCliente,
    AlterarCliente,
    DeletarCliente
};
