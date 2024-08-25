import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import '../../styles/gerente/ListarVendaComp.css';

// Importação da imagem do botão de deletar
import deleteIcon from '../../assets/images/delete-icon.png';

const ListarVendas = () => {
    const [vendas, setVendas] = useState([]);
    const [filteredVendas, setFilteredVendas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchVendas = async () => {
            try {
                const response = await api.get('/vendas/listar');
                setVendas(response.data);
                setFilteredVendas(response.data); // Inicialmente, todas as vendas são exibidas
            } catch (err) {
                setError('Erro ao carregar vendas.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchVendas();
    }, []);

    const handleDelete = async (codigo) => {
        const isConfirmed = window.confirm(`Tem certeza de que deseja deletar a venda com código ${codigo}?`);

        if (isConfirmed) {
            try {
                await api.delete(`/vendas/deletar/${codigo}`);
                // Recarrega as vendas após exclusão
                const response = await api.get('/vendas/listar');
                setVendas(response.data);
                setFilteredVendas(response.data);
            } catch (err) {
                console.error('Erro ao deletar venda:', err);
                alert('Não foi possível deletar a venda.');
            }
        }
    };

    // Função para filtrar vendas com base no CPF do funcionário
    const handleSearch = (e) => {
        const searchValue = e.target.value;
        setSearchTerm(searchValue);
        setFilteredVendas(
            vendas.filter(venda =>
                venda.cpf_funcionario.includes(searchValue)
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
                    placeholder="Pesquisar pelo CPF do Funcionário..."
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div className="vendas-list">
                <table className="vendas-table">
                    <thead>
                        <tr>
                            <th>CPF do Cliente</th>
                            <th>CPF do Funcionário</th>
                            <th>Código do Produto</th>
                            <th>Quantidade</th>
                            <th>Data da Venda</th>
                            <th>Valor Total</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVendas.map((venda) => (
                            <tr key={venda.codigo}>
                                <td>{venda.cpf_cliente}</td>
                                <td>{venda.cpf_funcionario}</td>
                                <td>{venda.codigoproduto}</td>
                                <td>{venda.quantidade}</td>
                                <td>{venda.datavenda}</td>
                                <td>R$ {(parseFloat(venda.valortotal)).toFixed(2)}</td>
                                <td>
                                    <button onClick={() => handleDelete(venda.codigo)} className="delete-button">
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

export default ListarVendas;
