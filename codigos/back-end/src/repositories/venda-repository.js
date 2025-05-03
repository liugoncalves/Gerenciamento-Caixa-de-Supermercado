import fs from 'fs-extra';
import path from 'path';
import pool from '../config/db.js';

class VendaRepository{
    async cadastrar(venda) {
        const conn = await pool.connect();
        try {
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

            return resultado.rows[0];

        } catch (error) {
            throw new Error(`Erro ao cadastrar a venda: ${error.message}`);
        } finally {
            conn.release();
        }
    }

    async listarTodas() {
        const conn = await pool.connect();
        try {
            const sql = `
                SELECT Codigo, CPF_Cliente, CPF_Funcionario, CodigoProduto, Quantidade,
                TO_CHAR(DataVenda, 'YYYY/MM/DD HH24:MI:SS') AS DataVenda, ValorTotal
                FROM VENDAS
            `;

            const resultado = await conn.query(sql);

            return resultado.rows.length ? resultado.rows : null;

        } catch (err) {
            throw new Error(`Erro ao listar vendas: ${err.message}`);
        } finally {
            conn.release();
        }
    }

    async consultarPorCodigo(codigo) {
        const conn = await pool.connect();
        try {
            const sql = `
                SELECT Codigo, CPF_Cliente, CPF_Funcionario, CodigoProduto, Quantidade,
                TO_CHAR(DataVenda, 'YYYY/MM/DD HH24:MI:SS') AS DataVenda, ValorTotal
                FROM VENDAS
                WHERE Codigo = $1
            `;

            const resultado = await conn.query(sql, [codigo]);

            return resultado.rows[0] || null;

        } catch (err) {
            throw new Error(`Erro ao consultar venda: ${err.message}`);
        } finally {
            conn.release();
        }
    }

    async consultarVendaPorCPF(cpfFuncionario) {
        const conn = await pool.connect();
        try {
            const sql = `
                SELECT Codigo FROM Vendas
                WHERE CPF_Funcionario = $1
            `;
            const resultado = await conn.query(sql, [cpfFuncionario]);

            return resultado.rows[0] || null;
            
        } catch (err) {
            throw new Error(`Erro ao consultar venda por CPF: ${err.message}`);
        } finally {
            conn.release();
        }
    }

    // Função para consultar compras por CPF do cliente
    async consultarCompraPorCPF(cpfCliente) {
        const conn = await pool.connect();
        try {
            const sql = `
                SELECT Codigo FROM Vendas
                WHERE CPF_Cliente = $1
            `;
            const resultado = await conn.query(sql, [cpfCliente]);

            return resultado.rows[0] || null; 

        } catch (err) {
            throw new Error(`Erro ao consultar compras por CPF: ${err.message}`);
        } finally {
            conn.release();
        }
    }

    // Função para consultar vendas por código do produto
    async consultarVendaPorCodProduto(codigoProduto) {
        const conn = await pool.connect();
        try {
            const sql = `
                SELECT Codigo FROM Vendas
                WHERE CodigoProduto = $1
            `;
            const resultado = await conn.query(sql, [codigoProduto]);

            return resultado.rows[0] || null;
            
        } catch (err) {
            throw new Error(`Erro ao consultar vendas por Código do Produto: ${err.message}`);
        } finally {
            conn.release();
        }
    }

    // Função para alterar uma venda existente
    async alterar(codigoVenda, venda) {
        const conn = await pool.connect();
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
                codigoVenda
            ];

            const resultado = await conn.query(sql, valores);

            return resultado.rows[0] || null;

        } catch (err) {
            throw new Error(`Erro ao alterar venda: ${err.message}`);
        } finally {
            conn.release();
        }
    }

    // Função para deletar uma venda pelo código
    async deletar(codigoVenda) {
        const conn = await pool.connect();
        try {
            const sql = `
                DELETE FROM Vendas 
                WHERE Codigo = $1
                RETURNING *;
            `;
            const resultado = await conn.query(sql, [codigoVenda]);

            return resultado.rows[0] || null;

        } catch (err) {
            throw new Error(`Erro ao excluir venda: ${err.message}`);
        } finally {
            conn.release();
        }
    }

    // Função para verificar se a nota fiscal foi emitida
    async verificarNotaFiscalEmitida(codigoVenda) {
        const filePath = path.resolve('../../uploads/notas-fiscais', `nota_fiscal_${codigoVenda}.pdf`);
        return fs.pathExists(filePath);
    }

}

export default new VendaRepository();
