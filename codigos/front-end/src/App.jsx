import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import GerenteGestao from './pages/gerente-gestao';
import PrivateRoute from './components/PrivatesRoutes';
import TelaInicialGerente from './pages/TelaInicialGerente';



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

