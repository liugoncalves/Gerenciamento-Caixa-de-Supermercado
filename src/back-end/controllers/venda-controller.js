import vendaService from '../services/venda-service.js';

async function RealizarVenda (req, res){
    const { cpf_cliente, cpf_funcionario, codigo_produto, quantidade } = req.body;

    const venda = { cpf_cliente, cpf_funcionario, codigo_produto, quantidade };

    //Validação de Dados
    const erroValidacao = validarDadosVenda(venda);
    if (erroValidacao){
        return res.status(400).send(erroValidacao);
    }

    try{
        let resultado = await vendaService.RealizarVenda(venda);
        res.status(201).send(resultado);
    } catch (error){
        res.status(500).send(`${error.message}`);
    }
}

async function ListarVendas(req, res){
    res.send(await vendaService.ListarVendas());
}

async function ConsultarVenda(req, res){
    let codigo = req.params.codigo

    if(!codigo){
        return res.status(400).send('Digite um código para realizar a busca.');
    }

    try{
        const resultado = await vendaService.ConsultarVenda(codigo);
        if(!resultado){
            return res.status(400).send("Venda não encontrada.");
        }
        res.send(resultado);
    } catch (error){
        res.status(500).send(`Erro ao consultar venda: ${error.message}`);
    }
}

async function AlterarVenda(req, res) {
    const { cpf_cliente, cpf_funcionario, codigo_produto, quantidade } = req.body;
    const codigo_venda = req.params.codigo;

    const venda = { cpf_cliente, cpf_funcionario, codigo_produto, quantidade };

    // Validação de Dados
    const erroValidacao = validarDadosVenda(venda);
    if (erroValidacao) {
        return res.status(400).send(erroValidacao);
    }

    try {
        // Atualizar a venda
        const resultado = await vendaService.AlterarVenda(codigo_venda, venda);
        res.status(200).send(resultado);
    } catch (error) {
        res.status(500).send(`${error.message}`);
    }
}


function validarDadosVenda(venda){
    const { cpf_cliente, cpf_funcionario, codigo_produto, quantidade } = venda;

    if(!cpf_cliente || !cpf_funcionario || !codigo_produto || !quantidade){
        return 'Preencha todos os campos.';
    }

    if (cpf_cliente.length !== 11 || cpf_funcionario.length !== 11){ 
        return 'O CPF deve conter 11 dígitos.';
    }
    
    if (quantidade <= 0) {
        return 'Quantidade deve ser maior que zero.';
    }

    return null;

}

export default {RealizarVenda, ListarVendas, ConsultarVenda, AlterarVenda};