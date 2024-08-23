// importação do serviço de produto
import produto_service from '../services/produto-service.js';

/**
 * Cadastra um novo produto no sistema.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function CadastrarProduto(req, res) {
    // destruição dos dados enviados na requisição
    const { codigo, nome, valor, quantidade } = req.body;

    // criação do objeto produto
    const produto = { codigo, nome, valor, quantidade };

    // validação dos dados do produto
    const erro_validacao = await ValidarDadosProduto(produto);
    if (erro_validacao) {
        return res.status(400).send(erro_validacao);
    }

    try {
        // tentativa de cadastrar o produto
        let resultado = await produto_service.CadastrarProduto(produto);
        res.status(201).send(resultado);
    } catch (error) {
        // tratamento de erros
        res.status(500).send(`${error.message}`);
    }
}

/**
 * Lista todos os produtos cadastrados.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function ListarProdutos(req, res) {
    // listagem de produtos
    res.send(await produto_service.ListarProdutos());
}

/**
 * Ordena a lista de produtos com base no critério fornecido.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function OrdenarListaProdutos(req, res) {
    // obtenção do critério de ordenação da consulta
    const criterio = req.query.criterio;

    if (!criterio) {
        return res.status(400).send('Critério de ordenação não especificado.');
    }

    try {
        // tentativa de ordenar a lista de produtos
        const resultado = await produto_service.OrdenarListaProdutos(criterio);
        res.status(200).send(resultado);
    } catch (error) {
        // tratamento de erros
        res.status(500).send(`${error.message}`);
    }
}

/**
 * Consulta um produto com base no código fornecido.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function ConsultarProduto(req, res) {
    // obtenção do código da consulta
    let codigo = req.params.codigo;

    if (!codigo) {
        return res.status(400).send('Digite um código para realizar a busca.');
    }

    try {
        // tentativa de consultar o produto
        const resultado = await produto_service.ConsultarProduto(codigo);
        if (!resultado) {
            return res.status(404).send('Produto não encontrado.');
        }
        res.send(resultado);
    } catch (error) {
        // tratamento de erros
        res.status(500).send(`Erro ao consultar produto: ${error.message}`);
    }
}

/**
 * Altera as informações de um produto existente.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function AlterarProduto(req, res) {
    // obtenção do código antigo e novos dados do produto
    let codigo_antigo = req.params.codigo;
    let { codigo, nome, valor, quantidade } = req.body;

    // criação do objeto produto com os novos dados
    const produto = { codigo, nome, valor, quantidade };

    // validação dos dados do produto
    const erro_validacao = await ValidarDadosProduto(produto);
    if (erro_validacao) {
        return res.status(400).send(erro_validacao);
    }

    try {
        // tentativa de alterar as informações do produto
        let resultado = await produto_service.AlterarProduto(codigo_antigo, produto);
        res.status(200).send(resultado);
    } catch (error) {
        // tratamento de erros
        res.status(500).send(`${error.message}`);
    }
}

/**
 * Deleta um produto com base no código fornecido.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function DeletarProduto(req, res) {
    // obtenção do código para exclusão
    let codigo = req.params.codigo;

    if (!codigo) {
        return res.status(400).send('Digite um código para realizar a exclusão.');
    }

    try {
        // tentativa de deletar o produto
        let resultado = await produto_service.DeletarProduto(codigo);
        res.send(resultado);
    } catch (error) {
        // tratamento de erros
        res.status(500).send(`${error.message}`);
    }
}

/**
 * Valida os dados fornecidos para um produto.
 * @param {Object} produto - Dados do produto.
 * @returns {string|null} Mensagem de erro ou null se os dados estiverem válidos.
 */
async function ValidarDadosProduto(produto) {
    if (!produto.codigo || !produto.nome || !produto.valor || !produto.quantidade) {
        return 'Preencha todos os campos.';
    }

    if (produto.valor <= 0) {
        return 'O valor do produto deve ser maior que zero.';
    }

    if (produto.quantidade <= 0) {
        return 'A quantidade do produto deve ser maior que zero.';
    }
    
    // garantir que tenha g/kg ou ml/l no final da quantidade
    const unidadeMedida = produto.quantidade.slice(-2);
    if (!['g', 'kg', 'ml', 'l'].includes(unidadeMedida)) {
        return 'A unidade de medida da quantidade deve ser g, kg, ml ou l.';
    }

    return null;
}

// exportação das funções do módulo
export default { CadastrarProduto, ListarProdutos, OrdenarListaProdutos, ConsultarProduto, AlterarProduto, DeletarProduto };
