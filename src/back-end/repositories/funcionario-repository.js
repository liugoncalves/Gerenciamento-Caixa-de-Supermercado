import pg from 'pg';

async function CadastrarFuncionario(funcionario) {
    const conn = await conectar();

    try {
        const sql = `
            INSERT INTO funcionario (CPF, Nome, Email, Senha, Cargo, Salario, DataAdmissao)
            VALUES ($1, $2, $3, $4, $5, $6, NOW())
            RETURNING Codigo
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

export default { CadastrarFuncionario , ListarFuncionarios };