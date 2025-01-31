import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import MsgToast from "./MsgToast";

const PagoModal = ({ show, handleClose, onPagoRegistrado }) => {
  const [showT, setShowT] = useState(false);
  const [type, setType] = useState("")
  const [message, setMessage] = useState("");
  const [personas, setPersonas] = useState([]);
  const [pago, setPago] = useState({
    idPersona: "",
    monto: "",
    fechaPago: "",
    estado: "",
  });

  useEffect(() => {
    const cargarPersonas = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/personas/role/user`);
        setPersonas(response.data);
      } catch (error) {
        console.error("Error al cargar las personas:", error);
      }
    };

    cargarPersonas();
  }, []);

  useEffect(() => {
    if (show) {
      setPago({
        idPersona: "",
        monto: "",
        fechaPago: "",
        estado: "",
      });
    }
  }, [show]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    // Validación para que solo se ingresen números en el campo "monto"
    if (name === "monto") {
      if (!/^\d*\.?\d*$/.test(value)) return; // Permite números y punto decimal
    }

    setPago((prevPago) => ({
      ...prevPago,
      [name]: value,
    }));
  };

  const manejarRegistro = async () => {
    if (!pago.idPersona) {
      setMessage("Por favor, seleccione una persona.");
      setType("error")
      setShowT(true);
      return;
    }
    if (!pago.monto) {
      setMessage("Por favor, ingrese un monto.");
      setType("error")
      setShowT(true);
      return;
    }
    if (!pago.fechaPago) {
      setMessage("Por favor, seleccione una fecha de pago.");
      setType("error")
      setShowT(true);
      return;
    }
    if (!pago.estado) {
      setMessage("Por favor, seleccione un estado válido.");
      setType("error")
      setShowT(true);
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/pagos`, pago);
      onPagoRegistrado();
      handleClose();
    } catch (error) {
      console.error("Error al registrar el pago:", error);
    }
  };


  return (
    <>
      {/* Toast para mostrar mensajes de error */}
      < MsgToast
        type={type}
        message={message}
        show={showT}
        setShow={setShowT}
      />
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
                <option value="">Seleccione un estado</option>
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
    </>
  );
};

export default PagoModal;
