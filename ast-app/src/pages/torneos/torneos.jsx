import React from 'react'
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";

const torneos = () => {
    const navigate = useNavigate();
    return (
        <>
            <div>entrenamiento</div>
            <button
                type="button"
                className="btn btn-info w-100"
                onClick={() => navigate(ROUTES.HOME.path, { replace: true })}>
                Volver al Inicio
            </button>
        </>
    )
}

export default torneos