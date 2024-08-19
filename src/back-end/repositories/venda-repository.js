import { query } from 'express';
import pg from 'pg';
import fs from 'fs-extra';
import path from 'path';

async function CadastrarVenda(venda) {
    const conn = await conectar();

    try{
        const sql = `
            INSERT INTO Vendas (CPF_Cliente, CPF_Funcionario, CodigoProduto, Quantidade, Logradouro, DataVenda, ValorTotal)
            VALUES ($1, $2, $3, $4, $5, NOW(), $6)
            RETURNING Codigo;
        `;

        const resultado = await conn.query(sql, [
            venda.CPF_Cliente,
            venda.CPF_Funcionario,
            venda.CodigoProduto,
            venda.Quantidade,
            venda.Logradouro,
            venda.ValorTotal
        ]);

        // Retornar o código da venda e a mensagem de sucesso
        return {
                codigo: resultado.rows[0].codigo,
                mensagem: 'Venda realizada com sucesso.'
        };

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

async function ConsultarVenda(codigo){
    const conn = await conectar();

    try{
               const sql = `
            SELECT Codigo, CPF_Cliente, CPF_Funcionario, CodigoProduto, Quantidade,
                    TO_CHAR(DataVenda, 'YYYY/MM/DD HH24:MI:SS') AS DataVenda,
                    ValorTotal
            FROM VENDAS
            WHERE codigo = $1
        `;

        const resultado = await conn.query(sql, [codigo]);

        if(resultado.rowCount == 0){
            return { mensagem: 'Venda não encontrada'};
        }

        return resultado.rows[0];

    } catch(err){
        throw new Error ('Erro ao consultar venda: ' + err.message);
    } finally{
        conn.release();
    }
}

async function ConsultarVendaPorCPF(cpfFuncionario) {
    const conn = await conectar();

    try {
        const sql = `
            SELECT Codigo FROM Vendas
            WHERE CPF_Funcionario = $1
        `;
        const resultado = await conn.query(sql, [cpfFuncionario]);

        return resultado.rows; // Retorna as vendas associadas ao funcionário

    } catch (err) {
        throw new Error('Erro ao consultar vendas por CPF: ' + err.message);
    } finally {
        conn.release();
    }
}

async function ConsultarCompraPorCPF(cpfCliente) { // Verificar se o Cliente está associado à alguma venda
    const conn = await conectar();

    try {
        const sql = `
            SELECT Codigo FROM Vendas
            WHERE CPF_Cliente = $1
        `;
        const resultado = await conn.query(sql, [cpfCliente]);

        return resultado.rows; // Retorna as compras associadas ao cliente

    } catch (err) {
        throw new Error('Erro ao consultar compras por CPF: ' + err.message);
    } finally {
        conn.release();
    }
}

async function ConsultarVendaPorCodProduto(codigoProduto) { // Verificar se o Produto está associado à alguma venda
    const conn = await conectar();

    try {
        const sql = `
            SELECT Codigo FROM Vendas
            WHERE CodigoProduto = $1
        `;
        const resultado = await conn.query(sql, [codigoProduto]);

        return resultado.rows; // Retorna as compras associadas ao produto

    } catch (err) {
        throw new Error('Erro ao consultar vendas por Código do Produto: ' + err.message);
    } finally {
        conn.release();
    }
}

async function AlterarVenda(codigo_venda, venda) {
    const conn = await conectar();

    try {
        const sql = `
            UPDATE Vendas
            SET CPF_Cliente = $1, CPF_Funcionario = $2, CodigoProduto = $3, Quantidade = $4, Logradouro = $5, ValorTotal = $6
            WHERE Codigo = $7
            RETURNING *;
        `;
        const valores = [
            venda.cpf_cliente,
            venda.cpf_funcionario,
            venda.codigo_produto,
            venda.quantidade,
            venda.logradouro,
            venda.valorTotal,
            codigo_venda
        ];

        const resultado = await conn.query(sql, valores);

        if (resultado.rowCount === 0) {
            return { mensagem: 'Venda não encontrada para alteração.' };
        }

        return { mensagem: 'Venda alterada com sucesso.' };
    } catch (err) {
        throw new Error('Erro ao alterar venda: ' + err.message);
    } finally {
        conn.release();
    }
}

async function DeletarVenda(codigo_venda){
    const conn = await conectar();

    try{
        const sql = 'DELETE FROM vendas WHERE codigo = $1';
        const resultado = await conn.query(sql, [codigo_venda]);

        if(resultado.rowCount == 0 ){
            return { mensagem: 'Venda não encontrada para exclusão.' };
        }

        return { mensagem: 'Venda excluída com sucesso.' };

    } catch(err){
        throw new Error ('Erro ao excluir venda: ' + err.message);
    } finally{
        conn.release();
    }
}

async function VerificarNotaFiscalEmitida(codigo_venda) {
    const filePath = path.resolve('uploads/notas-fiscais', `nota_fiscal_${codigo_venda}.pdf`);
    return fs.pathExists(filePath);
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

export default {CadastrarVenda, ListarVendas, ConsultarVenda, ConsultarVendaPorCPF, ConsultarVendaPorCodProduto, ConsultarCompraPorCPF, AlterarVenda, DeletarVenda, VerificarNotaFiscalEmitida};