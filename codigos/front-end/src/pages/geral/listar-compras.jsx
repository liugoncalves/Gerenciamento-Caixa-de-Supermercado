import React from 'react';
import ListarCompras from '../../components/geral/Compras';
import '../../styles/geral/Compras-pag.css';

const ComprasPage = () => {
    return (
        <div className="compras-page-container">
            <h1 className="compras-page-title">Compras dos Clientes</h1>
            <ListarCompras />
        </div>
    );
};

export default ComprasPage;
