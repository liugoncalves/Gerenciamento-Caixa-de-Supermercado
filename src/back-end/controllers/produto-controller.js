import produtoService from '../services/produto-service.js';

async function CadastrarProduto(req, res){
    const { codigo, nome, valor, quantidade } = req.body;

    const produto = { codigo, nome, valor, quantidade };

    const erroValidacao = await ValidarDadosProduto(produto);
    if (erroValidacao){
        return res.status(400).send(erroValidacao);
    }

    try {
        let resultado = await produtoService.CadastrarProduto(produto);
        res.status(201).send(resultado);
    } catch (error) {
        res.status(500).send(`${error.message}`);
    }
}

async function ValidarDadosProduto(produto){
    if (!produto.codigo || !produto.nome || !produto.valor || !produto.quantidade){
        return 'Informe todos os campos para cadastrar um produto.';
    }

    if (produto.valor <= 0){
        return 'O valor do produto deve ser maior que zero.';
    }

    if (produto.quantidade <= 0){
        return 'A quantidade do produto deve ser maior que zero.';
    }
    
    //garantir que tenha g/kg ou ml/l no final da quantidade
    if (!['g', 'kg', 'ml', 'l'].includes(produto.quantidade.slice(-1))){
        return 'A unidade de medida da quantidade deve ser g, kg, ml ou l.';
    }
    
}

export default { CadastrarProduto };
