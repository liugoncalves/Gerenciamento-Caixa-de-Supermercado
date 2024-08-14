import express from 'express';
import clienteController from '../controllers/cliente-controller.js';

const router = express.Router();

router.post('/cadastrar', clienteController.CadastrarCliente);
router.get('/listar', clienteController.ListarClientes);
router.get('/consultar/:cpf', clienteController.ConsultarCliente);

export default router;