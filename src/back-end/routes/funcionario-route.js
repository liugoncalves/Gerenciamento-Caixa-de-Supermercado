import express from 'express';
import funcionarioController from '../controllers/funcionario-controller.js';

const router = express.Router();

router.post('', funcionarioController.CadastrarFuncionario);

export default router;