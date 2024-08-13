import express from 'express';
import funcionarioController from '../controllers/funcionario-controller.js';

const router = express.Router();

router.post('/cadastrar', funcionarioController.CadastrarFuncionario);
router.get('/listar-funcionarios', funcionarioController.ListarFuncionarios);
router.get('/consultar-funcionario/:cpf', funcionarioController.ConsultarFuncionario);
router.put('/alterar-funcionario/:cpf', funcionarioController.AlterarFuncionario);
router.delete('/excluir-funcionario/:cpf', funcionarioController.ExcluirFuncionario);

export default router;