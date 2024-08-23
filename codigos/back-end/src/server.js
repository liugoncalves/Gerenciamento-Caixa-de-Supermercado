import express from 'express';
import bodyParser from 'body-parser';
import funcionarioRouter from './routes/funcionario-route.js';
import produtoRouter from './routes/produto-route.js';
import clienteRouter from './routes/cliente-route.js';
import enderecoRouter from './routes/endereco-route.js';

const port = 3002;
const app = express();

app.use(bodyParser.json());
app.use('/funcionarios', funcionarioRouter);
app.use('/produtos', produtoRouter);
app.use('/clientes', clienteRouter);
app.use('/enderecos', enderecoRouter);


// Adicionar uma rota básica
app.get('/', (req, res) => {
    res.send('Olá, mundo!');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
