import React from 'react';
import CadastroClienteComp from '../../components/geral/CadastrarClientes';
import '../../styles/geral/CadastrarClientes-pag.css'; // Caminho para o CSS

const CadastrarCliente = () => {
    return (
        <div className="cadastrar-cliente-container">
            <header className="header">
                <h1>Cadastrar Novo Cliente</h1>
            </header>
            <main className="cadastrar-main">
                <CadastroClienteComp />
            </main>
        </div>
    );
};

export default CadastrarCliente;
