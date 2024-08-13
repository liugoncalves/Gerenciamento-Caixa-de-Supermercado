import funcionarioService from '../services/funcionario-service.js';

async function CadastrarFuncionario(req, res) {
    const { cpf, nome, email, senha, cargo, salario, data_admissao } = req.body;

    // Validação dos Dados  
    if (!cpf || !nome || !email || !senha || !cargo || !salario) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }
    
    if (!['gerente', 'vendedor'].includes(cargo)) {
        return res.status(400).send('Cargo inválido.');
    }
    
    if (salario <= 0) {
        return res.status(400).send('Salário deve ser maior que zero.');
    }

    //....................................................................//

    const funcionario = {
        cpf,
        nome,
        email,
        senha,
        cargo,
        salario,
        data_admissao
    };

    try {
        let resultado = await funcionarioService.CadastrarFuncionario(funcionario);
        res.status(201).send(resultado);
    } catch (error) {
        res.status(500).send(`${error.message}`);
    }
}

async function ListarFuncionarios(req, res){
    res.send(await funcionarioService.ListarFuncionarios());
}

async function ConsultarFuncionario(req, res) {
    let cpf = req.params.cpf;

    if (!cpf) {
        return res.status(400).send('Digite um CPF para realizar a busca.');
    }

    try {
        const resultado = await funcionarioService.ConsultarFuncionario(cpf);
        if (!resultado) {
            return res.status(404).send('Funcionário não encontrado.');
        }
        res.send(resultado);
    } catch (error) {
        res.status(500).send(`Erro ao consultar funcionário: ${error.message}`);
    }
}


export default {CadastrarFuncionario, ListarFuncionarios, ConsultarFuncionario};