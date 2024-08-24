import React from 'react';
import GestaoGerente from '../../components/gerente/GestaoGerentesComp' // Certifique-se de que o caminho esteja correto
import '../../styles/gerente/GestaoGerente-pag.css'; // Para os estilos da página

const PaginaGestao = () => {
    return (
        <div className="pagina-gestao-container">
            <header className="pagina-header">
                <h1>Painel de Gestão</h1>
            </header>
            <main className="pagina-main">
                <GestaoGerente />
            </main>
        </div>
    );
};

export default PaginaGestao;
