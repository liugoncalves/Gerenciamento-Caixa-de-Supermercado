import React, { useState } from 'react';
import api from '../../services/api'; // Importação do módulo da API
import AdicionarProduto from '../../components/geral/Venda'; // Corrigir o caminho de importação
import '../../styles/geral/Venda-pag.css';

const RealizarVenda = () => {
    const [cpfCliente, setCpfCliente] = useState('');
    const [carrinho, setCarrinho] = useState([]);

    const adicionarAoCarrinho = (item) => {
        setCarrinho(prevCarrinho => [...prevCarrinho, item]);
    };

    const handleFinalizarCompra = async () => {
        if (!cpfCliente || carrinho.length === 0) {
            alert('Preencha o CPF do cliente e adicione itens ao carrinho.');
            return;
        }

        const cpfFuncionario = 'CPF_DO_FUNCIONARIO'; // Substitua pelo CPF do funcionário atual

        try {
            // Enviar a requisição para cada item do carrinho
            const promises = carrinho.map(item => {
                const venda = {
                    cpf_cliente: cpfCliente,
                    cpf_funcionario: cpfFuncionario,
                    codigo_produto: item.codigo,
                    quantidade: item.quantidade
                };
                return api.post('/vendas/cadastrar', venda);
            });

            // Esperar que todas as requisições sejam concluídas
            await Promise.all(promises);

            alert('Venda finalizada com sucesso!');
            setCarrinho([]); // Limpa o carrinho após a compra
            setCpfCliente(''); // Limpa o campo do CPF do cliente
        } catch (err) {
            console.error('Erro ao finalizar a venda:', err.response ? err.response.data : err.message);
            alert('Não foi possível finalizar a venda.');
        }
    };

    const handleLimparCarrinho = () => {
        setCarrinho([]); // Limpa o carrinho
    };

    return (
        <div className="realizar-compra-container">
            <header className="header">
                <h1>Realizar Venda</h1>
            </header>
            <div className="compra-form">
                <div className="input-group">
                    <label>CPF do Cliente:</label>
                    <input 
                        type="text" 
                        value={cpfCliente}
                        onChange={(e) => setCpfCliente(e.target.value)}
                        placeholder="888.888.888-88"
                    />
                </div>
                <AdicionarProduto adicionarAoCarrinho={adicionarAoCarrinho} />
            </div>

            <div className="carrinho">
                <h2>Carrinho</h2>
                <table className="carrinho-table">
                    <thead>
                        <tr>
                            <th>Nome do Produto</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carrinho.map((item, index) => (
                            <tr key={index}>
                                <td>{item.nome}</td>
                                <td>{item.quantidade}</td>
                                <td>R$ {(item.valor * item.quantidade).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="total">
                    Total: R${carrinho.reduce((acc, item) => acc + item.valor * item.quantidade, 0).toFixed(2)}
                </div>
                <div className="buttons">
                    <button onClick={handleFinalizarCompra} className="finalizar-button">
                        Finalizar Venda
                    </button>
                    <button onClick={handleLimparCarrinho} className="limpar-button">
                        Limpar Carrinho
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RealizarVenda;