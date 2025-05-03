import express from 'express';
import vendaController from '../controllers/venda-controller.js';

const router = express.Router();

router.post('/', vendaController.realizarVenda);
router.post('/gerar-nota-fiscal/:codigo', vendaController.gerarNotaFiscal);
router.get('/', vendaController.listarVendas);
router.get('/:codigo', vendaController.consultarVenda);
router.put('/:codigo', vendaController.alterarVenda);
router.delete('/:codigo', vendaController.deletarVenda);


export default router;