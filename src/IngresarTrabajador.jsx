import React, { useState } from 'react';
import axios from '../axiosConfig';
import './css/camposUsuario.css';
import { Link, useNavigate } from 'react-router-dom';

function IngresarTrabajador() {
  const [formData, setFormData] = useState({
    nombres: '',
    apellido_paterno: '',
    apellido_materno: '',
    rut: '',
    dv: '',
    direccion: '',
    telefono: '',
    id_sexo: '',
    id_cargo: '',
    fecha_ingreso: '',
    contrasena: '',
    confirmar_contrasena: '',
    nombre_contacto: '',
    id_relacion_contacto: '',
    telefono_contacto: '',
    nombre_carga: '',
    apellido_carga: '',
    rut_carga: '',
    dv_carga: '',
    id_sexo_carga: '',
    id_relacion_carga: '',
    id_area: '',
    id_perfil: '',
  });

  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === 'rut' || name === 'telefono') && value.length > 8) return;
    if ((name === 'rut' || name === 'telefono') && !/^\d*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.contrasena !== formData.confirmar_contrasena) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }

    const payload = {
      username: formData.rut.toString(),
      password: formData.contrasena,
      id_perfil: parseInt(formData.id_perfil, 10),
      trabajador: {
        nombres: formData.nombres,
        apellido_paterno: formData.apellido_paterno,
        apellido_materno: formData.apellido_materno,
        rut: parseInt(formData.rut, 10),
        dv: formData.dv,
        id_sexo: parseInt(formData.id_sexo, 10),
        direccion: formData.direccion,
        telefono: parseInt(formData.telefono, 10),
        datosLaborales: {
          id_cargo: parseInt(formData.id_cargo, 10),
          fecha_ingreso: formData.fecha_ingreso,
          id_area: parseInt(formData.id_area, 10),
        },
        contactoEmergencia: {
          nombre_completo: formData.nombre_contacto,
          id_relacion: parseInt(formData.id_relacion_contacto, 10),
          telefono: parseInt(formData.telefono_contacto, 10),
        },
        cargaFamiliar: {
          nombre_completo: `${formData.nombre_carga} ${formData.apellido_carga}`,
          rut: parseInt(formData.rut_carga, 10),
          dv: formData.dv_carga,
          id_sexo: parseInt(formData.id_sexo_carga, 10),
          id_relacion: parseInt(formData.id_relacion_carga, 10),
        },
      },
    };

    try {
      const response = await axios.post('/usuarios', payload);
      console.log("Respuesta del servidor:", response);
      setMessage('Trabajador ingresado correctamente!');
      setShowModal(true);
    } catch (error) {
      console.error("Hubo un error al ingresar el trabajador!", error.response.data || error);
      if (error.response && error.response.data && Array.isArray(error.response.data.errors)) {
        setMessage(`Error al ingresar el trabajador: ${error.response.data.errors.map(err => err.msg).join(', ')}`);
      } else {
        setMessage('Hubo un error al ingresar el trabajador!');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
          <img
            src="/Icons/log-out.svg"
            alt="Log out"
            className="Log-Out"
            onClick={handleLogout}
          />
        </div>
      </nav>
      <h1 className="Titulo">Ingresar Trabajador</h1>
      <div className="content-box">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="h2Titulo">
                <h3>Datos Trabajador</h3>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div data-mdb-input-init="" className="form-outline">
                    <input
                      placeholder="Ingrese nombre trabajador..."
                      type="text"
                      id="nombres"
                      name="nombres"
                      className="form-control"
                      value={formData.nombres}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="nombres">Nombre Trabajador</label>
                  </div>
                </div>
                <div className="col">
                  <div data-mdb-input-init="" className="form-outline">
                    <input
                      placeholder="Ingrese apellido paterno..."
                      type="text"
                      id="apellido_paterno"
                      name="apellido_paterno"
                      className="form-control"
                      value={formData.apellido_paterno}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="apellido_paterno">Apellido Paterno</label>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div data-mdb-input-init="" className="form-outline">
                    <input
                      placeholder="Ingrese apellido materno..."
                      type="text"
                      id="apellido_materno"
                      name="apellido_materno"
                      className="form-control"
                      value={formData.apellido_materno}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="apellido_materno">Apellido Materno</label>
                  </div>
                </div>
                <div className="col">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="id_sexo"
                    value={formData.id_sexo}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Elija una opción...</option>
                    <option value={1}>Masculino</option>
                    <option value={2}>Femenino</option>
                    <option value={3}>Otros</option>
                  </select>
                  Sexo
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div data-mdb-input-init="" className="form-outline">
                    <input
                      placeholder="Ingrese rut..."
                      type="text"
                      id="rut"
                      name="rut"
                      className="form-control"
                      value={formData.rut}
                      onChange={handleChange}
                      required
                      maxLength={8}
                    />
                    <label className="form-label" htmlFor="rut">Rut Trabajador</label>
                  </div>
                </div>
                <div className="col">
                  <div data-mdb-input-init="" className="form-outline">
                    <input
                      placeholder="Ingrese DV..."
                      type="text"
                      id="dv"
                      name="dv"
                      className="form-control"
                      value={formData.dv}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="dv">DV</label>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div data-mdb-input-init="" className="form-outline">
                    <input
                      placeholder="Ingrese direccion..."
                      type="text"
                      id="direccion"
                      name="direccion"
                      className="form-control"
                      value={formData.direccion}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="direccion">Direccion</label>
                  </div>
                </div>
                <div className="col">
                  <div data-mdb-input-init="" className="form-outline">
                    <input
                      placeholder="+569"
                      type="text"
                      id="telefono"
                      name="telefono"
                      className="form-control"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      maxLength={8}
                    />
                    <label className="form-label" htmlFor="telefono">Telefono</label>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div data-mdb-input-init="" className="form-outline">
                    <select
                      placeholder="Ingrese Cargo... "
                      type="text"
                      id="id_cargo"
                      name="id_cargo"
                      className="form-select"
                      value={formData.id_cargo}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Elija una opción...</option>
                      <option value={1}>Administrativo</option>
                      <option value={2}>Jefe de recursos humanos</option>
                      <option value={3}>Analista programador</option>
                      <option value={4}>Soporte TI</option>
                      <option value={5}>Encargado de Ventas</option>
                      <option value={6}>Encargado de Logística</option>
                    </select>
                    Cargo
                  </div>
                </div>
                <div className="col">
                  <div data-mdb-input-init="" className="form-outline">
                    <input
                      type="date"
                      id="fecha_ingreso"
                      name="fecha_ingreso"
                      className="form-control"
                      value={formData.fecha_ingreso}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="fecha_ingreso">Fecha ingreso compañia</label>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div data-mdb-input-init="" className="form-outline">
                    <select
                      type="text"
                      id="id_area"
                      name="id_area"
                      className="form-select"
                      value={formData.id_area}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Elija una opción...</option>
                      <option value={1}>Recursos Humanos</option>
                      <option value={2}>Soporte TI</option>
                      <option value={3}>Finanzas</option>
                      <option value={4}>Jurídica</option>
                      <option value={5}>Ventas</option>
                      <option value={6}>Logística</option>
                    </select>
                    Área
                  </div>
                </div>
                <div className="col">
                  <div data-mdb-input-init="" className="form-outline">
                    <select
                      type="text"
                      id="id_perfil"
                      name="id_perfil"
                      className="form-select"
                      value={formData.id_perfil}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Elija una opción...</option>
                      <option value={1}>Administrador</option>
                      <option value={2}>Visualizador</option>
                      <option value={3}>Usuario</option>
                    </select>
                    Perfil
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div data-mdb-input-init="" className="form-outline">
                    <input
                      placeholder="Ingrese nueva contraseña..."
                      type="password"
                      id="contrasena"
                      name="contrasena"
                      className="form-control"
                      value={formData.contrasena}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="contrasena">Cambiar contraseña</label>
                  </div>
                </div>
                <div className="col">
                  <div data-mdb-input-init="" className="form-outline">
                    <input
                      type="password"
                      id="confirmar_contrasena"
                      name="confirmar_contrasena"
                      className="form-control"
                      value={formData.confirmar_contrasena}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="confirmar_contrasena">Confirmar contraseña</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="h2Titulo">
                <h3>Contacto de emergencia</h3>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div data-mdb-input-init="" className="form-outline">
                    <input
                      placeholder="Nombre Completo..."
                      type="text"
                      id="nombre_contacto"
                      name="nombre_contacto"
                      className="form-control"
                      value={formData.nombre_contacto}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="nombre_contacto">Nombre contacto de emergencia</label>
                  </div>
                </div>
                <div className="col">
                  <div data-mdb-input-init="" className="form-outline">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="id_relacion_contacto"
                      value={formData.id_relacion_contacto}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Elija una opción...</option>
                      <option value={1}>Esposo/a</option>
                      <option value={2}>Hijo/a</option>
                      <option value={3}>Padre/Madre</option>
                      <option value={4}>Hermano/a</option>
                      <option value={5}>Tío/a</option>
                      <option value={6}>Abuelo/a</option>
                      <option value={7}>Amigo/a</option>
                      <option value={8}>Sin relación</option>
                    </select>
                    Relación
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div data-mdb-input-init="" className="form-outline">
                    <input
                      placeholder="+569"
                      type="text"
                      id="telefono_contacto"
                      name="telefono_contacto"
                      className="form-control"
                      value={formData.telefono_contacto}
                      onChange={handleChange}
                      required
                      maxLength={8}
                    />
                    <label className="form-label" htmlFor="telefono_contacto">Telefono de emergencia</label>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="CargaFamiliar">Cargas familiares</h3>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div data-mdb-input-init="" className="form-outline">
                    <input
                      placeholder="Nombre de su carga familiar..."
                      type="text"
                      id="nombre_carga"
                      name="nombre_carga"
                      className="form-control"
                      value={formData.nombre_carga}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="nombre_carga">Nombre Carga Familiar</label>
                  </div>
                </div>
                <div className="col">
                  <div data-mdb-input-init="" className="form-outline">
                    <input
                      placeholder="Ingrese apellido..."
                      type="text"
                      id="apellido_carga"
                      name="apellido_carga"
                      className="form-control"
                      value={formData.apellido_carga}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="apellido_carga">Apellido</label>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div data-mdb-input-init="" className="form-outline">
                    <input
                      placeholder="Ingrese RUT"
                      type="text"
                      id="rut_carga"
                      name="rut_carga"
                      className="form-control"
                      value={formData.rut_carga}
                      onChange={handleChange}
                      required
                      maxLength={8}
                    />
                    <label className="form-label" htmlFor="rut_carga">RUT</label>
                  </div>
                </div>
                <div className="col">
                  <div data-mdb-input-init="" className="form-outline">
                    <input
                      placeholder="Ingrese DV"
                      type="text"
                      id="dv_carga"
                      name="dv_carga"
                      className="form-control"
                      value={formData.dv_carga}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="dv_carga">DV</label>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div data-mdb-input-init="" className="form-outline">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="id_relacion_carga"
                      value={formData.id_relacion_carga}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Elija una opción...</option>
                      <option value={1}>Esposo/a</option>
                      <option value={2}>Hijo/a</option>
                      <option value={3}>Padre/Madre</option>
                      <option value={4}>Hermano/a</option>
                      <option value={5}>Tío/a</option>
                      <option value={6}>Abuelo/a</option>
                      <option value={7}>Amigo/a</option>
                      <option value={8}>Sin relación</option>
                    </select>
                    Relación
                  </div>
                </div>
                <div className="col">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="id_sexo_carga"
                    value={formData.id_sexo_carga}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Elija una opción...</option>
                    <option value={1}>Masculino</option>
                    <option value={2}>Femenino</option>
                    <option value={3}>Otros</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="Botones">
            <button type="submit" className="btn btn-success btn-lg custom-btn">Crear Registro</button>
            <Link to="/users" className="btn btn-primary btn-lg custom-btn">
              Volver
            </Link>
          </div>
        </form>
        {message && <p>{message}</p>}

        {/* Modal de éxito */}
        <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Éxito</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <p className='parrafocheck'>Usuario creado exitosamente!</p>
                <img src="/Icons/Iconos-botones/checklist.svg" alt="Éxito" className="img-fluid Iconcheck " />
              </div>
              <div className="modal-footer">
                <Link to="/users" className="btn btn-primary btn-lg custom-btn">
                  Volver
                </Link>
              </div>
            </div>
          </div>
        </div>
        {showModal && <div className="modal-backdrop fade show"></div>}
      </div>
    </>
  );
}

export default IngresarTrabajador;
