import React from 'react';
import EditarFuncionario from '../../components/gerente/EditarFuncionario.jsx'; 
import { useNavigate } from 'react-router-dom';
import '../../styles/gerente/EditarFuncionario-pag.css'; // Para os estilos da página

const PaginaEditarFuncionario = () => {
    const navigate = useNavigate(); // Hook para redirecionamento

    const handleBackClick = () => {
        navigate('/gerenciar-funcionarios');
    };

    return (
        <div className="pagina-editar-funcionario-container">
            <header className="header">
                <h1>Editar Funcionário</h1>
                <button onClick={handleBackClick} className="back-button">Voltar</button>
            </header>
            <main className="pagina-main">
                <EditarFuncionario />
            </main>
        </div>
    );
};

export default PaginaEditarFuncionario;
