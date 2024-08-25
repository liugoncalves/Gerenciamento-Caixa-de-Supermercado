import React from 'react';
import GerenciarFuncionarios from '../../components/gerente/GerenciarFuncionarios.jsx'; 
import '../../styles/gerente/GerenciarFuncionarios-pag.css';
import LogoutButton from '../../components/geral/LogoutButton';

const PaginaGerenciarFuncionarios = () => {
    return (
        <div className="pagina-gerenciar-funcionarios-container">
            <LogoutButton />
            <header className="header">
                <h1>Lista de Funcionários</h1>  
            </header>
            <main className="pagina-main">
                <GerenciarFuncionarios />
            </main>
        </div>
    );
};

export default PaginaGerenciarFuncionarios;
