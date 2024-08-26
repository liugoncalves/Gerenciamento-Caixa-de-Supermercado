import React from 'react';
import EditarCompra from '../../components/geral/EditarCompra';
import '../../styles/geral/EditarCompra-pag.css'; // Para os estilos da página
import { useNavigate } from 'react-router-dom';

const PaginaEditarCompra = () => {
    const navigate = useNavigate();

    const handleVoltar = () => {
        navigate('/listar-compras');
    }

    return (
        <div className="pagina-editar-compra-container">
            <header className="header">
                <h1>Editar Compra</h1>
                <button onClick={handleVoltar} className="botao-voltar">
                    Voltar
                </button>
            </header>
            <main className="pagina-main">
                <EditarCompra />
            </main>
        </div>
    );
};

export default PaginaEditarCompra;
