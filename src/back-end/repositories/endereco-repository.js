import { query } from 'express';
import pg from 'pg';

async function CadastrarEndereco(endereco) {
    const conn = await conectar();

    try{
        const sql = `
            INSERT INTO enderecos (nome_rua, numero, complemento, bairro, cidade, estado, cep, cpf_cliente)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING codigo;
        `;
        const resultado = await conn.query(sql, [
            endereco.nome_rua,
            endereco.numero,
            endereco.bairro,
            endereco.complemento,
            endereco.cidade,
            endereco.estado,
            endereco.cep,
            endereco.cpf_cliente
        ]);

        return { mensagem: 'Endereço cadastrado com sucesso.' };
    
    } catch (err) {
        throw new Error('Erro ao cadastrar endereço: ' + err.message);
    } finally {
        conn.release();
    }
}	

async function ListarEnderecos(){
    const conn = await conectar();

    try{
        const sql = 'SELECT codigo, nome_rua, numero, complemento, bairro, cidade, estado, cep, cpf_cliente FROM enderecos';
        const resultado = await conn.query(sql);

        if (resultado.rowCount === 0){
            return { mensagem: 'Nenhum endereço cadastrado.' };
        }

        return resultado.rows;

    } catch (err) {
        throw new Error('Erro ao listar endereços: ' + err.message);
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

export default { CadastrarEndereco , ListarEnderecos };