import pg from 'pg';

// Função para conectar ao banco de dados
async function Conectar() {
    const pool = new pg.Pool({
        connectionString: "postgres://postgres:root@localhost:5432/caixa-supermercado"
    });

    return await pool.connect();
}

// Função para cadastrar um novo produto
async function CadastrarProduto(produto) {
    const conn = await Conectar();

    try {
        const sql = `
            INSERT INTO produtos (codigo, nome, valor, quantidade)
            VALUES ($1, $2, $3, $4)
            RETURNING codigo;
        `;
        await conn.query(sql, [
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

// Função para listar todos os produtos
async function ListarProdutos() {
    const conn = await Conectar();

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

// Função para ordenar a lista de produtos com base em um critério
async function OrdenarListaProdutos(criterio) {
    const conn = await Conectar();

    try {
        let sql = 'SELECT codigo, nome, valor, quantidade FROM produtos';
        
        switch (criterio) {
            case 'nome':
                sql += ' ORDER BY nome';
                break;
            case 'codigo':
                sql += ' ORDER BY codigo';
                break;
            default:
                throw new Error('Critério de ordenação inválido.');
        }
        
        const resultado = await conn.query(sql);

        if (resultado.rowCount === 0) {
            return { mensagem: 'Nenhum produto cadastrado.' };
        }

        return resultado.rows;

    } catch (err) {
        throw new Error('Erro ao ordenar produtos: ' + err.message);
    } finally {
        conn.release();
    }
}

// Função para consultar um produto pelo código
async function ConsultarProduto(codigo) {
    const conn = await Conectar();

    try {
        const sql = `
            SELECT codigo, nome, valor, quantidade 
            FROM produtos 
            WHERE codigo = $1
        `;
        const resultado = await conn.query(sql, [codigo]);

        if (resultado.rowCount === 0) {
            return { mensagem: 'Produto não encontrado.' };
        }

        return resultado.rows[0];
    
    } catch (err) {
        throw new Error('Erro ao consultar produto: ' + err.message);
    } finally {
        conn.release();
    }
}

// Função para alterar os dados de um produto
async function AlterarProduto(codigoAntigo, produto) {
    const conn = await Conectar();

    try {
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
            codigoAntigo
        ]);

        if (resultado.rowCount === 0) {
            return { mensagem: 'Produto não encontrado para alteração.' };
        }

        return { mensagem: 'Produto alterado com sucesso.' };
    
    } catch (err) {
        throw new Error('Erro ao alterar produto: ' + err.message);
    } finally {
        conn.release();
    }
}

// Função para deletar um produto pelo código
async function DeletarProduto(codigo) {
    const conn = await Conectar();

    try {
        const sql = "DELETE FROM produtos WHERE codigo = $1";
        const resultado = await conn.query(sql, [codigo]);

        if (resultado.rowCount === 0) {
            return { mensagem: 'Produto não encontrado para exclusão.' };
        }

        return { mensagem: 'Produto deletado com sucesso.' };
    
    } catch (err) {
        throw new Error('Erro ao deletar produto: ' + err.message);
    } finally {
        conn.release();
    }
}

export default {
    CadastrarProduto,
    ListarProdutos,
    OrdenarListaProdutos,
    ConsultarProduto,
    AlterarProduto,
    DeletarProduto
};
