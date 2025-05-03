import bcrypt from 'bcrypt';
import funcionario_repository from '../repositories/funcionario-repository.js';
import venda_repository from '../repositories/venda-repository.js';
import { isValidCPF } from '../utils/isValidCPF.js';
import { validarSalario } from '../utils/validarSalario.js';
import { hashPassword } from '../utils/hashPassword.js';
import clienteRepository from '../repositories/cliente-repository.js';

class FuncionarioService{
    async cadastrarFuncionario(funcionario) {
        if (!isValidCPF(funcionario.cpf)) {
             throw new Error('CPF inválido.');
        }

        validarSalario(funcionario.salario);
        funcionario.senha = await hashPassword(funcionario.senha);

        const existente = await funcionario_repository.consultarPorCPF(funcionario.cpf);
        if(existente){
            throw new Error('Funcionário com esse CPF já existe.');
        }

        return await funcionario_repository.cadastrar(funcionario);
    }

    async listarFuncionarios() {
        return await funcionario_repository.listarTodos();
    }

    async ordenarListaFuncionarios(coluna, direcao = 'ASC') {
        const colunasValidas = ['nome', 'cargo', 'salario', 'dataadmissao'];
        const direcoesValidas = ['ASC', 'DESC'];
    
        if (!colunasValidas.includes(coluna)) {
            throw new Error('Coluna de ordenação inválida.');
        }
    
        if (!direcoesValidas.includes(direcao.toUpperCase())) {
            throw new Error('Direção de ordenação inválida.');
        }
    
        return await funcionario_repository.ordenarPorColuna(coluna, direcao.toUpperCase());
    }
    
    async consultarFuncionario(cpf) {
        const funcionario = funcionario_repository.consultarPorCPF(cpf);
        if(!funcionario){
            throw new Error('Funcionário não encontrado.')
        }

        return funcionario;
    }

    async alterarFuncionario(cpf_antigo, funcionario) {
        if (!isValidCPF(funcionario.cpf)) {
            throw new Error('CPF inválido.');
        }

        validarSalario(funcionario.salario);

        return await funcionario_repository.alterar(cpf_antigo, funcionario);
    }

    async alterarSenhaFuncionario(cpf, novaSenha) {
        const senhaCriptografada = await hashPassword(novaSenha);
        return await funcionario_repository.alterarSenha(cpf, senhaCriptografada);
    }

    async  deletarFuncionario(cpf) {
        const vendas_associadas = await venda_repository.consultarVendaPorCPF(cpf);
        if (vendas_associadas && vendas_associadas.length > 0) {
            throw new Error('Funcionário não pode ser excluído, pois realizou vendas.');
        }

        const deletado = await funcionario_repository.deletar(cpf);
        if(!deletado){
            throw new Error('Funcionário não encontrado para deletar.');
        }

        return deletado;
    }

    async realizarLogin(email, senha) {
        const funcionario = await funcionario_repository.consultarPorEmail(email);
        if (!funcionario) {
            throw new Error('E-mail não cadastrado.');
        }

        const senha_valida = await bcrypt.compare(senha, funcionario.senha);
        if (!senha_valida) {
            throw new Error('Senha inválida.');
        }
        
        return {
                mensagem: 'Login realizado com sucesso.',
                cargo: funcionario.cargo,
                cpf: funcionario.cpf
            };
    }

}

export default new FuncionarioService();