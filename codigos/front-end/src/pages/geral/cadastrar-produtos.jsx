import React from 'react';
import CadastroProdutoComp from '../../components/geral/CadastrarProdutos'; // Ajuste o caminho do componente conforme necessário
import '../../styles/geral/CadastrarProduto-pag.css'; // Ajuste o caminho do CSS conforme necessário
import { useNavigate } from 'react-router-dom'; // Hook para redirecionamento

const CadastrarProduto = () => {
    const navigate = useNavigate(); // Hook para redirecionamento

    const handleBackClick = () => {
        navigate('/gerenciar-produtos');
    };

    return (
        <div className="cadastrar-produto-container">
            <header className="header">
                <h1>Cadastrar Novo Produto</h1>
                <button onClick={handleBackClick} className="back-button">Voltar</button>
            </header>
            <main className="cadastrar-main">
                <CadastroProdutoComp />
            </main>
        </div>
    );
};

export default CadastrarProduto;
