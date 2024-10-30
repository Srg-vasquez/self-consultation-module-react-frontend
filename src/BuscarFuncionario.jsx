import { useState, useEffect } from 'react';
import './css/BuscarFuncionario.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

function BuscarFuncionario() {
  const [filters, setFilters] = useState({
    rut: '',
    nombre: '',
    idSexo: '',
    idCargo: '',
    idArea: ''
  });
  const [funcionarios, setFuncionarios] = useState([]);
  const [filteredFuncionarios, setFilteredFuncionarios] = useState([]);
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
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [filters]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/usuarios');
      setFuncionarios(response.data);
      setFilteredFuncionarios(response.data);
    } catch (error) {
      console.error("Hubo un error al buscar los funcionarios!", error);
    }
  };

  const filterData = () => {
    let filtered = funcionarios;

    if (filters.rut) {
      filtered = filtered.filter(funcionario =>
        funcionario.trabajador.rut.toString().startsWith(filters.rut)
      );
    }

    if (filters.nombre) {
      filtered = filtered.filter(funcionario =>
        funcionario.trabajador.nombres.toLowerCase().includes(filters.nombre.toLowerCase())
      );
    }

    if (filters.idSexo) {
      filtered = filtered.filter(funcionario =>
        funcionario.trabajador.sexo.id_sexo === parseInt(filters.idSexo)
      );
    }

    if (filters.idCargo) {
      filtered = filtered.filter(funcionario =>
        funcionario.trabajador.datosLaborales.cargo.id_cargo === parseInt(filters.idCargo)
      );
    }

    if (filters.idArea) {
      filtered = filtered.filter(funcionario =>
        funcionario.trabajador.datosLaborales.area.id_area === parseInt(filters.idArea)
      );
    }

    setFilteredFuncionarios(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleEdit = (funcionario) => {
    navigate('/gestionar_funcionario', { state: { funcionario } });
  };

  const handleResetFilters = () => {
    setFilters({
      rut: '',
      nombre: '',
      idSexo: '',
      idCargo: '',
      idArea: ''
    });
    setFilteredFuncionarios(funcionarios);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-light" style={{ backgroundColor: '#4d8fac' }} data-mdb-theme="light">
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
      <h1 className="Titulo">Buscar funcionario</h1>
      <div className="row content-box">
        <div className="col-md-6">
          <div className="p-3 bg-light rounded fromright">
            <form>
              <label className="form-label" htmlFor="form6Example3">
                Ingrese rut funcionario
              </label>
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <input
                      placeholder="Ingrese rut (sin puntos ni DV)"
                      type="text"
                      id="form6Example3"
                      className="form-control"
                      name="rut"
                      value={filters.rut}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
              </div>
              <label className="form-label" htmlFor="form6Example4">
                Ingrese nombre funcionario
              </label>
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <input
                      placeholder="Ingrese nombre"
                      type="text"
                      id="form6Example4"
                      className="form-control"
                      name="nombre"
                      value={filters.nombre}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
              </div>
              <label className="form-label" htmlFor="id_sexo">
                Selecciona el Sexo
              </label>
              <div className="row mb-4">
                <div className="col">
                  <select
                    className="form-select"
                    id="id_sexo"
                    name="idSexo"
                    value={filters.idSexo}
                    onChange={handleFilterChange}
                  >
                    <option value="">Todos</option>
                    {sexos.map((sexo) => (
                      <option key={sexo.id} value={sexo.id}>{sexo.descripcion}</option>
                    ))}
                  </select>
                </div>
              </div>
              <label className="form-label" htmlFor="id_cargo">
                Selecciona el Cargo
              </label>
              <div className="row mb-4">
                <div className="col">
                  <select
                    className="form-select"
                    id="id_cargo"
                    name="idCargo"
                    value={filters.idCargo}
                    onChange={handleFilterChange}
                  >
                    <option value="">Todos</option>
                    {cargos.map((cargo) => (
                      <option key={cargo.id} value={cargo.id}>{cargo.descripcion}</option>
                    ))}
                  </select>
                </div>
              </div>
              <label className="form-label" htmlFor="id_area">
                Selecciona el Área
              </label>
              <div className="row mb-4">
                <div className="col">
                  <select
                    className="form-select"
                    id="id_area"
                    name="idArea"
                    value={filters.idArea}
                    onChange={handleFilterChange}
                  >
                    <option value="">Todos</option>
                    {areas.map((area) => (
                      <option key={area.id} value={area.id}>{area.descripcion}</option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
          </div>
         
        </div>

        <div className="col-md-6">
          <div className="table-container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Rut</th>
                  <th scope="col">Sexo</th>
                  <th scope="col">Cargo</th>
                  <th scope="col">Área</th>
                  <th scope="col">Editar</th>
                </tr>
              </thead>
              <tbody>
                {filteredFuncionarios.length > 0 ? (
                  filteredFuncionarios.map((funcionario, index) => (
                    <tr key={`${funcionario.trabajador.rut}-${index}`}>
                      <td>{funcionario.trabajador.nombres}</td>
                      <td>{`${funcionario.trabajador.apellido_paterno} ${funcionario.trabajador.apellido_materno}`}</td>
                      <td>{`${funcionario.trabajador.rut}-${funcionario.trabajador.dv}`}</td>
                      <td>{funcionario.trabajador.sexo.descripcion}</td>
                      <td>{funcionario.trabajador.datosLaborales?.cargo?.descripcion || 'N/A'}</td>
                      <td>{funcionario.trabajador.datosLaborales?.area?.descripcion || 'N/A'}</td>
                      <td>
                        <button onClick={() => handleEdit(funcionario)} className="btn btn-warning botonWrng">Editar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No hay funcionarios que coincidan con la búsqueda</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default BuscarFuncionario;
