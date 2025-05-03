// src/controllers/cliente-controller.js
import clienteService from '../services/cliente-service.js';

function validarDadosCliente(cliente) {
  const { nome, cpf, telefone, email } = cliente;

  if (!nome || !cpf || !telefone || !email) {
    return 'Preencha todos os campos obrigatórios.';
  }

  if (!/^\d{11}$/.test(cpf)) {
    return 'O CPF deve conter exatamente 11 dígitos numéricos.';
  }

  return null;
}

class ClienteController {
  async cadastrarCliente(req, res) {
    const { nome, cpf, telefone, email } = req.body;
    const cliente = { nome, cpf, telefone, email };

    const erro = validarDadosCliente(cliente);
    if (erro) {
      return res.status(400).json({ mensagem: erro });
    }

    try {
      const resultado = await clienteService.cadastrarCliente(cliente);
      res.status(201).json({ mensagem: resultado });
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  }

  async listarClientes(req, res) {
    try {
      const resultado = await clienteService.listarClientes();
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ mensagem: 'Erro ao listar os clientes. Tente novamente.' });
    }
  }

  async ordenarListaClientes(req, res) {
    const { criterio, ordem } = req.query;

    if (!criterio) {
      return res.status(400).json({ mensagem: 'Critério de ordenação não informado.' });
    }

    try {
      const resultado = await clienteService.ordenarListaClientes(criterio, ordem);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  }

  async consultarCliente(req, res) {
    const cpf = req.params.cpf;

    if (!cpf) {
      return res.status(400).json({ mensagem: 'Informe um CPF para buscar o cliente.' });
    }

    try {
      const resultado = await clienteService.consultarCliente(cpf);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  }

  async alterarCliente(req, res) {
    const cpfAntigo = req.params.cpf;
    const { nome, cpf, telefone, email } = req.body;
    const cliente = { nome, cpf, telefone, email };

    const erro = validarDadosCliente(cliente);
    if (erro) {
      return res.status(400).json({ mensagem: erro });
    }

    try {
      const resultado = await clienteService.alterarCliente(cpfAntigo, cliente);
      res.status(200).json({ mensagem: resultado });
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  }

  async deletarCliente(req, res) {
    const cpf = req.params.cpf;

    if (!cpf) {
      return res.status(400).json({ mensagem: 'Informe um CPF para excluir o cliente.' });
    }

    try {
      const resultado = await clienteService.deletarCliente(cpf);
      res.status(200).json({ mensagem: resultado });
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  }
}

export default new ClienteController();
