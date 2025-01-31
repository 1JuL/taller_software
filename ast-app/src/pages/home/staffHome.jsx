import React from 'react'
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import { useAuth } from "../../components/AuthContext";

const StaffHome = () => {
    const { logout } = useAuth();
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

    const handleLogout = () => {
        logout(); // Llama al método logout del contexto
        navigate(ROUTES.LOGIN.path, { replace: true }); // Redirige a la página de login tras cerrar sesión
    };

    return (
        <>
            <div className="d-flex flex-column gap-3">
                <button
                    className="px-4 py-2 bg-primary text-white rounded-lg"
                    onClick={goto_Personas}>
                    Ver Estudiantes
                </button>
                <button
                    className="px-4 py-2 bg-primary text-white rounded-lg"
                    onClick={goto_Torneos}>
                    Ver Torneos
                </button>
                <button
                    className="px-4 py-2 bg-primary text-white rounded-lg"
                    onClick={goto_Entrenamientos}>
                    Ver Entrenamiento
                </button>
                <button
                    className="px-4 py-2 bg-danger text-white rounded-lg"
                    onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </>
    )
}

export default StaffHome