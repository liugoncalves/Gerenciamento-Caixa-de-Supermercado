<<<<<<< HEAD
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
=======
// importação do serviço de funcionário
import funcionario_service from '../services/funcionario-service.js';

/**
 * Cadastra um novo funcionário no sistema.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function CadastrarFuncionario(req, res) {
    // destruição dos dados enviados na requisição
    const { cpf, nome, email, senha, cargo, salario } = req.body;

    // criação do objeto funcionário
    const funcionario = { cpf, nome, email, senha, cargo, salario };

    // validação dos dados do funcionário
    const erro_validacao = ValidarDadosFuncionario(funcionario);
    if (erro_validacao) {
        return res.status(400).send(erro_validacao);
    }

    try {
        // tentativa de cadastrar o funcionário
        let resultado = await funcionario_service.CadastrarFuncionario(funcionario);
        res.status(201).send(resultado);
    } catch (error) {
        // tratamento de erros
>>>>>>> development
        res.status(500).send(`${error.message}`);
    }
}

<<<<<<< HEAD

async function ListarFuncionarios(req, res){
    res.send(await funcionarioService.ListarFuncionarios());
}

async function OrdenarListaFuncionarios(req, res) {
=======
/**
 * Lista todos os funcionários cadastrados.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function ListarFuncionarios(req, res) {
    // listagem de funcionários
    res.send(await funcionario_service.ListarFuncionarios());
}

/**
 * Ordena a lista de funcionários com base no critério fornecido.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function OrdenarListaFuncionarios(req, res) {
    // obtenção do critério de ordenação da consulta
>>>>>>> development
    const criterio = req.query.criterio;

    if (!criterio) {
        return res.status(400).send('Critério de ordenação não especificado.');
    }

    try {
<<<<<<< HEAD
        const resultado = await funcionarioService.OrdenarListaFuncionarios(criterio);
        res.status(200).send(resultado);
    } catch (error) {
=======
        // tentativa de ordenar a lista de funcionários
        const resultado = await funcionario_service.OrdenarListaFuncionarios(criterio);
        res.status(200).send(resultado);
    } catch (error) {
        // tratamento de erros
>>>>>>> development
        res.status(500).send(`${error.message}`);
    }
}

<<<<<<< HEAD

async function ConsultarFuncionario(req, res) {
=======
/**
 * Consulta um funcionário com base no CPF fornecido.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function ConsultarFuncionario(req, res) {
    // obtenção do CPF da consulta
>>>>>>> development
    let cpf = req.params.cpf;

    if (!cpf) {
        return res.status(400).send('Digite um CPF para realizar a busca.');
    }

    try {
<<<<<<< HEAD
        const resultado = await funcionarioService.ConsultarFuncionario(cpf);
=======
        // tentativa de consultar o funcionário
        const resultado = await funcionario_service.ConsultarFuncionario(cpf);
>>>>>>> development
        if (!resultado) {
            return res.status(404).send('Funcionário não encontrado.');
        }
        res.send(resultado);
    } catch (error) {
<<<<<<< HEAD
=======
        // tratamento de erros
>>>>>>> development
        res.status(500).send(`Erro ao consultar funcionário: ${error.message}`);
    }
}

<<<<<<< HEAD
async function AlterarFuncionario(req, res) {
    let cpf_antigo = req.params.cpf;
    let { cpf, nome, email, senha, cargo, salario, data_admissao } = req.body;

    const funcionario = { cpf, nome, email, senha, cargo, salario, data_admissao };

    // Validação dos Dados
    const erroValidacao = validarDadosFuncionario(funcionario);
    if (erroValidacao) {
        return res.status(400).send(erroValidacao);
    }

    try {
        let resultado = await funcionarioService.AlterarFuncionario(cpf_antigo, funcionario);
        res.status(200).send(resultado);
    } catch (error) {
=======
/**
 * Altera as informações de um funcionário existente.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
/**
 * Altera as informações de um funcionário existente, exceto a senha.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function AlterarFuncionario(req, res) {
    // obtenção do CPF antigo e novos dados do funcionário
    let cpf_antigo = req.params.cpf;
    let { cpf, nome, email, cargo, salario } = req.body;

    // criação do objeto funcionário com os novos dados, sem a senha
    const funcionario = { cpf, nome, email, cargo, salario };

    // validação dos dados do funcionário
    const erro_validacao = ValidarDadosFuncionario(funcionario);
    if (erro_validacao) {
        return res.status(400).send(erro_validacao);
    }

    try {
        // tentativa de alterar as informações do funcionário
        let resultado = await funcionario_service.AlterarFuncionario(cpf_antigo, funcionario);
        res.status(200).send(resultado);
    } catch (error) {
        // tratamento de erros
>>>>>>> development
        res.status(500).send(`${error.message}`);
    }
}

<<<<<<< HEAD
async function DeletarFuncionario(req, res) {
=======

/**
 * Altera a senha de um funcionário existente.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function AlterarSenhaFuncionario(req, res) {
    // obtenção do CPF, nova senha e confirmação da nova senha
    let cpf = req.params.cpf;
    let { novaSenha, confirmarNovaSenha } = req.body;

    // validação dos campos de senha
    if (!novaSenha || !confirmarNovaSenha) {
        return res.status(400).send('Os campos "nova senha" e "confirmar nova senha" devem ser fornecidos.');
    }

    if (novaSenha !== confirmarNovaSenha) {
        return res.status(400).send('A nova senha e a confirmação da nova senha não coincidem.');
    }

    try {
        // tentativa de alterar a senha do funcionário
        let resultado = await funcionario_service.AlterarSenhaFuncionario(cpf, novaSenha);
        res.status(200).send(resultado);
    } catch (error) {
        // tratamento de erros
        res.status(500).send(`${error.message}`);
    }
}



/**
 * Deleta um funcionário com base no CPF fornecido.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function DeletarFuncionario(req, res) {
    // obtenção do CPF para exclusão
>>>>>>> development
    let cpf = req.params.cpf;

    if (!cpf) {
        return res.status(400).send('Digite um CPF para realizar a exclusão.');
    }

    try {
<<<<<<< HEAD
        let resultado = await funcionarioService.DeletarFuncionario(cpf);
        res.status(200).send(resultado);
    } catch (error) {
        res.status(500).send(`${error.message}`);
    }


}

async function RealizarLogin(req, res) {
    const { email, senha } = req.body;

    // Verificação inicial dos dados
=======
        // tentativa de deletar o funcionário
        let resultado = await funcionario_service.DeletarFuncionario(cpf);
        res.status(200).send(resultado);
    } catch (error) {
        // tratamento de erros
        res.status(500).send(`${error.message}`);
    }
}

/**
 * Realiza o login de um funcionário.
 * @param {Object} req - Requisição HTTP.
 * @param {Object} res - Resposta HTTP.
 */
