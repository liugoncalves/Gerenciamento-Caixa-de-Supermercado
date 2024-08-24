import React from 'react';
import TelaInicial from '../../components/gerente/TelaInicialGerente';
import logo from '../../assets/images/logo.png';
import '../../styles/gerente/TelaInicial-pag.css';
import LogoutButton from '../../components/geral/LogoutButton';

const Tela = () => {
    return (
        <div className="tela-page">
            <LogoutButton />
            <div className="logo-container">
                <img src={logo} alt="Logo" />
            </div>
            <TelaInicial />
        </div>
    );
};

export default Tela;
