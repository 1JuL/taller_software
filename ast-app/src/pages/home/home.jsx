import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import { useAuth } from "../../components/AuthContext";
import UserHome from "./userHome"
import StaffHome from "./staffHome";
import AdminHome from "./adminHome";

const Home = () => {
  const { user, role } = useAuth(); // Obtén el usuario y el rol del contexto
  const navigate = useNavigate();

  let content;
  if (user) {
    if (role == "user") {
      content = (
        <UserHome />
      );
    } else if (role == "staff") {
      content = (
        <StaffHome />
      );
    } else if (role == "admin") {
      content = (
        <AdminHome />
      );
    } else {
      content = (
        <div className="d-flex flex-column gap-3">
          <p className="text-white">Por favor, inicia sesión para acceder a esta página.</p>
          <button
            className="px-4 py-2 bg-primary text-white rounded-lg"
            onClick={() => navigate(ROUTES.LOGIN.path)}>
            Iniciar sesión
          </button>
        </div>
      );
    }
  };

  return (
    <section className="d-flex h-100 flex-column align-items-center justify-content-center ">
      <div className="d-flex flex-column items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-medium mb-4 text-center text-white">AST</h1>
        {content}
      </div>
    </section>
  );
}

export default Home;