import React from 'react';
import GerenciarProdutos from '../../components/geral/GerenciarProdutos.jsx'; 
import '../../styles/geral/GerenciarProdutos-pag.css'; // Atualize o caminho se necessário
import LogoutButton from '../../components/geral/LogoutButton';

const PaginaGerenciarProdutos = () => {
    return (
        <div className="pagina-gerenciar-produtos-container">
            <LogoutButton />
            <header className="header">
                <h1>Lista de Produtos</h1>  
            </header>
            <main className="pagina-main">
                <GerenciarProdutos />
            </main>
        </div>
    );
};

export default PaginaGerenciarProdutos;
