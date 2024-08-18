import { query } from 'express';
import pg from 'pg';

async function CadastrarVenda(venda) {
    const conn = await conectar();

    try{
        const sql = `
            INSERT INTO Vendas (CPF_Cliente, CPF_Funcionario, CodigoProduto, Quantidade, Logradouro, DataVenda, ValorTotal)
            VALUES ($1, $2, $3, $4, $5, NOW(), $6)
            RETURNING *;
        `;

        const resultado = await conn.query(sql, [
            venda.CPF_Cliente,
            venda.CPF_Funcionario,
            venda.CodigoProduto,
            venda.Quantidade,
            venda.Logradouro,
            venda.ValorTotal
        ]);

        return { mensagem: 'Venda realizada com sucesso.' };

        } catch (error) {
            throw new Error(`Erro ao cadastrar a venda: ${error.message}`);
        }
}

async function ListarVendas() {
    const conn = await conectar();

    try {
        // SQL para listar vendas com data formatada
        const sql = `
            SELECT Codigo, CPF_Cliente, CPF_Funcionario, CodigoProduto, Quantidade,
                    TO_CHAR(DataVenda, 'YYYY/MM/DD HH24:MI:SS') AS DataVenda,
                    ValorTotal
            FROM VENDAS
        `;

        const resultado = await conn.query(sql);

        if(resultado.rowCount == 0 ){
            return { mensagem: 'Nenhuma venda registrada.'};
        }

        return resultado.rows;  

    } catch (err){
        throw new Error ('Erro ao listar vendas: ' + err.message)
    } finally{
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

export default {CadastrarVenda, ListarVendas}