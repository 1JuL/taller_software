import React from "react";
import { Button } from "react-bootstrap";

const BuscarEntrenamiento = ({ fecha, setFecha, hora, setHora, onBuscarPorFecha, onBuscarPorHora }) => {
    return (
        <div>
            <div className="mb-3">
                <label htmlFor="fechaBuscar" className="form-label">
                    Buscar Entrenamiento por Fecha
                </label>
                <input
                    type="date"
                    id="fechaBuscar"
                    className="form-control"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                />
                <Button type="button" className="btn btn-primary mt-2" onClick={onBuscarPorFecha}>
                    Buscar Entrenamiento
                </Button>
            </div>

            <div className="mb-3">
                <label htmlFor="horaBuscar" className="form-label">
                    Buscar Entrenamiento por Hora
                </label>
                <input
                    type="time"
                    id="horaBuscar"
                    className="form-control"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                />
                <Button type="button" className="btn btn-primary mt-2" onClick={onBuscarPorHora}>
                    Buscar Entrenamiento
                </Button>
            </div>
        </div>
    );
};

export default BuscarEntrenamiento;