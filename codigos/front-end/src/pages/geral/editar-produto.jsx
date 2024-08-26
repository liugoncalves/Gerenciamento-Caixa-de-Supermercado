// src/pages/PaginaEditarProduto.jsx

import React from 'react';
import EditarProduto from '../../components/geral/EditarProduto'; 
import '../../styles/geral/EditarProduto-pag.css'; // Para os estilos da página
import { useNavigate } from 'react-router-dom'; // Hook para redirecionamento

const PaginaEditarProduto = () => {
    const navigate = useNavigate(); // Hook para redirecionamento

    const handleBackClick = () => {
        navigate('/gerenciar-produtos');
    };

    return (
        <div className="pagina-editar-produto-container">
            <header className="header">
                <h1>Editar Produto</h1>
                <button onClick={handleBackClick} className="back-button">Voltar</button>
            </header>
            <main className="pagina-main">
                <EditarProduto />
            </main>
        </div>
    );
};

export default PaginaEditarProduto;
