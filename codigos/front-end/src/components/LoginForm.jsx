import React from 'react';
import '../styles/LoginForm.css';

const LoginForm = () => {
    return (
        <div className="login-form-container">
            <div className="form-group">
                <label>Usuário:</label>
                <input type="text" placeholder="Usuário" />
            </div>
            <div className="form-group">
                <label>Senha:</label>
                <input type="password" placeholder="Senha" />
            </div>
            <button className="login-button">Login</button>
        </div>
    );
};

export default LoginForm;
