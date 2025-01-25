import React from 'react'
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1 className="text-2xl font-bold mb-4 text-white">Not found</h1>
            <button
                type="button"
                className="btn btn-light w-100 mt-3 mb-3"
                onClick={() => navigate('/')}
            >
                Volver al Inicio
            </button>
        </>
    )
}

export default NotFound