async function RealizarLogin(req, res) {
    // destruição dos dados enviados na requisição
    const { email, senha } = req.body;

    // verificação inicial dos dados
>>>>>>> development
    if (!email || !senha) {
        return res.status(400).send('Preencha todos os campos.');
    }

    try {
<<<<<<< HEAD
        const resultado = await funcionarioService.RealizarLogin(email, senha);
=======
        // tentativa de realizar o login
        const resultado = await funcionario_service.RealizarLogin(email, senha);
>>>>>>> development
        if (!resultado) {
            return res.status(401).send('Credenciais incorretas.');
        }
        res.status(200).send(resultado);
    } catch (error) {
<<<<<<< HEAD
=======
        // tratamento de erros
>>>>>>> development
        res.status(500).send(`${error.message}`);
    }
}

<<<<<<< HEAD

// Função para validar os dados do funcionário e evitar duplicação de código
function validarDadosFuncionario(funcionario) {
    const { cpf, nome, email, senha, cargo, salario } = funcionario;

    if (!cpf || !nome || !email || !senha || !cargo || !salario) {
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
=======
/**
 * Valida os dados fornecidos para um funcionário.
 * @param {Object} funcionario - Dados do funcionário.
 * @returns {string|null} Mensagem de erro ou null se os dados estiverem válidos.
 */
function ValidarDadosFuncionario(funcionario) {
    const { cpf, nome, email, cargo, salario } = funcionario;

    if (!cpf || !nome || !email  || !cargo || !salario) {
        return 'preencha todos os campos.';
    }
    
    if (!['gerente', 'vendedor'].includes(cargo)) {
        return 'cargo inválido. Escolha entre "gerente" e "vendedor".';
    }

    if (cpf.length !== 11) {
        return 'o cpf deve conter 11 dígitos.';
    }
    
    if (salario <= 0) {
        return 'salário deve ser maior que zero.';
>>>>>>> development
    }

    return null;
}

<<<<<<< HEAD

export default { CadastrarFuncionario, ListarFuncionarios, OrdenarListaFuncionarios, ConsultarFuncionario, AlterarFuncionario, DeletarFuncionario , RealizarLogin };
=======
// exportação das funções do módulo
export default { CadastrarFuncionario, ListarFuncionarios, OrdenarListaFuncionarios, ConsultarFuncionario, 
                 AlterarFuncionario, AlterarSenhaFuncionario, DeletarFuncionario, RealizarLogin };
>>>>>>> development
