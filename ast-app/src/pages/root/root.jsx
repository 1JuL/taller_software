import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";

const Root = () => {
  const navigate = useNavigate();

  const goto_Login = () => {
    navigate(ROUTES.LOGIN.path, { replace: true });
  };
  const goto_Signup = () => {
    navigate(ROUTES.REGISTER.path, { replace: true });
  };

  return (
    <section className="d-flex h-100 flex-column align-items-center justify-content-center ">
      <div className="d-flex flex-column items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-medium mb-4 text-center text-white">
          AST
        </h1>
        <div className="d-flex flex-column gap-3">
          <button
            className="px-4 py-2 bg-primary bg-gradient text-white rounded-lg"
            onClick={goto_Signup}>
            Registrarse
          </button>
          <button
            className="px-4 py-2 bg-success bg-gradient text-white rounded-lg"
            onClick={goto_Login}>
            Iniciar de Sesión
          </button>
        </div>
      </div>
    </section>
  );
};

export default Root;
