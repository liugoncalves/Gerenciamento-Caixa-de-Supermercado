// src/pages/PaginaEditarProduto.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/geral/EditarProdutoComp.css'; // Para os estilos da página

const EditarProduto = () => {
    const { codigo } = useParams(); // Obtém o código do produto da URL
    const [produto, setProduto] = useState({
        codigo: '',
        nome: '',
        valor: '',
        quantidade: ''
    });
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/produtos/consultar/${codigo}`)
            .then(response => {
                setProduto(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao carregar os dados do produto', error);
                setLoading(false);
            });
    }, [codigo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduto(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        api.put(`/produtos/alterar/${codigo}`, produto)
            .then(() => {
                setSuccessMessage('Produto atualizado com sucesso!');
                setErrorMessage(''); // Limpar mensagens de erro
                setTimeout(() => {
                    navigate('/gerenciar-produtos'); // Redireciona após a atualização
                }, 1500); // Atraso de 1,5 segundos para exibir a mensagem de sucesso
            })
            .catch(error => {
                console.error('Erro ao atualizar o produto', error);
                setErrorMessage('Erro ao atualizar o produto. Tente novamente.');
                setSuccessMessage('');
            });
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="pagina-editar-produto-container">
            <header className="header">
                <h1>Editar Produto</h1>
            </header>
            <main className="pagina-main">
                <form onSubmit={handleSubmit}>
                    <label>
                        Código:
                        <input
                            type="text"
                            name="codigo"
                            value={produto.codigo}
                            onChange={handleChange}
                            readOnly // Código não pode ser alterado
                        />
                    </label>
                    <label>
                        Nome:
                        <input
                            type="text"
                            name="nome"
                            value={produto.nome}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Valor:
                        <input
                            type="text"
                            name="valor"
                            value={produto.valor}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Quantidade:
                        <input
                            type="text"
                            name="quantidade"
                            value={produto.quantidade}
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

export default EditarProduto;
