import bcrypt from 'bcrypt';
import funcionarioRepository from '../repositories/funcionario-repository.js';

// Função para validar o CPF
function ValidarCPF(cpf) {
    // Remover caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    // Verificar se o CPF tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Validação básica
    const todosDigitosIguais = cpf.split('').every(digit => digit === cpf[0]);
    if (todosDigitosIguais) return false;

    // Lógica de validação
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }
    let resto = soma % 11;
    if (resto < 2) resto = 0;
    else resto = 11 - resto;

    if (parseInt(cpf[9]) !== resto) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }
    resto = soma % 11;
    if (resto < 2) resto = 0;
    else resto = 11 - resto;

    return parseInt(cpf[10]) === resto;
}

async function CadastrarFuncionario(funcionario) {
    // O CPF do Cliente precisa ser válido
    if (!ValidarCPF(funcionario.cpf)) {
        throw new Error('CPF inválido');
    }

    // Validar salário
    if (funcionario.salario <= 0) {
        throw new Error('O salário deve ser um valor positivo');
    }

    // Criptografa a senha
    const saltRounds = 10;
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(funcionario.senha, saltRounds);
    } catch (error) {
        throw new Error(`Erro ao criptografar a senha: ${error.message}`);
    }

    // Atualiza a senha com a versão criptografada
    funcionario.senha = hashedPassword;
    // Chama o Repository pra cadastrar o funcionário no BD
    return await funcionarioRepository.CadastrarFuncionario(funcionario);
}

export default { CadastrarFuncionario };
