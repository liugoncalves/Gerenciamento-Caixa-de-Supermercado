import clienteService from '../services/cliente-service.js';

async function CadastrarCliente(req, res){
    const {nome, cpf, telefone , email, data_cadastro} = req.body;

    const cliente = {nome, cpf, telefone, email, data_cadastro};

    const erroValidacao = validarDadosCliente(cliente);
    if (erroValidacao){
        return res.status(400).send(erroValidacao);
    }

    try {
        let resultado = await clienteService.CadastrarCliente(cliente);
        res.status(201).send(resultado);
    } catch (error) {
        res.status(500).send(`${error.message}`);
    }

}

async function ListarClientes(req, res){
    res.send(await clienteService.ListarClientes());
}

function validarDadosCliente(cliente){
    const {nome, cpf, telefone, email} = cliente;

    if (!nome || !cpf || !telefone || !email){ // se
        return 'Preecnha todos os campos.';
    }

    if (cpf.length !== 11){
        return 'O CPF deve conter 11 dígitos.';
    }

    return null;
}

export default {CadastrarCliente, ListarClientes};