import enderecoService from '../services/endereco-service.js';

async function CadastrarEndereco(req, res){
    const {nome_rua, numero, complemento, bairro, cidade, estado, cep, cpf_cliente} = req.body;

    const endereco = {nome_rua, numero, complemento, bairro, cidade, estado, cep, cpf_cliente};

    const erroValidacao = validarDadosEndereco(endereco);
    if (erroValidacao){
        return res.status(400).send(erroValidacao);
    }

    try {
        let resultado = await enderecoService.CadastrarEndereco(endereco);
        res.status(201).send(resultado);
    } catch (error) {
        res.status(500).send(`${error.message}`);
    }

}

async function ListarEnderecos(req, res){
    res.send(await enderecoService.ListarEnderecos());
}

async function ConsultarEndereco(req, res){
    const codigo = req.params.codigo;

    if (!codigo){
        return res.status(400).send('Digite um código para realizar a busca.');
    }

    try {
        const resultado = await enderecoService.ConsultarEndereco(codigo);
        if (!resultado){
            return res.status(404).send('Endereço não encontrado.');
        }
        res.send(resultado);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function AlterarEndereco(req, res){
    let codigo_antigo = req.params.codigo;
    let {nome_rua, numero, complemento, bairro, cidade, estado, cep, cpf_cliente} = req.body;

    const endereco = {nome_rua, numero, complemento, bairro, cidade, estado, cep, cpf_cliente};

    const erroValidacao = validarDadosEndereco(endereco);
    if (erroValidacao){
        return res.status(400).send(erroValidacao);
    }

    try {
        let resultado = await enderecoService.AlterarEndereco(codigo_antigo, endereco);
        res.status(200).send(resultado);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function DeletarEndereco(req, res){
    let codigo = req.params.codigo;

    if (!codigo){
        return res.status(400).send('Digite um código para realizar a exclusão.');
    }

    try {
        let resultado = await enderecoService.DeletarEndereco(codigo);
        res.status(200).send(resultado);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

function validarDadosEndereco(endereco){
    const {nome_rua, numero, complemento, bairro, cidade, estado, cep, cpf_cliente} = endereco;

    //garantir que nada esteja vazio
    if (!nome_rua || !numero || !complemento || !bairro || !cidade || !estado || !cep || !cpf_cliente){ 
        return 'Preencha todos os campos.';
    }

    //garantir que o número seja positivo inteiro
    if (numero < 1 || !Number.isInteger(numero)){
        return 'Número inválido.';
    }

    //cep deve ter 8 dígitos
    if (cep.length !== 8){
        return 'O CEP deve conter 8 dígitos.';
    }

    //cpf deve ter 11 dígitos
    if (cpf_cliente.length !== 11){
        return 'O CPF deve conter 11 dígitos.';
    }

    //estado deve ser uma sigla de 2 letras, não pode ser um número
    if (estado.length !== 2 || !isNaN(estado)){
        return 'Estado inválido.';
    }

    return null;

}

export default { CadastrarEndereco , ListarEnderecos , ConsultarEndereco , AlterarEndereco , DeletarEndereco };