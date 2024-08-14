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

async function ListarProdutos() {
    const conn = await conectar();

    try {
        const sql = "SELECT codigo, nome, valor, quantidade FROM produtos";
        const resultado = await conn.query(sql);

        if (resultado.rowCount === 0) {
            return { mensagem: 'Nenhum produto cadastrado.' };
        }

        return resultado.rows;
    } catch (err) {
        throw new Error('Erro ao listar produtos: ' + err.message);
    } finally {
        conn.release();
    }
}

async function ConsultarProduto(codigo) {
    const conn = await conectar();

    try{
        const sql = "SELECT * FROM produtos WHERE codigo = $1";
        const resultado = await conn.query(sql, [codigo]);

        if(resultado.rowCount === 0){
            return { mensagem: 'Produto não encontrado.' };
        }

        return resultado.rows[0];
    
    } catch (err) {
        throw new Error('Erro ao consultar produto: ' + err.message);
    } finally {
        conn.release();
    }
}

async function AlterarProduto(codigo_antigo, produto) {
    const conn = await conectar();

    try{
        const sql = `
            UPDATE produtos
            SET codigo = $1, nome = $2, valor = $3, quantidade = $4
            WHERE codigo = $5
            RETURNING codigo;
        `;
        const resultado = await conn.query(sql, [
            produto.codigo,
            produto.nome,
            produto.valor,
            produto.quantidade,
            codigo_antigo
        ]);

        if(resultado.rowCount === 0){
            return { mensagem: 'Produto não encontrado para alteração.' };
        }

        return { mensagem: 'Produto alterado com sucesso.' };
    
    } catch (err) {
        throw new Error('Erro ao alterar produto: ' + err.message);
    } finally {
        conn.release();
    }
}

async function DeletarProduto(codigo) {
    const conn = await conectar();

    try{
        const sql = "DELETE FROM produtos WHERE codigo = $1";
        const resultado = await conn.query(sql, [codigo]);

        if(resultado.rowCount === 0){
            return { mensagem: 'Produto não encontrado para exclusão.' };
        }

        return { mensagem: 'Produto excluído com sucesso.' };
    
    } catch (err) {
        throw new Error('Erro ao excluir produto: ' + err.message);
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

export default { CadastrarProduto , ListarProdutos , ConsultarProduto , AlterarProduto , DeletarProduto };
