import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/geral/login';
import GerenteGestao from './pages/gerente/gerente-gestao';
import PrivateRoute from './components/geral/PrivatesRoutes';
import TelaInicialGerente from './pages/gerente/TelaInicialGerente';
import GerenciarFuncionarios from './pages/gerente/gerenciar-funcionarios';
import EditarFuncionario from './pages/gerente/editar-funcionario';
import CadastrarFuncionario from './pages/gerente/cadastrar-funcionario';
import RealizarVenda from './pages/geral/realizar-venda';
import ListarVenda from './pages/gerente/Listar-vendas';
import ListarCompras from './pages/geral/listar-compras';
import TelaInicialVendedor from './pages/vendedor/TelaInicialVendedor';
import VendedorGestao from './pages/vendedor/vendedor-gestao';
import MinhasVendas from './pages/vendedor/minhas-vendas';
import GerenciarClientes from './pages/geral/gerenciar-clientes';
import CadastrarClientes from './pages/geral/cadastrar-cliente';
import EditarClientes from './pages/geral/editar-clientes';
import GerenciarProdutos from './pages/geral/gerenciar-produtos';
import CadastrarProdutos from './pages/geral/cadastrar-produto';
import EditarProdutos from './pages/geral/editar-produto';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/editar-funcionario/:cpf" element={ <PrivateRoute element={<EditarFuncionario />} allowedRoles={['gerente']}/>}/>
                <Route path="/TelaInicialGerente" element={ <PrivateRoute element={<TelaInicialGerente />} allowedRoles={['gerente']}/>}/>
                <Route path="/gerente-gestao" element={ <PrivateRoute element={<GerenteGestao />} allowedRoles={['gerente']}/>}/>
                <Route path="/gerenciar-funcionarios" element={ <PrivateRoute element={<GerenciarFuncionarios />} allowedRoles={['gerente']}/>}/>
                <Route path="/cadastrar-funcionario" element={ <PrivateRoute element={<CadastrarFuncionario />} allowedRoles={['gerente']}/>}/>
                <Route path="/realizar-venda" element={ <PrivateRoute element={<RealizarVenda />} allowedRoles={['gerente','vendedor']}/>}/>
                <Route path="/Listar-vendas" element={ <PrivateRoute element={<ListarVenda />} allowedRoles={['gerente']}/>}/>
                <Route path="/listar-compras" element={ <PrivateRoute element={<ListarCompras />} allowedRoles={['gerente','vendedor']}/>}/>
                <Route path="/TelaInicialVendedor" element={ <PrivateRoute element={<TelaInicialVendedor />} allowedRoles={['vendedor']}/>}/>
                <Route path="/vendedor-gestao" element={ <PrivateRoute element={<VendedorGestao />} allowedRoles={['vendedor']}/>}/>
                <Route path="/minhas-vendas" element={ <PrivateRoute element={<MinhasVendas />} allowedRoles={['vendedor']}/>}/>
                <Route path="/gerenciar-clientes" element={ <PrivateRoute element={<GerenciarClientes />} allowedRoles={['vendedor','gerente']}/>}/>
                <Route path="/cadastrar-cliente" element={ <PrivateRoute element={<CadastrarClientes />} allowedRoles={['vendedor','gerente']}/>}/>
                <Route path="/editar-clientes/:cpf" element={ <PrivateRoute element={<EditarClientes />} allowedRoles={['vendedor','gerente']}/>}/>
                <Route path="/gerenciar-produtos/" element={ <PrivateRoute element={<GerenciarProdutos />} allowedRoles={['vendedor','gerente']}/>}/>
                <Route path="/cadastrar-produto/" element={ <PrivateRoute element={<CadastrarProdutos />} allowedRoles={['vendedor','gerente']}/>}/>
                <Route path="/editar-produto/:codigo" element={ <PrivateRoute element={<EditarProdutos />} allowedRoles={['vendedor','gerente']}/>}/>
            </Routes>
        </Router>
    );
}


export default App;

