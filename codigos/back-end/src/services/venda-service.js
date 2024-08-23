import venda_repository from '../repositories/venda-repository.js';
import produto_repository from '../repositories/produto-repository.js';
import cliente_repository from '../repositories/cliente-repository.js';
import funcionario_repository from '../repositories/funcionario-repository.js';
import endereco_repository from '../repositories/endereco-repository.js';
import fs from 'fs-extra';
import path from 'path';
import PDFDocument from 'pdfkit';

/**
 * Gera uma nota fiscal em PDF para uma venda.
 * @param {Object} venda - Dados da venda.
 * @param {string} nome_cliente - Nome do cliente.
 * @param {string} nome_funcionario - Nome do funcionário.
 * @param {Object} produto - Dados do produto.
 * @returns {Promise<Object>} Caminho do arquivo da nota fiscal gerada.
 */
async function gerarNotaFiscalPDF(venda, nome_cliente, nome_funcionario, produto) {
    const pdfDoc = new PDFDocument();
    const filePath = path.resolve('uploads/notas-fiscais', `nota_fiscal_${venda.Codigo}.pdf`);

    // Criar o documento PDF
    pdfDoc.pipe(fs.createWriteStream(filePath));

    // Adicionar o conteúdo ao PDF
    pdfDoc.fontSize(16).text('Nota Fiscal', { align: 'center' });
    pdfDoc.moveDown();

    pdfDoc.fontSize(12).text(`Código da Venda: ${venda.Codigo}`);
    pdfDoc.text(`Data da Venda: ${new Date(venda.DataVenda).toLocaleString()}`);
    pdfDoc.text(`Cliente: ${nome_cliente}`);
    pdfDoc.text(`Funcionário: ${nome_funcionario}`);
    pdfDoc.text(`Endereço: ${venda.Logradouro}`);
    pdfDoc.text(`Produto Código: ${venda.CodigoProduto}`);
    pdfDoc.text(`Quantidade: ${venda.Quantidade}`);

    // Garantir que o valor total seja um número e formatá-lo
    const valorTotal = venda.ValorTotal ? Number(venda.ValorTotal).toFixed(2) : '0.00';
    pdfDoc.text(`Valor Total: R$ ${valorTotal}`);
    pdfDoc.moveDown();

    pdfDoc.text('** Esta nota fiscal foi gerada eletronicamente e não precisa ser assinada.', { align: 'center' });

    // Finalizar e salvar o PDF
    pdfDoc.end();

    return { notaFiscal: filePath };
}

/**
 * Realiza uma venda, registrando-a e gerando a nota fiscal correspondente.
 * @param {Object} venda - Dados da venda.
 * @returns {Promise<Object>} Resultado da operação de venda.
 * @throws {Error} Se ocorrer um erro durante o processamento da venda.
 */
async function RealizarVenda(venda) {
    try {
        // Verificar se o cliente existe
        const cliente = await cliente_repository.ConsultarCliente(venda.cpf_cliente);
        if (!cliente || cliente.mensagem) {
            throw new Error('Cliente não encontrado.');
        }
        const nome_cliente = cliente.nome;

        // Verificar se o funcionário existe
        const funcionario = await funcionario_repository.ConsultarFuncionario(venda.cpf_funcionario);
        if (!funcionario || funcionario.mensagem) {
            throw new Error('Funcionário não encontrado.');
        }
        const nome_funcionario = funcionario.nome;

        // Verificar se o produto existe
        const produto = await produto_repository.ConsultarProduto(venda.codigo_produto);
        if (!produto || produto.mensagem) {
            throw new Error('Produto não encontrado.');
        }

        // Consultar o endereço do cliente
        const endereco = await endereco_repository.ConsultarEnderecoPorCPF(venda.cpf_cliente);
        if (!endereco) {
            throw new Error('Endereço do cliente não encontrado.');
        }

        // Concatenar o endereço completo
        const logradouro = `${endereco.nome_rua || ''}, ${endereco.numero || ''}${endereco.complemento ? ', ' + endereco.complemento : ''}, ${endereco.bairro || ''}, ${endereco.cidade || ''}, ${endereco.estado || ''}, CEP: ${endereco.cep || ''}`;

        // Calcular o total da venda
        const total = (produto.valor || 0) * (venda.quantidade || 0);

        // Registrar a venda
        const novaVenda = {
            CPF_Cliente: venda.cpf_cliente,
            CPF_Funcionario: venda.cpf_funcionario,
            CodigoProduto: venda.codigo_produto,
            Quantidade: venda.quantidade,
            Logradouro: logradouro,
            ValorTotal: total
        };

        const resultado = await venda_repository.CadastrarVenda(novaVenda);

        // Gerar a nota fiscal em PDF
        await gerarNotaFiscalPDF({
            Codigo: resultado.codigo,
            DataVenda: new Date().toISOString(),
            ...novaVenda
        }, nome_cliente, nome_funcionario, produto);

        return resultado;
    } catch (error) {
        throw new Error(`${error.message}`);
    }
}

