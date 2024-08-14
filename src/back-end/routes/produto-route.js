import express from 'express';
import produtoController from '../controllers/produto-controller.js';

const router = express.Router();

router.post('/cadastrar', produtoController.CadastrarProduto);

export default router;