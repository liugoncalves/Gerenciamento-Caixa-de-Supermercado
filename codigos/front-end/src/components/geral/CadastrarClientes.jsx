import React, { useState } from 'react';
import api from '../../services/api';
import '../../styles/geral/CadastrarClientesComp.css'; // Crie este arquivo de estilo conforme necessário
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirecionamento

const CadastroClienteComp = () => {
    const [cliente, setCliente] = useState({
        nome: '',
        cpf: '',
        telefone: '',
        email: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [emailError, setEmailError] = useState(''); // Para lidar com erros de email
    const navigate = useNavigate(); // Hook para redirecionamento

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Remover pontos e hífens do CPF
        const cpf = cliente.cpf.replace(/[.\-]/g, '');

        // Criar um novo objeto com o CPF formatado
        const clienteData = {
            ...cliente,
            cpf: cpf
        };

        try {
            await api.post('/clientes/cadastrar', clienteData);
            setSuccessMessage('Cliente cadastrado com sucesso!');
            setErrorMessage('');
            setEmailError(''); // Limpar erro de email

            // Redireciona após atraso de 1,5 segundos
            setTimeout(() => {
                navigate('/gerenciar-clientes'); // Ajuste a rota de redirecionamento conforme necessário
            }, 1500);

            // Limpar formulário após sucesso
            setCliente({
                nome: '',
                cpf: '',
                telefone: '',
                email: ''
            });
        } catch (error) {
            // Verificar se o erro é relacionado ao email já cadastrado
            if (error.response && error.response.status === 400 && error.response.data.message === 'Email já cadastrado') {
                setEmailError('O email informado já está em uso.'); // Mensagem de erro para email já cadastrado
            } else {
                console.error('Erro ao cadastrar o cliente', error);
                setErrorMessage('Erro ao cadastrar o cliente. Tente novamente.');
            }
            setSuccessMessage('');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input
                        type="text"
                        name="nome"
                        value={cliente.nome}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    CPF:
                    <input
                        type="text"
                        name="cpf"
                        value={cliente.cpf}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Telefone:
                    <input
                        type="text"
                        name="telefone"
                        value={cliente.telefone}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={cliente.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                {emailError && <div className="error-message">{emailError}</div>} {/* Mostrar erro de email */}
                <button type="submit">Cadastrar</button>
                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>
        </div>
    );
};

export default CadastroClienteComp;
