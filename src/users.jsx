import './css/Users.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../axiosConfig';

function UsersPage() {
  const [perfil, setPerfil] = useState(null);
  const [usuario, setUsuario] = useState({
    nombreCompleto: '',
    cargo: '',
    area: '',
    rut: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setPerfil(storedUser.perfil?.id_perfil);
      const userRut = storedUser.trabajador.rut;

      const fetchUserData = async () => {
        try {
          const response = await axios.get(`/usuarios/${userRut}`);
          const userData = response.data;
          console.log('Datos recibidos del endpoint:', userData);
          setUsuario({
            nombreCompleto: `${userData.trabajador.nombres} ${userData.trabajador.apellido_paterno} ${userData.trabajador.apellido_materno}`,
            cargo: userData.trabajador.datosLaborales?.cargo?.descripcion || '',
            area: userData.trabajador.datosLaborales?.area?.descripcion || '',
            rut: userData.trabajador.rut
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleDownloadCertificado = async () => {
    try {
      const response = await axios.get(`/reports/certificado/${usuario.rut}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'certificado_antiguedad.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Hubo un error al descargar el certificado!", error);
    }
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="../CSS/camposUsuario.css" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
        crossOrigin="anonymous"
      />
      <title>Usuario</title>

      <nav className="navbar navbar-light nabvar" style={{ backgroundColor: "#4d8fac" }}>
        <img src="/Images/logo_solo.png" alt="Icon" className="Icon" />
        <div className="user-info"></div>
        <div className="logOut">
          <img
            src="/Icons/exit-svgrepo-com.svg"
            alt="Log out"
            className="Log-Out"
            onClick={handleLogout}
          />
        </div>
      </nav>
      <div className="content-box">
        <div className="row">
          <div className="col-md-6">
            <h2 className="tituloUsers">Bienvenid@</h2>
            <div className="button">
              <Link to="/informacion_personal" className="btn btn-primary btn-lg btn-block botonUsuario">
                <img
                  src="/Icons/Iconos-botones/user-alt-1-svgrepo-com.svg"
                  alt="userIcon"
                  className="userIcon me-2"
                />
                Ver información personal
              </Link>
              <button className="btn btn-primary btn-lg btn-block botonUsuario" onClick={handleDownloadCertificado}>
                <img
                  src="/Icons/Iconos-botones/file-document.svg"
                  alt="certificadoIcon"
                  className="userIcon me-2"
                />
                Certificado de antigüedad laboral
              </button>
              {perfil && perfil !== 3 && (
                <Link to="/listar_trabajador" className="btn btn-primary btn-lg btn-block botonUsuario">
                  <img
                    src="/Icons/Iconos-botones/clipboard-list-svgrepo-com.svg"
                    alt="ListIcon"
                    className="userIcon me-2"
                  />
                  Ver lista de funcionarios
                </Link>
              )}
              {perfil === 1 && (
                <>
                  <Link to="/ingresar_trabajador" className="btn btn-primary btn-lg btn-block botonUsuario">
                    <img
                      src="/Icons/Iconos-botones/adduser.svg"
                      alt="GestionarIcon"
                      className="userIcon me-2"
                    />
                    Ingresar funcionario
                  </Link>
                  <Link to="/buscar_funcionario" className="btn btn-primary btn-lg btn-block botonUsuario">
                    <img
                      src="/Icons/Iconos-botones/search-alt-2-svgrepo-com.svg"
                      alt="GestionarIcon"
                      className="userIcon me-2"
                    />
                    Buscar funcionario
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="e-card playing">
              <div className="image" />
              <div className="wave" />
              <div className="wave" />
              <div className="wave" />
              <div className="infotop">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="icon"
                >
                  <path
                    fill="currentColor"
                    d="M19.4133 4.89862L14.5863 2.17544C12.9911 1.27485 11.0089 1.27485 9.41368 2.17544L4.58674
                  4.89862C2.99153 5.7992 2 7.47596 2 9.2763V14.7235C2 16.5238 2.99153 18.2014 4.58674 19.1012L9.41368
                  21.8252C10.2079 22.2734 11.105 22.5 12.0046 22.5C12.6952 22.5 13.3874 22.3657 14.0349 22.0954C14.2204
                  22.018 14.4059 21.9273 14.5872 21.8252L19.4141 19.1012C19.9765 18.7831 20.4655 18.3728 20.8651
                  17.8825C21.597 16.9894 22 15.8671 22 14.7243V9.27713C22 7.47678 21.0085 5.7992 19.4133 4.89862ZM4.10784
                  14.7235V9.2763C4.10784 8.20928 4.6955 7.21559 5.64066 6.68166L10.4676 3.95848C10.9398 3.69152 11.4701
                  3.55804 11.9996 3.55804C12.5291 3.55804 13.0594 3.69152 13.5324 3.95848L18.3593 6.68166C19.3045 7.21476
                  19.8922 8.20928 19.8922 9.2763V9.75997C19.1426 9.60836 18.377 9.53091 17.6022 9.53091C14.7929 9.53091
                  12.1041 10.5501 10.0309 12.3999C8.36735 13.8847 7.21142 15.8012 6.68783 17.9081L5.63981 17.3165C4.69466
                  16.7834 4.10699 15.7897 4.10699 14.7235H4.10784ZM10.4676 20.0413L8.60933 18.9924C8.94996 17.0479 9.94402
                  15.2665 11.4515 13.921C13.1353 12.4181 15.3198 11.5908 17.6022 11.5908C18.3804 11.5908 19.1477 11.6864
                  19.8922 11.8742V14.7235C19.8922 15.2278 19.7589 15.7254 19.5119 16.1662C18.7615 15.3596 17.6806 14.8528
                   16.4783 14.8528C14.2136 14.8528 12.3781 16.6466 12.3781 18.8598C12.3781 19.3937 12.4861 19.9021 12.68
                   20.3676C11.9347 20.5316 11.1396 20.4203 10.4684 20.0413H10.4676Z"
                  />
                </svg>
                <br />
                <div className="infotop">
                  <div className="NombreUsuario">{usuario.nombreCompleto}</div>
                  {usuario.cargo}<br />
                  {usuario.area}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UsersPage;
