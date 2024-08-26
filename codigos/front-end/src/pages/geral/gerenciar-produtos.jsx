import React from 'react';
import GerenciarProdutos from '../../components/geral/GerenciarProdutos.jsx'; 
import '../../styles/geral/GerenciarProdutos-pag.css'; // Atualize o caminho se necessário
import LogoutButton from '../../components/geral/LogoutButton';
import { useNavigate } from 'react-router-dom';

const PaginaGerenciarProdutos = () => {
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
        <div className="pagina-gerenciar-produtos-container">
            <header className="header">
                <h1>Lista de Produtos</h1>  
                <button onClick={handleVoltar} className="botao-voltar">
                    Voltar
                </button>
            </header>
            <main className="pagina-main">
                <GerenciarProdutos />
            </main>
        </div>
    );
};

export default PaginaGerenciarProdutos;
