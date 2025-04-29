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


// Função para cadastrar um novo funcionário
async function CadastrarFuncionario(funcionario) {
    const conn = await Conectar();

    try {
        const sql = `
            INSERT INTO funcionarios (cpf, nome, email, senha, cargo, salario, dataAdmissao)
            VALUES ($1, $2, $3, $4, $5, $6, NOW())
        `;
        const resultado = await conn.query(sql, [
            funcionario.cpf,
            funcionario.nome,
            funcionario.email,
            funcionario.senha,
            funcionario.cargo,
            funcionario.salario
        ]);
        
        return { mensagem: 'Funcionário cadastrado com sucesso.' };

    } catch (err) {
        throw new Error('Erro ao cadastrar funcionário: ' + err.message);
    } finally {
        conn.release();
    }
}

// Função para listar todos os funcionários
async function ListarFuncionarios() {
    const conn = await Conectar();

    try {
        const sql = "SELECT nome, cpf, email, senha, cargo, salario, TO_CHAR(dataadmissao, 'YYYY-MM-DD HH24:MI:SS') as dataadmissao FROM funcionarios";
        const resultado = await conn.query(sql);

        if (resultado.rowCount === 0) {
            return { mensagem: 'Nenhum funcionário cadastrado.' };
        }

        return resultado.rows;

    } catch (err) {
        throw new Error('Erro ao listar funcionários: ' + err.message);
    } finally {
        conn.release();
    }
}

// Função para ordenar a lista de funcionários com base em um critério
async function OrdenarListaFuncionarios(criterio) {
    const conn = await Conectar();

    let sql = `
        SELECT cpf, nome, email, cargo, salario, 
               TO_CHAR(dataadmissao, 'YYYY-MM-DD HH24:MI:SS') as dataadmissao 
        FROM funcionarios
    `;

    // Determinar o critério de ordenação
    if (criterio === 'nome') {
        sql += ` ORDER BY nome ASC`;
    } else if (criterio === 'cpf') {
        sql += ` ORDER BY cpf ASC`;
    } else if (criterio === 'cargo') {
        sql += ` ORDER BY cargo ASC`;
    } else {
        throw new Error('Critério de ordenação inválido.');
    }

    try {
        const resultado = await conn.query(sql);

        if (resultado.rowCount === 0) {
            return { mensagem: 'Nenhum funcionário encontrado.' };
        }

        return resultado.rows;

    } catch (err) {
        throw new Error('Erro ao ordenar funcionários: ' + err.message);
    } finally {
        conn.release();
    }
}

// Função para consultar um funcionário pelo CPF
async function ConsultarFuncionario(cpf) {
    const conn = await Conectar();

    try {
        const sql = `
            SELECT cpf, nome, email, senha, cargo, salario, 
                   TO_CHAR(dataadmissao, 'YYYY-MM-DD HH24:MI:SS') as dataadmissao 
            FROM funcionarios 
            WHERE cpf = $1
        `;
        const resultado = await conn.query(sql, [cpf]);

        if (resultado.rowCount === 0) {
            return { mensagem: 'Funcionário não encontrado.' };
        }

        return resultado.rows[0];

    } catch (err) {
        throw new Error('Erro ao consultar funcionário: ' + err.message);
    } finally {
        conn.release();
    }
}

// Função para alterar os dados de um funcionário sem alterar a senha
async function AlterarFuncionario(cpfAntigo, funcionario) {
    const conn = await Conectar();

    try {
        const sql = `
            UPDATE funcionarios 
            SET cpf = $1, nome = $2, email = $3, cargo = $4, salario = $5
            WHERE cpf = $6
            RETURNING *;
        `;
        const valores = [
            funcionario.cpf,
            funcionario.nome,
            funcionario.email,
            funcionario.cargo,
            funcionario.salario,
            cpfAntigo
        ];
        const resultado = await conn.query(sql, valores);

        if (resultado.rowCount === 0) {
            return { mensagem: 'Funcionário não encontrado para alteração.' };
        }

        return { mensagem: 'Funcionário alterado com sucesso.' };

    } catch (error) {
        throw new Error('Erro ao alterar funcionário: ' + error.message);
    } finally {
        conn.release();
    }
}


// Função para alterar a senha de um funcionário pelo CPF
async function AlterarSenhaFuncionario(cpf, senhaCriptografada) {
    const conn = await Conectar();

    try {
        const sql = `
            UPDATE funcionarios 
            SET senha = $1
            WHERE cpf = $2
        `;
        const resultado = await conn.query(sql, [senhaCriptografada, cpf]);

        if (resultado.rowCount === 0) {
            return { mensagem: 'Funcionário não encontrado para alteração de senha.' };
        }

        return { mensagem: 'Senha alterada com sucesso.' };
    } catch (error) {
        throw new Error('Erro ao alterar a senha do funcionário: ' + error.message);
    } finally {
        conn.release();
    }
}


// Função para deletar um funcionário pelo CPF
async function DeletarFuncionario(cpf) {
    const conn = await Conectar();

    try {
        const sql = "DELETE FROM funcionarios WHERE cpf = $1";
        const resultado = await conn.query(sql, [cpf]);
        
        if (resultado.rowCount === 0) {
            return { mensagem: 'Funcionário não encontrado para exclusão.' };
        }

        return { mensagem: 'Funcionário deletado com sucesso.' };
    
    } catch (err) {
        throw new Error('Erro ao deletar funcionário: ' + err.message);
    } finally {
        conn.release();
    }
}

// Função para consultar um funcionário por email
async function ConsultarPorEmail(email) {
    const conn = await Conectar();

    try {
        const sql = `
            SELECT cpf, nome, email, senha, cargo, salario, 
                   TO_CHAR(dataadmissao, 'YYYY-MM-DD HH24:MI:SS') as dataadmissao 
            FROM funcionarios 
            WHERE email = $1
        `;
        const resultado = await conn.query(sql, [email]);

        if (resultado.rowCount === 0) {
            return null;
        }

        return resultado.rows[0];

    } catch (err) {
        throw new Error('Erro ao consultar funcionário por email: ' + err.message);
    } finally {
        conn.release();
    }
}

export default { 
    CadastrarFuncionario, 
    ListarFuncionarios, 
    OrdenarListaFuncionarios, 
    ConsultarFuncionario, 
    AlterarFuncionario,
    AlterarSenhaFuncionario, 
    DeletarFuncionario, 
    ConsultarPorEmail 
};
