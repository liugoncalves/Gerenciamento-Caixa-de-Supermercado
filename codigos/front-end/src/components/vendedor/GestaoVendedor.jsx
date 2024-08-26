import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/vendedor/GestaoVendedorComp.css';

// Supondo que você tenha os ícones nas seguintes pastas:
import clienteIcon from '../../assets/images/clientes.png';
import produtoIcon from '../../assets/images/produtos.png';
import vendasIcon from '../../assets/images/vendas.png';
import comprasIcon from '../../assets/images/compras.png';

const GestaoVendedor = () => {
    const navigate = useNavigate();

    const handleButtonClick = (route) => {
        navigate(route);
    };

    return (
        <div className="gestao-container">
            <div className="button-container">
                <button onClick={() => handleButtonClick('/gerenciar-clientes')}>
                    <img src={clienteIcon} alt="Gerenciar Clientes" />
                    <span>Gerenciar Clientes</span>
                </button>
                <button onClick={() => handleButtonClick('/gerenciar-produtos')}>
                    <img src={produtoIcon} alt="Gerenciar Produtos" />
                    <span>Gerenciar Produtos</span>
                </button>
                <button onClick={() => handleButtonClick('/minhas-vendas')}>
                    <img src={vendasIcon} alt="Minhas Vendas" />
                    <span>Minhas Vendas</span>
                </button>
                <button onClick={() => handleButtonClick('/listar-compras')}>
                    <img src={comprasIcon} alt="Exibir Compras dos Clientes" />
                    <span>Exibir Compras dos Clientes</span>
                </button>
            </div>
        </div>
    );
};

export default GestaoVendedor;
