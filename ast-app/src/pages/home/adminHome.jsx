import React from 'react'
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import { useAuth } from "../../components/AuthContext";

const AdminHome = () => {
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

    const goto_Pagos = () => {
        navigate(ROUTES.PAGOS.path, { replace: true });
    };

    const goto_Participacion = () => {
        navigate(ROUTES.PARTICIPACION.path, { replace: true });
    };

    const goto_RegForm = () => {
        navigate(ROUTES.REGISTER.path, { replace: true });
    };

    const goto_RegStaff = () => {
        navigate(ROUTES.REGSTAFF.path, { replace: true });
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
                    Gestion de Personas
                </button>
                <button
                    className="px-4 py-2 bg-primary text-white rounded-lg"
                    onClick={goto_Torneos}>
                    Gestion de Torneos
                </button>
                <button
                    className="px-4 py-2 bg-primary text-white rounded-lg"
                    onClick={goto_Pagos}>
                    Gestion de Pagos
                </button>
                <button
                    className="px-4 py-2 bg-primary text-white rounded-lg"
                    onClick={goto_Entrenamientos}>
                    Gestion de Entrenamientos
                </button>
                <button
                    className="px-4 py-2 bg-primary text-white rounded-lg"
                    onClick={goto_Participacion}>
                    Gestionar Participacion en Torneos
                </button>
                <button
                    className="px-4 py-2 bg-primary text-white rounded-lg"
                    onClick={goto_RegForm}>
                    Formulario de registro estudiantes
                </button>
                <button
                    className="px-4 py-2 bg-primary text-white rounded-lg"
                    onClick={goto_RegStaff}>
                    Formulario de registro entrenadores
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

export default AdminHome