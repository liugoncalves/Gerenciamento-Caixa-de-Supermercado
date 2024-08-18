import vendaRepository from '../repositories/venda-repository.js';
import produtoRepository from '../repositories/produto-repository.js';
import clienteRepository from '../repositories/cliente-repository.js';
import funcionarioRepository from '../repositories/funcionario-repository.js';
import enderecoRepository from '../repositories/endereco-repository.js';

async function RealizarVenda(venda) {
    try {
        // Verificar se o cliente existe
        const cliente = await clienteRepository.ConsultarCliente(venda.cpf_cliente);
        if (!cliente || cliente.mensagem) {
            throw new Error('Cliente não encontrado.');
        }

        // Verificar se o funcionário existe
        const funcionario = await funcionarioRepository.ConsultarFuncionario(venda.cpf_funcionario);
        if (!funcionario || funcionario.mensagem) {
            throw new Error('Funcionário não encontrado.');
        }

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

        return resultado;
    } catch (error) {
        throw new Error(`${error.message}`);
    }
}

async function ListarVendas(){
    return await vendaRepository.ListarVendas();
}


export default { RealizarVenda , ListarVendas}
