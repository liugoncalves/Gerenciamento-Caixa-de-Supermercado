import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/geral/EditarCompra-pag.css';

const EditarCompra = () => {
    const { codigo } = useParams();
    const navigate = useNavigate();
    const [compra, setCompra] = useState({
        cpf_fornecedor: '',
        codigo_produto: '',
        quantidade: ''
    });
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        api.get(`/compras/consultar/${codigo}`)
            .then(response => {
                setCompra({
                    cpf_fornecedor: response.data.cpf_fornecedor || '',
                    codigo_produto: response.data.codigo_produto || '',
                    quantidade: response.data.quantidade || ''
                });
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao carregar os dados da compra', error);
                setLoading(false);
            });
    }, [codigo]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!compra.cpf_fornecedor || !compra.codigo_produto || !compra.quantidade) {
            setErrorMessage('Todos os campos são obrigatórios.');
            return;
        }

        const compraAtualizada = {
            ...compra,
            codigo_produto: parseInt(compra.codigo_produto, 10),
            quantidade: parseInt(compra.quantidade, 10)
        };

        api.put(`/compras/alterar/${codigo}`, compraAtualizada)
            .then(() => {
                setSuccessMessage('Compra atualizada com sucesso!');
                setErrorMessage('');
                setTimeout(() => {
                    navigate('/listar-compras');
                }, 1500);
            })
            .catch(error => {
                console.error('Erro ao atualizar a compra', error);
                setErrorMessage('Erro ao atualizar a compra. Tente novamente.');
                setSuccessMessage('');
            });
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="pagina-editar-compra-container">
            <header className="header">
                <h1>Editar Compra</h1>
            </header>
            <main className="pagina-main">
                <form onSubmit={handleSubmit}>
                    <label>
                        CPF do Fornecedor:
                        <input
                            type="text"
                            value={compra.cpf_fornecedor}
                            readOnly
                        />
                    </label>
                    <label>
                        Código do Produto:
                        <input
                            type="number"
                            value={compra.codigo_produto}
                            onChange={(e) => setCompra({ ...compra, codigo_produto: e.target.value })}
                        />
                    </label>
                    <label>
                        Quantidade:
                        <input
                            type="number"
                            value={compra.quantidade}
                            onChange={(e) => setCompra({ ...compra, quantidade: e.target.value })}
                        />
                    </label>
                    <button type="submit">Atualizar Compra</button>
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </form>
            </main>
        </div>
    );
};

export default EditarCompra;
