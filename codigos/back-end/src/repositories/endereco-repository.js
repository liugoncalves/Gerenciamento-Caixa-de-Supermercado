import pg from 'pg';

// Função para conectar ao banco de dados
async function Conectar() {
    const pool = new pg.Pool({
        connectionString: "postgres://postgres:rootleo@localhost:5432/caixa-supermercado"
    });

    return await pool.connect();
}

// Função para cadastrar um novo endereço
async function CadastrarEndereco(endereco) {
    const conn = await Conectar();

    try {
        const sql = `
            INSERT INTO enderecos (nome_rua, numero, complemento, bairro, cidade, estado, cep, cpf_cliente)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING codigo;
        `;
        await conn.query(sql, [
            endereco.nome_rua,
            endereco.numero,
            endereco.complemento,
            endereco.bairro,
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

// Função para listar todos os endereços
async function ListarEnderecos() {
    const conn = await Conectar();

    try {
        const sql = 'SELECT codigo, nome_rua, numero, complemento, bairro, cidade, estado, cep, cpf_cliente FROM enderecos';
        const resultado = await conn.query(sql);

        if (resultado.rowCount === 0) {
            return { mensagem: 'Nenhum endereço cadastrado.' };
        }

        return resultado.rows;

    } catch (err) {
        throw new Error('Erro ao listar endereços: ' + err.message);
    } finally {
        conn.release();
    }
}

// Função para ordenar a lista de endereços com base em um critério
async function OrdenarListaEnderecos(criterio) {
    const conn = await Conectar();

    let sql = `
        SELECT codigo, nome_rua, numero, complemento, bairro, cidade, estado, cep, cpf_cliente
        FROM enderecos
    `;

    // Determinar o critério de ordenação
    if (criterio === 'nome_rua') {
        sql += ' ORDER BY nome_rua ASC';
    } else if (criterio === 'cidade') {
        sql += ' ORDER BY cidade ASC';
    } else if (criterio === 'estado') {
        sql += ' ORDER BY estado ASC';
    } else {
        throw new Error('Critério de ordenação inválido.');
    }

    try {
        const resultado = await conn.query(sql);

        if (resultado.rowCount === 0) {
            return { mensagem: 'Nenhum endereço encontrado.' };
        }

        return resultado.rows;

    } catch (err) {
        throw new Error('Erro ao ordenar endereços: ' + err.message);
    } finally {
        conn.release();
    }
}

// Função para consultar um endereço pelo código
async function ConsultarEndereco(codigo) {
    const conn = await Conectar();

    try {
        const sql = `
            SELECT codigo, nome_rua, numero, complemento, bairro, cidade, estado, cep, cpf_cliente
            FROM enderecos
            WHERE codigo = $1
        `;
        const resultado = await conn.query(sql, [codigo]);

        if (resultado.rowCount === 0) {
            return { mensagem: 'Endereço não encontrado.' };
        }

        return resultado.rows[0];

    } catch (err) {
        throw new Error('Erro ao consultar endereço: ' + err.message);
    } finally {
        conn.release();
    }
}

// Função para consultar um endereço por CPF do cliente
async function ConsultarEnderecoCPF(cpf) {
    const conn = await Conectar();

    try {
        const sql = `
            SELECT 
                nome_rua,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                cep
            FROM enderecos
            WHERE cpf_cliente = $1;
        `;
        const resultado = await conn.query(sql, [cpf]);

        if (resultado.rows.length === 0) {
            return null; // Nenhum endereço encontrado para o CPF fornecido
        }

        return resultado.rows[0]; // Retorna o endereço encontrado

    } catch (error) {
        throw new Error('Erro ao consultar o endereço: ' + error.message);
    } finally {
        conn.release();
    }
}

// Função para alterar um endereço
async function AlterarEndereco(codigoAntigo, endereco) {
    const conn = await Conectar();

    try {
        // Atualiza o endereço na tabela de endereços
        const sqlEndereco = `
            UPDATE enderecos
            SET nome_rua = $1, numero = $2, complemento = $3, bairro = $4, cidade = $5, estado = $6, cep = $7, cpf_cliente = $8
            WHERE codigo = $9
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
            return { mensagem: 'Endereço não encontrado para alteração.' };
        }

        // Cria o logradouro atualizado
        const logradouroAtualizado = `${endereco.nome_rua}, ${endereco.numero}${endereco.complemento ? ', ' + endereco.complemento : ''}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}, ${endereco.cep}`;

        // Atualiza o logradouro nas vendas associadas ao CPF do cliente
        const sqlVendas = `
            UPDATE vendas
            SET logradouro = $1
            WHERE cpf_cliente = $2
        `;
        await conn.query(sqlVendas, [
            logradouroAtualizado,
            endereco.cpf_cliente
        ]);

        return { mensagem: 'Endereço alterado com sucesso.' };
    } catch (err) {
        throw new Error('Erro ao alterar endereço: ' + err.message);
    } finally {
        conn.release();
    }
}

// Função para deletar um endereço pelo código
async function DeletarEndereco(codigo) {
    const conn = await Conectar();

    try {
        const sql = 'DELETE FROM enderecos WHERE codigo = $1';
        const resultado = await conn.query(sql, [codigo]);

        if (resultado.rowCount === 0) {
            return { mensagem: 'Endereço não encontrado para exclusão.' };
        }

        return { mensagem: 'Endereço excluído com sucesso.' };

    } catch (err) {
        throw new Error('Erro ao excluir endereço: ' + err.message);
    } finally {
        conn.release();
    }
}

export default { 
    CadastrarEndereco, 
    ListarEnderecos, 
    OrdenarListaEnderecos, 
    ConsultarEndereco, 
    ConsultarEnderecoCPF, 
    AlterarEndereco, 
    DeletarEndereco 
};
