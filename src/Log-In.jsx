import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig'; 
import './css/Login.css';

function LogIn() {
  const navigate = useNavigate();
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      navigate('/users');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', {
        username: rut,
        password: password,
      });

      const user = response.data.user;

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/users');
      } else {
        alert('La contraseña es incorrecta. Inténtelo de nuevo.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión. Inténtelo de nuevo.');
    }
  };

  return (
    <>
      <div className="cuerpologin">
        <div className="login-container">
          
          <div className="login wrap">
            <img src="/Icons/user-circle-svgrepo-com (5).svg" alt="Icon" className="IconLogin" />
            <form onSubmit={handleLogin}>
            <h2 style={{ textAlign: 'center' }}>Iniciar Sesión</h2>

              <input
                placeholder="Ingrese su cuenta"
                id="email"
                name="email"
                type="text"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
              />
              <input
                placeholder="Contraseña"
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input value="Ingresar" className="btnn" type="submit" />
            </form>
            <a
              className="small text-muted modal"
              href="#!"
              data-bs-toggle="modal"
              data-bs-target="#forgotPasswordModal"
            >
              olvidaste tu contraseña?
            </a>
          </div>
        </div>
        <div
          className="modal fade"
          id="forgotPasswordModal"
          tabIndex={-1}
          aria-labelledby="forgotPasswordModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="forgotPasswordModalLabel">
                  <i className="fas fa-exclamation-triangle me-2" /> Alerta
                </h5>
                <button
                  type="button"
                  className="btn-closee"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <p>
                  Para volver a entrar en su cuenta, deberá comunicarse con{" "}
                  <b>Recursos Humanos</b> y restablecer su contraseña.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
