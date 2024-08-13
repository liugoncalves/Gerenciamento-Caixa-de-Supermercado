import express from 'express';
import produtoController from '../controllers/produto-controller.js';

const router = express.Router();

router.post('/cadastrar-produto', produtoController.CadastrarProduto);

export default router;