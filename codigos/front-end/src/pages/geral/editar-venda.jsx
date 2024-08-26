
import React from 'react';
import EditarVenda from '../../components/geral/EditarVenda';
import '../../styles/geral/EditarVenda-pag.css'; // Para os estilos da página

const PaginaEditarVenda = () => {
    return (
        <div className="pagina-editar-venda-container">
            <header className="header">
                <h1>Editar Venda</h1>
            </header>
            <main className="pagina-main">
                <EditarVenda />
            </main>
        </div>
    );
};

export default PaginaEditarVenda;
