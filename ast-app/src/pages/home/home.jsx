import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";

const Home = () => {

  const navigate = useNavigate();

  const goto_Personas = () => {
    navigate(ROUTES.PERSONAS.path, { replace: true });
  };

  const goto_Torneos = () => {
    navigate(ROUTES.TORNEOS.path, { replace: true });
  };

  const goto_Entrenamientos = () => {
    navigate(ROUTES.ENTRENAMIENTO.path, { replace: true });
  };

  const goto_Pagos = () => {
    navigate(ROUTES.PAGOS.path, { replace: true });
  };

  return (
    <section className="d-flex h-100 flex-column align-items-center justify-content-center ">
      <div className="d-flex flex-column items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-medium mb-4 text-center text-white">
          AST
        </h1>
        <div className="d-flex flex-column gap-3">
          <button
            className="px-4 py-2 bg-primary text-white rounded-lg"
            onClick={goto_Personas}>
            Personas
          </button>
          <button
            className="px-4 py-2 bg-primary text-white rounded-lg"
            onClick={goto_Torneos}>
            Torneos
          </button>
          <button
            className="px-4 py-2 bg-primary text-white rounded-lg"
            onClick={goto_Pagos}>
            Pagos
          </button>
          <button
            className="px-4 py-2 bg-primary text-white rounded-lg"
            onClick={goto_Entrenamientos}>
            Entrenamiento
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
