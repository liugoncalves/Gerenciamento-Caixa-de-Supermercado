import express from 'express';
import produtoController from '../controllers/produto-controller.js';

const router = express.Router();

router.post('/cadastrar', produtoController.CadastrarProduto);
router.get('/listar', produtoController.ListarProdutos);
router.get('/consultar/:codigo', produtoController.ConsultarProduto);
router.put('/alterar/:codigo', produtoController.AlterarProduto);

export default router;