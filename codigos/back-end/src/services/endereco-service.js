// Importação dos repositórios de endereço e cliente
import endereco_repository from '../repositories/endereco-repository.js';
import cliente_repository from '../repositories/cliente-repository.js';
import { isValidCPF } from '../utils/isValidCPF.js';

class EnderecoService {
    async cadastrarEndereco(endereco) {
        if (!isValidCPF(endereco.cpf_cliente)) {
            throw new Error('CPF inválido.');
        }

        if (endereco.cep < 0) {
            throw new Error('CEP inválido.');
        }

        const existente = cliente_repository.consultarPorCPF(endereco.cpf_cliente);
        if(!existente){
            throw new Error("Cliente com CPF não cadastrado no Sistema.");
        }

        return await endereco_repository.cadastrar(endereco);
    }

    async listarEnderecos() {
        return await endereco_repository.listarTodos();
    }

    async ordenarListaEnderecos(coluna, direcao = 'ASC') {
        const colunasValidas = ['codigo', 'nome_rua', 'cidade', 'estado', 'cep', 'cpf_cliente'];
        const direcoesValidas = ['ASC', 'DESC'];

        if (!colunasValidas.includes(coluna)){
            throw new Error('Coluna de ordenação inválida.');
        }

        if (!direcoesValidas.includes(direcao.toUpperCase())) {
            throw new Error('Direção de ordenação inválida.');
        }

        return await endereco_repository.ordenarPorColuna(coluna, direcao.toUpperCase());

    }

    async consultarEndereco(codigo) {
        const endereco = await endereco_repository.consultarPorCodigo(codigo);
        if(!endereco){
            throw new Error('Endereço não encontrado.');
        }

        return endereco;
    }

    async consultarEnderecoCPF(cpf_cliente) {
        const endereco = await endereco_repository.consultarPorCPF(cpf_cliente);
        if(!endereco){
            throw new Error('Endereço não encontrado para o Cliente com esse CPF.');
        }

        return endereco;
    }

    async alterarEndereco(codigo_antigo, endereco) {
        if (!isValidCPF(endereco.cpf_cliente)) {
            throw new Error('CPF inválido.');
        }

        if (endereco.cep < 0) {
            throw new Error('CEP inválido.');
        }

        return await endereco_repository.alterar(codigo_antigo, endereco);

    }

    async deletarEndereco(codigo) {
        const deletado = await endereco_repository.deletar(codigo);
        if(!deletado){
            throw new Error('Endereço não encontrado para ser deletado.');
        }

        return deletado;
    }
}

export default new EnderecoService();