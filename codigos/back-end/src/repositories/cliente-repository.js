import pool from '../config/db.js';

class ClienteRepository {
  async cadastrar(cliente) {
    const conn = await pool.connect();
    try {
      const sql = `
          INSERT INTO clientes (cpf, nome, telefone, email, dataCadastro)
          VALUES ($1, $2, $3, $4, NOW())
          RETURNING *;
      `;
      const valores = [cliente.cpf, cliente.nome, cliente.telefone, cliente.email];
      const resultado = await conn.query(sql, valores);
      
      return resultado.rows[0];
      
    } catch (err) {
        if (err.code === '23505') {
          if (err.detail?.includes('cpf')) throw new Error('CPF já cadastrado.');
          if (err.detail?.includes('telefone')) throw new Error('Telefone já cadastrado.');
          if (err.detail?.includes('email')) throw new Error('Email já cadastrado.');
        }
        throw new Error(`Erro ao cadastrar cliente no repositório: ${err.message}`);
    } finally {
      conn.release();
    }
  }

  async listarTodos() {
    const conn = await pool.connect();
    try {
        const sql = `
            SELECT cpf, nome, telefone, email, TO_CHAR(dataCadastro, 'YYYY-MM-DD HH24:MI:SS') as dataCadastro
            FROM clientes
        `;
        const resultado = await conn.query(sql);
        
        return resultado.rows;

      } catch (err) {
        throw new Error(`Erro ao listar clientes no repositório: ${err.message}`);
      } finally {
        conn.release();
      }
  }

  async ordenarPorColuna(coluna, direcao = 'ASC') {
    const conn = await pool.connect();
    try {
      const sql = `
          SELECT cpf, nome, telefone, email, TO_CHAR(dataCadastro, 'YYYY-MM-DD HH24:MI:SS') as dataCadastro
          FROM clientes
          ORDER BY ${coluna} ${direcao.toUpperCase()}
      `;
      const resultado = await conn.query(sql);
      return resultado.rows.length ? resultado.rows : null;

    } catch (err) {
      throw new Error(`Erro ao ordenar clientes no repositório: ${err.message}`);
    } finally {
      conn.release();
    }
  }

  async consultarPorCPF(cpf) {
    const conn = await pool.connect();
    try {
      const sql = `
          SELECT cpf, nome, telefone, email, TO_CHAR(dataCadastro, 'YYYY-MM-DD HH24:MI:SS') as dataCadastro
          FROM clientes
          WHERE cpf = $1
      `;
      const resultado = await conn.query(sql, [cpf]);
      
      return resultado.rows[0] || null;

    } catch (err) {
      throw new Error(`Erro ao consultar cliente no repositório: ${err.message}`);
    } finally {
      conn.release();
    }
  }

  async alterar(cpfAntigo, cliente) {
    const conn = await pool.connect();
    try {
      const sql = `
          UPDATE clientes
          SET cpf = $1, nome = $2, telefone = $3, email = $4
          WHERE cpf = $5
          RETURNING *;
      `;
      const valores = [cliente.cpf, cliente.nome, cliente.telefone, cliente.email, cpfAntigo];
      const resultado = await conn.query(sql, valores);
      
      return resultado.rows[0] || null;

    } catch (err) {
      if (err.code === '23505') {
        if (err.detail?.includes('cpf')) throw new Error('CPF já cadastrado.');
        if (err.detail?.includes('telefone')) throw new Error('Telefone já cadastrado.');
        if (err.detail?.includes('email')) throw new Error('Email já cadastrado.');
      }
      throw new Error(`Erro ao alterar cliente no repositório: ${err.message}`);
    } finally {
      conn.release();
    }
  }

  async deletar(cpf) {
    const conn = await pool.connect();
    try {
      const sql = `
          DELETE FROM clientes 
          WHERE cpf = $1 
          RETURNING *
      `;
      const resultado = await conn.query(sql, [cpf]); 
      
      return resultado.rows[0] || null;
      
    } catch (err) {
      throw new Error(`Erro ao deletar cliente no repositório: ${err.message}`);
    } finally {
      conn.release();
    }
  }
}

export default new ClienteRepository();
