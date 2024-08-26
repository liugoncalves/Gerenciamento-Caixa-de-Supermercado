// src/pages/PaginaEditarProduto.jsx

import React from 'react';
import EditarProduto from '../../components/geral/EditarProduto'; 
import '../../styles/geral/EditarProduto-pag.css'; // Para os estilos da página

const PaginaEditarProduto = () => {
    return (
        <div className="pagina-editar-produto-container">
            <header className="header">
                <h1>Editar Produto</h1>
            </header>
            <main className="pagina-main">
                <EditarProduto />
            </main>
        </div>
    );
};

export default PaginaEditarProduto;
