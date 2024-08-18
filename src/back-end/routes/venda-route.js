import express from 'express';
import vendaController from '../controllers/venda-controller.js';

const router = express.Router();

router.post('/cadastrar', vendaController.RealizarVenda);
router.get('/listar', vendaController.ListarVendas);
router.get('/consultar/:codigo', vendaController.ConsultarVenda);

export default router;