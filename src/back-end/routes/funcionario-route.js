import express from 'express';
import funcionarioController from '../controllers/funcionario-controller.js';

const router = express.Router();

router.post('/cadastrar', funcionarioController.CadastrarFuncionario);
router.get('/listar-funcionarios', funcionarioController.ListarFuncionarios);
router.get('/consultar-funcionario/:cpf', funcionarioController.ConsultarFuncionario);
router.get('/consultar-funcionario/', (req, res) => {
    return res.status(400).send('Digite um CPF para realizar a busca.');
});



export default router;