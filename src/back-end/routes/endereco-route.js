import express from 'express';
import enderecoController from '../controllers/endereco-controller.js';

const router = express.Router();

router.post('/cadastrar', enderecoController.CadastrarEndereco);
router.get('/listar', enderecoController.ListarEnderecos);
router.get('/ordenar', enderecoController.OrdenarListaEnderecos);
router.get('/consultar/:codigo', enderecoController.ConsultarEndereco);
router.put('/alterar/:codigo', enderecoController.AlterarEndereco);
router.delete('/deletar/:codigo', enderecoController.DeletarEndereco);

export default router;