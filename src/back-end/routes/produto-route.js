import express from 'express';
import produtoController from '../controllers/produto-controller.js';

const router = express.Router();

router.post('/cadastrar', produtoController.CadastrarProduto);
router.get('/listar', produtoController.ListarProdutos);

export default router;