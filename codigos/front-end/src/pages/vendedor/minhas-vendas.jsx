
import React from 'react';
import MinhasVendas from '../../components/vendedor/MinhasVendas';
import '../../styles/vendedor/MinhasVendas-pag.css';
import LogoutButton from '../../components/geral/LogoutButton';

const MinhasVendasPage = () => {
    
    return (
        <div className="listar-vendas-page">
            <LogoutButton />
            <header className="header">
                <h1>Suas vendas</h1>
            </header>
            <MinhasVendas />
        </div>
    );
};

export default MinhasVendasPage;
