import funcionarioService from '../services/funcionario-service.js';

async function CadastrarFuncionario(req, res) {
    const { cpf, nome, email, senha, cargo, salario, data_admissao } = req.body;
    
    const funcionario = { cpf, nome, email, senha, cargo, salario, data_admissao };

    // Validação dos Dados
    const erroValidacao = validarDadosFuncionario(funcionario);
    if (erroValidacao) {
        return res.status(400).send(erroValidacao);
    }

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

async function AlterarFuncionario(req, res) {
    let cpf_antigo = req.params.cpf;
    let { cpf, nome, email, senha, cargo, salario, dataAdmissao } = req.body;

    const funcionario = { cpf, nome, email, senha, cargo, salario, dataAdmissao };

    // Validação dos Dados
    const erroValidacao = validarDadosFuncionario(funcionario);
    if (erroValidacao) {
        return res.status(400).send(erroValidacao);
    }

    try {
        let resultado = await funcionarioService.AlterarFuncionario(cpf_antigo, funcionario);
        res.status(200).send(resultado);
    } catch (error) {
        res.status(500).send(`${error.message}`);
    }
}

// Função para validar os dados do funcionário e evitar duplicação de código
function validarDadosFuncionario(funcionario) {
    const { cpf, nome, email, senha, cargo, salario } = funcionario;

    if (!cpf || !nome || !email || !senha || !cargo || !salario) {
        return 'Todos os campos são obrigatórios.';
    }
    
    if (!['gerente', 'vendedor'].includes(cargo)) {
        return 'Cargo inválido. Escolha entre "gerente" e "vendedor".';
    }
    
    if (salario <= 0) {
        return 'Salário deve ser maior que zero.';
    }

    return null;
}


export default {CadastrarFuncionario, ListarFuncionarios, ConsultarFuncionario, AlterarFuncionario};