// src/components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, allowedRoles, ...rest }) => {
    const cargo = localStorage.getItem('cargo'); // Obtém o cargo do localStorage
    const isAuthenticated = !!cargo; // Verifica se o usuário está autenticado

    // Se não estiver autenticado ou o cargo não estiver na lista de cargos permitidos, redirecione
    if (!isAuthenticated || !allowedRoles.includes(cargo)) {
        return <Navigate to="/" />;
    }

    // Se a verificação passar, renderize o componente
    return element;
};

export default PrivateRoute;
