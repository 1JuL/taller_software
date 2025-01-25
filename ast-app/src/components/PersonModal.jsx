import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const PersonModal = ({ show, onClose, persona, onSave, mode }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        telefono: "",
        direccion: "",
        email: "",
    });

    useEffect(() => {
        if (persona) {
            setFormData({
                nombre: persona.nombre,
                apellido: persona.apellido,
                fechaNacimiento: persona.fechaNacimiento,
                telefono: persona.telefono,
                direccion: persona.direccion,
                email: persona.email,
            });
        }
    }, [persona]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Llama a la función onSave pasada por las props
        onClose(); // Cierra el modal después de guardar
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{mode === "edit" ? "Editar Persona" : "Detalles de Persona"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            disabled={mode === "view"} // Deshabilita los campos en modo vista
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formApellido">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Apellido"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            disabled={mode === "view"}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formFechaNacimiento">
                        <Form.Label>Fecha de Nacimiento</Form.Label>
                        <Form.Control
                            type="date"
                            name="fechaNacimiento"
                            value={formData.fechaNacimiento}
                            onChange={handleChange}
                            disabled={mode === "view"}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTelefono">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Teléfono"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            disabled={mode === "view"}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDireccion">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Dirección"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            disabled={mode === "view"}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={mode === "view"}
                        />
                    </Form.Group>

                    {mode === "edit" && (
                        <Button variant="primary" type="submit">
                            Guardar
                        </Button>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PersonModal;
