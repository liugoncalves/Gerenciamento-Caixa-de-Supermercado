import React from 'react';
import EditarCliente from '../../components/geral/EditarCliente.jsx'; 
import '../../styles/geral/EditarClientes-pag.css'; // Para os estilos da página

const PaginaEditarClientes = () => {
    return (
        <div className="pagina-gerenciar-clientes-container">
            <header className="header">
                <h1>Editar Clientes</h1>
            </header>
            <main className="pagina-main">
                <EditarCliente />
            </main>
        </div>
    );
};

export default PaginaEditarClientes;
