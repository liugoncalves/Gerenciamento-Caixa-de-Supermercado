// importação do serviço de cliente
import cliente_service from '../services/cliente-service.js';

/**
 * Cadastra um novo cliente no sistema.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function CadastrarCliente(req, res) {
    // destruição dos dados enviados na requisição
    const { nome, cpf, telefone, email } = req.body;

    // criação do objeto cliente
    const cliente = { nome, cpf, telefone, email};

    // validação dos dados do cliente
    const erro_validacao = ValidarDadosCliente(cliente);
    if (erro_validacao) {
        return res.status(400).send(erro_validacao);
    }

    try {
        // tentativa de cadastrar o cliente
        let resultado = await cliente_service.CadastrarCliente(cliente);
        res.status(201).send(resultado);
    } catch (error) {
        // tratamento de erros
        res.status(500).send(`${error.message}`);
    }
}

/**
 * Lista todos os clientes cadastrados.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function ListarClientes(req, res) {
    // listagem de clientes
    res.send(await cliente_service.ListarClientes());
}

/**
 * Ordena a lista de clientes com base no critério fornecido.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function OrdenarListaClientes(req, res) {
    // obtenção do critério de ordenação da consulta
    const criterio = req.query.criterio;

    if (!criterio) {
        return res.status(400).send('Critério de ordenação não especificado.');
    }

    try {
        // tentativa de ordenar a lista de clientes
        const resultado = await cliente_service.OrdenarListaClientes(criterio);
        res.status(200).send(resultado);
    } catch (error) {
        // tratamento de erros
        res.status(500).send(`${error.message}`);
    }
}

/**
 * Consulta um cliente com base no CPF fornecido.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function ConsultarCliente(req, res) {
    // obtenção do CPF da consulta
    const cpf = req.params.cpf;

    if (!cpf) {
        return res.status(400).send('Digite um CPF para realizar a busca.');
    }

    try {
        // tentativa de consultar o cliente
        const resultado = await cliente_service.ConsultarCliente(cpf);
        if (!resultado) {
            return res.status(404).send('Cliente não encontrado.');
        }
        res.send(resultado);
    } catch (error) {
        // tratamento de erros
        res.status(500).send(error.message);
    }
}

/**
 * Altera as informações de um cliente existente.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function AlterarCliente(req, res) {
    // obtenção do CPF antigo e novos dados do cliente
    let cpf_antigo = req.params.cpf;
    let { nome, cpf, telefone, email, data_cadastro } = req.body;

    // criação do objeto cliente com os novos dados
    const cliente = { nome, cpf, telefone, email, data_cadastro };

    // validação dos dados do cliente
    const erro_validacao = ValidarDadosCliente(cliente);
    if (erro_validacao) {
        return res.status(400).send(erro_validacao);
    }

    try {
        // tentativa de alterar as informações do cliente
        let resultado = await cliente_service.AlterarCliente(cpf_antigo, cliente);
        res.status(200).send(resultado);
    } catch (error) {
        // tratamento de erros
        res.status(500).send(error.message);
    }
}

/**
 * Deleta um cliente com base no CPF fornecido.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function DeletarCliente(req, res) {
    // obtenção do CPF para exclusão
    let cpf = req.params.cpf;

    if (!cpf) {
        return res.status(400).send('Digite um CPF para realizar a exclusão.');
    }

    try {
        // tentativa de deletar o cliente
        let resultado = await cliente_service.DeletarCliente(cpf);
        res.status(200).send(resultado);
    } catch (error) {
        // tratamento de erros
        res.status(500).send(error.message);
    }
}

/**
 * Valida os dados fornecidos para um cliente.
 * @param {Object} cliente - Dados do cliente.
 * @returns {string|null} Mensagem de erro ou null se os dados estiverem válidos.
 */
function ValidarDadosCliente(cliente) {
    const { nome, cpf, telefone, email } = cliente;

    // verificação de campos obrigatórios
    if (!nome || !cpf || !telefone || !email) { 
        return 'preencha todos os campos.';
    }

    // verificação do tamanho do CPF
    if (cpf.length !== 11) {
        return 'o cpf deve conter 11 dígitos.';
    }

    return null;
}

// exportação das funções do módulo
export default { CadastrarCliente, ListarClientes, OrdenarListaClientes, ConsultarCliente, AlterarCliente, DeletarCliente };
