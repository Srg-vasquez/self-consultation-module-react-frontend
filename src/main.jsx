import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/index.css';
import BuscarFuncionario from './BuscarFuncionario.jsx';
import GestionarFuncionario from './GestionarFuncionario.jsx';
import InformacionPersonal from './InformacionPersonal.jsx';
import IngresarTrabajador from './IngresarTrabajador.jsx';
import ListarTrabajador from './ListarTrabajador.jsx';
import LogIn from './Log-In.jsx';
import UsersPage from './users.jsx';
import PrivateRoute from './PrivateRoute.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route 
          path="/buscar_funcionario" 
          element={
            <PrivateRoute allowedRoles={[1]}>
              <BuscarFuncionario />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/gestionar_funcionario" 
          element={
            <PrivateRoute allowedRoles={[1]}>
              <GestionarFuncionario />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/informacion_personal" 
          element={
            <PrivateRoute allowedRoles={[1, 2, 3]}>
              <InformacionPersonal />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/ingresar_trabajador" 
          element={
            <PrivateRoute allowedRoles={[1]}>
              <IngresarTrabajador />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/listar_trabajador" 
          element={
            <PrivateRoute allowedRoles={[1, 2]}>
              <ListarTrabajador />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/users" 
          element={
            <PrivateRoute allowedRoles={[1, 2, 3]}>
              <UsersPage />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
