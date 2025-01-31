import React from "react";
import { Button } from "react-bootstrap";

const EntrenamientoList = ({ entrenamientos, onSelect, onDelete, onEdit, onViewAsistentes }) => {
    return (
        <ul className="list-group">
            {entrenamientos.map(({ _id, fecha, hora }) => (
                <li key={_id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <strong>{fecha}</strong> - {hora}
                    </div>
                    <div>
                        <Button className="btn btn-primary" onClick={() => onSelect({ _id, fecha, hora })}>
                            Seleccionar
                        </Button>
                        <Button className="btn btn-danger" onClick={() => onDelete(_id)}>
                            Eliminar
                        </Button>
                        <Button className="btn btn-warning" onClick={() => onEdit({ _id, fecha, hora })}>
                            Editar
                        </Button>
                        <Button className="btn btn-info" onClick={() => onViewAsistentes(_id)}>
                            Ver Asistentes
                        </Button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default EntrenamientoList;