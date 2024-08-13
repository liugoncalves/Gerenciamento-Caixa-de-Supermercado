import { query } from 'express';
import pg from 'pg';

async function CadastrarFuncionario(funcionario) {
    const conn = await conectar();

    try {
        const sql = `
            INSERT INTO funcionario (cpf, nome, email, senha, cargo, salario, dataAdmissao)
            VALUES ($1, $2, $3, $4, $5, $6, NOW())
            RETURNING codigo;
        `;
        const query = await conn.query(sql, [
            funcionario.cpf,
            funcionario.nome,
            funcionario.email,
            funcionario.senha,
            funcionario.cargo,
            funcionario.salario
        ]);
        
        // Retorna o ID do funcionário inserido
        return { codigo: query.rows[0].codigo };

    } catch (err) {
        throw new Error('Erro ao cadastrar funcionário: ' + err.message);
    } finally {
        conn.release();
    }
}


async function ListarFuncionarios() {
    const conn = await conectar();

    try {
        var sql = "SELECT cpf, email, senha, cargo, salario, TO_CHAR(dataadmissao, 'YYYY-MM-DD HH24:MI:SS') as dataadmissao FROM funcionario";
        var query = await conn.query(sql);
    } catch (err) {
        console.log(err);
    } finally {
        conn.release();
    }

    return query.rows;
}

async function ConsultarFuncionario(cpf) {
    const conn = await conectar();

    try {
        var sql = "SELECT * FROM funcionario WHERE cpf = $1";
        var query = await conn.query(sql, [cpf]);

    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        conn.release();
    }

    return query.rows[0];
}

async function AlterarFuncionario(cpf_antigo, funcionario) {
    const conn = await conectar();

    try {
        const sql = `
            UPDATE funcionario 
            SET cpf = $1, nome = $2, email = $3, senha = $4, cargo = $5, salario = $6
            WHERE cpf = $7
            RETURNING *;
        `;
        const valores = [
            funcionario.cpf,
            funcionario.nome,
            funcionario.email,
            funcionario.senha,  // Senha já deve estar criptografada pelo serviço
            funcionario.cargo,
            funcionario.salario,
            cpf_antigo  // CPF antigo para identificar o funcionário a ser alterado
        ];
        const resultado = await conn.query(sql, valores);
        return resultado.rows[0];
    } catch (error) {
        console.error('Erro ao alterar funcionário:', error);
        throw error;
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

export default { CadastrarFuncionario , ListarFuncionarios , ConsultarFuncionario, AlterarFuncionario };