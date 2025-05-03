import pool from '../config/db.js';

class ProdutoRepository {
    async cadastrar(produto) {
        const conn = await pool.connect();
        try {
            const sql = `
                INSERT INTO produtos (codigo, nome, valor, quantidade)
                VALUES ($1, $2, $3, $4)
                RETURNING *;
            `;
            const resultado = await conn.query(sql, [
                produto.codigo,
                produto.nome,
                produto.valor,
                produto.quantidade
            ]);

            return resultado.rows[0];    

        } catch (err) {
            if (err.code === '23505'){
                if (err.detail?.includes('codigo')){
                    throw new Error('Código já Cadastrado.');
                }
            }
            throw new Error(`Erro ao cadastrar produto no Sistema: ${err.message}`);
        } finally {
            conn.release();
        }
    }

    async listarTodos() {
        const conn = await pool.connect();
        try {
            const sql = `
                SELECT codigo, nome, valor, quantidade 
                FROM produtos
            `;
            const resultado = await conn.query(sql);

            return resultado.rows ? resultado.rows : null;

        } catch (err) {
            throw new Error(`Erro ao listar produtos: ${err.message}`);
        } finally {
            conn.release();
        }
    }

    async ordenarPorColuna(coluna, direcao = 'ASC') {
        const conn = await pool.connect();
        try {
            const sql = `
                SELECT codigo, nome, valor, quantidade 
                FROM produtos
                ORDER BY ${coluna} ${direcao.toUpperCase()}
            `;
            const resultado = await conn.query(sql);
            return resultado.rows.length ? resultado.rows : null;

        } catch (err) {
            throw new Error(`Erro ao ordenar produtos: ${err.message}`);
        } finally {
            conn.release();
        }
    }

    async consultarPorCodigo(codigo) {
        const conn = await pool.connect();
        try {
            const sql = `
                SELECT codigo, nome, valor, quantidade 
                FROM produtos 
                WHERE codigo = $1
            `;
            const resultado = await conn.query(sql, [codigo]);

            return resultado.rows[0] || null;
        
        } catch (err) {
            throw new Error('Erro ao consultar produto: ' + err.message);
        } finally {
            conn.release();
        }
    }

    async alterar(codigoAntigo, produto) {
        const conn = await pool.connect();
        try {
            const sql = `
                UPDATE produtos
                SET codigo = $1, nome = $2, valor = $3, quantidade = $4
                WHERE codigo = $5
                RETURNING *;
            `;
            const resultado = await conn.query(sql, [
                produto.codigo,
                produto.nome,
                produto.valor,
                produto.quantidade,
                codigoAntigo
            ]);

            return resultado.rows[0] || null;
        
        } catch (err) {
            if (err.code === '23505'){
                if (err.detail?.includes('codigo')){
                    throw new Error('Código já Cadastrado.');
                }
                } else{
                    throw new Error('Valor duplicado: já existe um produto com esses dados.')
                }
        } finally {
            conn.release();
        }
    }

    async deletar(codigo) {
        const conn = await pool.connect();
        try {
            const sql = `
                DELETE FROM produtos 
                WHERE codigo = $1
                RETURNING *;
            `;
            const resultado = await conn.query(sql, [codigo]);

            return resultado.rows[0] ||  null;
            
        } catch (err) {
            throw new Error(`Erro ao deletar produto: ' ${err.message}`);
        } finally {
            conn.release();
        }
    }
}

export default new ProdutoRepository();
