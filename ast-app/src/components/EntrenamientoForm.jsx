import React from "react";
import { Button } from "react-bootstrap";

const EntrenamientoForm = ({ fecha, setFecha, hora, setHora, isEditing, onSubmit }) => {
    return (
        <div>
            <div className="mb-3">
                <label htmlFor="fecha" className="form-label">
                    Fecha
                </label>
                <input
                    type="date"
                    id="fecha"
                    className="form-control"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="hora" className="form-label">
                    Hora
                </label>
                <input
                    type="time"
                    id="hora"
                    className="form-control"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                />
            </div>

            <Button type="button" className="btn btn-success w-100" onClick={onSubmit}>
                {isEditing ? "Guardar Cambios" : "Crear Entrenamiento"}
            </Button>
        </div>
    );
};

export default EntrenamientoForm;