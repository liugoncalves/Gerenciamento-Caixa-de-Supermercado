import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'; 
import '../../styles/geral/GerenciarClientesComp.css'; // Atualize o caminho conforme necessário

// Importação das imagens
import editIcon from '../../assets/images/edit-icon.png';
import deleteIcon from '../../assets/images/delete-icon.png';

const GerenciarClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Estado para a mensagem de erro
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/clientes/listar').then((response) => {
            setClientes(response.data);
        });
    }, []);

    const handleEdit = (cpf) => {
        navigate(`/editar-cliente/${cpf}`);
    };

    const handleDelete = (cpf) => {
        const isConfirmed = window.confirm(`Tem certeza de que deseja deletar o cliente com CPF ${cpf}?`);

        if (isConfirmed) {
            api.delete(`/clientes/deletar/${cpf}`)
                .then(() => {
                    setClientes(clientes.filter(cliente => cliente.cpf !== cpf));
                    setErrorMessage(''); // Limpa a mensagem de erro se a exclusão for bem-sucedida
                })
                .catch((error) => {
                    // Verifica se a resposta contém uma mensagem de erro e a exibe
                    if (error.response && error.response.data) {
                        setErrorMessage(error.response.data.message || 'Erro ao excluir o cliente. Pode ter vendas associadas a ele');
                    } else {
                        setErrorMessage('Erro ao excluir o cliente.');
                    }
                });
        }
    };

    const handleAdd = () => {
        navigate('/cadastrar-cliente');
    };

    // Função para filtrar clientes com base no termo de pesquisa
    const filteredClientes = clientes.filter(cliente =>
        cliente.cpf.includes(searchTerm) || // Filtra pelo CPF
        cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) || // Filtra pelo Email
        cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) // Filtra pelo Nome
    );

    return (
        <div className="gerenciar-clientes-container">
            <div className="header">
                <div className="search-add-container">
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleAdd} className="add-button">Cadastrar Cliente</button>
                </div>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Exibe a mensagem de erro */}
            <table className="clientes-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClientes.map((cliente) => (
                        <tr key={cliente.cpf}>
                            <td>{cliente.nome}</td>
                            <td>{cliente.cpf}</td>
                            <td>{cliente.telefone}</td>
                            <td>{cliente.email}</td>
                            <td>
                                <button onClick={() => handleEdit(cliente.cpf)} className="edit-button">
                                    <img src={editIcon} alt="Edit"/>
                                </button>
                                <button onClick={() => handleDelete(cliente.cpf)} className="delete-button">
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

export default GerenciarClientes;
