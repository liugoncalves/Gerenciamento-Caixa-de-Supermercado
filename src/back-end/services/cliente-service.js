// Importação dos repositórios de cliente e venda
import cliente_repository from '../repositories/cliente-repository.js';
import venda_repository from '../repositories/venda-repository.js';

/**
 * Valida um CPF de acordo com regras específicas.
 * @param {string} cpf - CPF a ser validado.
 * @returns {boolean} Verdadeiro se o CPF for válido, falso caso contrário.
 */
function ValidarCPF(cpf) {
    // Remover caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    // Verificar se o CPF tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Validação básica: verificar se todos os dígitos são iguais
    const todos_digitos_iguais = cpf.split('').every(digit => digit === cpf[0]);
    if (todos_digitos_iguais) return false;

    // Lógica de validação do CPF
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }
    
    let resto = soma % 11;
    resto = resto < 2 ? 0 : 11 - resto;

    if (parseInt(cpf[9]) !== resto) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }

    resto = soma % 11;
    resto = resto < 2 ? 0 : 11 - resto;

    return parseInt(cpf[10]) === resto;
}

/**
 * Cadastra um novo cliente após validação do CPF.
 * @param {Object} cliente - Dados do cliente a ser cadastrado.
 * @returns {Promise<Object>} Resultado da operação de cadastro.
 * @throws {Error} Se o CPF do cliente for inválido ou ocorrer um erro durante o cadastro.
 */
async function CadastrarCliente(cliente) {
    try {
        if (!ValidarCPF(cliente.cpf)) {
            throw new Error('CPF inválido.');
        }

        return await cliente_repository.CadastrarCliente(cliente);
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * Lista todos os clientes cadastrados.
 * @returns {Promise<Array>} Lista de clientes.
 */
async function ListarClientes() {
    return await cliente_repository.ListarClientes();
}

/**
 * Ordena a lista de clientes com base no critério especificado.
 * @param {string} criterio - Critério de ordenação.
 * @returns {Promise<Array>} Lista de clientes ordenada.
 * @throws {Error} Se ocorrer um erro durante a ordenação.
 */
async function OrdenarListaClientes(criterio) {
    try {
        return await cliente_repository.OrdenarListaClientes(criterio);
    } catch (error) {
        throw new Error(`Erro ao ordenar clientes: ${error.message}`);
    }
}

/**
 * Consulta um cliente com base no CPF fornecido.
 * @param {string} cpf - CPF do cliente a ser consultado.
 * @returns {Promise<Object>} Dados do cliente.
 */
async function ConsultarCliente(cpf) {
    return await cliente_repository.ConsultarCliente(cpf);
}

/**
 * Altera os dados de um cliente existente após validação do CPF.
 * @param {string} cpf_antigo - CPF antigo do cliente.
 * @param {Object} cliente - Dados atualizados do cliente.
 * @returns {Promise<Object>} Resultado da operação de alteração.
 * @throws {Error} Se o CPF do cliente for inválido ou ocorrer um erro durante a alteração.
 */
async function AlterarCliente(cpf_antigo, cliente) {
    try {
        if (!ValidarCPF(cliente.cpf)) {
            throw new Error('CPF inválido.');
        }

        return await cliente_repository.AlterarCliente(cpf_antigo, cliente);
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * Deleta um cliente com base no CPF fornecido, verificando se há compras associadas.
 * @param {string} cpf - CPF do cliente a ser deletado.
 * @returns {Promise<Object>} Resultado da operação de deleção.
 * @throws {Error} Se o CPF do cliente for inválido, houver compras associadas ou ocorrer um erro durante a deleção.
 */
async function DeletarCliente(cpf) {
    try {
        if (!ValidarCPF(cpf)) {
            throw new Error('CPF inválido.');
        }

        // Verificar se o cliente está associado a vendas concluídas
        const compras_associadas = await venda_repository.ConsultarCompraPorCPF(cpf);
        if (compras_associadas && compras_associadas.length > 0) {
            throw new Error('Cliente não pode ser excluído, pois realizou compras.');
        }

        return await cliente_repository.DeletarCliente(cpf);
    } catch (error) {
        throw new Error(error.message);
    }
}

// Exportação das funções do módulo
export default { CadastrarCliente, ListarClientes, OrdenarListaClientes, ConsultarCliente, AlterarCliente, DeletarCliente };
