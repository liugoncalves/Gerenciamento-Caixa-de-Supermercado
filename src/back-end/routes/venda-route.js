import express from 'express';
import vendaController from '../controllers/venda-controller.js';

const router = express.Router();

router.post('/cadastrar', vendaController.RealizarVenda);

export default router;