// importação do serviço de endereço
import endereco_service from '../services/endereco-service.js';

/**
 * Cadastra um novo endereço no sistema.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function CadastrarEndereco(req, res) {
    // destruição dos dados enviados na requisição
    const { nome_rua, numero, complemento, bairro, cidade, estado, cep, cpf_cliente } = req.body;

    // criação do objeto endereço
    const endereco = { nome_rua, numero, complemento, bairro, cidade, estado, cep, cpf_cliente };

    // validação dos dados do endereço
    const erro_validacao = ValidarDadosEndereco(endereco);
    if (erro_validacao) {
        return res.status(400).send(erro_validacao);
    }

    try {
        // tentativa de cadastrar o endereço
        let resultado = await endereco_service.CadastrarEndereco(endereco);
        res.status(201).send(resultado);
    } catch (error) {
        // tratamento de erros
        res.status(500).send(`${error.message}`);
    }
}

/**
 * Lista todos os endereços cadastrados.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function ListarEnderecos(req, res) {
    // listagem de endereços
    res.send(await endereco_service.ListarEnderecos());
}

/**
 * Ordena a lista de endereços com base no critério fornecido.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function OrdenarListaEnderecos(req, res) {
    // obtenção do critério de ordenação da consulta
    const criterio = req.query.criterio;

    if (!criterio) {
        return res.status(400).send('Critério de ordenação não especificado.');
    }

    try {
        // tentativa de ordenar a lista de endereços
        const resultado = await endereco_service.OrdenarListaEnderecos(criterio);
        res.status(200).send(resultado);
    } catch (error) {
        // tratamento de erros
        res.status(500).send(`${error.message}`);
    }
}

/**
 * Consulta um endereço com base no código fornecido.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function ConsultarEndereco(req, res) {
    // obtenção do código da consulta
    const codigo = req.params.codigo;

    if (!codigo) {
        return res.status(400).send('Digite um código para realizar a busca.');
    }

    try {
        // tentativa de consultar o endereço
        const resultado = await endereco_service.ConsultarEndereco(codigo);
        if (!resultado) {
            return res.status(404).send('Endereço não encontrado.');
        }
        res.send(resultado);
    } catch (error) {
        // tratamento de erros
        res.status(500).send(error.message);
    }
}

//Consultar endereço por CPF
async function ConsultarEnderecoCPF(req, res) {
    // obtenção do cpf da consulta
    const cpf_cliente = req.params.cpf_cliente;

    if (!cpf_cliente) {
        return res.status(400).send('Digite um CPF para realizar a busca.');
    }

    try {
        // tentativa de consultar o endereço
        const resultado = await endereco_service.ConsultarEnderecoCPF(cpf_cliente);
        if (!resultado) {
            return res.status(404).send('Endereço não encontrado.');
        }
        res.send(resultado);
    } catch (error) {
        // tratamento de erros
        res.status(500).send(error.message);
    }
}

/**
 * Altera as informações de um endereço existente.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function AlterarEndereco(req, res) {
    // obtenção do código antigo e novos dados do endereço
    let codigo_antigo = req.params.codigo;
    let { nome_rua, numero, complemento, bairro, cidade, estado, cep, cpf_cliente } = req.body;

    // criação do objeto endereço com os novos dados
    const endereco = { nome_rua, numero, complemento, bairro, cidade, estado, cep, cpf_cliente };

    // validação dos dados do endereço
    const erro_validacao = ValidarDadosEndereco(endereco);
    if (erro_validacao) {
        return res.status(400).send(erro_validacao);
    }

    try {
        // tentativa de alterar as informações do endereço
        let resultado = await endereco_service.AlterarEndereco(codigo_antigo, endereco);
        res.status(200).send(resultado);
    } catch (error) {
        // tratamento de erros
        res.status(500).send(error.message);
    }
}

/**
 * Deleta um endereço com base no código fornecido.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function DeletarEndereco(req, res) {
    // obtenção do código para exclusão
    let codigo = req.params.codigo;

    if (!codigo) {
        return res.status(400).send('Digite um código para realizar a exclusão.');
    }

    try {
        // tentativa de deletar o endereço
        let resultado = await endereco_service.DeletarEndereco(codigo);
        res.status(200).send(resultado);
    } catch (error) {
        // tratamento de erros
        res.status(500).send(error.message);
    }
}

/**
 * Valida os dados fornecidos para um endereço.
 * @param {Object} endereco - Dados do endereço.
 * @returns {string|null} Mensagem de erro ou null se os dados estiverem válidos.
 */
function ValidarDadosEndereco(endereco) {
    const { nome_rua, numero, complemento, bairro, cidade, estado, cep, cpf_cliente } = endereco;

    // garantir que nada esteja vazio
    if (!nome_rua || !numero || !complemento || !bairro || !cidade || !estado || !cep || !cpf_cliente) {
        return 'preencha todos os campos.';
    }

    // garantir que o número seja um inteiro positivo
    if (numero < 1 || !Number.isInteger(numero)) {
        return 'número inválido.';
    }

    // CEP deve ter 8 dígitos
    if (cep.length !== 8) {
        return 'o cep deve conter 8 dígitos.';
    }

    // CPF deve ter 11 dígitos
    if (cpf_cliente.length !== 11) {
        return 'o cpf deve conter 11 dígitos.';
    }

    // Estado deve ser uma sigla de 2 letras, não pode ser um número
    if (estado.length !== 2 || !isNaN(estado)) {
        return 'estado inválido.';
    }

    return null;
}

// exportação das funções do módulo
export default { CadastrarEndereco, ListarEnderecos, OrdenarListaEnderecos, 
                 ConsultarEndereco, ConsultarEnderecoCPF, AlterarEndereco, DeletarEndereco };
