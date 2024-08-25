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
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/funcionarios/listar').then((response) => {
            setFuncionarios(response.data);
        });
    }, []);

    const handleEdit = (id) => {
        navigate(`/editar-funcionario/${id}`);
    };

    const handleDelete = (cpf) => {
        const isConfirmed = window.confirm(`Tem certeza de que deseja deletar o funcionário com CPF ${cpf}?`);

        if (isConfirmed) {
            api.delete(`/funcionarios/deletar/${cpf}`).then(() => {
                setFuncionarios(funcionarios.filter(func => func.cpf !== cpf));
            });
        }
    };

    const handleAdd = () => {
        navigate('/adicionar-funcionario');
    };

    // Função para filtrar funcionários com base no termo de pesquisa
    const filteredFuncionarios = funcionarios.filter(funcionario =>
        funcionario.cpf.includes(searchTerm) || // Filtra pelo CPF
        funcionario.email.toLowerCase().includes(searchTerm.toLowerCase()) // Filtra pelo Email
    );

    return (
        <div className="gerenciar-funcionarios-container">
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
                                <button onClick={() => handleEdit(funcionario.id)} className="edit-button">
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
