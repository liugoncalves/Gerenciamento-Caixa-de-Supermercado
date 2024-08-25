import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import '../../styles/geral/VendasComp.css';

const AdicionarProduto = ({ adicionarAoCarrinho }) => {
    const [produtoSelecionado, setProdutoSelecionado] = useState('');
    const [quantidade, setQuantidade] = useState(1);
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        // Buscar produtos da API
        api.get('/produtos/listar')
            .then((response) => {
                console.log('Produtos recebidos:', response.data); // Verifique os dados recebidos
                setProdutos(response.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar produtos:', error);
            });
    }, []);

    const handleAdicionar = () => {
        console.log('Produto Selecionado:', produtoSelecionado);
        console.log('Produtos:', produtos);
    
        const produto = produtos.find(p => String(p.codigo) === String(produtoSelecionado));
        
        if (produto) {
            adicionarAoCarrinho({
                codigo: produto.codigo,
                nome: produto.nome,
                quantidade: parseInt(quantidade, 10),
                valor: parseFloat(produto.valor)
            });
            setProdutoSelecionado('');
            setQuantidade(1);
        } else {
            alert('Produto não encontrado.');
        }
    };

    return (
        <div className="adicionar-produto-container">
            <div className="input-group">
                <label>Produto:</label>
                <select 
                    value={produtoSelecionado} 
                    onChange={(e) => setProdutoSelecionado(e.target.value)}
                >
                    <option value="" disabled>Selecione um produto</option>
                    {produtos.map((produto) => (
                        <option key={produto.codigo} value={produto.codigo}>
                            {produto.nome}
                        </option>
                    ))}
                </select>
            </div>
            <div className="input-group">
                <label>Quantidade:</label>
                <input 
                    type="number" 
                    value={quantidade}
                    onChange={(e) => setQuantidade(parseInt(e.target.value, 10) || 1)} // Corrigido para garantir que seja um número
                    min="1"
                    placeholder="Ex: 5"
                />
            </div>
            <button onClick={handleAdicionar} className="add-button">
                Adicionar ao Carrinho
            </button>
        </div>
    );
};

export default AdicionarProduto;
