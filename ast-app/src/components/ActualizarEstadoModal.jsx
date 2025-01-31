import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const ActualizarEstadoModal = ({ show, handleClose, onEstadoActualizado }) => {
  const [idPago, setIdPago] = useState("");

  const manejarCambio = (e) => {
    const valor = e.target.value;
    const regex = /^[a-zA-Z0-9]*$/; // Solo letras y números

    if (regex.test(valor)) {
      setIdPago(valor);
    }
  };

  const actualizarEstado = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/pagos/${idPago}`, {
        estado: "Pagado",
      });
      onEstadoActualizado(); // Notifica que el estado se actualizó con éxito
      handleClose();
      setIdPago("");
    } catch (error) {
      console.error("Error al actualizar el estado del pago:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Estado del Pago</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="idPago" className="mb-3">
            <Form.Label>ID del Pago</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el ID del pago"
              value={idPago}
              onChange={manejarCambio}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={actualizarEstado} disabled={!idPago}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ActualizarEstadoModal;
