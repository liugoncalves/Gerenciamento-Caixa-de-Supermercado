import React from 'react';
import GerenciarClientes from '../../components/geral/GerenciarClientes.jsx'; 
import '../../styles/geral/GerenciarClientes-pag.css'; // Atualize o caminho se necessário
import LogoutButton from '../../components/geral/LogoutButton';

const PaginaGerenciarClientes = () => {
    return (
        <div className="pagina-gerenciar-clientes-container">
            <LogoutButton />
            <header className="header">
                <h1>Lista de Clientes</h1>  
            </header>
            <main className="pagina-main">
                <GerenciarClientes />
            </main>
        </div>
    );
};

export default PaginaGerenciarClientes;
