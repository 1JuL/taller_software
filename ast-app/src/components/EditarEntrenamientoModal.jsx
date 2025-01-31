import React from "react";
import { Modal, Button } from "react-bootstrap";

const EditarEntrenamientoModal = ({
    show,
    onHide,
    entrenamiento,
    fecha,
    setFecha,
    hora,
    setHora,
    onGuardar,
}) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Entrenamiento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={onGuardar}>
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditarEntrenamientoModal;