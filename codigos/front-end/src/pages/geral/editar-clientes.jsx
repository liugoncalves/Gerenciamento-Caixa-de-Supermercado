import React from 'react';
import EditarCliente from '../../components/geral/EditarCliente.jsx'; 
import '../../styles/geral/EditarClientes-pag.css'; // Para os estilos da página
import { useNavigate } from 'react-router-dom'; // Hook para redirecionamento

const PaginaEditarClientes = () => {
    const navigate = useNavigate(); // Hook para redirecionamento

    const handleBackClick = () => {
        navigate('/gerenciar-clientes');
    };

    return (
        <div className="pagina-gerenciar-clientes-container">
            <header className="header">
                <h1>Editar Clientes</h1>
                <button onClick={handleBackClick} className="back-button">Voltar</button>
            </header>
            <main className="pagina-main">
                <EditarCliente />
            </main>
        </div>
    );
};

export default PaginaEditarClientes;
