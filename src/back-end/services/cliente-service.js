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

async function CadastrarCliente(cliente){
    try{
        if (!ValidarCPF(cliente.cpf)){
            throw new Error('CPF inválido.');
        }

        return await clienteRepository.CadastrarCliente(cliente);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function ListarClientes(){
    return await clienteRepository.ListarClientes();
}

export default { CadastrarCliente , ListarClientes };