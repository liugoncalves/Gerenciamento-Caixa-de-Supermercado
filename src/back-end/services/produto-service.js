import produtoRepository from '../repositories/produto-repository.js';
//import vendaRepository from '../repositories/venda-repository.js';

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

async function OrdenarListaProdutos(criterio) {
    try {
        return await produtoRepository.OrdenarListaProdutos(criterio);
    } catch (error) {
        throw new Error(`Erro ao ordenar produtos: ${error.message}`);
    }
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
       /* Verificar se o Produto está associado à vendas concluídas.
       const vendasAssociadas = await vendaRepository.ConsultarVendaPorCodProduto(codigo);
       if (vendasAssociadas && vendasAssociadas.length > 0) {
           throw new Error('Produto não pode ser excluído, pois está associado à compras.');
       }*/

        return await produtoRepository.DeletarProduto(codigo);

    } catch (error) {
        throw new Error(error.message);
    }
}


export default { CadastrarProduto , ListarProdutos , OrdenarListaProdutos, ConsultarProduto , AlterarProduto , DeletarProduto };