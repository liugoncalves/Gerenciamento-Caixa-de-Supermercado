import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/geral/EditarVendaComp.css';

const EditarVenda = () => {
    const { codigo } = useParams();
    const navigate = useNavigate();
    const [venda, setVenda] = useState({
        cpf_cliente: '',
        cpf_funcionario: '',
        codigo_produto: '',
        quantidade: ''
    });
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        api.get(`/vendas/consultar/${codigo}`)
            .then(response => {
                setVenda({
                    cpf_cliente: response.data.cpf_cliente || '',
                    cpf_funcionario: response.data.cpf_funcionario || '',
                    codigo_produto: response.data.codigo_produto || '',
                    quantidade: response.data.quantidade || ''
                });
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao carregar os dados da venda', error);
                setLoading(false);
            });
    }, [codigo]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verificação de campos obrigatórios
        if (!venda.cpf_cliente || !venda.cpf_funcionario || !venda.codigo_produto || !venda.quantidade) {
            setErrorMessage('Todos os campos são obrigatórios.');
            return;
        }

        // Converte codigo_produto e quantidade para números antes de enviar
        const vendaAtualizada = {
            ...venda,
            codigo_produto: parseInt(venda.codigo_produto, 10),
            quantidade: parseInt(venda.quantidade, 10) // Se a quantidade também for um número
        };

        // Exibindo os dados que estão sendo enviados para a API
        console.log("Dados enviados:", vendaAtualizada);

        api.put(`/vendas/alterar/${codigo}`, vendaAtualizada)
            .then(() => {
                setSuccessMessage('Venda atualizada com sucesso!');
                setErrorMessage(''); // Limpar mensagens de erro
                setTimeout(() => {
                    navigate('/Listar-vendas'); // Redireciona após a atualização
                }, 1500); // Atraso de 1,5 segundos para exibir a mensagem de sucesso
            })
            .catch(error => {
                console.error('Erro ao atualizar a venda', error);
                setErrorMessage('Erro ao atualizar a venda. Tente novamente.');
                setSuccessMessage('');
            });
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="pagina-editar-venda-container">
            <header className="header">
                <h1>Editar Venda</h1>
            </header>
            <main className="pagina-main">
                <form onSubmit={handleSubmit}>
                    <label>
                        CPF do Cliente:
                        <input
                            type="text"
                            value={venda.cpf_cliente}
                            readOnly
                        />
                    </label>
                    <label>
                        CPF do Funcionário:
                        <input
                            type="text" // Alterado para texto
                            value={venda.cpf_funcionario}
                            onChange={(e) => setVenda({ ...venda, cpf_funcionario: e.target.value })}
                        />
                    </label>
                    <label>
                        Código do Produto:
                        <input
                            type="number" // Tipo de input atualizado para número
                            value={venda.codigo_produto}
                            onChange={(e) => setVenda({ ...venda, codigo_produto: e.target.value })}
                        />
                    </label>
                    <label>
                        Quantidade:
                        <input
                            type="number" // Tipo de input atualizado para número
                            value={venda.quantidade}
                            onChange={(e) => setVenda({ ...venda, quantidade: e.target.value })}
                        />
                    </label>
                    <button type="submit">Atualizar Venda</button>
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </form>
            </main>
        </div>
    );
};

export default EditarVenda;
