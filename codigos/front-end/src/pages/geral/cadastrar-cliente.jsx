import React from 'react';
import CadastroClienteComp from '../../components/geral/CadastrarClientes';
import '../../styles/geral/CadastrarClientes-pag.css'; // Caminho para o CSS
import { useNavigate } from 'react-router-dom'; // Hook para redirecionamento

const CadastrarCliente = () => {
    const navigate = useNavigate(); // Hook para redirecionamento

    const handleBackClick = () => {
        navigate('/gerenciar-clientes'); // Redireciona para a página de gerenciamento de funcionários
    };

    return (
        <div className="cadastrar-cliente-container">
            <header className="header">
                <h1>Cadastrar Novo Cliente</h1>
                <button onClick={handleBackClick} className="back-button">Voltar</button>w
            </header>
            <main className="cadastrar-main">
                <CadastroClienteComp />
            </main>
        </div>
    );
};

export default CadastrarCliente;
