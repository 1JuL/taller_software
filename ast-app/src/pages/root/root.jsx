import React from "react";
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
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={goto_Signup}>
            Formulario de Registro
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={goto_Login}>
            Inicio de Sesión Administración
          </button>
        </div>
      </div>
    </section>
  );
};

export default Root;
