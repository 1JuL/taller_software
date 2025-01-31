import React from "react";
import { Modal, Button } from "react-bootstrap";

const RegistrarEstudianteModal = ({ show, onHide, students, selectedStudent, setSelectedStudent, onRegistrar }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Registrar Estudiante</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <label htmlFor="studentSelect" className="form-label">
                        Selecciona un Estudiante
                    </label>
                    <select
                        id="studentSelect"
                        className="form-control"
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                    >
                        <option value="">Seleccione un estudiante</option>
                        {students.map((student) => (
                            <option key={student._id} value={student._id}>
                                {student.nombre} {student.apellido}
                            </option>
                        ))}
                    </select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={onRegistrar} disabled={!selectedStudent}>
                    Registrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RegistrarEstudianteModal;