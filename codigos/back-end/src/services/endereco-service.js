// Importação dos repositórios de endereço e cliente
import endereco_repository from '../repositories/endereco-repository.js';
import cliente_repository from '../repositories/cliente-repository.js';

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
 * Cadastra um novo endereço após validação do CPF e do CEP.
 * @param {Object} endereco - Dados do endereço a ser cadastrado.
 * @returns {Promise<Object>} Resultado da operação de cadastro.
 * @throws {Error} Se o CPF do cliente for inválido, o CEP for inválido ou ocorrer um erro durante o cadastro.
 */
async function CadastrarEndereco(endereco) {
    try {
        if (!ValidarCPF(endereco.cpf_cliente)) {
            throw new Error('CPF inválido.');
        }

        if (endereco.cep < 0) {
            throw new Error('CEP inválido.');
        }

        return await endereco_repository.CadastrarEndereco(endereco);
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * Lista todos os endereços cadastrados.
 * @returns {Promise<Array>} Lista de endereços.
 */
async function ListarEnderecos() {
    return await endereco_repository.ListarEnderecos();
}

/**
 * Ordena a lista de endereços com base no critério especificado.
 * @param {string} criterio - Critério de ordenação.
 * @returns {Promise<Array>} Lista de endereços ordenada.
 * @throws {Error} Se ocorrer um erro durante a ordenação.
 */
async function OrdenarListaEnderecos(criterio) {
    try {
        return await endereco_repository.OrdenarListaEnderecos(criterio);
    } catch (error) {
        throw new Error(`Erro ao ordenar endereços: ${error.message}`);
    }
}

/**
 * Consulta um endereço com base no código fornecido.
 * @param {number} codigo - Código do endereço a ser consultado.
 * @returns {Promise<Object>} Dados do endereço.
 */
async function ConsultarEndereco(codigo) {
    return await endereco_repository.ConsultarEndereco(codigo);
}

/**
 * Altera os dados de um endereço existente após validação do CPF e do CEP.
 * @param {number} codigo_antigo - Código antigo do endereço.
 * @param {Object} endereco - Dados atualizados do endereço.
 * @returns {Promise<Object>} Resultado da operação de alteração.
 * @throws {Error} Se o CPF do cliente for inválido, o CEP for inválido ou ocorrer um erro durante a alteração.
 */
async function AlterarEndereco(codigo_antigo, endereco) {
    try {
        if (!ValidarCPF(endereco.cpf_cliente)) {
            throw new Error('CPF inválido.');
        }

        if (endereco.cep < 0) {
            throw new Error('CEP inválido.');
        }

        return await endereco_repository.AlterarEndereco(codigo_antigo, endereco);
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * Deleta um endereço com base no código fornecido.
 * @param {number} codigo - Código do endereço a ser deletado.
 * @returns {Promise<Object>} Resultado da operação de deleção.
 * @throws {Error} Se ocorrer um erro durante a deleção.
 */
async function DeletarEndereco(codigo) {
    try {
        return await endereco_repository.DeletarEndereco(codigo);
    } catch (error) {
        throw new Error(error.message);
    }
}

// Exportação das funções do módulo
export default { CadastrarEndereco, ListarEnderecos, OrdenarListaEnderecos, ConsultarEndereco, AlterarEndereco, DeletarEndereco };
