import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import '../../styles/geral/ComprasComp.css';

// Importação da imagem do botão de deletar
import deleteIcon from '../../assets/images/delete-icon.png';

const ListarCompras = () => {
    const [compras, setCompras] = useState([]);
    const [filteredCompras, setFilteredCompras] = useState([]);
    const [clientes, setClientes] = useState({});
    const [produtos, setProdutos] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCompras = async () => {
            try {
                const response = await api.get('/vendas/listar');
                setCompras(response.data);
                setFilteredCompras(response.data); // Inicialmente, todas as compras são exibidas

                // Obter CPFs únicos dos clientes
                const cpfsClientes = [...new Set(response.data.map(compra => compra.cpf_cliente))];
                const clientesData = {};

                for (const cpf of cpfsClientes) {
                    try {
                        const response = await api.get(`/clientes/consultar/${cpf}`);
                        clientesData[cpf] = response.data.nome; // Supondo que o retorno tem a propriedade "nome"
                    } catch (err) {
                        console.error(`Erro ao obter dados do cliente com CPF ${cpf}:`, err);
                    }
                }

                setClientes(clientesData);

                // Obter códigos únicos dos produtos
                const codigosProdutos = [...new Set(response.data.map(compra => compra.codigoproduto))];
                const produtosData = {};

                for (const codigo of codigosProdutos) {
                    try {
                        const response = await api.get(`/produtos/consultar/${codigo}`);
                        produtosData[codigo] = response.data.nome; // Supondo que o retorno tem a propriedade "nome"
                    } catch (err) {
                        console.error(`Erro ao obter dados do produto com código ${codigo}:`, err);
                    }
                }

                setProdutos(produtosData);

            } catch (err) {
                setError('Erro ao carregar compras.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCompras();
    }, []);

    const handleDelete = (codigo) => {
        const isConfirmed = window.confirm(`Tem certeza de que deseja deletar a compra com codigo ${codigo}?`);

        if (isConfirmed) {
            api.delete(`/vendas/deletar/${codigo}`).then(() => {
                setCompras(Compras.filter(compra => compra.codigo !== codigo));
            });
        }
    };


    // Função para filtrar compras com base no nome do cliente
    const handleSearch = (e) => {
        const searchValue = e.target.value;
        setSearchTerm(searchValue);
        setFilteredCompras(
            compras.filter(compra =>
                clientes[compra.cpf_cliente]?.includes(searchValue)
            )
        );
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="listar-compras-container">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Pesquisar pelo Nome do Cliente..."
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div className="compras-list">
                <table className="compras-table">
                    <thead>
                        <tr>
                            <th>Nome do Cliente</th>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Data da Compra</th>
                            <th>Valor Total</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCompras.map((compra) => (
                            <tr key={compra.codigo}>
                                <td>{clientes[compra.cpf_cliente] || 'Desconhecido'}</td>
                                <td>{produtos[compra.codigoproduto] || 'Desconhecido'}</td>
                                <td>{compra.quantidade}</td>
                                <td>{compra.datavenda}</td>
                                <td>R$ {(parseFloat(compra.valortotal)).toFixed(2)}</td>
                                <td>
                                    <button onClick={() => handleDelete(compra.codigo)} className="delete-button">
                                        <img src={deleteIcon} alt="Delete" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListarCompras;
