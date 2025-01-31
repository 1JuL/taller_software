import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import { useAuth } from "../../components/AuthContext"; // Importar el AuthContext

const TrainingManagement = () => {
    const navigate = useNavigate();
    const { user } = useAuth(); // Obtener el usuario autenticado desde el AuthContext
    const [asistencias, setAsistencias] = useState([]);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    // Función para obtener las asistencias del usuario
    const fetchAsistencias = async () => {
        if (!user) return; // Si no hay usuario autenticado, no hacer nada

        try {
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_API_URL}/asistencias/persona/uid/${user.uid}`
            );
            if (response.ok) {
                const asistenciasData = await response.json();
                console.log("Asistencias del usuario:", asistenciasData);

                // Filtrar asistencias que tengan un idEntrenamiento válido
                const asistenciasValidas = asistenciasData.filter(
                    (asistencia) => asistencia.idEntrenamiento !== null
                );

                setAsistencias(asistenciasValidas);
            } else {
                setError("Error al obtener las asistencias del usuario.");
            }
        } catch (err) {
            setError(`Error de conexión: ${err.message}`);
        }
    };

    // Efecto para cargar las asistencias al montar el componente
    useEffect(() => {
        fetchAsistencias();
    }, [user]);

    return (
        <div className="p-4" style={{ color: "white" }}>
            <h1>Mis Asistencias</h1>

            {mensaje && <div className="mt-3 alert alert-info">{mensaje}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {Array.isArray(asistencias) && asistencias.length > 0 ? (
                <div className="row">
                    {asistencias.map((asistencia, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Asistencia Registrada</h5>
                                    <p className="card-text">
                                        <strong>Fecha:</strong> {new Date(asistencia.idEntrenamiento.fecha).toISOString().substring(0, 10)}
                                    </p>
                                    <p className="card-text">
                                        <strong>Hora:</strong> {asistencia.idEntrenamiento.hora}
                                    </p>
                                    <p className="card-text">
                                        <strong>Estado:</strong> Confirmada
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No tienes asistencias registradas.</p>
            )}

            <div style={{ position: "absolute", bottom: "0", right: "0", margin: "30px" }}>
                <button
                    type="button"
                    className="btn btn-info w-100"
                    onClick={() => navigate(ROUTES.HOME.path, { replace: true })}
                >
                    Volver al Inicio
                </button>
            </div>
        </div>
    );
};

export default TrainingManagement;
