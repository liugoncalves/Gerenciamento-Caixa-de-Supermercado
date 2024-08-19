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

async function OrdenarListaClientes(req, res) {
    const criterio = req.query.criterio;

    if (!criterio) {
        return res.status(400).send('Critério de ordenação não especificado.');
    }

    try {
        const resultado = await clienteService.OrdenarListaClientes(criterio);
        res.status(200).send(resultado);
    } catch (error) {
        res.status(500).send(`${error.message}`);
    }
}

async function ConsultarCliente(req, res){
    const cpf = req.params.cpf;

    if (!cpf){
        return res.status(400).send('Digite um CPF para realizar a busca.');
    }

    try {
        const resultado = await clienteService.ConsultarCliente(cpf);
        if (!resultado){
            return res.status(404).send('Cliente não encontrado.');
        }
        res.send(resultado);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function AlterarCliente(req, res){
    let cpf_antigo = req.params.cpf;
    let {nome, cpf, telefone, email, data_cadastro} = req.body;

    const cliente = {nome, cpf, telefone, email, data_cadastro};

    const erroValidacao = validarDadosCliente(cliente);
    if (erroValidacao){
        return res.status(400).send(erroValidacao);
    }

    try {
        let resultado = await clienteService.AlterarCliente(cpf_antigo, cliente);
        res.status(200).send(resultado);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function DeletarCliente(req, res){
    let cpf = req.params.cpf;

    if (!cpf){
        return res.status(400).send('Digite um CPF para realizar a exclusão.');
    }

    try {
        let resultado = await clienteService.DeletarCliente(cpf);
        res.status(200).send(resultado);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

function validarDadosCliente(cliente){
    const {nome, cpf, telefone, email} = cliente;

    if (!nome || !cpf || !telefone || !email){ 
        return 'Preecnha todos os campos.';
    }

    if (cpf.length !== 11){
        return 'O CPF deve conter 11 dígitos.';
    }

    return null;
}

export default {CadastrarCliente, ListarClientes, OrdenarListaClientes, ConsultarCliente, AlterarCliente, DeletarCliente};