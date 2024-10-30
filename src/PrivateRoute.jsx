import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.perfil?.id_perfil)) {
    // Redirigir al login si el usuario no tiene el rol permitido
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
