import React from 'react';
import LoginForm from '../components/LoginForm';
import logo from '../assets/images/logo.png';
import '../styles/LoginPage.css';

const Login = () => {
    return (
        <div className="login-page">
            <div className="logo-container">
                <img src={logo} alt="MLV Logo" />
            </div>
            <div className="form-container">
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;
