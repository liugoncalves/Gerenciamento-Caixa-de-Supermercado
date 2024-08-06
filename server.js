import express from 'express';
import bodyParser from 'body-parser';

const port = 3002;
const app = express();

app.use(bodyParser.json());

// Adicionar uma rota básica
app.get('/', (req, res) => {
    res.send('Olá, mundo!');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
