import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/gerente/GestaoGerenteComp.css';

const GestaoGerente = () => {
    const navigate = useNavigate();

    const handleButtonClick = (route) => {
        navigate(route);
    };

    return (
        <div className="gestao-container">
            <div className="header">
                <h1>Gestão Gerente</h1>
            </div>
            <div className="button-container">
                <button onClick={() => handleButtonClick('/gerenciar-funcionarios')}>Gerenciar Funcionários</button>
                <button onClick={() => handleButtonClick('/gerenciar-clientes')}>Gerenciar Clientes</button>
                <button onClick={() => handleButtonClick('/gerenciar-produtos')}>Gerenciar Produtos</button>
                <button onClick={() => handleButtonClick('/exibir-vendas')}>Exibir Vendas</button>
                <button onClick={() => handleButtonClick('/exibir-compras')}>Exibir Compras do Cliente</button>
            </div>
        </div>
    );
};

export default GestaoGerente;
