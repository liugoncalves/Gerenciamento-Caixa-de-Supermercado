import express from 'express';
import clienteController from '../controllers/cliente-controller.js';

const router = express.Router();

router.post('/cadastrar', clienteController.CadastrarCliente);
router.get('/listar', clienteController.ListarClientes);
router.get('/ordenar', clienteController.OrdenarListaClientes); 
router.get('/consultar/:cpf', clienteController.ConsultarCliente);
router.put('/alterar/:cpf', clienteController.AlterarCliente);
router.delete('/deletar/:cpf', clienteController.DeletarCliente);

export default router;