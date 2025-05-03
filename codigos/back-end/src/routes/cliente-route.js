import express from 'express';
import clienteController from '../controllers/cliente-controller.js';

const router = express.Router();

router.post('/', clienteController.cadastrarCliente);
router.get('/', clienteController.listarClientes);
router.get('/ordenar', clienteController.ordenarListaClientes); 
router.get('/:cpf', clienteController.consultarCliente);
router.put('/:cpf', clienteController.alterarCliente);
router.delete('/:cpf', clienteController.deletarCliente);

export default router;