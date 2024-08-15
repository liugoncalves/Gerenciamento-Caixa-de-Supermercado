import { query } from 'express';
import pg from 'pg';

async function CadastrarFuncionario(funcionario) {
    const conn = await conectar();

    try{
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

async function ListarFuncionarios() {
    const conn = await conectar();

    try {
        const sql = "SELECT cpf, email, senha, cargo, salario, TO_CHAR(dataadmissao, 'YYYY-MM-DD HH24:MI:SS') as dataadmissao FROM funcionarios";
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

async function ConsultarFuncionario(cpf) {
    const conn = await conectar();

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

async function AlterarFuncionario(cpf_antigo, funcionario) {
    const conn = await conectar();

    try {
        const sql = `
            UPDATE funcionarios 
            SET cpf = $1, nome = $2, email = $3, senha = $4, cargo = $5, salario = $6
            WHERE cpf = $7
            RETURNING *;
        `;
        const valores = [
            funcionario.cpf,
            funcionario.nome,
            funcionario.email,
            funcionario.senha,
            funcionario.cargo,
            funcionario.salario,
            cpf_antigo
        ];
        const resultado = await conn.query(sql, valores);

        if (resultado.rowCount === 0) {
            return { mensagem: 'Funcionário não encontrado para alteração.' };
        }

        return { mensagem: 'Funcionário alterado com sucesso.'};
         
    } catch (error) {
        throw new Error('Erro ao alterar funcionário: ' + error.message);
    } finally {
        conn.release();
    }
}

async function DeletarFuncionario(cpf){
    const conn = await conectar();

    try{
        const sql = "DELETE FROM funcionarios WHERE cpf = $1";
        var query = await conn.query(sql, [cpf]);
        
        if (query.rowCount === 0) {
            return { mensagem: 'Funcionário não encontrado para exclusão.' };
        }

        return { mensagem: 'Funcionário deletado com sucesso.' };
    
    } catch (err) {
        throw new Error('Erro ao deletar funcionário: ' + err.message);
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

export default { CadastrarFuncionario , ListarFuncionarios , ConsultarFuncionario, AlterarFuncionario , DeletarFuncionario: DeletarFuncionario };