import express from 'express';
import funcionarioController from '../controllers/funcionario-controller.js';

const router = express.Router();

router.post('/cadastrar', funcionarioController.CadastrarFuncionario);
router.get('/listar', funcionarioController.ListarFuncionarios);
router.get('/ordenar', funcionarioController.OrdenarListaFuncionarios);
router.get('/consultar/:cpf', funcionarioController.ConsultarFuncionario);
router.put('/alterar/:cpf', funcionarioController.AlterarFuncionario);
router.delete('/deletar/:cpf', funcionarioController.DeletarFuncionario);

router.post('/login', funcionarioController.RealizarLogin);

export default router;