import vendaRepository from '../repositories/venda-repository.js';
import produtoRepository from '../repositories/produto-repository.js';
import clienteRepository from '../repositories/cliente-repository.js';
import funcionarioRepository from '../repositories/funcionario-repository.js';
import enderecoRepository from '../repositories/endereco-repository.js';
import fs from 'fs-extra';
import path from 'path';
import PDFDocument from 'pdfkit';

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

async function RealizarVenda(venda) {
    try {
        // Verificar se o cliente existe
        const clienteData = await clienteRepository.ConsultarCliente(venda.cpf_cliente);
        if (!clienteData || clienteData.mensagem) {
            throw new Error('Cliente não encontrado.');
        }

        const nome_cliente = clienteData.nome;

        // Verificar se o funcionário existe
        const funcionarioData = await funcionarioRepository.ConsultarFuncionario(venda.cpf_funcionario);
        if (!funcionarioData || funcionarioData.mensagem) {
            throw new Error('Funcionário não encontrado.');
        }

        const nome_funcionario = funcionarioData.nome;

        // Verificar se o produto existe
        const produto = await produtoRepository.ConsultarProduto(venda.codigo_produto);
        if (!produto || produto.mensagem) {
            throw new Error('Produto não encontrado.');
        }

        // Consultar o endereço do cliente
        const endereco = await enderecoRepository.ConsultarEnderecoPorCPF(venda.cpf_cliente);
        if (!endereco) {
            throw new Error('Endereço do cliente não encontrado.');
        }

        // Concatenar o endereço completo em um único texto
        const logradouro = `${endereco.nome_rua || ''}, ${endereco.numero || ''}, ${endereco.complemento || ''}, ${endereco.bairro || ''}, ${endereco.cidade || ''}, ${endereco.estado || ''}, CEP: ${endereco.cep || ''}`;

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

        const resultado = await vendaRepository.CadastrarVenda(novaVenda);

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

async function ListarVendas(){
    return await vendaRepository.ListarVendas();
}

async function ConsultarVenda(codigo){
    return await vendaRepository.ConsultarVenda(codigo);
}

async function AlterarVenda(codigo_venda, venda) {
    try {
        // Verificar se a venda existe
        const vendaExistente = await vendaRepository.ConsultarVenda(codigo_venda);
        if (!vendaExistente) {
            throw new Error('Venda não encontrada.');
        }

        // Consultar o endereço do cliente existente
        const enderecoExistente = await enderecoRepository.ConsultarEnderecoPorCPF(vendaExistente.cpf_cliente);
        if (!enderecoExistente) {
            throw new Error('Endereço do cliente não encontrado.');
        }

        // Consultar o novo endereço do cliente se o CPF ou qualquer outro dado relacionado mudar
        let logradouro;
        if (venda.cpf_cliente !== vendaExistente.cpf_cliente || 
            venda.codigo_produto !== vendaExistente.codigo_produto ||
            venda.quantidade !== vendaExistente.quantidade) {
            
            const endereco = await enderecoRepository.ConsultarEnderecoPorCPF(venda.cpf_cliente);
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
        const produto = await produtoRepository.ConsultarProduto(venda.codigo_produto);
        if (!produto || produto.mensagem) {
            throw new Error('Produto não encontrado.');
        }

        // Calcular o total da venda com o novo produto
        const total = (produto.valor || 0) * (venda.quantidade || 0);

        // Atualizar a venda
        return await vendaRepository.AlterarVenda(codigo_venda, { ...venda, logradouro, valorTotal: total });
    } catch (error) {
        throw new Error(error.message);
    }
}

async function DeletarVenda(codigo_venda) {
    try {
        // Verificar se a nota fiscal foi emitida
        const notaFiscalEmitida = await vendaRepository.VerificarNotaFiscalEmitida(codigo_venda);
        if (notaFiscalEmitida) {
            throw new Error('Não é possível excluir a venda porque a nota fiscal já foi emitida.');
        }

        // Deletar a venda se a nota fiscal não foi emitida
        return await vendaRepository.DeletarVenda(codigo_venda);
    } catch (error) {
        throw new Error(error.message);
    }
}

export default { RealizarVenda , ListarVendas, ConsultarVenda, AlterarVenda, DeletarVenda};