/**
 * Lista todas as vendas registradas.
 * @returns {Promise<Array>} Lista de vendas.
 */
async function ListarVendas() {
    return await venda_repository.ListarVendas();
}

/**
 * Consulta uma venda com base no código fornecido.
 * @param {string} codigo - Código da venda a ser consultada.
 * @returns {Promise<Object>} Dados da venda.
 */
async function ConsultarVenda(codigo) {
    return await venda_repository.ConsultarVenda(codigo);
}

/**
 * Altera os dados de uma venda existente.
 * @param {string} codigo_venda - Código da venda a ser alterada.
 * @param {Object} venda - Dados atualizados da venda.
 * @returns {Promise<Object>} Resultado da operação de alteração.
 * @throws {Error} Se ocorrer um erro durante a alteração.
 */
async function AlterarVenda(codigo_venda, venda) {
    try {
        // Verificar se a venda existe
        const vendaExistente = await venda_repository.ConsultarVenda(codigo_venda);
        if (!vendaExistente) {
            throw new Error('Venda não encontrada.');
        }

        // Consultar o endereço do cliente existente
        const enderecoExistente = await endereco_repository.ConsultarEnderecoPorCPF(vendaExistente.cpf_cliente);
        if (!enderecoExistente) {
            throw new Error('Endereço do cliente não encontrado.');
        }

        // Consultar o novo endereço do cliente se o CPF ou qualquer outro dado relacionado mudar
        let logradouro;
        if (venda.cpf_cliente !== vendaExistente.cpf_cliente || 
            venda.codigo_produto !== vendaExistente.codigo_produto ||
            venda.quantidade !== vendaExistente.quantidade) {
            
            const endereco = await endereco_repository.ConsultarEnderecoPorCPF(venda.cpf_cliente);
            if (!endereco) {
                throw new Error('Endereço do cliente não encontrado.');
            }

            // Concatenar o endereço completo
            logradouro = `${endereco.nome_rua || ''}, ${endereco.numero || ''}${endereco.complemento ? ', ' + endereco.complemento : ''}, ${endereco.bairro || ''}, ${endereco.cidade || ''}, ${endereco.estado || ''}, CEP: ${endereco.cep || ''}`;
        } else {
            logradouro = enderecoExistente.logradouro; // Manter o endereço atual se não houver mudança
        }

        if (!logradouro) {
            throw new Error('O logradouro não pode ser nulo.');
        }

        // Consultar o preço do produto
        const produto = await produto_repository.ConsultarProduto(venda.codigo_produto);
        if (!produto || produto.mensagem) {
            throw new Error('Produto não encontrado.');
        }

        // Calcular o total da venda com o novo produto
        const total = (produto.valor || 0) * (venda.quantidade || 0);

        // Atualizar a venda
        return await venda_repository.AlterarVenda(codigo_venda, { ...venda, logradouro, valorTotal: total });
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * Deleta uma venda com base no código fornecido.
 * @param {string} codigo_venda - Código da venda a ser deletada.
 * @returns {Promise<Object>} Resultado da operação de deleção.
 * @throws {Error} Se a nota fiscal foi emitida ou ocorrer um erro durante a deleção.
 */
async function DeletarVenda(codigo_venda) {
    try {
        // Verificar se a nota fiscal foi emitida
        const notaFiscalEmitida = await venda_repository.VerificarNotaFiscalEmitida(codigo_venda);
        if (notaFiscalEmitida) {
            throw new Error('Não é possível excluir a venda porque a nota fiscal já foi emitida.');
        }

        // Deletar a venda se a nota fiscal não foi emitida
        return await venda_repository.DeletarVenda(codigo_venda);
    } catch (error) {
        throw new Error(error.message);
    }
}

// Exportação das funções do módulo
export default { RealizarVenda, ListarVendas, ConsultarVenda, AlterarVenda, DeletarVenda };
