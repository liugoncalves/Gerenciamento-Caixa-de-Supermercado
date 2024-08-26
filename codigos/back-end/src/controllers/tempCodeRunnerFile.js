async function AlterarSenhaFuncionario(req, res) {
    // obtenção do CPF, nova senha e confirmação da nova senha
    const cpf = '06963066620';
    const novaSenha = '123456';
    const confirmarNovaSenha = '123456';

    // validação dos campos de senha
    if (!novaSenha || !confirmarNovaSenha) {
        return res.status(400).send('Os campos "nova senha" e "confirmar nova senha" devem ser fornecidos.');
    }

    if (novaSenha !== confirmarNovaSenha) {
        return res.status(400).send('A nova senha e a confirmação da nova senha não coincidem.');
    }

    try {
        // tentativa de alterar a senha do funcionário
        let resultado = await funcionario_service.AlterarSenhaFuncionario(cpf, novaSenha);
        res.status(200).send(resultado);
    } catch (error) {
        // tratamento de erros
        res.status(500).send(`${error.message}`);
    }
}