import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import { useAuth } from "../../components/AuthContext"; // Importar el AuthContext

const TrainingManagement = () => {
    const navigate = useNavigate();
    const { user } = useAuth(); // Obtener el usuario autenticado desde el AuthContext
    const [entrenamientos, setEntrenamientos] = useState([]);
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
                const asistencias = await response.json();
                console.log("Asistencias del usuario:", asistencias);

                // Obtener los IDs de los entrenamientos asociados a las asistencias
                const entrenamientoIds = asistencias.map((asistencia) => asistencia.idEntrenamiento);

                // Obtener los detalles de los entrenamientos
                fetchEntrenamientos(entrenamientoIds);
            } else {
                setError("Error al obtener las asistencias del usuario.");
            }
        } catch (err) {
            setError(`Error de conexión: ${err.message}`);
        }
    };

    // Función para obtener los detalles de los entrenamientos
    const fetchEntrenamientos = async (entrenamientoIds) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/entrenamientos`);
            if (response.ok) {
                const data = await response.json();

                // Filtrar los entrenamientos que están en la lista de IDs
                const entrenamientosFiltrados = data.filter((entrenamiento) =>
                    entrenamientoIds.includes(entrenamiento._id)
                );

                // Formatear los datos de los entrenamientos
                const entrenamientosFormateados = entrenamientosFiltrados.map((entrenamiento) => ({
                    ...entrenamiento,
                    fecha: new Date(entrenamiento.fecha).toISOString().substring(0, 10),
                    hora: entrenamiento.hora.slice(0, 5),
                }));

                setEntrenamientos(entrenamientosFormateados);
            } else {
                setError("Error al obtener los entrenamientos.");
            }
        } catch (err) {
            setError(`Error de conexión: ${err.message}`);
        }
    };

    // Efecto para cargar las asistencias y entrenamientos al montar el componente
    useEffect(() => {
        fetchAsistencias();
    }, [user]); // Dependencia: cuando el usuario cambie, se vuelven a cargar las asistencias

    return (
        <div className="p-4" style={{ color: "white" }}>
            <h1>Mis Entrenamientos</h1>

            {mensaje && <div className="mt-3 alert alert-info">{mensaje}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {entrenamientos.length > 0 ? (
                <div className="row">
                    {entrenamientos.map((entrenamiento) => (
                        <div key={entrenamiento._id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Entrenamiento</h5>
                                    <p className="card-text">
                                        <strong>Fecha:</strong> {entrenamiento.fecha}
                                    </p>
                                    <p className="card-text">
                                        <strong>Hora:</strong> {entrenamiento.hora}
                                    </p>
                                    <p className="card-text">
                                        <strong>Asistencia:</strong> Confirmada
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No estás inscrito en ningún entrenamiento.</p>
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