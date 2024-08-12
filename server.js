import express from 'express';
import bodyParser from 'body-parser';
import funcionarioRouter from './src/back-end/routes/funcionario-route.js';
const port = 3002;
const app = express();

app.use(bodyParser.json());
app.use('/funcionarios', funcionarioRouter);

// rota base
app.get('/', (req, res) => {
    res.send('Olá, mundo!');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
