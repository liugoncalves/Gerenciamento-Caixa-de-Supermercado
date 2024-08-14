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

export default { CadastrarProduto , ListarProdutos , ConsultarProduto };