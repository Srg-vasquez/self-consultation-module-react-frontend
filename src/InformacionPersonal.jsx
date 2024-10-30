import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import './css/InformacionPersonal.css';

function InformacionPersonal() {
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

  const navigate = useNavigate();

  // Listas de valores para los selectores
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
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      const userRut = storedUser.trabajador.rut;

      const fetchUserData = async () => {
        try {
          const response = await axios.get(`/usuarios/${userRut}`);
          const userData = response.data;
          console.log('Datos recibidos del endpoint:', userData);
          setFormData({
            nombres: userData.trabajador.nombres || '',
            apellido_paterno: userData.trabajador.apellido_paterno || '',
            apellido_materno: userData.trabajador.apellido_materno || '',
            rut: userData.trabajador.rut ? userData.trabajador.rut.toString() : '',
            dv: userData.trabajador.dv || '',
            direccion: userData.trabajador.direccion || '',
            telefono: userData.trabajador.telefono ? userData.trabajador.telefono.toString() : '',
            id_sexo: userData.trabajador.sexo?.id_sexo ? userData.trabajador.sexo.id_sexo.toString() : '',
            id_cargo: userData.trabajador.datosLaborales?.cargo?.id_cargo ? userData.trabajador.datosLaborales.cargo.id_cargo.toString() : '',
            fecha_ingreso: userData.trabajador.datosLaborales?.fecha_ingreso ? new Date(userData.trabajador.datosLaborales.fecha_ingreso).toISOString().split('T')[0] : '',
            nombre_contacto: userData.trabajador.contactoEmergencia?.nombre_completo || '',
            id_relacion_contacto: userData.trabajador.contactoEmergencia?.relacion?.id_relacion ? userData.trabajador.contactoEmergencia.relacion.id_relacion.toString() : '',
            telefono_contacto: userData.trabajador.contactoEmergencia?.telefono ? userData.trabajador.contactoEmergencia.telefono.toString() : '',
            nombre_carga: userData.trabajador.cargaFamiliar?.nombre_completo.split(' ')[0] || '',
            apellido_carga: userData.trabajador.cargaFamiliar?.nombre_completo.split(' ')[1] || '',
            rut_carga: userData.trabajador.cargaFamiliar?.rut ? userData.trabajador.cargaFamiliar.rut.toString() : '',
            dv_carga: userData.trabajador.cargaFamiliar?.dv || '',
            id_sexo_carga: userData.trabajador.cargaFamiliar?.sexo?.id_sexo ? userData.trabajador.cargaFamiliar.sexo.id_sexo.toString() : '',
            id_relacion_carga: userData.trabajador.cargaFamiliar?.relacion?.id_relacion ? userData.trabajador.cargaFamiliar.relacion.id_relacion.toString() : '',
            id_area: userData.trabajador.datosLaborales?.area?.id_area ? userData.trabajador.datosLaborales.area.id_area.toString() : '',
            id_perfil: userData.perfil?.id_perfil ? userData.perfil.id_perfil.toString() : '',
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
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

    console.log('Payload que se enviaría:', payload); // Log para inspeccionar el payload antes de enviarlo

    try {
      await axios.put(`/usuarios/${formData.rut}`, payload);
      alert('Información actualizada correctamente!');
    } catch (error) {
      console.error('Hubo un error al actualizar la información!', error.response?.data || error);
      alert('Hubo un error al actualizar la información!');
    }
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
      <h1 className="Titulo">Información Personal</h1>
      <div className="content-box">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="h2Titulo"><h3>Datos Trabajador</h3></div>
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <input type="text" id="nombres" name="nombres" className="form-control" value={formData.nombres} onChange={handleChange} readOnly />
                    <label className="form-label" htmlFor="nombres">Nombre Trabajador</label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline">
                    <input type="text" id="apellido_paterno" name="apellido_paterno" className="form-control" value={formData.apellido_paterno} onChange={handleChange} readOnly />
                    <label className="form-label" htmlFor="apellido_paterno">Apellido Paterno</label>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <input type="text" id="apellido_materno" name="apellido_materno" className="form-control" value={formData.apellido_materno} onChange={handleChange} readOnly />
                    <label className="form-label" htmlFor="apellido_materno">Apellido Materno</label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline">
                    <input type="text" id="rut" name="rut" className="form-control" value={formData.rut} onChange={handleChange} readOnly />
                    <label className="form-label" htmlFor="rut">Rut Trabajador</label>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <select className="form-select" id="id_sexo" name="id_sexo" value={formData.id_sexo} onChange={handleChange} disabled>
                    {sexos.map((sexo) => (
                      <option key={sexo.id} value={sexo.id}>{sexo.descripcion}</option>
                    ))}
                  </select>
                  <label className="form-label" htmlFor="id_sexo">Sexo</label>
                </div>
                <div className="col">
                  <select className="form-select" id="id_cargo" name="id_cargo" value={formData.id_cargo} onChange={handleChange} disabled>
                    {cargos.map((cargo) => (
                      <option key={cargo.id} value={cargo.id}>{cargo.descripcion}</option>
                    ))}
                  </select>
                  <label className="form-label" htmlFor="id_cargo">Cargo del trabajador</label>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <input type="date" id="fecha_ingreso" name="fecha_ingreso" className="form-control" value={formData.fecha_ingreso} readOnly />
                    <label className="form-label" htmlFor="fecha_ingreso">Fecha ingreso compañía</label>
                  </div>
                </div>
                <div className="col">
                  <select className="form-select" id="id_area" name="id_area" value={formData.id_area} onChange={handleChange} disabled>
                    {areas.map((area) => (
                      <option key={area.id} value={area.id}>{area.descripcion}</option>
                    ))}
                  </select>
                  <label className="form-label" htmlFor="id_area">Área del trabajador</label>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <select className="form-select" id="id_perfil" name="id_perfil" value={formData.id_perfil} onChange={handleChange} disabled>
                    {perfiles.map((perfil) => (
                      <option key={perfil.id} value={perfil.id}>{perfil.descripcion}</option>
                    ))}
                  </select>
                  <label className="form-label" htmlFor="id_perfil">Perfil</label>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="h2Titulo"><h3>Contacto de emergencia</h3></div>
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <input type="text" id="nombre_contacto" name="nombre_contacto" className="form-control" value={formData.nombre_contacto} onChange={handleChange} />
                    <label className="form-label" htmlFor="nombre_contacto">Nombre contacto de emergencia</label>
                  </div>
                </div>
                <div className="col">
                  <select className="form-select" id="id_relacion_contacto" name="id_relacion_contacto" value={formData.id_relacion_contacto} onChange={handleChange}>
                    {relaciones.map((relacion) => (
                      <option key={relacion.id} value={relacion.id}>{relacion.descripcion}</option>
                    ))}
                  </select>
                  <label className="form-label" htmlFor="id_relacion_contacto">Relación</label>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <input type="text" id="telefono_contacto" name="telefono_contacto" className="form-control" value={formData.telefono_contacto} onChange={handleChange} />
                    <label className="form-label" htmlFor="telefono_contacto">Teléfono de emergencia</label>
                  </div>
                </div>
              </div>
              <h3 className="CargaFamiliar">Cargas familiares</h3>
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <input type="text" id="nombre_carga" name="nombre_carga" className="form-control" value={formData.nombre_carga} onChange={handleChange} />
                    <label className="form-label" htmlFor="nombre_carga">Nombre Carga Familiar</label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline">
                    <input type="text" id="apellido_carga" name="apellido_carga" className="form-control" value={formData.apellido_carga} onChange={handleChange} />
                    <label className="form-label" htmlFor="apellido_carga">Apellido</label>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <input type="text" id="rut_carga" name="rut_carga" className="form-control" value={formData.rut_carga} onChange={handleChange} />
                    <label className="form-label" htmlFor="rut_carga">RUT</label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline">
                    <input type="text" id="dv_carga" name="dv_carga" className="form-control" value={formData.dv_carga} onChange={handleChange} />
                    <label className="form-label" htmlFor="dv_carga">DV</label>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <select className="form-select" id="id_relacion_carga" name="id_relacion_carga" value={formData.id_relacion_carga} onChange={handleChange}>
                    {relaciones.map((relacion) => (
                      <option key={relacion.id} value={relacion.id}>{relacion.descripcion}</option>
                    ))}
                  </select>
                  <label className="form-label" htmlFor="id_relacion_carga">Parentesco</label>
                </div>
                <div className="col">
                  <select className="form-select" id="id_sexo_carga" name="id_sexo_carga" value={formData.id_sexo_carga} onChange={handleChange}>
                    {sexos.map((sexo) => (
                      <option key={sexo.id} value={sexo.id}>{sexo.descripcion}</option>
                    ))}
                  </select>
                  <label className="form-label" htmlFor="id_sexo_carga">Sexo</label>
                </div>
              </div>
              <div className="Botones">
                <button type="submit" className="btn btn-success btn-lg custom-btn">Guardar</button>
                <Link to="/users" className="btn btn-primary btn-lg custom-btn">Volver</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default InformacionPersonal;
