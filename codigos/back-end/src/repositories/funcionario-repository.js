import pool from '../config/db.js';

class FuncionarioRepository{
    async cadastrar(funcionario) {
        const conn = await pool.connect();
        try {
            const sql = `
                INSERT INTO funcionarios (cpf, nome, email, senha, cargo, salario, dataAdmissao)
                VALUES ($1, $2, $3, $4, $5, $6, NOW())
                RETURNING *;
            `;
            const valores = [funcionario.cpf, funcionario.nome, funcionario.email, funcionario.senha, funcionario.cargo, funcionario.salario];
            const resultado = await conn.query(sql, valores);
            
            return resultado.rows[0];

        } catch (err) {
            if (err.code === '23505') {
                if (err.detail?.includes('cpf')) throw new Error('CPF já cadastrado.');
            }
            throw new Error(`Erro ao cadastrar funcionário: ${err.message}`);
        } finally {
            conn.release();
        }
    }

    // Função para listar todos os funcionários
    async listarTodos() {
        const conn = await pool.connect();
        try {
            const sql = `
                SELECT nome, cpf, email, senha, cargo, salario, TO_CHAR(dataadmissao, 'YYYY-MM-DD HH24:MI:SS') as dataadmissao 
                FROM funcionarios
            `;
            const resultado = await conn.query(sql);

            return resultado.rows.length ? resultado.rows : null;

        } catch (err) {
            throw new Error(`Erro ao listar funcionários: ${err.message}`);
        } finally {
            conn.release();
        }
    }

    // Função para ordenar a lista de funcionários com base em um critério
    async ordenarPorColuna(coluna, direcao = 'ASC') {
        const conn = await pool.connect();
        try {
            const sql = `
                SELECT cpf, nome, email, cargo, salario, TO_CHAR(dataadmissao, 'YYYY-MM-DD HH24:MI:SS') as dataadmissao 
                FROM funcionarios
                ORDER BY ${coluna} ${direcao.toUpperCase()}
            `;
    
            const resultado = await conn.query(sql);
            return resultado.rows.length ? resultado.rows : null;
    
        } catch (err) {
            throw new Error(`Erro ao ordenar funcionários: ${err.message}`);
        } finally {
            conn.release();
        }
    }
    
    // Função para consultar um funcionário pelo CPF
    async consultarPorCPF(cpf) {
        const conn = await pool.connect();
        try {
            const sql = `
                SELECT cpf, nome, email, senha, cargo, salario, TO_CHAR(dataadmissao, 'YYYY-MM-DD HH24:MI:SS') as dataadmissao 
                FROM funcionarios 
                WHERE cpf = $1
            `;
            const resultado = await conn.query(sql, [cpf]);
           
            return resultado.rows[0] || null;

        } catch (err) {
            throw new Error(`Erro ao consultar funcionário:  ${err.message}`);
        } finally {
            conn.release();
        }
    }

    // Função para consultar um funcionário por email
    async consultarPorEmail(email) {
        const conn = await pool.connect();
        try {
            const sql = `
                SELECT cpf, nome, email, senha, cargo, salario, TO_CHAR(dataadmissao, 'YYYY-MM-DD HH24:MI:SS') as dataadmissao 
                FROM funcionarios 
                WHERE email = $1
            `;
            const resultado = await conn.query(sql, [email]);
            
            return resultado.rows[0] || null;

        } catch (err) {
            throw new Error(`Erro ao consultar funcionário por email: ${err.message}`);
        } finally {
            conn.release();
        }
    }

    // Função para alterar os dados de um funcionário sem alterar a senha
    async alterar(cpfAntigo, funcionario) {
        const conn = await pool.connect();
        try {
            const sql = `
                UPDATE funcionarios 
                SET cpf = $1, nome = $2, email = $3, cargo = $4, salario = $5
                WHERE cpf = $6
                RETURNING *;
            `;
            const valores = [ funcionario.cpf, funcionario.nome, funcionario.email, funcionario.cargo, funcionario.salario, cpfAntigo];
            const resultado = await conn.query(sql, valores);

            return resultado.rows[0] || null;

        } catch (err) {
            if (err.code === '23505') {
                if (err.detail?.includes('cpf')) throw new Error('CPF já cadastrado.');
            }
            throw new Error(`Erro ao alterar funcionário:  ${err.message}`);
        } finally {
            conn.release();
        }
    }

    // Função para alterar a senha de um funcionário pelo CPF
    async alterarSenha(cpf, senhaCriptografada) {
        const conn = await pool.connect();
        try {
            const sql = `
                UPDATE funcionarios 
                SET senha = $1
                WHERE cpf = $2
            `;
            const resultado = await conn.query(sql, [senhaCriptografada, cpf]);

            return resultado.rowCount > 0;

        } catch (err) {
            throw new Error(`Erro ao alterar a senha do funcionário:  ${err.message}`);
        } finally {
            conn.release();
        }
    }


    // Função para deletar um funcionário pelo CPF
    async deletar(cpf) {
        const conn = await pool.connect();
        try {
            const sql = `
                DELETE FROM funcionarios 
                WHERE cpf = $1
                RETURNING *;
            `;
            const resultado = await conn.query(sql, [cpf]);

            return resultado.rows[0] || null;
        
        } catch (err) {
            throw new Error('Erro ao deletar funcionário: ' + err.message);
        } finally {
            conn.release();
        }
    }

}

export default new FuncionarioRepository();