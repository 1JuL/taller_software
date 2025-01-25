import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import { useAuth } from "../../components/AuthContext";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const User = "Admin";
const Password = "Admin";

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const goto_Home = () => {
    setShow(false);
    if (name === User && password === Password) {
      login();
      navigate(ROUTES.HOME.path, { replace: true });
    } else {
      setShow(true);
    }
  };

  return (
    <>
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-#213547 text-white">
        <div
          className="card p-4 shadow w-100 bg-secondary text-white"
          style={{ maxWidth: "500px" }}>
          <h1 className="text-center mb-4">Administrador</h1>
          <div className="">
            <section>
              <label htmlFor="user" className="form-label">
                Usuario:
              </label>
              <input
                type="text"
                className="form-control bg-dark text-white border-light"
                name="user"
                id="user"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </section>

            <section>
              <label htmlFor="passw" className="form-label">
                Contraseña:
              </label>
              <input
                type="password"
                className="form-control bg-dark text-white border-light"
                name="passw"
                id="passw"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </section>
          </div>
          <div className="space-x-4 flex flex-col">
            <button className="btn btn-primary w-100 mt-4" onClick={goto_Home}>
              Ingresar
            </button>
            <button
              type="button"
              className="btn btn-light w-100 mt-3 mb-3"
              onClick={() => navigate("/")}>
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
      <div>
        <ToastContainer position="top-center" className="mt-4">
          <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide className="bg-danger text-white" >
            <Toast.Body>Usuario o contraseña incorrectos.</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </>
  );
};

export default Login;
