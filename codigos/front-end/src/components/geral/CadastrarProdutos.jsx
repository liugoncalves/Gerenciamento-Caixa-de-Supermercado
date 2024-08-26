import React, { useState } from 'react';
import api from '../../services/api';
import '../../styles/geral/CadastrarProdutoComp.css'; // Ajuste o caminho do CSS conforme necessário
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirecionamento

const CadastroProdutoComp = () => {
    const [produto, setProduto] = useState({
        codigo: '',
        nome: '',
        valor: '',
        quantidade: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [valorError, setValorError] = useState(''); // Para lidar com erros de valor
    const navigate = useNavigate(); // Hook para redirecionamento

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduto(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar se o valor é um número positivo
        const valor = parseFloat(produto.valor);
        if (isNaN(valor) || valor <= 0) {
            setValorError('O valor deve ser um número positivo.');
            return;
        }

        // Criar um novo objeto com os dados do produto
        const produtoData = {
            ...produto
        };

        try {
            await api.post('/produtos/cadastrar', produtoData);
            setSuccessMessage('Produto cadastrado com sucesso!');
            setErrorMessage('');
            setValorError(''); // Limpar erro de valor

            // Redireciona após atraso de 1,5 segundos
            setTimeout(() => {
                navigate('/gerenciar-produtos');
            }, 1500);
            
            // Limpar formulário após sucesso
            setProduto({
                codigo: '',
                nome: '',
                valor: '',
                quantidade: ''
            });
        } catch (error) {
            console.error('Erro ao cadastrar o produto', error);
            setErrorMessage('Erro ao cadastrar o produto. Tente novamente.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label>
                    Código:
                    <input
                        type="text"
                        name="codigo"
                        value={produto.codigo}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Nome:
                    <input
                        type="text"
                        name="nome"
                        value={produto.nome}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Valor:
                    <input
                        type="text"
                        name="valor"
                        value={produto.valor}
                        onChange={handleChange}
                        required
                    />
                </label>
                {valorError && <div className="error-message">{valorError}</div>} {/* Mostrar erro de valor */}
                <label>
                    Quantidade:
                    <input
                        type="text"
                        name="quantidade"
                        value={produto.quantidade}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Cadastrar</button>
                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>
        </div>
    );
};

export default CadastroProdutoComp;
