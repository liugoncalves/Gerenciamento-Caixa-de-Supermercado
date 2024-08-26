import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'; 
import '../../styles/geral/GerenciarProdutosComp.css'; // Para os estilos da página

// Importação das imagens
import editIcon from '../../assets/images/edit-icon.png';
import deleteIcon from '../../assets/images/delete-icon.png';

const GerenciarProdutos = () => {
    const [produtos, setProdutos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Estado para a mensagem de erro
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/produtos/listar').then((response) => {
            setProdutos(response.data);
        });
    }, []);

    const handleEdit = (codigo) => {
        navigate(`/editar-produto/${codigo}`);
    };

    const handleDelete = (codigo) => {
        const isConfirmed = window.confirm(`Tem certeza de que deseja deletar o produto com código ${codigo}?`);

        if (isConfirmed) {
            api.delete(`/produtos/deletar/${codigo}`)
                .then(() => {
                    setProdutos(produtos.filter(prod => prod.codigo !== codigo));
                    setErrorMessage(''); // Limpa a mensagem de erro se a exclusão for bem-sucedida
                })
                .catch((error) => {
                    // Verifica se a resposta contém uma mensagem de erro e a exibe
                    if (error.response && error.response.data) {
                        setErrorMessage(error.response.data.message || 'Erro ao excluir o produto. Pode ter uma venda assiociada a ele');
                    } else {
                        setErrorMessage('Erro ao excluir o produto. Pode ter uma venda assiociada a ele');
                    }
                });
        }
    };

    const handleAdd = () => {
        navigate('/cadastrar-produto');
    };

    // Função para filtrar produtos com base no termo de pesquisa
    const filteredProdutos = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) // Filtra pelo Nome
    );

    return (
        <div className="gerenciar-produtos-container">
            {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Exibe a mensagem de erro */}
            <div className="search-add-container">
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleAdd} className="add-button">Cadastrar Produto</button>
            </div>
            <table className="produtos-table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Quantidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProdutos.map((produto) => (
                        <tr key={produto.codigo}>
                            <td>{produto.codigo}</td>
                            <td>{produto.nome}</td>
                            <td>{produto.valor}</td>
                            <td>{produto.quantidade}</td>
                            <td>
                                <button onClick={() => handleEdit(produto.codigo)} className="edit-button">
                                    <img src={editIcon} alt="Edit"/>
                                </button>
                                <button onClick={() => handleDelete(produto.codigo)} className="delete-button">
                                    <img src={deleteIcon} alt="Delete"/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GerenciarProdutos;
