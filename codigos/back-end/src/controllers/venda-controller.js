// importação do serviço de venda
import venda_service from '../services/venda-service.js';

/**
 * Realiza uma venda com base nos dados fornecidos.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function RealizarVenda(req, res) {
    // destruição dos dados enviados na requisição
    const { cpf_cliente, cpf_funcionario, codigo_produto, quantidade } = req.body;

    // criação do objeto venda
    const venda = { cpf_cliente, cpf_funcionario, codigo_produto, quantidade };

    // validação dos dados da venda
    const erro_validacao = validarDadosVenda(venda);
    if (erro_validacao) {
        return res.status(400).send(erro_validacao);
    }

    try {
        // tentativa de realizar a venda
        let resultado = await venda_service.RealizarVenda(venda);
        res.status(201).send(resultado);
    } catch (error) {
        // tratamento de erros
        res.status(500).send(`${error.message}`);
    }
}

/**
 * Lista todas as vendas registradas.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function ListarVendas(req, res) {
    // listagem de vendas
    res.send(await venda_service.ListarVendas());
}

/**
 * Consulta uma venda com base no código fornecido.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function ConsultarVenda(req, res) {
    // obtenção do código da venda
    let codigo = req.params.codigo;

    if (!codigo) {
        return res.status(400).send('Digite um código para realizar a busca.');
    }

    try {
        // tentativa de consultar a venda
        const resultado = await venda_service.ConsultarVenda(codigo);
        if (!resultado) {
            return res.status(404).send('Venda não encontrada.');
        }
        res.send(resultado);
    } catch (error) {
        // tratamento de erros
        res.status(500).send(`Erro ao consultar venda: ${error.message}`);
    }
}

/**
 * Altera os dados de uma venda existente.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function AlterarVenda(req, res) {
    // destruição dos dados da requisição
    const { cpf_cliente, cpf_funcionario, codigo_produto, quantidade } = req.body;
    const codigo_venda = req.params.codigo;

    // criação do objeto venda com os novos dados
    const venda = { cpf_cliente, cpf_funcionario, codigo_produto, quantidade };

    // validação dos dados da venda
    const erro_validacao = validarDadosVenda(venda);
    if (erro_validacao) {
        return res.status(400).send(erro_validacao);
    }

    try {
        // tentativa de alterar a venda
        const resultado = await venda_service.AlterarVenda(codigo_venda, venda);
        res.status(200).send(resultado);
    } catch (error) {
        // tratamento de erros
        res.status(500).send(`${error.message}`);
    }
}

/**
 * Deleta uma venda com base no código fornecido.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function DeletarVenda(req, res) {
    // obtenção do código da venda
    const codigo_venda = req.params.codigo;

    if (!codigo_venda) {
        return res.status(400).send('Código da venda é necessário.');
    }

    try {
        // tentativa de deletar a venda
        const resultado = await venda_service.DeletarVenda(codigo_venda);
        if (resultado.mensagem) {
            return res.status(404).send(resultado.mensagem);
        }
        res.status(200).send(resultado);
    } catch (error) {
        // tratamento de erros
        res.status(500).send(`${error.message}`);
    }
}

async function GerarNotaFiscal(req, res) {
    try {
        const { codigo } = req.params;
        const resultado = await venda_service.GerarNotaFiscal(codigo);
        res.status(200).send(resultado);
    } catch (error) {
        res.status(500).send(`${error.message}`);
    }
}

/**
 * Valida os dados fornecidos para uma venda.
 * @param {Object} venda - Dados da venda.
 * @returns {string|null} Mensagem de erro ou null se os dados estiverem válidos.
 */
function validarDadosVenda(venda) {
    const { cpf_cliente, cpf_funcionario, codigo_produto, quantidade } = venda;

    if (!cpf_cliente || !cpf_funcionario || !codigo_produto || !quantidade) {
        return 'Preencha todos os campos.';
    }

    if (cpf_cliente.length !== 11 || cpf_funcionario.length !== 11) {
        return 'O CPF deve conter 11 dígitos.';
    }
    
    if (quantidade <= 0) {
        return 'Quantidade deve ser maior que zero.';
    }

    return null;
}

// exportação das funções do módulo
export default { RealizarVenda, ListarVendas, ConsultarVenda, AlterarVenda, DeletarVenda , GerarNotaFiscal};
