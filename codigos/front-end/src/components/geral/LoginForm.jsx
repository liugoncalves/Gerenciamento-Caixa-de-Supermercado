import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/geral/LoginForm.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    localStorage.removeItem('cargo');
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3002/funcionarios/login', {
                email,
                senha,
            });

            const { mensagem, cargo } = response.data; 
            setError('');
            setMessage(mensagem);

            // Armazena o cargo no localStorage
            localStorage.setItem('cargo', cargo);

            // Redireciona para a página apropriada com base no cargo
            if (cargo === 'gerente') {
                navigate('/TelaInicialGerente');
            } else {
                navigate('/TelaInicialVendedor');
            }
            
        } catch (error) {
            setMessage('');
            setError(error.response?.data || 'Erro ao fazer login');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Usuário:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Usuário"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="senha">Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
                {error && <p className="error">{error}</p>}
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default LoginForm;
