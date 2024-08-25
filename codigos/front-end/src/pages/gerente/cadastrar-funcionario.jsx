import React from 'react';
import CadastroFuncionarioComp from '../..//components/gerente/CadastrarFuncionarios';
import '../../styles/gerente/CadastrarFuncionario-pag.css'; // Alterado para CadastrarFuncionario.css

const CadastrarFuncionario = () => {
    return (
        <div className="cadastrar-funcionario-container">
            <header className="header">
                <h1>Cadastrar Novo Funcionário</h1>
            </header>
            <main className="cadastrar-main">
                <CadastroFuncionarioComp />
            </main>
        </div>
    );
};

export default CadastrarFuncionario;
