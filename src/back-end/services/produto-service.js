import produto_repository from '../repositories/produto-repository.js';
import venda_repository from '../repositories/venda-repository.js';

/**
 * Cadastra um novo produto.
 * @param {Object} produto - Dados do produto a ser cadastrado.
 * @returns {Promise<Object>} Resultado da operação de cadastro.
 * @throws {Error} Se ocorrer um erro durante o cadastro.
 */
async function CadastrarProduto(produto) {
    try {
        return await produto_repository.CadastrarProduto(produto);
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * Lista todos os produtos cadastrados.
 * @returns {Promise<Array>} Lista de produtos.
 */
async function ListarProdutos() {
    return await produto_repository.ListarProdutos();
}

/**
 * Ordena a lista de produtos com base no critério especificado.
 * @param {string} criterio - Critério de ordenação.
 * @returns {Promise<Array>} Lista de produtos ordenada.
 * @throws {Error} Se ocorrer um erro durante a ordenação.
 */
async function OrdenarListaProdutos(criterio) {
    try {
        return await produto_repository.OrdenarListaProdutos(criterio);
    } catch (error) {
        throw new Error(`Erro ao ordenar produtos: ${error.message}`);
    }
}

/**
 * Consulta um produto com base no código fornecido.
 * @param {string} codigo - Código do produto a ser consultado.
 * @returns {Promise<Object>} Dados do produto.
 */
async function ConsultarProduto(codigo) {
    return await produto_repository.ConsultarProduto(codigo);
}

/**
 * Altera os dados de um produto existente.
 * @param {string} codigo_antigo - Código antigo do produto.
 * @param {Object} produto - Dados atualizados do produto.
 * @returns {Promise<Object>} Resultado da operação de alteração.
 * @throws {Error} Se ocorrer um erro durante a alteração.
 */
async function AlterarProduto(codigo_antigo, produto) {
    try {
        return await produto_repository.AlterarProduto(codigo_antigo, produto);
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * Deleta um produto com base no código fornecido.
 * @param {string} codigo - Código do produto a ser deletado.
 * @returns {Promise<Object>} Resultado da operação de deleção.
 * @throws {Error} Se o produto estiver associado a vendas ou ocorrer um erro durante a deleção.
 */
async function DeletarProduto(codigo) {
    try {
        // Verificar se o produto está associado a vendas concluídas.
        const vendas_associadas = await venda_repository.ConsultarVendaPorCodProduto(codigo);
        if (vendas_associadas && vendas_associadas.length > 0) {
            throw new Error('Produto não pode ser excluído, pois está associado a compras.');
        }

        return await produto_repository.DeletarProduto(codigo);

    } catch (error) {
        throw new Error(error.message);
    }
}

// Exportação das funções do módulo
export default { CadastrarProduto, ListarProdutos, OrdenarListaProdutos, ConsultarProduto, AlterarProduto, DeletarProduto };
