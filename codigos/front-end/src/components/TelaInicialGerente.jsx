import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TelaInicialComp.css';
import vendaIcon from '../assets/images/venda-icon.png'; // Caminho para o ícone de venda
import gestaoIcon from '../assets/images/gestao-icon.png'; // Caminho para o ícone de gestão

const TelaInicial = () => {
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    };

    return (
        <div className="home-page">
            <div className="button-container">
                <button 
                    className="home-button" 
                    onClick={() => handleClick('/venda')}
                >
                    <img src={vendaIcon} alt="Realizar Venda" />
                    Realizar Venda
                </button>
                <button 
                    className="home-button" 
                    onClick={() => handleClick('/gerente-gestao')}
                >
                    <img src={gestaoIcon} alt="Gestão" />
                    Gestão
                </button>
            </div>
        </div>
    );
};

export default TelaInicial;
