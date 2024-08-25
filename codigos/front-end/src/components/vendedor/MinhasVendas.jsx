import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import '../../styles/vendedor/MinhasVendasComp.css';

// Importação da imagem do botão de deletar
import deleteIcon from '../../assets/images/delete-icon.png';

const MinhasVendas = () => {
    const [vendas, setVendas] = useState([]);
    const [filteredVendas, setFilteredVendas] = useState([]);
    const [funcionarios, setFuncionarios] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchVendas = async () => {
            try {
                const response = await api.get('/vendas/listar');
                setVendas(response.data);
                setFilteredVendas(response.data); // Inicialmente, todas as vendas são exibidas

                // Obter CPFs únicos dos funcionários
                const cpfsFuncionarios = [...new Set(response.data.map(venda => venda.cpf_funcionario))];
                const funcionariosData = {};

                for (const cpf of cpfsFuncionarios) {
                    try {
                        const response = await api.get(`/funcionarios/consultar/${cpf}`);
                        funcionariosData[cpf] = response.data.nome; // Supondo que o retorno tem a propriedade "nome"
                    } catch (err) {
                        console.error(`Erro ao obter dados do funcionário com CPF ${cpf}:`, err);
                    }
                }

                setFuncionarios(funcionariosData);

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
        const isConfirmed = window.confirm(`Tem certeza de que deseja deletar da venda com codigo ${codigo}?`);

        if (isConfirmed) {
            api.delete(`/vendas/deletar/${codigo}`).then(() => {
                setCompras(Compras.filter(compra => compra.codigo !== codigo));
            });
        }
    };

    // Função para filtrar vendas com base no CPF do funcionário
    const handleSearch = (e) => {
        const searchValue = e.target.value;
        setSearchTerm(searchValue);
        setFilteredVendas(
            vendas.filter(venda =>
                funcionarios[venda.cpf_funcionario]?.includes(searchValue)
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
                    placeholder="Pesquisar pelo Nome do Funcionário..."
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div className="vendas-list">
                <table className="vendas-table">
                    <thead>
                        <tr>
                            <th>Nome do Funcionário</th>
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
                                <td>{funcionarios[venda.cpf_funcionario] || 'Desconhecido'}</td>
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

export default MinhasVendas;
