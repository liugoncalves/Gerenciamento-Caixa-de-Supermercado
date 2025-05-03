// src/services/cliente-service.js
import clienteRepository from '../repositories/cliente-repository.js';
import vendaRepository from '../repositories/venda-repository.js';
import {isValidCPF} from '../utils/isValidCPF.js'

class ClienteService{
    async cadastrarCliente(cliente) {
        if (!isValidCPF(cliente.cpf)) {
            throw new Error('O CPF informado é inválido. Verifique e tente novamente.');
        }

        return await clienteRepository.cadastrar(cliente);
    }

    async listarClientes() {
        return await clienteRepository.listarTodos();

    }

    async ordenarListaClientes(coluna, direcao = 'ASC') {
        const colunasValidas = ['nome', 'cpf', 'dataCadastro'];
        const direcoesValidas = ['ASC', 'DESC'];

        if (!colunasValidas.includes(coluna)){
            throw new Error('Coluna de ordenação inválida.');
        }

        if (!direcoesValidas.includes(direcao.toUpperCase())){
            throw new Error('Direção de ordenação inválida.');
        }
       
        return await clienteRepository.ordenarPorColuna(coluna)
    }

    async consultarCliente(cpf) {
        const cliente = await clienteRepository.consultarPorCPF(cpf);
        if(!cliente){
            throw new Error('Cliente não encontrado.');
        }

        return cliente;
    }

    async alterarCliente(cpfAntigo, cliente) {
        if (!isValidCPF(cliente.cpf)) {
            throw new Error('O novo CPF informado é inválido.');
        }

        const clientePAlterar = await clienteRepository.consultarPorCPF(cpfAntigo);
        if(!clientePAlterar){
            throw new Error('Cliente a ser alterado não existe.');
        }

        return await clienteRepository.alterar(cpfAntigo, cliente);
    }

    async deletarCliente(cpf) {
        const deletado = await clienteRepository.deletar(cpf);
        if(!deletado){
            throw new Error('Cliente não encontrado para deletar.');
        }

        return deletado;
    }
}

export default new ClienteService();
     
