import enderecoService from '../services/endereco-service.js';

function validarDadosEndereco(endereco) {
  const { nome_rua, numero, complemento, bairro, cidade, estado, cep, cpf_cliente } = endereco;

  if (!nome_rua || !numero || !complemento || !bairro || !cidade || !estado || !cep || !cpf_cliente) {
    return 'Preencha todos os campos.';
  }

  if (numero < 1 || !Number.isInteger(numero)) {
    return 'Número inválido.';
  }

  if (String(cep).length !== 8) {
    return 'O CEP deve conter 8 dígitos.';
  }

  if (String(cpf_cliente).length !== 11) {
    return 'O CPF deve conter 11 dígitos.';
  }

  if (estado.length !== 2 || !isNaN(estado)) {
    return 'Estado inválido.';
  }

  return null;
}

class EnderecoController {

  async cadastrarEndereco(req, res) {
    const { nome_rua, numero, complemento, bairro, cidade, estado, cep, cpf_cliente } = req.body;
    const endereco = { nome_rua, numero, complemento, bairro, cidade, estado, cep, cpf_cliente };

    const erro = validarDadosEndereco(endereco); // Usando a função externa
    if (erro) {
      return res.status(400).send(erro);
    }

    try {
      const resultado = await enderecoService.cadastrarEndereco(endereco);
      res.status(201).send(resultado);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async listarEnderecos(req, res) {
    try {
      const resultado = await enderecoService.listarEnderecos();
      res.status(200).send(resultado);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async ordenarListaEnderecos(req, res) {
    const criterio = req.query.criterio;

    if (!criterio) {
      return res.status(400).send('Critério de ordenação não especificado.');
    }

    try {
      const resultado = await enderecoService.ordenarListaEnderecos(criterio);
      res.status(200).send(resultado);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async consultarEndereco(req, res) {
    const codigo = req.params.codigo;

    if (!codigo) {
      return res.status(400).send('Digite um código para realizar a busca.');
    }

    try {
      const resultado = await enderecoService.consultarEndereco(codigo);
      res.status(200).send(resultado);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async consultarEnderecoCPF(req, res) {
    const cpf_cliente = req.params.cpf_cliente;

    if (!cpf_cliente) {
      return res.status(400).send('Digite um CPF para realizar a busca.');
    }

    try {
      const resultado = await enderecoService.consultarEnderecoCPF(cpf_cliente);
      res.status(200).send(resultado);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async alterarEndereco(req, res) {
    const codigo_antigo = req.params.codigo;
    const { nome_rua, numero, complemento, bairro, cidade, estado, cep, cpf_cliente } = req.body;
    const endereco = { nome_rua, numero, complemento, bairro, cidade, estado, cep, cpf_cliente };

    const erro = validarDadosEndereco(endereco); // Usando a função externa
    if (erro) {
      return res.status(400).send(erro);
    }

    try {
      const resultado = await enderecoService.alterarEndereco(codigo_antigo, endereco);
      res.status(200).send(resultado);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async deletarEndereco(req, res) {
    const codigo = req.params.codigo;

    if (!codigo) {
      return res.status(400).send('Digite um código para realizar a exclusão.');
    }

    try {
      const resultado = await enderecoService.deletarEndereco(codigo);
      res.status(200).send(resultado);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

export default new EnderecoController();
