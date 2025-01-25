import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";

const User = "Admin";
const Password = "Admin";

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const goto_Home = () => {
    setShow(false);
    name === User && password === Password
      ? navigate(ROUTES.HOME.path, { replace: true })
      : setShow(true);
  };

  return (
    <div className="fmin-vh-100 d-flex justify-content-center align-items-center bg-#213547 text-white">
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

          {show && (
            <span className="fw-medium">
              Datos Incorrectos. Ingrese nuevamente
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
