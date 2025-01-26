import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import PagoModal from "../../components/PagoModal";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ActualizarEstadoModal from "../../components/ActualizarEstadoModal";

const pagos = () => {
  const navigate = useNavigate();
  const [PagosPorMes, setPagosPorMes] = useState([]);
  const [Id, setId] = useState("");
  const [personas, setPersonas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [show, setShow] = useState(false);

  const [ActualizarVisible, setActualizarVisible] = useState(false);

  const manejarAperturaModalModificacion = () => setActualizarVisible(true);
  const manejarCierreModalModificacion = () => setActualizarVisible(false);

  const manejarEstadoActualizado = () => {
    setShow(true);
  };

  const manejarAperturaModal = () => {
    setModalVisible(true);
  };
  const manejarCierreModal = () => {
    setModalVisible(false);
  };
  const manejarPagoRegistrado = () => {
    setShow(true);
  };

  useEffect(() => {
    const cargarPersonas = async () => {
      try {
        const response = await axios.get(
          "https://api-arqui.vercel.app/personas"
        ); // Endpoint para obtener personas
        setPersonas(response.data);
      } catch (error) {
        console.error("Error al cargar las personas:", error);
      }
    };

    cargarPersonas();
  }, []);

  const obtenerPagosPorPersona = async () => {
    axios
      .get(`https://api-arqui.vercel.app/pagos/persona/${Id}`)
      .then((response) => {
        setPagosPorMes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos: ", error);
      });
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark">
        <Container>
          <Navbar.Brand className="text-white">AST</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="me-auto">
              <Form>
                <Row>
                  <Col xs="auto">
                    <select
                      id="personaSelect"
                      className="form-select"
                      onChange={(e) => setId(e.target.value)}>
                      <option value="">Seleccione una persona</option>
                      {personas.map((persona) => (
                        <option key={persona._id} value={persona._id}>
                          {persona.nombre + " " + persona.apellido}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col xs="auto">
                    <Button onClick={obtenerPagosPorPersona}>Buscar</Button>
                  </Col>
                  <Col>
                    <button
                      type="button"
                      className="btn btn-info w-100"
                      onClick={() =>
                        navigate(ROUTES.HOME.path, { replace: true })
                      }>
                      Volver al Inicio
                    </button>
                  </Col>
                </Row>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section className="container-fluid mh-100 bg-secondary">
        <Row className="m-4 p-4">
          {PagosPorMes.map((pago, index) => (
            <Col md={4} key={index}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Pago ID: {pago._id}</Card.Title>
                  <Card.Text>
                    <strong>Monto:</strong> {pago.monto} <br />
                    <strong>Fecha de Pago: </strong>
                    {new Date(pago.fechaPago).toLocaleDateString()} <br />{" "}
                    <span
                      className={
                        pago.estado == "Pagado"
                          ? "text-success"
                          : "text-warning"
                      }>
                      {pago.estado}
                    </span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <PagoModal
          show={modalVisible}
          handleClose={manejarCierreModal}
          onPagoRegistrado={manejarPagoRegistrado}
        />
        <ActualizarEstadoModal
          show={ActualizarVisible}
          handleClose={manejarCierreModalModificacion}
          onEstadoActualizado={manejarEstadoActualizado}
        />

        <ToastContainer position="top-center" className="mt-4">
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            autohide
            className="bg-success text-white shadow">
            <Toast.Body>Pago registrado correctamente.</Toast.Body>
          </Toast>
        </ToastContainer>
      </section>

      <ButtonGroup
        style={{
          position: "absolute",
          bottom: "0",
          right: "0",
          margin: "30px",
        }}>
        <Button variant="success" onClick={manejarAperturaModal}>
          Registrar pago
        </Button>
        <Button variant="warning" onClick={manejarAperturaModalModificacion}>
          Registrar Pago por ID
        </Button>
      </ButtonGroup>
    </>
  );
};

export default pagos;
