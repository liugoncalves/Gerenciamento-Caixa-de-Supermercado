import React from 'react';
import GestaoGerente from '../../components/gerente/GestaoGerentesComp'; // Certifique-se de que o caminho esteja correto
import '../../styles/gerente/GestaoGerente-pag.css'; // Para os estilos da página
import LogoutButton from '../../components/geral/LogoutButton';
import { useNavigate } from 'react-router-dom'; // Hook para redirecionamento

const PaginaGestao = () => {
    const navigate = useNavigate(); // Hook para redirecionamento

    const handleBackClick = () => {
        navigate('/TelaInicialGerente'); 
    };

    return (
        <div className="pagina-gestao-container">
            <LogoutButton />
            <header className="pagina-header">
                <h1>Gestão - Gerente</h1>  
                <button onClick={handleBackClick} className="back-button">Voltar</button>
            </header>
            <main className="pagina-main">
                <GestaoGerente />
            </main>
        </div>
    );
};

export default PaginaGestao;
