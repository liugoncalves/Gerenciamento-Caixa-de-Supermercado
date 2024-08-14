import { query } from 'express';
import pg from 'pg';

async function CadastrarCliente(cliente) {
    const conn = await conectar();

    try{
        const sql = `
            INSERT INTO clientes (cpf, nome, telefone, email, dataCadastro)
            VALUES ($1, $2, $3, $4, NOW())
            RETURNING codigo;
        `;
        const resultado = await conn.query(sql, [
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

async function ListarClientes(){
    const conn = await conectar();

    try{
        const sql = 'SELECT cpf, nome, telefone, email, TO_CHAR(dataCadastro, \'YYYY-MM-DD HH24:MI:SS\') as dataCadastro FROM clientes';
        const resultado = await conn.query(sql);

        if (resultado.rowCount === 0){
            return { mensagem: 'Nenhum cliente cadastrado.' };
        }

        return resultado.rows;

    } catch (err) {
        throw new Error('Erro ao listar clientes: ' + err.message);
    } finally {
        conn.release();
    }
}

async function conectar(){
    const pool = new pg.Pool({
        connectionString: "postgres://postgres:rootleo@localhost:5432/caixa-supermercado"
        //    user: 'postgres',
        //    password: 'rootleo',
        //    host: 'localhost',
        //    port: 5432,
        //    database: 'BDTeste'
    });

    return await pool.connect();
}

export default { CadastrarCliente , ListarClientes };