// src/pages/ListarVendasPage.js
import React from 'react';
import ListarVendas from '../../components/gerente/ListarVendas';
import '../../styles/gerente/ListarVenda-pag.css';
import LogoutButton from '../../components/geral/LogoutButton';
import { useNavigate } from 'react-router-dom';

const ListarVendasPage = () => {
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
        <div className="listar-vendas-page">
            <header className="header">
                <h1>Vendas dos funcionários</h1>
                <button onClick={handleVoltar} className="botao-voltar">
                    Voltar
                </button>
            </header>
            <ListarVendas />
        </div>
    );
};

export default ListarVendasPage;
