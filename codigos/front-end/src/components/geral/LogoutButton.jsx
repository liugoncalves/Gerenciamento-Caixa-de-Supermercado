// src/components/LogoutButton.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/geral/LogoutButton.css'; // Adicione o CSS para o botão

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove o cargo do localStorage
        localStorage.removeItem('cargo');
        // Redireciona para a tela de login
        navigate('/');
    };

    return (
        <button className="logout-button" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
