import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/gerente/GestaoGerenteComp.css';

// Supondo que você tenha os ícones nas seguintes pastas:
import funcionarioIcon from '../../assets/images/funcionarios.png';
import clienteIcon from '../../assets/images/clientes.png';
import produtoIcon from '../../assets/images/produtos.png';
import vendasIcon from '../../assets/images/vendas.png';
import comprasIcon from '../../assets/images/compras.png';

const GestaoGerente = () => {
    const navigate = useNavigate();

    const handleButtonClick = (route) => {
        navigate(route);
    };

    return (
        <div className="gestao-container">
            <div className="button-container">
                <button onClick={() => handleButtonClick('/gerenciar-funcionarios')}>
                    <img src={funcionarioIcon} alt="Gerenciar Funcionários" />
                    <span>Gerenciar Funcionários</span>
                </button>
                <button onClick={() => handleButtonClick('/gerenciar-clientes')}>
                    <img src={clienteIcon} alt="Gerenciar Clientes" />
                    <span>Gerenciar Clientes</span>
                </button>
                <button onClick={() => handleButtonClick('/gerenciar-produtos')}>
                    <img src={produtoIcon} alt="Gerenciar Produtos" />
                    <span>Gerenciar Produtos</span>
                </button>
                <button onClick={() => handleButtonClick('/Listar-vendas')}>
                    <img src={vendasIcon} alt="Exibir Vendas" />
                    <span>Exibir Vendas</span>
                </button>
                <button onClick={() => handleButtonClick('/exibir-compras')}>
                    <img src={comprasIcon} alt="Exibir Compras" />
                    <span>Exibir Compras dos Clientes</span>
                </button>
            </div>
        </div>
    );
};

export default GestaoGerente;
