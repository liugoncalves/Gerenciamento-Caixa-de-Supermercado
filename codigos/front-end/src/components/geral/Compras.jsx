import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import '../../styles/gerente/ListarVendaComp.css';
import { useNavigate } from 'react-router-dom';

// Importação dos ícones
import deleteIcon from '../../assets/images/delete-icon.png';
import editIcon from '../../assets/images/edit-icon.png'; // Novo ícone de editar

const ListarCompras = () => {
    const [vendas, setVendas] = useState([]);
    const [filteredVendas, setFilteredVendas] = useState([]);
    const [clientes, setClientes] = useState({});
    const [produtos, setProdutos] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVendas = async () => {
            try {
                const response = await api.get('/vendas/listar');
                const vendasData = response.data;
                setVendas(vendasData);
                setFilteredVendas(vendasData); // Inicialmente, todas as vendas são exibidas

                // Obter CPFs únicos dos clientes
                const cpfsClientes = [...new Set(vendasData.map(venda => venda.cpf_cliente))];
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
                const codigosProdutos = [...new Set(vendasData.map(venda => venda.codigoproduto))];
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
                setError('Erro ao carregar vendas.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchVendas();
    }, []);

    const handleDelete = (codigo) => {
        const isConfirmed = window.confirm(`Tem certeza de que deseja deletar a venda com código ${codigo}?`);

        if (isConfirmed) {
            api.delete(`/vendas/deletar/${codigo}`).then(() => {
                setVendas(vendas.filter(venda => venda.codigo !== codigo));
            });
        }
    };

    const handleEdit = (codigo) => {
        navigate(`/editar-compra/${codigo}`);
    };

    // Função para filtrar vendas com base no nome do cliente
    const handleSearch = (e) => {
        const searchValue = e.target.value;
        setSearchTerm(searchValue);
        setFilteredVendas(
            vendas.filter(venda =>
                clientes[venda.cpf_cliente]?.toLowerCase().includes(searchValue.toLowerCase())
            )
        );
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="listar-vendas-container">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Pesquisar pelo Nome do Cliente..."
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div className="vendas-list">
                <table className="vendas-table">
                    <thead>
                        <tr>
                            <th>Nome do Cliente</th>
                            <th>Nome do Produto</th>
                            <th>Quantidade</th>
                            <th>Data da Venda</th>
                            <th>Valor Total</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVendas.map((venda) => (
                            <tr key={venda.codigo}>
                                <td>{clientes[venda.cpf_cliente] || 'Desconhecido'}</td>
                                <td>{produtos[venda.codigoproduto] || 'Desconhecido'}</td> {/* Nome do produto */}
                                <td>{venda.quantidade}</td>
                                <td>{venda.datavenda}</td>
                                <td>R$ {(parseFloat(venda.valortotal)).toFixed(2)}</td>
                                <td>
                                    <button onClick={() => handleDelete(venda.codigo)} className="action-button">
                                        <img src={deleteIcon} alt="Deletar" />
                                    </button>
                                    <button onClick={() => handleEdit(venda.codigo)} className="action-button">
                                        <img src={editIcon} alt="Editar" />
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
