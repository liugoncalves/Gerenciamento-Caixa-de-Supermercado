import React from 'react';
import LoginForm from '../../components/geral/LoginForm';
import logo from '../../assets/images/logo.png';
import '../../styles/geral/LoginPage.css';

const LoginPage = () => {
    return (
        <div className="login-page">
            <div className="logo-container">
                <img src={logo} alt="Logo" />
            </div>
            <LoginForm />
        </div>
    );
};

export default LoginPage;
