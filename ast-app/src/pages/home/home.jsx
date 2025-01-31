import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import { useAuth } from "../../components/AuthContext";
import UserHome from "./userHome";
import StaffHome from "./staffHome";
import AdminHome from "./adminHome";

const Home = () => {
  const { user, role } = useAuth(); // Obtén el usuario y el rol del contexto
  const navigate = useNavigate();
  const [persona, setPersona] = useState(null); // Estado para almacenar la información de la persona
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(""); // Estado para manejar errores

  // Función para obtener la información de la persona
  const fetchPersona = async (uid) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/personas/uid/${uid}`);
      if (response.ok) {
        const data = await response.json();
        setPersona(data); // Almacenar la información de la persona
      } else {
        setError("Error al obtener la información del usuario.");
      }
    } catch (err) {
      setError(`Error de conexión: ${err.message}`);
    } finally {
      setLoading(false); // Finalizar la carga
    }
  };

  // Efecto para cargar la información de la persona cuando el usuario cambie
  useEffect(() => {
    if (user) {
      fetchPersona(user.uid);
    } else {
      setLoading(false); // Si no hay usuario, no cargar
    }
  }, [user]);

  let content;
  if (user) {
    if (role === "user") {
      content = <UserHome />;
    } else if (role === "staff") {
      content = <StaffHome />;
    } else if (role === "admin") {
      content = <AdminHome />;
    } else {
      content = (
        <div className="d-flex flex-column gap-3">
          <p className="text-white">Por favor, inicia sesión para acceder a esta página.</p>
          <button
            className="px-4 py-2 bg-primary text-white rounded-lg"
            onClick={() => navigate(ROUTES.LOGIN.path)}
          >
            Iniciar sesión
          </button>
        </div>
      );
    }
  }

  return (
    <>
      <section className="d-flex h-100 flex-column align-items-center justify-content-center">
        <div className="d-flex flex-column items-center justify-center min-h-screen bg-gray-100 m-5">
          <h1 className="text-2xl font-medium mb-4 text-center text-white">AST</h1>

          {/* Mensaje de bienvenida */}
          {loading ? (
            <h3 className="text-white">Cargando...</h3>
          ) : error ? (
            <h3 className="text-red-500">{error}</h3>
          ) : persona ? (
            <h3 className="text-white mb-4">Bienvenido, {persona.nombre}!</h3>
          ) : null}

          {content}
        </div>
      </section>
    </>
  );
};

export default Home;