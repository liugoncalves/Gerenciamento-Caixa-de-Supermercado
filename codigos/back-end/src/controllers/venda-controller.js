import venda_service from '../services/venda-service.js';


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

/**
 * Controlador de Vendas.
 */
class VendaController {
    /**
     * Realiza uma venda com base nos dados fornecidos.
     * @param {Object} req - Requisição HTTP.
     * @param {Object} res - Resposta HTTP.
     */
    async realizarVenda(req, res) {
        const { cpf_cliente, cpf_funcionario, codigo_produto, quantidade } = req.body;

        const venda = { cpf_cliente, cpf_funcionario, codigo_produto, quantidade };

        const erro_validacao = validarDadosVenda(venda);
        if (erro_validacao) {
            return res.status(400).send({ erro: true, mensagem: erro_validacao });
        }

        try {
            let resultado = await venda_service.realizarVenda(venda);
            res.status(201).send({ sucesso: true, dados: resultado });
        } catch (error) {
            res.status(500).send({ erro: true, mensagem: error.message });
        }
    }

    /**
     * Lista todas as vendas registradas.
     * @param {Object} req - Requisição HTTP.
     * @param {Object} res - Resposta HTTP.
     */
    async listarVendas(req, res) {
        try {
            const vendas = await venda_service.listarVendas();
            res.status(200).send({ sucesso: true, dados: vendas });
        } catch (error) {
            res.status(500).send({ erro: true, mensagem: error.message });
        }
    }

    /**
     * Consulta uma venda com base no código fornecido.
     * @param {Object} req - Requisição HTTP.
     * @param {Object} res - Resposta HTTP.
     */
    async consultarVenda(req, res) {
        let codigo = req.params.codigo;

        if (!codigo) {
            return res.status(400).send({ erro: true, mensagem: 'Digite um código para realizar a busca.' });
        }

        try {
            const resultado = await venda_service.consultarVenda(codigo);
            if (!resultado) {
                return res.status(404).send({ erro: true, mensagem: 'Venda não encontrada.' });
            }
            res.status(200).send({ sucesso: true, dados: resultado });
        } catch (error) {
            res.status(500).send({ erro: true, mensagem: `Erro ao consultar venda: ${error.message}` });
        }
    }

    /**
     * Altera os dados de uma venda existente.
     * @param {Object} req - Requisição HTTP.
     * @param {Object} res - Resposta HTTP.
     */
    async alterarVenda(req, res) {
        const { cpf_cliente, cpf_funcionario, codigo_produto, quantidade } = req.body;
        const codigo_venda = req.params.codigo;

        const venda = { cpf_cliente, cpf_funcionario, codigo_produto, quantidade };

        const erro_validacao = validarDadosVenda(venda);
        if (erro_validacao) {
            return res.status(400).send({ erro: true, mensagem: erro_validacao });
        }

        try {
            const resultado = await venda_service.alterarVenda(codigo_venda, venda);
            res.status(200).send({ sucesso: true, dados: resultado });
        } catch (error) {
            res.status(500).send({ erro: true, mensagem: error.message });
        }
    }

    /**
     * Deleta uma venda com base no código fornecido.
     * @param {Object} req - Requisição HTTP.
     * @param {Object} res - Resposta HTTP.
     */
    async deletarVenda(req, res) {
        const codigo_venda = req.params.codigo;

        if (!codigo_venda) {
            return res.status(400).send({ erro: true, mensagem: 'Código da venda é necessário.' });
        }

        try {
            const resultado = await venda_service.deletarVenda(codigo_venda);
            res.status(200).send({ sucesso: true, dados: resultado });
        } catch (error) {
            res.status(500).send({ erro: true, mensagem: error.message });
        }
    }

    /**
     * Gera a nota fiscal de uma venda com base no código fornecido.
     * @param {Object} req - Requisição HTTP.
     * @param {Object} res - Resposta HTTP.
     */
    async gerarNotaFiscal(req, res) {
        try {
            const { codigo } = req.params;
            const resultado = await venda_service.gerarNotaFiscal(codigo);
            res.status(200).send({ sucesso: true, dados: resultado });
        } catch (error) {
            res.status(500).send({ erro: true, mensagem: error.message });
        }
    }
}

export default new VendaController();
