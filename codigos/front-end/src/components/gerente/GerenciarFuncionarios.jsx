import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'; 
import '../../styles/gerente/GerenciarFuncionariosComp.css';

// Importação das imagens
import editIcon from '../../assets/images/edit-icon.png';
import deleteIcon from '../../assets/images/delete-icon.png';

const GerenciarFuncionarios = () => {
    const [funcionarios, setFuncionarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Estado para a mensagem de erro
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/funcionarios/listar').then((response) => {
            setFuncionarios(response.data);
        });
    }, []);

    const handleEdit = (cpf) => {
        navigate(`/editar-funcionario/${cpf}`);
    };

    const handleDelete = (cpf) => {
        const isConfirmed = window.confirm(`Tem certeza de que deseja deletar o funcionário com CPF ${cpf}?`);

        if (isConfirmed) {
            api.delete(`/funcionarios/deletar/${cpf}`)
                .then(() => {
                    setFuncionarios(funcionarios.filter(func => func.cpf !== cpf));
                    setErrorMessage(''); // Limpa a mensagem de erro se a exclusão for bem-sucedida
                })
                .catch((error) => {
                    // Verifica se a resposta contém uma mensagem de erro e a exibe
                    if (error.response && error.response.data) {
                        setErrorMessage(error.response.data.message || 'Erro ao excluir o funcionário.');
                    } else {
                        setErrorMessage('Erro ao excluir o funcionário.');
                    }
                });
        }
    };

    const handleAdd = () => {
        navigate('/cadastrar-funcionario');
    };

    // Função para filtrar funcionários com base no termo de pesquisa
    const filteredFuncionarios = funcionarios.filter(funcionario =>
        funcionario.cpf.includes(searchTerm) || // Filtra pelo CPF
        funcionario.email.toLowerCase().includes(searchTerm.toLowerCase()) // Filtra pelo Email
    );

    return (
        <div className="gerenciar-funcionarios-container">
            {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Exibe a mensagem de erro */}
            <div className="search-add-container">
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleAdd} className="add-button">Cadastrar Funcionário</button>
            </div>
            <table className="funcionarios-table">
                <thead>
                    <tr>
                        <th>CPF</th>
                        <th>Salário</th>
                        <th>Email</th>
                        <th>Cargo</th>
                        <th>Data de Admissão</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFuncionarios.map((funcionario) => (
                        <tr key={funcionario.cpf}>
                            <td>{funcionario.cpf}</td>
                            <td>{funcionario.salario}</td>
                            <td>{funcionario.email}</td>
                            <td>{funcionario.cargo}</td>
                            <td>{funcionario.dataadmissao}</td>
                            <td>
                                <button onClick={() => handleEdit(funcionario.cpf)} className="edit-button">
                                    <img src={editIcon} alt="Edit"/>
                                </button>
                                <button onClick={() => handleDelete(funcionario.cpf)} className="delete-button">
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

export default GerenciarFuncionarios;
