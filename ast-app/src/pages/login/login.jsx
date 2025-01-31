import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import { useAuth } from "../../components/AuthContext";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Spinner from "react-bootstrap/Spinner"; // Importar el Spinner

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { login, role } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Estado para controlar el spinner

  const handleLogin = async () => {
    setLoading(true); // Activar el spinner
    try {
      await login(email, password); // Obtén el rol devuelto
      console.log(role); // Verifica el rol en la consola
    } catch (error) {
      setShow(true); // Muestra el Toast en caso de error
    } finally {
      setLoading(false); // Desactivar el spinner
    }
  };

  useEffect(() => {
    console.log("Rol actual:", role); // Depuración
    switch (role) {
      case "admin":
        navigate(ROUTES.HOME.path, { replace: true });
        break;
      case "staff":
        navigate(ROUTES.HOME.path, { replace: true });
        break;
      case "user":
        navigate(ROUTES.HOME.path, { replace: true });
        break;
      default:
        break;
    }
  }, [role, navigate]);

  return (
    <>
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-#213547 text-white">
        <div
          className="card p-4 shadow w-100 bg-secondary text-white"
          style={{ maxWidth: "500px" }}
        >
          <h1 className="text-center mb-4">Iniciar Sesión</h1>
          <div className="">
            <section>
              <label htmlFor="email" className="form-label">
                Correo:
              </label>
              <input
                type="email"
                className="form-control bg-dark text-white border-light"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </section>

            <section>
              <label htmlFor="password" className="form-label">
                Contraseña:
              </label>
              <input
                type="password"
                className="form-control bg-dark text-white border-light"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </section>
          </div>
          <div className="space-x-4 flex flex-col">
            <button
              className="btn btn-primary w-100 mt-4"
              onClick={handleLogin}
              disabled={loading} // Deshabilitar el botón mientras se carga
            >
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Ingresar"
              )}
            </button>
            <button
              type="button"
              className="btn btn-light w-100 mt-3 mb-3"
              onClick={() => navigate("/")}
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
      <div>
        <ToastContainer position="top-center" className="mt-4">
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            autohide
            className="bg-danger text-white"
          >
            <Toast.Body>Usuario o contraseña incorrectos.</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </>
  );
};

export default Login;