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
             
            </Routes>
        </Router>
    );
}


export default App;

