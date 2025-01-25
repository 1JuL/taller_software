import React from 'react'
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-white">
                <h1 className="text-2xl font-bold mb-4">Not found</h1>
                <button
                    type="button"
                    className="btn btn-light w-30 mt-3 mb-3"
                    onClick={() => navigate('/')}
                >
                    Volver al Inicio
                </button>
            </div>
        </>
    )
}

export default NotFound