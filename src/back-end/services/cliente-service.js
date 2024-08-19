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

async function OrdenarListaClientes(criterio) {
    try {
        return await clienteRepository.OrdenarListaClientes(criterio);
    } catch (error) {
        throw new Error(`Erro ao ordenar clientes: ${error.message}`);
    }
}

async function ConsultarCliente(cpf){
    return await clienteRepository.ConsultarCliente(cpf);
}

async function AlterarCliente(cpf_antigo, cliente){
    try {
        if (!ValidarCPF(cliente.cpf)){
            throw new Error('CPF inválido.');
        }

        return await clienteRepository.AlterarCliente(cpf_antigo, cliente);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function DeletarCliente(cpf){
    try{
        if (!ValidarCPF(cpf)){
            throw new Error('CPF inválido.');
        }

        // Verificar se o cliente não realizou nenhuma compra
        /* if (await clienteRepository.ConsultarCompra(cpf)){
            throw new Error('Cliente não pode ser deletado pois realizou compras.');
        } */

        return await clienteRepository.DeletarCliente(cpf);

    } catch (error) {
        throw new Error(error.message);
    }

}

export default { CadastrarCliente , ListarClientes , OrdenarListaClientes, ConsultarCliente , AlterarCliente , DeletarCliente };