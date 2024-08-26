// src/pages/ListarVendas.jsx

import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import '../../styles/gerente/ListarVendaComp.css';
import { useNavigate } from 'react-router-dom';

// Importação dos ícones
import deleteIcon from '../../assets/images/delete-icon.png';
import editIcon from '../../assets/images/edit-icon.png'; // Novo ícone de editar
import invoiceIcon from '../../assets/images/nota-icon.png'; // Novo ícone de nota fiscal

const ListarVendas = () => {
    const [vendas, setVendas] = useState([]);
    const [filteredVendas, setFilteredVendas] = useState([]);
    const [funcionarios, setFuncionarios] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

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
        const isConfirmed = window.confirm(`Tem certeza de que deseja deletar da venda com código ${codigo}?`);

        if (isConfirmed) {
            api.delete(`/vendas/deletar/${codigo}`).then(() => {
                setVendas(vendas.filter(venda => venda.codigo !== codigo));
            });
        }
    };

    const handleEdit = (codigo) => {
        navigate(`/editar-venda/${codigo}`);
    };

    const handleNota = async (codigo) => {
        try {
            await api.post(`/vendas/gerar-nota-fiscal/${codigo}`);
            setSuccessMessage(`Nota fiscal gerada com sucesso para a venda com código ${codigo}.`);
        } catch (error) {
            console.error('Erro ao gerar nota fiscal:', error);
            setError('Erro ao gerar nota fiscal. Tente novamente.');
        }
    };

    // Função para filtrar vendas com base no CPF do funcionário
    const handleSearch = (e) => {
        const searchValue = e.target.value;
        setSearchTerm(searchValue);
        setFilteredVendas(
            vendas.filter(venda =>
                funcionarios[venda.cpf_funcionario]?.toLowerCase().includes(searchValue.toLowerCase())
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
            {successMessage && <div className="success-message">{successMessage}</div>}
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
                                    <button onClick={() => handleDelete(venda.codigo)} className="action-button">
                                        <img src={deleteIcon} alt="Deletar" />
                                    </button>
                                    <button onClick={() => handleEdit(venda.codigo)} className="action-button">
                                        <img src={editIcon} alt="Editar" />
                                    </button>
                                    <button onClick={() => handleNota(venda.codigo)} className="action-button">
                                        <img src={invoiceIcon} alt="Nota Fiscal" />
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
