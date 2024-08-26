import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/geral/EditarClientesComp.css'; // Certifique-se de criar o CSS correspondente

const EditarCliente = () => {
    const { cpf } = useParams(); // Obtém o CPF da URL
    const [cliente, setCliente] = useState({
        nome: '',
        cpf: '',
        telefone: '',
        email: ''
    });
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/clientes/consultar/${cpf}`)
            .then(response => {
                setCliente(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao carregar os dados do cliente', error);
                setLoading(false);
            });
    }, [cpf]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        api.put(`/clientes/alterar/${cpf}`, cliente)
            .then(() => {
                setSuccessMessage('Cliente atualizado com sucesso!');
                setErrorMessage(''); // Limpar mensagens de erro
                setTimeout(() => {
                    navigate('/gerenciar-clientes'); // Redireciona após a atualização
                }, 1500); // Atraso de 1,5 segundos para exibir a mensagem de sucesso
            })
            .catch(error => {
                console.error('Erro ao atualizar o cliente', error);
                setErrorMessage('Erro ao atualizar o cliente. Tente novamente.');
                setSuccessMessage('');
            });
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="editar-cliente-container">
            <header className="header">
                <h1>Editar dados de {cliente.nome}</h1>
            </header>
            <main className="editar-main">
                <form onSubmit={handleSubmit}>
                    <label>
                        Nome:
                        <input
                            type="text"
                            name="nome"
                            value={cliente.nome}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        CPF:
                        <input
                            type="text"
                            name="cpf"
                            value={cliente.cpf}
                            onChange={handleChange}
                            readOnly // CPF não pode ser alterado
                        />
                    </label>
                    <label>
                        Telefone:
                        <input
                            type="text"
                            name="telefone"
                            value={cliente.telefone}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={cliente.email}
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

export default EditarCliente;
