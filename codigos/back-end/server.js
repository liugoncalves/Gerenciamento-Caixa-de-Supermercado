import app from './app.js';  // Importa o app configurado no app.js

const port = 3002;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
