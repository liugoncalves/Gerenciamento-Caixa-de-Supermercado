import express from 'express';
import funcionarioRouter from './src/routes/funcionario-route.js';
import produtoRouter from './src/routes/produto-route.js';
import clienteRouter from './src/routes/cliente-route.js';
import enderecoRouter from './src/routes/endereco-route.js';
import vendaRouter from './src/routes/venda-route.js';

const app = express();

app.use(express.json());

// rotas
app.use('/funcionarios', funcionarioRouter);
app.use('/produtos', produtoRouter);
app.use('/clientes', clienteRouter);
app.use('/enderecos', enderecoRouter);
app.use('/vendas', vendaRouter);

// rota básica de teste
app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

export default app;
