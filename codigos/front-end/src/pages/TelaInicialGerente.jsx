import React from 'react';
import TelaInicial from '../components/TelaInicialGerente';
import logo from '../assets/images/logo.png';
import '../styles/TelaInicial-pag.css';

const Tela = () => {
    return (
        <div className="tela-page">
            <div className="logo-container">
                <img src={logo} alt="Logo" />
            </div>
            <TelaInicial />
        </div>
    );
};

export default Tela;
