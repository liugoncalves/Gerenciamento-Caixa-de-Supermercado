import React from 'react';
import CadastroProdutoComp from '../../components/geral/CadastrarProdutos'; // Ajuste o caminho do componente conforme necessário
import '../../styles/geral/CadastrarProduto-pag.css'; // Ajuste o caminho do CSS conforme necessário

const CadastrarProduto = () => {
    return (
        <div className="cadastrar-produto-container">
            <header className="header">
                <h1>Cadastrar Novo Produto</h1>
            </header>
            <main className="cadastrar-main">
                <CadastroProdutoComp />
            </main>
        </div>
    );
};

export default CadastrarProduto;
