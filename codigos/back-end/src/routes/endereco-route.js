import express from 'express';
import enderecoController from '../controllers/endereco-controller.js';

const router = express.Router();

router.post('/', enderecoController.cadastrarEndereco);
router.get('/', enderecoController.listarEnderecos);
router.get('/ordenar', enderecoController.ordenarListaEnderecos);
router.get('/:codigo', enderecoController.consultarEndereco);
router.get('/cliente/:cpf_cliente', enderecoController.consultarEnderecoCPF);
router.put('/:codigo', enderecoController.alterarEndereco);
router.delete('/:codigo', enderecoController.deletarEndereco);

export default router;