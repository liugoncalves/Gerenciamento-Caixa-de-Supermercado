import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/geral/login';
import GerenteGestao from './pages/gerente/gerente-gestao';
import PrivateRoute from './components/geral/PrivatesRoutes';
import TelaInicialGerente from './pages/gerente/TelaInicialGerente';



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/TelaInicialGerente" element={ <PrivateRoute element={<TelaInicialGerente />} allowedRoles={['gerente']}/>}/>
                <Route path="/gerente-gestao" element={ <PrivateRoute element={<GerenteGestao />} allowedRoles={['gerente']}/>}/>
            
            </Routes>
        </Router>
    );
}


export default App;

