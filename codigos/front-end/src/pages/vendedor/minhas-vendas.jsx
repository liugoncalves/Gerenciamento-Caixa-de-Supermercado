
import React from 'react';
import MinhasVendas from '../../components/vendedor/MinhasVendas';
import '../../styles/vendedor/MinhasVendas-pag.css';
import LogoutButton from '../../components/geral/LogoutButton';
import { useNavigate } from 'react-router-dom';

const MinhasVendasPage = () => {
        const navigate = useNavigate(); // Hook para redirecionamento

    const handleBackClick = () => {
        navigate('/vendedor-gestao'); 
    };

    
    return (
        <div className="listar-vendas-page">
            <header className="header">
                <h1>Suas vendas</h1>
                <button onClick={handleBackClick} className="back-button">Voltar</button>
            </header>
            <MinhasVendas />
        </div>
    );
};

export default MinhasVendasPage;
