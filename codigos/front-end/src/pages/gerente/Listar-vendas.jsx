// src/pages/ListarVendasPage.js
import React from 'react';
import ListarVendas from '../../components/gerente/ListarVendas';
import '../../styles/gerente/ListarVenda-pag.css';
import LogoutButton from '../../components/geral/LogoutButton';

const ListarVendasPage = () => {
    
    return (
        <div className="listar-vendas-page">
            <LogoutButton />
            <header className="header">
                <h1>Listar Vendas</h1>
            </header>
            <ListarVendas />
        </div>
    );
};

export default ListarVendasPage;
