import React from 'react';
import { useNavigate } from 'react-router-dom';
import GerenciarClientes from '../../components/geral/GerenciarClientes.jsx'; 
import '../../styles/geral/GerenciarClientes-pag.css'; // Atualize o caminho se necessário
import LogoutButton from '../../components/geral/LogoutButton';

const PaginaGerenciarClientes = () => {
    const navigate = useNavigate();

    const handleVoltar = () => {
        const cargo = localStorage.getItem('cargo');
        if (cargo === 'gerente') {
            navigate('/gerente-gestao');
        } else {
            navigate('/vendedor-gestao');
        }
    };

    return (
        <div className="pagina-gerenciar-clientes-container">
            <header className="header">
                <h1>Lista de Clientes</h1>  
                <button onClick={handleVoltar} className="botao-voltar">
                    Voltar
                </button>
            </header>
            <main className="pagina-main">
                <GerenciarClientes />
            </main>
        </div>
    );
};

export default PaginaGerenciarClientes;
