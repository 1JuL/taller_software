import React from "react";
import { Modal, Button } from "react-bootstrap";

const AsistentesModal = ({ show, onHide, asistentes }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Estudiantes Asistentes</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {asistentes.length > 0 ? (
                    <ul>
                        {asistentes.map((asistencia) => (
                            <li key={asistencia._id}>
                                {asistencia.idPersona.nombre} {asistencia.idPersona.apellido}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay estudiantes registrados para este entrenamiento.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AsistentesModal;