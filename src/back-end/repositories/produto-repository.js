import { query } from 'express';
import pg from 'pg';

async function CadastrarProduto(produto) {
    const conn = await conectar();

    try{
        const sql = `
            INSERT INTO produtos (codigo, nome, valor, quantidade)
            VALUES ($1, $2, $3, $4)
            RETURNING codigo;
        `;
        const resultado = await conn.query(sql, [
            produto.codigo,
            produto.nome,
            produto.valor,
            produto.quantidade
        ]);

        return { mensagem: 'Produto cadastrado com sucesso.' };
    
    } catch (err) {
        throw new Error('Erro ao cadastrar produto: ' + err.message);
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

export default { CadastrarProduto };
