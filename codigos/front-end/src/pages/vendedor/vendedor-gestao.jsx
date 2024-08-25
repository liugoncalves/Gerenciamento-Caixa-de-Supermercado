import React from 'react';
import GestaoVendedor from '../../components/vendedor/GestaoVendedor'; // Certifique-se de que o caminho esteja correto
import '../../styles/vendedor/GestaoVendedor-pag.css'; // Para os estilos da página
import LogoutButton from '../../components/geral/LogoutButton';

const PaginaGestao = () => {
    return (
        <div className="pagina-gestao-container">
            <LogoutButton />
            <header className="pagina-header">
                <h1>Gestão - Vendedor</h1>  
            </header>
            <main className="pagina-main">
                <GestaoVendedor />
            </main>
        </div>
    );
};

export default PaginaGestao;