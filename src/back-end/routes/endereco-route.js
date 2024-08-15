import express from 'express';
import enderecoController from '../controllers/endereco-controller.js';

const router = express.Router();

router.post('/cadastrar', enderecoController.CadastrarEndereco);

export default router;