import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api'; 
import '../../styles/gerente/EditarFuncionarioComp.css';

const EditarFuncionario = () => {
    const { cpf } = useParams(); // Obtém o CPF da URL
    const [funcionario, setFuncionario] = useState({
        cpf: '',
        nome: '', // Adiciona o nome ao estado
        salario: '',
        email: '',
        cargo: ''
    });
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/funcionarios/consultar/${cpf}`)
            .then(response => {
                setFuncionario(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao carregar os dados do funcionário', error);
                setLoading(false);
            });
    }, [cpf]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFuncionario(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar se o salário é um valor positivo
        const salario = parseFloat(funcionario.salario);
        if (isNaN(salario) || salario <= 0) {
            setErrorMessage('O salário deve ser um valor positivo.');
            return;
        }

        api.put(`/funcionarios/alterar/${cpf}`, funcionario)
            .then(() => {
                setSuccessMessage('Funcionário atualizado com sucesso!');
                setErrorMessage(''); // Limpar mensagens de erro
                setTimeout(() => {
                    navigate('/gerenciar-funcionarios'); // Redireciona após a atualização
                }, 1500); // Atraso de 1,5 segundos para exibir a mensagem de sucesso
            })
            .catch(error => {
                console.error('Erro ao atualizar o funcionário', error);
                setErrorMessage('Erro ao atualizar o funcionário. Tente novamente.');
                setSuccessMessage('');
            });
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="editar-funcionario-container">
            <header className="header">
                <h1>Editar dados de {funcionario.nome}</h1>
            </header>
            <main className="editar-main">
                <form onSubmit={handleSubmit}>
                    <label>
                        CPF:
                        <input
                            type="text"
                            name="cpf"
                            value={funcionario.cpf}
                            onChange={handleChange}
                            readOnly // CPF não pode ser alterado
                        />
                    </label>
                    <label>
                        Nome:
                        <input
                            type="text"
                            name="nome"
                            value={funcionario.nome}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Salário:
                        <input
                            type="text"
                            name="salario"
                            value={funcionario.salario}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={funcionario.email}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Cargo:
                        <input
                            type="text"
                            name="cargo"
                            value={funcionario.cargo}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Salvar</button>
                </form>
                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </main>
        </div>
    );
};

export default EditarFuncionario;
