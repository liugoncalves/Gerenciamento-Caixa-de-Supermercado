import bcrypt from 'bcrypt';
import funcionarioRepository from '../repositories/funcionario-repository.js';
import vendaRepository from '../repositories/venda-repository.js';

// Regras de negócio
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

    if (resto < 2) 
        resto = 0;
    else resto = 11 - resto;

    if (parseInt(cpf[9]) !== resto) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }

    resto = soma % 11;

    if (resto < 2) 
        resto = 0;
    else resto = 11 - resto;

    return parseInt(cpf[10]) === resto;
}

function ValidarSalario(salario) { // Função para validar o salário
    if (salario <= 0) {
        throw new Error('O salário deve ser maior que zero.');
    }
}

async function CriptografarSenha(senha) { // Função para criptografar a senha
    const saltRounds = 10;
    try {
        return await bcrypt.hash(senha, saltRounds);
    } catch (error) {
        throw new Error(`Erro ao criptografar a senha: ${error.message}`);
    }
}

//...............................................//

async function CadastrarFuncionario(funcionario) {
    try {
        if (!ValidarCPF(funcionario.cpf)) {
            throw new Error('CPF inválido');
        }

        ValidarSalario(funcionario.salario);
        funcionario.senha = await CriptografarSenha(funcionario.senha);

        return await funcionarioRepository.CadastrarFuncionario(funcionario);

    } catch (error) {
        throw new Error(error.message);
    }
}

async function ListarFuncionarios() {
    return await funcionarioRepository.ListarFuncionarios();
}

async function OrdenarListaFuncionarios(criterio) {
    try {
        return await funcionarioRepository.OrdenarListaFuncionarios(criterio);
    } catch (error) {
        throw new Error(`Erro ao ordenar funcionários: ${error.message}`);
    }
}

async function ConsultarFuncionario(cpf) {
    return await funcionarioRepository.ConsultarFuncionario(cpf);
}

async function AlterarFuncionario(cpf_antigo, funcionario) {
    try {
        if (!ValidarCPF(funcionario.cpf)) {
            throw new Error('CPF inválido');
        }

        ValidarSalario(funcionario.salario);
        funcionario.senha = await CriptografarSenha(funcionario.senha);

        return await funcionarioRepository.AlterarFuncionario(cpf_antigo, funcionario);

    } catch (error) {
        throw new Error(`Erro ao alterar funcionário: ${error.message}`);
    }
}

async function DeletarFuncionario(cpf) {
    try {
        if (!ValidarCPF(cpf)) {
            throw new Error('CPF inválido');
        }

        // Verificar se o funcionário já realizou vendas
        const vendasAssociadas = await vendaRepository.ConsultarVendaPorCPF(cpf);
        if (vendasAssociadas && vendasAssociadas.length > 0) {
            throw new Error('Funcionário não pode ser excluído, pois realizou vendas.');
        }

        return await funcionarioRepository.DeletarFuncionario(cpf);

    } catch (error) {
        throw new Error(error.message);
    }
}


async function RealizarLogin(email, senha) {
    try {
        const funcionario = await funcionarioRepository.ConsultarPorEmail(email);
        if (!funcionario) {
            throw new Error('E-mail não cadastrado.');
        }

        const senhaValida = await bcrypt.compare(senha, funcionario.senha);
        if (!senhaValida) {
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

export default { CadastrarFuncionario, ListarFuncionarios, OrdenarListaFuncionarios, ConsultarFuncionario, AlterarFuncionario , DeletarFuncionario, RealizarLogin };
