import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './css/camposUsuario.css';
import Modal from './modal.jsx';

function GestionarFuncionario() {
  const location = useLocation();
  const navigate = useNavigate();
  const [funcionario, setFuncionario] = useState(null);

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

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const sexos = [
    { id: 1, descripcion: 'Masculino' },
    { id: 2, descripcion: 'Femenino' },
    { id: 3, descripcion: 'Otros' }
  ];

  const cargos = [
    { id: 1, descripcion: 'Administrativo' },
    { id: 2, descripcion: 'Jefe de Recursos Humanos' },
    { id: 3, descripcion: 'Analista Programador' },
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

  const relaciones = [
    { id: 1, descripcion: 'Esposo/a' },
    { id: 2, descripcion: 'Hijo/a' },
    { id: 3, descripcion: 'Padre/Madre' },
    { id: 4, descripcion: 'Hermano/a' },
    { id: 5, descripcion: 'Tío/a' },
    { id: 6, descripcion: 'Abuelo/a' },
    { id: 7, descripcion: 'Amigo/a' },
    { id: 8, descripcion: 'Sin relación' }
  ];

  const perfiles = [
    { id: 1, descripcion: 'Administrador' },
    { id: 2, descripcion: 'Visualizador' },
    { id: 3, descripcion: 'Usuario' }
  ];

  useEffect(() => {
    const fetchFuncionario = async () => {
      const { rut } = location.state?.funcionario?.trabajador;
      if (rut) {
        try {
          const response = await axios.get(`/usuarios/${rut}`);
          setFuncionario(response.data);
        } catch (error) {
          console.error('Error fetching funcionario data:', error);
        }
      }
    };

    fetchFuncionario();
  }, [location.state]);

  useEffect(() => {
    if (funcionario) {
      setFormData({
        nombres: funcionario.trabajador.nombres || '',
        apellido_paterno: funcionario.trabajador.apellido_paterno || '',
        apellido_materno: funcionario.trabajador.apellido_materno || '',
        rut: funcionario.trabajador.rut ? funcionario.trabajador.rut.toString() : '',
        dv: funcionario.trabajador.dv || '',
        direccion: funcionario.trabajador.direccion || '',
        telefono: funcionario.trabajador.telefono ? funcionario.trabajador.telefono.toString() : '',
        id_sexo: funcionario.trabajador.sexo?.id_sexo ? funcionario.trabajador.sexo.id_sexo.toString() : '',
        id_cargo: funcionario.trabajador.datosLaborales?.cargo?.id_cargo ? funcionario.trabajador.datosLaborales.cargo.id_cargo.toString() : '',
        fecha_ingreso: funcionario.trabajador.datosLaborales?.fecha_ingreso ? new Date(funcionario.trabajador.datosLaborales.fecha_ingreso).toISOString().split('T')[0] : '',
        nombre_contacto: funcionario.trabajador.contactoEmergencia?.nombre_completo || '',
        id_relacion_contacto: funcionario.trabajador.contactoEmergencia?.relacion?.id_relacion ? funcionario.trabajador.contactoEmergencia.relacion.id_relacion.toString() : '',
        telefono_contacto: funcionario.trabajador.contactoEmergencia?.telefono ? funcionario.trabajador.contactoEmergencia.telefono.toString() : '',
        nombre_carga: funcionario.trabajador.cargaFamiliar?.nombre_completo.split(' ')[0] || '',
        apellido_carga: funcionario.trabajador.cargaFamiliar?.nombre_completo.split(' ')[1] || '',
        rut_carga: funcionario.trabajador.cargaFamiliar?.rut ? funcionario.trabajador.cargaFamiliar.rut.toString() : '',
        dv_carga: funcionario.trabajador.cargaFamiliar?.dv || '',
        id_sexo_carga: funcionario.trabajador.cargaFamiliar?.sexo?.id_sexo ? funcionario.trabajador.cargaFamiliar.sexo.id_sexo.toString() : '',
        id_relacion_carga: funcionario.trabajador.cargaFamiliar?.relacion?.id_relacion ? funcionario.trabajador.cargaFamiliar.relacion.id_relacion.toString() : '',
        id_area: funcionario.trabajador.datosLaborales?.area?.id_area ? funcionario.trabajador.datosLaborales.area.id_area.toString() : '',
        id_perfil: funcionario.perfil?.id_perfil ? funcionario.perfil.id_perfil.toString() : '',
      });
    }
  }, [funcionario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setModalType('update');
    setShowModal(true);
  };

  const handleDelete = () => {
    setModalType('delete');
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/usuarios/${formData.rut}`);
      setShowModal(false);
      alert('Funcionario eliminado correctamente!');
      navigate('/buscar_funcionario');
    } catch (error) {
      console.error('Hubo un error al eliminar el trabajador!', error.response?.data || error);
      alert('Hubo un error al eliminar el trabajador!');
    }
  };

  const handleModalConfirm = () => {
    if (modalType === 'delete') {
      confirmDelete();
    } else {
      updateFuncionario();
    }
  };

  const updateFuncionario = async () => {
    const payload = {
      username: formData.rut.toString(),
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
      await axios.put(`/usuarios/${formData.rut}`, payload);
      setShowModal(false);
      alert('Funcionario actualizado con éxito!');
      navigate(0); // Reload the page
    } catch (error) {
      console.error('Hubo un error al actualizar el trabajador!', error.response?.data || error);
      alert('Hubo un error al actualizar el trabajador!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div id="GestionarFuncionario">
      <nav className="navbar navbar-light" style={{ backgroundColor: "#4d8fac" }} data-mdb-theme="light">
        <img src="/Images/yuri_logo_sin_fondo.png" alt="Icon" className="Icon" />
        
        <div className="logOut">
          <img src="/Icons/log-out.svg" alt="Log out" className="Log-Out" onClick={handleLogout} />
        </div>
      </nav>
      <h1 className="Titulo">Gestionar Funcionario</h1>
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
                    {sexos.map((sexo) => (
                      <option key={sexo.id} value={sexo.id}>{sexo.descripcion}</option>
                    ))}
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
                      {cargos.map((cargo) => (
                        <option key={cargo.id} value={cargo.id}>{cargo.descripcion}</option>
                      ))}
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
                      {areas.map((area) => (
                        <option key={area.id} value={area.id}>{area.descripcion}</option>
                      ))}
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
                      {perfiles.map((perfil) => (
                        <option key={perfil.id} value={perfil.id}>{perfil.descripcion}</option>
                      ))}
                    </select>
                    Perfil
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
                    >
                      {relaciones.map((relacion) => (
                        <option key={relacion.id} value={relacion.id}>{relacion.descripcion}</option>
                      ))}
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
                    >
                      {relaciones.map((relacion) => (
                        <option key={relacion.id} value={relacion.id}>{relacion.descripcion}</option>
                      ))}
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
                  >
                    {sexos.map((sexo) => (
                      <option key={sexo.id} value={sexo.id}>{sexo.descripcion}</option>
                    ))}
                  </select>
                  Sexo
                </div>
              </div>
            </div>
          </div>
          <div className="Botones">
            <button type="submit" className="btn btn-success btn-lg custom-btn">Actualizar Registro</button>
            <button type="button" className="btn btn-danger btn-lg custom-btn" onClick={handleDelete}>Eliminar Funcionario</button>
            <Link to="/buscar_funcionario" className="btn btn-primary btn-lg custom-btn">Volver</Link>
          </div>
        </form>
      </div>
      <Modal
        show={showModal}
        title={modalType === 'update' ? '¿Desea actualizar este funcionario?' : '¿Seguro deseas eliminar este funcionario?'}
        message=""
        onConfirm={handleModalConfirm}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}

export default GestionarFuncionario;
