// src/pages/PaginaEditarFuncionario.jsx

import React from 'react';
import EditarFuncionario from '../../components/gerente/EditarFuncionario.jsx'; 
import '../../styles/gerente/EditarFuncionario-pag.css'; // Para os estilos da página

const PaginaEditarFuncionario = () => {
    return (
        <div className="pagina-editar-funcionario-container">
            <header className="header">
                <h1>Editar Funcionário</h1>
            </header>
            <main className="pagina-main">
                <EditarFuncionario />
            </main>
        </div>
    );
};

export default PaginaEditarFuncionario;
