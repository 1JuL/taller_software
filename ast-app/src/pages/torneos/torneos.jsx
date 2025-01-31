import React from 'react'
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import { useAuth } from "../../components/AuthContext";
import TorneosManagement from './torneosManagement';
import UserTorneos from './userTorneos';

const Torneos = () => {
  const { user, role } = useAuth(); // Obtén el usuario y el rol del contexto
  const navigate = useNavigate();

  let content;
  if (user) {
    if (role == "user") {
      content = (
        <UserTorneos />
      );
    } else if (role == "staff") {
      content = (
        <UserTorneos />
      );
    } else if (role == "admin") {
      content = (
        <TorneosManagement />
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
    <>
      {content}
    </>
  );
}

export default Torneos