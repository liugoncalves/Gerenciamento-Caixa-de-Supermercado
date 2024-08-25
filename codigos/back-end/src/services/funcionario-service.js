import bcrypt from 'bcrypt';
import funcionario_repository from '../repositories/funcionario-repository.js';
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
 * Valida o salário de um funcionário.
 * @param {number} salario - Salário a ser validado.
 * @throws {Error} Se o salário for menor ou igual a zero.
 */
function ValidarSalario(salario) {
    if (salario <= 0) {
        throw new Error('O salário deve ser maior que zero.');
    }
}

/**
 * Criptografa uma senha utilizando bcrypt.
 * @param {string} senha - Senha a ser criptografada.
 * @returns {Promise<string>} Senha criptografada.
 * @throws {Error} Se ocorrer um erro ao criptografar a senha.
 */
async function CriptografarSenha(senha) {
    const saltRounds = 10;
    try {
        return await bcrypt.hash(senha, saltRounds);
    } catch (error) {
        throw new Error(`Erro ao criptografar a senha: ${error.message}`);
    }
}

/**
 * Cadastra um novo funcionário após validação do CPF e do salário.
 * @param {Object} funcionario - Dados do funcionário a ser cadastrado.
 * @returns {Promise<Object>} Resultado da operação de cadastro.
 * @throws {Error} Se o CPF for inválido, o salário for inválido ou ocorrer um erro durante o cadastro.
 */
async function CadastrarFuncionario(funcionario) {
    try {
        if (!ValidarCPF(funcionario.cpf)) {
            throw new Error('CPF inválido.');
        }

        ValidarSalario(funcionario.salario);
        funcionario.senha = await CriptografarSenha(funcionario.senha);

        return await funcionario_repository.CadastrarFuncionario(funcionario);

    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * Lista todos os funcionários cadastrados.
 * @returns {Promise<Array>} Lista de funcionários.
 */
async function ListarFuncionarios() {
    return await funcionario_repository.ListarFuncionarios();
}

/**
 * Ordena a lista de funcionários com base no critério especificado.
 * @param {string} criterio - Critério de ordenação.
 * @returns {Promise<Array>} Lista de funcionários ordenada.
 * @throws {Error} Se ocorrer um erro durante a ordenação.
 */
async function OrdenarListaFuncionarios(criterio) {
    try {
        return await funcionario_repository.OrdenarListaFuncionarios(criterio);
    } catch (error) {
        throw new Error(`Erro ao ordenar funcionários: ${error.message}`);
    }
}

/**
 * Consulta um funcionário com base no CPF fornecido.
 * @param {string} cpf - CPF do funcionário a ser consultado.
 * @returns {Promise<Object>} Dados do funcionário.
 */
async function ConsultarFuncionario(cpf) {
    return await funcionario_repository.ConsultarFuncionario(cpf);
}

/**
 * Altera os dados de um funcionário existente após validação do CPF e do salário.
 * @param {string} cpf_antigo - CPF antigo do funcionário.
 * @param {Object} funcionario - Dados atualizados do funcionário.
 * @returns {Promise<Object>} Resultado da operação de alteração.
 * @throws {Error} Se o CPF for inválido, o salário for inválido ou ocorrer um erro durante a alteração.
 */
async function AlterarFuncionario(cpf_antigo, funcionario) {
    try {
        if (!ValidarCPF(funcionario.cpf)) {
            throw new Error('CPF inválido.');
        }

        ValidarSalario(funcionario.salario);

        return await funcionario_repository.AlterarFuncionario(cpf_antigo, funcionario);

    } catch (error) {
        throw new Error(`Erro ao alterar funcionário: ${error.message}`);
    }
}


/**
 * Altera a senha de um funcionário existente.
 * @param {string} cpf - CPF do funcionário.
 * @param {string} novaSenha - Nova senha do funcionário.
 * @returns {Promise<Object>} Resultado da operação de alteração de senha.
 * @throws {Error} Se ocorrer um erro durante a alteração.
 */
async function AlterarSenhaFuncionario(cpf, novaSenha) {
    try {
        const senhaCriptografada = await CriptografarSenha(novaSenha);
        return await funcionario_repository.AlterarSenhaFuncionario(cpf, senhaCriptografada);
    } catch (error) {
        throw new Error(`Erro ao alterar a senha do funcionário: ${error.message}`);
    }
}


/**
 * Deleta um funcionário com base no CPF fornecido.
 * @param {string} cpf - CPF do funcionário a ser deletado.
 * @returns {Promise<Object>} Resultado da operação de deleção.
 * @throws {Error} Se o CPF for inválido ou ocorrer um erro durante a deleção.
 */
async function DeletarFuncionario(cpf) {
    try {
        if (!ValidarCPF(cpf)) {
            throw new Error('CPF inválido.');
        }

        // Verificar se o funcionário já realizou vendas
        const vendas_associadas = await venda_repository.ConsultarVendaPorCPF(cpf);
        if (vendas_associadas && vendas_associadas.length > 0) {
            throw new Error('Funcionário não pode ser excluído, pois realizou vendas.');
        }

        return await funcionario_repository.DeletarFuncionario(cpf);

    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * Realiza o login de um funcionário com base no e-mail e senha fornecidos.
 * @param {string} email - E-mail do funcionário.
 * @param {string} senha - Senha do funcionário.
 * @returns {Promise<Object>} Dados relevantes do funcionário se o login for bem-sucedido.
 * @throws {Error} Se o e-mail não estiver cadastrado, a senha for inválida ou ocorrer um erro durante o login.
 */
async function RealizarLogin(email, senha) {
    try {
        const funcionario = await funcionario_repository.ConsultarPorEmail(email);
        if (!funcionario) {
            throw new Error('E-mail não cadastrado.');
        }

        const senha_valida = await bcrypt.compare(senha, funcionario.senha);
        if (!senha_valida) {
            throw new Error('Senha inválida.');
        }

        // Retornar dados relevantes do funcionário, como o cargo
        return {
            mensagem: 'Login realizado com sucesso.',
            cargo: funcionario.cargo,
        };
    } catch (error) {
        throw new Error(error.message);
    }
}

// Exportação das funções do módulo
export default { CadastrarFuncionario, ListarFuncionarios, OrdenarListaFuncionarios, ConsultarFuncionario, 
                 AlterarFuncionario, AlterarSenhaFuncionario, DeletarFuncionario, RealizarLogin };
