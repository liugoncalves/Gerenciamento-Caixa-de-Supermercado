import produtoRepository from '../repositories/produto-repository.js';

async function CadastrarProduto(produto){
    try {
        return await produtoRepository.CadastrarProduto(produto);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function ListarProdutos(){
    return await produtoRepository.ListarProdutos();
}

async function ConsultarProduto(codigo){
    return await produtoRepository.ConsultarProduto(codigo);
}

async function AlterarProduto(codigo_antigo, produto){
    try {
        return await produtoRepository.AlterarProduto(codigo_antigo, produto);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function DeletarProduto(codigo){
    try{
        // Verifica se o produto não está associado a uma venda
        /* if (await produtoRepository.ConsultarVenda(codigo)) {
        //     throw new Error('Produto associado a uma venda. Não é possível deletar.');
        } */

        return await produtoRepository.DeletarProduto(codigo);

    } catch (error) {
        throw new Error(error.message);
    }
}


export default { CadastrarProduto , ListarProdutos , ConsultarProduto , AlterarProduto , DeletarProduto };