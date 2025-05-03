import funcionarioService from '../services/funcionario-service.js';


function validarDadosFuncionario(funcionario) {
    const { cpf, nome, email, cargo, salario } = funcionario;

    if (!cpf || !nome || !email || !cargo || !salario) {
        return 'Preencha todos os campos.';
    }

    if (!['gerente', 'vendedor'].includes(cargo)) {
        return 'Cargo inválido. Escolha entre "gerente" e "vendedor".';
    }

    if (cpf.length !== 11) {
        return 'O CPF deve conter 11 dígitos.';
    }

    if (salario <= 0) {
        return 'Salário deve ser maior que zero.';
    }

    return null;
}

class FuncionarioController {
    async cadastrarFuncionario(req, res) {
        const { cpf, nome, email, senha, cargo, salario } = req.body;
        const funcionario = { cpf, nome, email, senha, cargo, salario };

        const erroValidacao = validarDadosFuncionario(funcionario);
        if (erroValidacao) {
            return res.status(400).json(erroValidacao);
        }

        try {
            const resultado = await funcionarioService.cadastrarFuncionario(funcionario);
            res.status(201).json(resultado);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }

    async listarFuncionarios(req, res) {
        try {
            const lista = await funcionarioService.listarFuncionarios();
            res.status(200).json(lista);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async ordenarListaFuncionarios(req, res) {
        const { criterio, ordem } = req.query;

        if (!criterio) {
            return res.status(400).json('Critério de ordenação não especificado.');
        }

        try {
            const resultado = await funcionarioService.ordenarListaFuncionarios(criterio, ordem);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }


    async consultarFuncionario(req, res) {
        let { cpf } = req.params;
        cpf = cpf.replace(/\D/g, '');

        if (!cpf) {
            return res.status(400).json('Digite um CPF para realizar a busca.');
        }

        try {
            const funcionario = await funcionarioService.consultarFuncionario(cpf);
            res.status(200).json(funcionario);
        } catch (error) {
            res.status(404).json(error.message);
        }
    }

    async alterarFuncionario(req, res) {
        const cpf_antigo = req.params.cpf;
        const { cpf, nome, email, cargo, salario } = req.body;
        const funcionario = { cpf, nome, email, cargo, salario };

        const erroValidacao = validarDadosFuncionario(funcionario);
        if (erroValidacao) {
            return res.status(400).json(erroValidacao);
        }

        try {
            const resultado = await funcionarioService.alterarFuncionario(cpf_antigo, funcionario);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }

    async alterarSenhaFuncionario(req, res) {
        const { cpf } = req.params;
        const { novaSenha, confirmarNovaSenha } = req.body;

        if (!novaSenha || !confirmarNovaSenha) {
            return res.status(400).json('Os campos "nova senha" e "confirmar nova senha" devem ser fornecidos.');
        }

        if (novaSenha !== confirmarNovaSenha) {
            return res.status(400).json('A nova senha e a confirmação da nova senha não coincidem.');
        }

        try {
            const resultado = await funcionarioService.alterarSenhaFuncionario(cpf, novaSenha);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }

    async deletarFuncionario(req, res) {
        const { cpf } = req.params;

        if (!cpf) {
            return res.status(400).json('Digite um CPF para realizar a exclusão.');
        }

        try {
            const resultado = await funcionarioService.deletarFuncionario(cpf);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }

    async realizarLogin(req, res) {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json('Preencha todos os campos.');
        }

        try {
            const resultado = await funcionarioService.realizarLogin(email, senha);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(401).json(error.message);
        }
    }
}

export default new FuncionarioController();
