import express from 'express';
import produtoController from '../controllers/produto-controller.js';

const router = express.Router();

router.post('/', produtoController.cadastrarProduto);
router.get('/', produtoController.listarProdutos);
router.get('/ordenar', produtoController.ordenarListaProdutos);
router.get('/:codigo', produtoController.consultarProduto);
router.put('/:codigo', produtoController.alterarProduto);
router.delete('/:codigo', produtoController.deletarProduto);

export default router;