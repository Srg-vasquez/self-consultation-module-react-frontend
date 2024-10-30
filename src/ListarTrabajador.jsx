import { Link, useNavigate } from 'react-router-dom';
import './css/ListarTrabajador.css';
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig/';

const ListarTrabajador = () => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [idSexo, setIdSexo] = useState('');
  const [idCargo, setIdCargo] = useState('');
  const [idArea, setIdArea] = useState('');
  const navigate = useNavigate();

  const sexos = [
    { id: 1, descripcion: 'Masculino' },
    { id: 2, descripcion: 'Femenino' },
    { id: 3, descripcion: 'Otro' }
  ];

  const cargos = [
    { id: 1, descripcion: 'Administrativo' },
    { id: 2, descripcion: 'Jefe de recursos humanos' },
    { id: 3, descripcion: 'Analista programador' },
    { id: 4, descripcion: 'Soporte TI' },
    { id: 5, descripcion: 'Encargado de Ventas' },
    { id: 6, descripcion: 'Encargado de Logística' }
  ];

  const areas = [
    { id: 1, descripcion: 'Recursos Humanos' },
    { id: 2, descripcion: 'Soporte TI' },
    { id: 3, descripcion: 'Finanzas' },
    { id: 4, descripcion: 'Jurídica' },
    { id: 5, descripcion: 'Ventas' },
    { id: 6, descripcion: 'Logística' }
  ];

  useEffect(() => {
    fetchTrabajadores();
  }, [idSexo, idCargo, idArea]);

  const fetchTrabajadores = () => {
    let queryParams = '';
    if (idSexo) queryParams += `id_sexo=${idSexo}&`;
    if (idCargo) queryParams += `id_cargo=${idCargo}&`;
    if (idArea) queryParams += `id_area=${idArea}&`;

    axios.get(`/usuarios?${queryParams}`)
      .then(response => {
        console.log("Datos recibidos del API:", response.data);
        setTrabajadores(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los trabajadores!", error);
      });
  };

  const handleExport = async () => {
    let queryParams = '';
    if (idSexo) queryParams += `id_sexo=${idSexo}&`;
    if (idCargo) queryParams += `id_cargo=${idCargo}&`;
    if (idArea) queryParams += `id_area=${idArea}&`;

    try {
      const response = await axios.get(`/reports/pdf?${queryParams}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'reporte_trabajadores.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Hubo un error al exportar el PDF!", error);
    }
  };

  const formatFechaIngreso = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const capitalize = (text) => {
    if (!text) return 'N/A';
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-light" style={{ backgroundColor: "#4d8fac" }} data-mdb-theme="light">
        <img src="/Images/yuri_logo_sin_fondo.png" alt="Icon" className="Icon" />
        <div className="logOut">
          <a href="/users">
            <img src="/Icons/house-.svg" alt="Home" className="HomeIcon" />
          </a>
          <img
            src="/Icons/exit-svgrepo-com.svg"
            alt="Log out"
            className="Log-Out"
            onClick={handleLogout}
          />
        </div>
      </nav>
      <h1 className="Titulo">Lista de Trabajadores</h1>
      <br />
      <div className="BotonesFiltrar">
        <div className="dropdown">
          <select
            className="btn btn-primary btn-lg btn-dropdown"
            id="sexoDropdown"
            onChange={(e) => setIdSexo(e.target.value)}
            value={idSexo}
            style={{ marginRight: 20 }}
          >
            <option value="">Sexo</option>
            {sexos.map(sexo => (
              <option key={sexo.id} value={sexo.id}>{sexo.descripcion}</option>
            ))}
          </select>

          <select
            className="btn btn-primary btn-lg btn-dropdown"
            id="cargoDropdown"
            onChange={(e) => setIdCargo(e.target.value)}
            value={idCargo}
            style={{ marginRight: 20 }}
          >
            <option value="">Cargo</option>
            {cargos.map(cargo => (
              <option key={cargo.id} value={cargo.id}>{cargo.descripcion}</option>
            ))}
          </select>

          <select
            className="btn btn-primary btn-lg btn-dropdown"
            id="areaDropdown"
            onChange={(e) => setIdArea(e.target.value)}
            value={idArea}
            style={{ marginRight: 20 }}
          >
            <option value="">Departamento</option>
            {areas.map(area => (
              <option key={area.id} value={area.id}>{area.descripcion}</option>
            ))}
          </select>
          <div className="BotonesFuncionarios">
            <button type="button" className="btn btn-primary btn-lg custom-btn export" onClick={handleExport}>
              Exportar PDF
            </button>
          </div>
        </div>
      </div>
      <div className="content-box tablaGestioanr" >
        <div className="Tabla">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Nombres</th>
                <th scope="col">Apellidos</th>
                <th scope="col">Rut</th>
                <th scope="col">Sexo</th>
                <th scope="col">Dirección</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Cargo</th>
                <th scope="col">Departamento</th>
                <th scope="col">Fecha de ingreso</th>
              </tr>
            </thead>
            <tbody>
              {trabajadores.map(trabajador => (
                <tr key={trabajador.user_id}>
                  <td>{capitalize(trabajador.trabajador.nombres)}</td>
                  <td>{capitalize(`${trabajador.trabajador.apellido_paterno} ${trabajador.trabajador.apellido_materno}`)}</td>
                  <td>{trabajador.trabajador.rut}-{trabajador.trabajador.dv}</td>
                  <td>{trabajador.trabajador.sexo.descripcion}</td>
                  <td>{capitalize(trabajador.trabajador.direccion)}</td>
                  <td>{trabajador.trabajador.telefono}</td>
                  <td>{trabajador.trabajador.datosLaborales?.cargo.descripcion}</td>
                  <td>{trabajador.trabajador.datosLaborales?.area.descripcion}</td>
                  <td>{trabajador.trabajador.datosLaborales?.fecha_ingreso ? formatFechaIngreso(trabajador.trabajador.datosLaborales.fecha_ingreso) : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ListarTrabajador;
