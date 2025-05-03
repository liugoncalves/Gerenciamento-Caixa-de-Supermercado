import produto_repository from '../repositories/produto-repository.js';
import venda_repository from '../repositories/venda-repository.js';

class ProdutoService{
    async cadastrarProduto(produto) {
        return await produto_repository.cadastrar(produto);
    }

    async listarProdutos() {
        return await produto_repository.listarTodos();
    }

    async ordenarListaProdutos(coluna, direcao = 'ASC') {
        const colunasValidas = ['codigo', 'nome', 'valor'];
        const direcoesValidas = ['ASC', 'DESC'];

        if(!colunasValidas.includes(coluna)){
            throw new Error('Coluna de ordenação inválida.');
        }

        if (!direcoesValidas.includes(direcao.toUpperCase())) {
            throw new Error('Direção de ordenação inválida.');
        }

        return await produto_repository.ordenarPorColuna(coluna, direcao.toUpperCase());
    }

    async consultarProduto(codigo) {
        const produto = await produto_repository.consultarPorCodigo(codigo);
        if(!produto){
            throw new Error('Produto não encontrado.');
        }

        return produto;
    }


    async alterarProduto(codigo_antigo, produto) {
        return await produto_repository.alterar(codigo_antigo, produto);
    }

    async deletarProduto(codigo) {
        const vendas_associadas = await venda_repository.consultarVendaPorCodProduto(codigo);
        if (vendas_associadas && vendas_associadas.length > 0) {
            throw new Error('Produto não pode ser excluído, pois está associado a compras.');
        }
        const deletado = await produto_repository.deletar(codigo);
        if(!deletado){
            throw new Error('Produto não encontrado para deletar.');
        }

        return deletado;
    }

}

export default new ProdutoService();