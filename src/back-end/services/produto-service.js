import produtoRepository from '../repositories/produto-repository.js';

async function CadastrarProduto(produto){
    try {
        return await produtoRepository.CadastrarProduto(produto);
    } catch (error) {
        throw new Error(error.message);
    }
}

export default { CadastrarProduto };