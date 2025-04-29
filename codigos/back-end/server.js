import express from 'express';
import bodyParser from 'body-parser';
import funcionarioRouter from './src/routes/funcionario-route.js';
import produtoRouter from './src/routes/produto-route.js';
import clienteRouter from './src/routes/cliente-route.js';
import enderecoRouter from './src/routes/endereco-route.js';
import vendaRouter from './src/routes/venda-route.js';
import cors from 'cors'


const port = 3002;
const app = express();

app.use(cors()) //liberando front para acessar o back
app.use(bodyParser.json());
app.use('/funcionarios', funcionarioRouter);
app.use('/produtos', produtoRouter);
app.use('/clientes', clienteRouter);
app.use('/enderecos', enderecoRouter);
app.use('/vendas', vendaRouter);


// Adicionar uma rota básica
app.get('/', (req, res) => {
    res.send('Olá, mundo!');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
