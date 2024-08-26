import React from 'react';
import ListarCompras from '../../components/geral/Compras';
import '../../styles/geral/Compras-pag.css';
import { useNavigate } from 'react-router-dom';

const ComprasPage = () => {
    const navigate = useNavigate();

    const handleVoltar = () => {
        const cargo = localStorage.getItem('cargo');
        if (cargo === 'gerente') {
            navigate('/gerente-gestao');
        } else {
            navigate('/vendedor-gestao');
        }
    };

    return (
        <div className="compras-page-container">
            <h1 className="compras-page-title">Compras dos Clientes</h1>
            <button onClick={handleVoltar} className="compras-page-back-button">
                Voltar
            </button>
            <ListarCompras />
        </div>
    );
};

export default ComprasPage;
