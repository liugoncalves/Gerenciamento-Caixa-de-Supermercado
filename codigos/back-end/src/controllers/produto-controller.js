import produtoService from '../services/produto-service.js';

class ProdutoController {
    async cadastrarProduto(req, res) {
        const { codigo, nome, valor, quantidade } = req.body;
        const produto = { codigo, nome, valor, quantidade };

        const erroValidacao = this.validarDadosProduto(produto);
        if (erroValidacao) {
            return res.status(400).json(erroValidacao);
        }

        try {
            const resultado = await produtoService.cadastrarProduto(produto);
            res.status(201).json(resultado);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async listarProdutos(req, res) {
        try {
            const produtos = await produtoService.listarProdutos();
            res.status(200).json(produtos);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async ordenarListaProdutos(req, res) {
        const { criterio, ordem } = req.query;

        if (!criterio) {
            return res.status(400).json('Critério de ordenação não especificado.');
        }

        try {
            const resultado = await produtoService.ordenarListaProdutos(criterio, ordem);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }

    async consultarProduto(req, res) {
        const codigo = req.params.codigo;

        if (!codigo) {
            return res.status(400).json('Digite um código para realizar a busca.');
        }

        try {
            const produto = await produtoService.consultarProduto(codigo);
            res.status(200).json(produto);
        } catch (error) {
            res.status(404).json(error.message);
        }
    }

    async alterarProduto(req, res) {
        const codigo_antigo = req.params.codigo;
        const { codigo, nome, valor, quantidade } = req.body;
        const produto = { codigo, nome, valor, quantidade };

        const erroValidacao = this.validarDadosProduto(produto);
        if (erroValidacao) {
            return res.status(400).json(erroValidacao);
        }

        try {
            const resultado = await produtoService.alterarProduto(codigo_antigo, produto);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async deletarProduto(req, res) {
        const codigo = req.params.codigo;

        if (!codigo) {
            return res.status(400).json('Digite um código para realizar a exclusão.');
        }

        try {
            const resultado = await produtoService.deletarProduto(codigo);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }

    validarDadosProduto(produto) {
        const { codigo, nome, valor, quantidade } = produto;

        if (!codigo || !nome || !valor || !quantidade) {
            return 'Preencha todos os campos.';
        }

        if (valor <= 0) {
            return 'O valor do produto deve ser maior que zero.';
        }

        if (quantidade <= 0) {
            return 'A quantidade do produto deve ser maior que zero.';
        }

        const unidade = quantidade.toString().slice(-2).toLowerCase();
        if (!['g', 'kg', 'ml', 'l'].includes(unidade)) {
            return 'A unidade de medida da quantidade deve ser g, kg, ml ou l.';
        }

        return null;
    }
}

export default new ProdutoController();
