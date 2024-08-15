import enderecoRepository from '../repositories/endereco-repository.js';
import clienteRepository from '../repositories/cliente-repository.js';

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

async function CadastrarEndereco(endereco){
    try{
        if (!ValidarCPF(endereco.cpf_cliente)){
            throw new Error('CPF inválido.');
        }

        if (endereco.cep < 0){
            throw new Error('CEP inválido.');
        }

        return await enderecoRepository.CadastrarEndereco(endereco);

    } catch (error) {
        throw new Error(error.message);
    }
}

async function ListarEnderecos(){
    return await enderecoRepository.ListarEnderecos();
}

async function ConsultarEndereco(codigo){
    return await enderecoRepository.ConsultarEndereco(codigo);
}

async function AlterarEndereco(codigo_antigo, endereco){
    try {
        if (!ValidarCPF(endereco.cpf_cliente)){
            throw new Error('CPF inválido.');
        }

        if (endereco.cep < 0){
            throw new Error('CEP inválido.');
        }

        return await enderecoRepository.AlterarEndereco(codigo_antigo, endereco);

    } catch (error) {
        throw new Error(error.message);
    }
}

export default { CadastrarEndereco , ListarEnderecos , ConsultarEndereco , AlterarEndereco };