
import React from 'react';
import EditarVenda from '../../components/geral/EditarVenda';
import '../../styles/geral/EditarVenda-pag.css'; // Para os estilos da página
import { useNavigate } from 'react-router-dom';

const PaginaEditarVenda = () => {
    const navigate = useNavigate();

    const handleVoltar = () => {
        navigate('/Listar-vendas');
    }

    return (
        <div className="pagina-editar-venda-container">
            <header className="header">
                <h1>Editar Venda</h1>
                <button onClick={handleVoltar} className="botao-voltar">
                    Voltar
                </button>
            </header>
            <main className="pagina-main">
                <EditarVenda />
            </main>
        </div>
    );
};

export default PaginaEditarVenda;
