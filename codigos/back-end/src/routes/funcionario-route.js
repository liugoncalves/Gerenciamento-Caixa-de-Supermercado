import express from 'express';
import funcionarioController from '../controllers/funcionario-controller.js';

const router = express.Router();

router.post('/', funcionarioController.cadastrarFuncionario);
router.get('/', funcionarioController.listarFuncionarios);
router.get('/ordenar', funcionarioController.ordenarListaFuncionarios);
router.get('/:cpf', funcionarioController.consultarFuncionario);
router.put('/:cpf', funcionarioController.alterarFuncionario);
router.put('/alterar-senha/:cpf', funcionarioController.alterarSenhaFuncionario);
router.delete('/:cpf', funcionarioController.deletarFuncionario);

router.post('/login', funcionarioController.realizarLogin);

export default router;