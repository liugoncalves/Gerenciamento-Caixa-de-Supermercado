import express from 'express';
import clienteController from '../controllers/cliente-controller.js';

const router = express.Router();

router.post('/cadastrar', clienteController.CadastrarCliente);

export default router;