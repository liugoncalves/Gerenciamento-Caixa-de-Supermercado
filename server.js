import express from 'express';
import bodyParser from 'body-parser';
<<<<<<< HEAD
=======
import funcionarioRouter from './src/back-end/routes/funcionario-route.js';
import produtoRouter from './src/back-end/routes/produto-route.js';
import clienteRouter from './src/back-end/routes/cliente-route.js';
import enderecoRouter from './src/back-end/routes/endereco-route.js';
import vendaRouter from './src/back-end/routes/venda-route.js';
>>>>>>> development

const port = 3002;
const app = express();

app.use(bodyParser.json());
<<<<<<< HEAD
=======
app.use('/funcionarios', funcionarioRouter);
app.use('/produtos', produtoRouter);
app.use('/clientes', clienteRouter);
app.use('/enderecos', enderecoRouter);
app.use('/vendas', vendaRouter);
>>>>>>> development

// Adicionar uma rota básica
app.get('/', (req, res) => {
    res.send('Olá, mundo!');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
