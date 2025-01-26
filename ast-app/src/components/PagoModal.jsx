import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const PagoModal = ({ show, handleClose, onPagoRegistrado }) => {
  const [personas, setPersonas] = useState([]);
  const [pago, setPago] = useState({
    idPersona: "",
    monto: "",
    fechaPago: "",
    estado: "Pendiente",
  });

  useEffect(() => {
    const cargarPersonas = async () => {
      try {
        const response = await axios.get(
          "https://api-arqui.vercel.app/personas"
        );
        setPersonas(response.data);
      } catch (error) {
        console.error("Error al cargar las personas:", error);
      }
    };

    cargarPersonas();
  }, []);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setPago((prevPago) => ({
      ...prevPago,
      [name]: value,
    }));
  };

  const manejarRegistro = async () => {
    try {
      await axios.post("https://api-arqui.vercel.app/pagos", pago);
      onPagoRegistrado(); // Notifica al componente principal que se ha registrado un nuevo pago
      handleClose(); // Cierra el modal
    } catch (error) {
      console.error("Error al registrar el pago:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Pago</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="personaSelect" className="mb-3">
            <Form.Label>Persona</Form.Label>
            <Form.Select
              name="idPersona"
              value={pago.idPersona}
              onChange={manejarCambio}
              required>
              <option value="">Seleccione una persona</option>
              {personas.map((persona) => (
                <option key={persona._id} value={persona._id}>
                  {persona.nombre + " " + persona.apellido}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="monto" className="mb-3">
            <Form.Label>Monto</Form.Label>
            <Form.Control
              type="number"
              name="monto"
              value={pago.monto}
              onChange={manejarCambio}
              placeholder="Ingrese el monto del pago"
              required
            />
          </Form.Group>

          <Form.Group controlId="fechaPago" className="mb-3">
            <Form.Label>Fecha de Pago</Form.Label>
            <Form.Control
              type="date"
              name="fechaPago"
              value={pago.fechaPago}
              onChange={manejarCambio}
              required
              className="text-dark"
            />
          </Form.Group>

          <Form.Group controlId="estado" className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              name="estado"
              value={pago.estado}
              onChange={manejarCambio}
              required>
              <option value="Pendiente">Pendiente</option>
              <option value="Pagado">Pagado</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={manejarRegistro}>
          Registrar Pago
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PagoModal;
