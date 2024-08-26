import React, { useState } from 'react';
import api from '../../services/api';
import '../../styles/gerente/CadastrarFuncionarioComp.css';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirecionamento

const CadastroFuncionarioComp = () => {
    const [funcionario, setFuncionario] = useState({
        cpf: '',
        nome: '',
        email: '',
        senha: '',
        cargo: '',
        salario: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [emailError, setEmailError] = useState(''); // Para lidar com erros de email
    const navigate = useNavigate(); // Hook para redirecionamento

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFuncionario(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Remover pontos e hífens do CPF
        const cpf = funcionario.cpf.replace(/[.\-]/g, '');

        // Validar se o salário é um valor positivo
        const salario = parseFloat(funcionario.salario);
        if (isNaN(salario) || salario <= 0) {
            setErrorMessage('O salário deve ser um valor positivo.');
            return;
        }

        // Criar um novo objeto com o CPF formatado
        const funcionarioData = {
            ...funcionario,
            cpf: cpf
        };

        try {
            await api.post('/funcionarios/cadastrar', funcionarioData);
            setSuccessMessage('Funcionário cadastrado com sucesso!');
            setErrorMessage('');
            setEmailError(''); // Limpar erro de email

            // Redireciona após atraso de 1,5 segundos
            setTimeout(() => {
                navigate('/gerenciar-funcionarios');
            }, 1500);
            
            // Limpar formulário após sucesso
            setFuncionario({
                cpf: '',
                nome: '',
                email: '',
                senha: '',
                cargo: '',
                salario: ''
            });
        } catch (error) {
            // Verificar se o erro é relacionado ao email já cadastrado
            if (error.response && error.response.status === 400 && error.response.data.message === 'Email já cadastrado') {
                setEmailError('O email informado já está em uso.'); // Mensagem de erro para email já cadastrado
            } else {
                console.error('Erro ao cadastrar o funcionário', error);
                setErrorMessage('Erro ao cadastrar o funcionário. Tente novamente.');
            }
            setSuccessMessage('');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label>
                    CPF:
                    <input
                        type="text"
                        name="cpf"
                        value={funcionario.cpf}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Nome:
                    <input
                        type="text"
                        name="nome"
                        value={funcionario.nome}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={funcionario.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                {emailError && <div className="error-message">{emailError}</div>} {/* Mostrar erro de email */}
                <label>
                    Senha:
                    <input
                        type="password"
                        name="senha"
                        value={funcionario.senha}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Cargo:
                    <input
                        type="text"
                        name="cargo"
                        value={funcionario.cargo}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Salário:
                    <input
                        type="text"
                        name="salario"
                        value={funcionario.salario}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Cadastrar</button>
                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>
        </div>
    );
};

export default CadastroFuncionarioComp;
