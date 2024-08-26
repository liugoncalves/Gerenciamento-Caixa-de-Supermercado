import React from 'react';
import CadastroFuncionarioComp from '../..//components/gerente/CadastrarFuncionarios';
import { useNavigate } from 'react-router-dom'; 
import '../../styles/gerente/CadastrarFuncionario-pag.css'; // Alterado para CadastrarFuncionario.css

const CadastrarFuncionario = () => {
    const navigate = useNavigate(); // Hook para redirecionamento

    const handleBackClick = () => {
        navigate('/gerenciar-funcionarios');
    };

    return (
        <div className="cadastrar-funcionario-container">
            <header className="header">
                <h1>Cadastrar Novo Funcionário</h1>
                <button onClick={handleBackClick} className="back-button">Voltar</button>
            </header>
            <main className="cadastrar-main">
                <CadastroFuncionarioComp />
            </main>
        </div>
    );
};

export default CadastrarFuncionario;
