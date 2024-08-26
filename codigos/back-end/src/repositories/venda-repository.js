import pg from 'pg';
import fs from 'fs-extra';
import path from 'path';

// Função para conectar ao banco de dados
async function Conectar() {
    const pool = new pg.Pool({
        connectionString: "postgres://postgres:rootleo@localhost:5432/caixa-supermercado"
    });

    return await pool.connect();
}

// Função para cadastrar uma nova venda
async function CadastrarVenda(venda) {
    const conn = await Conectar();

    try {
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
    } finally {
        conn.release();
    }
}

// Função para listar todas as vendas
async function ListarVendas() {
    const conn = await Conectar();

    try {
        // SQL para listar vendas com data formatada
        const sql = `
            SELECT Codigo, CPF_Cliente, CPF_Funcionario, CodigoProduto, Quantidade,
                    TO_CHAR(DataVenda, 'YYYY/MM/DD HH24:MI:SS') AS DataVenda,
                    ValorTotal
            FROM VENDAS
        `;

        const resultado = await conn.query(sql);

        if (resultado.rowCount === 0) {
            return { mensagem: 'Nenhuma venda registrada.' };
        }

        return resultado.rows;
    } catch (err) {
        throw new Error('Erro ao listar vendas: ' + err.message);
    } finally {
        conn.release();
    }
}

// Função para consultar uma venda pelo código
async function ConsultarVenda(codigo) {
    const conn = await Conectar();

    try {
        const sql = `
            SELECT Codigo, CPF_Cliente, CPF_Funcionario, CodigoProduto, Quantidade,
                    TO_CHAR(DataVenda, 'YYYY/MM/DD HH24:MI:SS') AS DataVenda,
                    ValorTotal
            FROM VENDAS
            WHERE Codigo = $1
        `;

        const resultado = await conn.query(sql, [codigo]);

        if (resultado.rowCount === 0) {
            return { mensagem: 'Venda não encontrada' };
        }

        return resultado.rows[0];
    } catch (err) {
        throw new Error('Erro ao consultar venda: ' + err.message);
    } finally {
        conn.release();
    }
}

// Função para consultar vendas por CPF do funcionário
async function ConsultarVendaPorCPF(cpfFuncionario) {
    const conn = await Conectar();

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

// Função para consultar compras por CPF do cliente
async function ConsultarCompraPorCPF(cpfCliente) {
    const conn = await Conectar();

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

// Função para consultar vendas por código do produto
async function ConsultarVendaPorCodProduto(codigoProduto) {
    const conn = await Conectar();

    try {
        const sql = `
            SELECT Codigo FROM Vendas
            WHERE CodigoProduto = $1
        `;
        const resultado = await conn.query(sql, [codigoProduto]);

        return resultado.rows; // Retorna as vendas associadas ao produto
    } catch (err) {
        throw new Error('Erro ao consultar vendas por Código do Produto: ' + err.message);
    } finally {
        conn.release();
    }
}

// Função para alterar uma venda existente
async function AlterarVenda(codigoVenda, venda) {
    const conn = await Conectar();

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

// Função para deletar uma venda pelo código
async function DeletarVenda(codigoVenda) {
    const conn = await Conectar();

    try {
        const sql = 'DELETE FROM Vendas WHERE Codigo = $1';
        const resultado = await conn.query(sql, [codigoVenda]);

        if (resultado.rowCount === 0) {
            return { mensagem: 'Venda não encontrada para exclusão.' };
        }

        return { mensagem: 'Venda excluída com sucesso.' };
    } catch (err) {
        throw new Error('Erro ao excluir venda: ' + err.message);
    } finally {
        conn.release();
    }
}

// Função para verificar se a nota fiscal foi emitida
async function VerificarNotaFiscalEmitida(codigoVenda) {
    const filePath = path.resolve('../../uploads/notas-fiscais', `nota_fiscal_${codigoVenda}.pdf`);
    return fs.pathExists(filePath);
}

export default {
    CadastrarVenda,
    ListarVendas,
    ConsultarVenda,
    ConsultarVendaPorCPF,
    ConsultarCompraPorCPF,
    ConsultarVendaPorCodProduto,
    AlterarVenda,
    DeletarVenda,
    VerificarNotaFiscalEmitida
};
