import React from 'react';
import GerenciarFuncionarios from '../../components/gerente/GerenciarFuncionarios.jsx'; 
import '../../styles/gerente/GerenciarFuncionarios-pag.css';
import LogoutButton from '../../components/geral/LogoutButton';
import { useNavigate } from 'react-router-dom';

const PaginaGerenciarFuncionarios = () => {
    const navigate = useNavigate();

    const handleAdd = () => {
        navigate('/gerente-gestao');
    }

    return (
        <div className="pagina-gerenciar-funcionarios-container">
            <header className="header">
                <h1>Lista de Funcionários</h1> 
                <button onClick={handleAdd} className="back-button">Voltar</button>
            </header>
            <main className="pagina-main">
                <GerenciarFuncionarios />
            </main>
        </div>
    );
};

export default PaginaGerenciarFuncionarios;
