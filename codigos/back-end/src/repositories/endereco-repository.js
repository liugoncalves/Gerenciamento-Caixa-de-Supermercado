import pool from '../config/db.js';

class EnderecoRepository {
    async cadastrar(endereco) {
        const conn = await pool.connect();
        try {
            const sql = `
                INSERT INTO enderecos (nome_rua, numero, complemento, bairro, cidade, estado, cep, cpf_cliente)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING codigo;
            `;
            const valores = [endereco.nome_rua, endereco.numero, endereco.complemento, endereco.bairro,
                             endereco.cidade, endereco.estado, endereco.cep, endereco.cpf_cliente]
            const resultado = await conn.query(sql, valores);
            return resultado.rows[0];
        
        } catch (err) {
            if (err.code === '23505') {
                if (err.detail?.includes('cpf_cliente')) throw new Error('O cliente com esse CPF já tem endereço cadastrado no Sistema.');
            }
            throw new Error(`Erro ao cadastrar endereço: ${err.message}`);
        } finally {
            conn.release();
        }
    }	

    // Função para listar todos os endereços
    async listarTodos() {
        const conn = await pool.connect();
        try {
            const sql = `
            SELECT codigo, nome_rua, numero, complemento, bairro, cidade, estado, cep, cpf_cliente 
            FROM enderecos
            `;
            const resultado = await conn.query(sql);
            return resultado.rows;

        } catch (err) {
            throw new Error('Erro ao listar endereços: ' + err.message);
        } finally {
            conn.release();
        }
    }

    // Função para ordenar a lista de endereços com base em um critério
    async ordenarPorColuna(coluna) {
        const conn = await pool.connect();
        try{
        let sql = `
            SELECT codigo, nome_rua, numero, complemento, bairro, cidade, estado, cep, cpf_cliente
            FROM enderecos
            ORDER BY ${coluna}
        `;
        const resultado = await conn.query(sql);
        return resultado.rows;

        } catch (err) {
            throw new Error('Erro ao ordenar endereços: ' + err.message);
        } finally {
            conn.release();
        }
    }

    // Função para consultar um endereço pelo código
    async consultarPorCodigo(codigo) {
        const conn = await pool.connect();
        try {
            const sql = `
                SELECT codigo, nome_rua, numero, complemento, bairro, cidade, estado, cep, cpf_cliente
                FROM enderecos
                WHERE codigo = $1
            `;
            const resultado = await conn.query(sql, [codigo]);
            return resultado.rows[0] || null;

        } catch (err) {
            throw new Error('Erro ao consultar endereço: ' + err.message);
        } finally {
            conn.release();
        }
    }

    // Função para consultar um endereço por CPF do cliente
    async consultarPorCPF(cpf) {
        const conn = await pool.connect();
        try {
            const sql = `
                SELECT nome_rua, numero, complemento, bairro, cidade, estado, cep
                FROM enderecos
                WHERE cpf_cliente = $1;
            `;
            const resultado = await conn.query(sql, [cpf]);
            return resultado.rows[0] || null;

        } catch (error) {
            throw new Error('Erro ao consultar o endereço: ' + error.message);
        } finally {
            conn.release();
        }
    }


    async alterar(codigoAntigo, endereco) {
        const conn = await pool.connect();
        try {
          await conn.query('BEGIN');
          const sqlEndereco = `
            UPDATE enderecos
            SET nome_rua = $1, numero = $2, complemento = $3, bairro = $4, cidade = $5, estado = $6, cep = $7, cpf_cliente = $8
            WHERE codigo = $9
            RETURNING codigo;
          `;
          const resultadoEndereco = await conn.query(sqlEndereco, [
            endereco.nome_rua,
            endereco.numero,
            endereco.complemento,
            endereco.bairro,
            endereco.cidade,
            endereco.estado,
            endereco.cep,
            endereco.cpf_cliente,
            codigoAntigo
          ]);
      
          if (resultadoEndereco.rowCount === 0) {
            await conn.query('ROLLBACK');
            return null; // Endereço não encontrado
          }
      
          const logradouroAtualizado = formatarLogradouro(endereco);
      
          const sqlVendas = `
            UPDATE vendas
            SET logradouro = $1
            WHERE cpf_cliente = $2
          `;
          await conn.query(sqlVendas, [logradouroAtualizado, endereco.cpf_cliente]);
      
          await conn.query('COMMIT');
          return true; // Alteração bem-sucedida
      
        } catch (err) {
          await conn.query('ROLLBACK');
          throw new Error('Erro no repositório ao alterar endereço: ' + err.message);
        } finally {
          conn.release();
        }

      }

    // Função para deletar um endereço pelo código
    async deletar(codigo) {
        const conn = await pool.connect();
        try {
            const sql = 'DELETE FROM enderecos WHERE codigo = $1 RETURNING*';
            const resultado = await conn.query(sql, [codigo]);
            
            return resultado.rows[0] || null;

        } catch (err) {
            throw new Error('Erro ao excluir endereço: ' + err.message);
        } finally {
            conn.release();
        }
    }
}

function formatarLogradouro(endereco) {
    return `${endereco.nome_rua}, ${endereco.numero}${endereco.complemento ? ', ' + endereco.complemento : ''}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}, ${endereco.cep}`;
}
  
export default new EnderecoRepository();

