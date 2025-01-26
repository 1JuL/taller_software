import React, { useState, useEffect } from "react";
import { ROUTES } from "../../routes";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const Torneos = () => {
    const [torneos, setTorneos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [showModal, setShowModal] = useState(false); // Estado para manejar el pop-up
    const [nuevoTorneo, setNuevoTorneo] = useState({
        nombreTorneo: "",
        fecha: "",
        partidosTotales: "",
    }); // Estado para almacenar los datos del nuevo torneo

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("https://api-arqui.vercel.app/torneos")
            .then((response) => {
                setTorneos(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener los datos: ", error);
            });
    }, []);

    const buscarTorneo = (e) => {
        e.preventDefault();
        const resultados = torneos.filter((torneo) =>
            torneo.nombreTorneo.toLowerCase().includes(busqueda.toLowerCase())
        );
        setTorneos(resultados);
    };

    const handleCrearTorneo = (e) => {
        e.preventDefault();
        // Validar que los campos no estén vacíos
        if (!nuevoTorneo.nombreTorneo || !nuevoTorneo.fecha || !nuevoTorneo.partidosTotales) {
            alert("Todos los campos son obligatorios");
            return;
        }

        // Enviar los datos del nuevo torneo al servidor
        axios
            .post("https://api-arqui.vercel.app/torneos", nuevoTorneo)
            .then((response) => {
                setTorneos([...torneos, response.data]); // Actualizar la lista de torneos
                setShowModal(false); // Cerrar el modal
                setNuevoTorneo({ nombreTorneo: "", fecha: "", partidosTotales: "" }); // Reiniciar el formulario
            })
            .catch((error) => {
                console.error("Error al crear el torneo: ", error);
                alert("Ocurrió un error al crear el torneo.");
            });
    };

    return (
        <>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>AST</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Form onSubmit={buscarTorneo}>
                                <Row>
                                    <Col xs="auto">
                                        <Form.Control
                                            type="text"
                                            placeholder="Torneo"
                                            value={busqueda}
                                            onChange={(e) => setBusqueda(e.target.value)}
                                        />
                                    </Col>
                                    <Col xs="auto">
                                        <Button type="submit">Buscar</Button>
                                    </Col>
                                    <Col xs="auto">
                                        <Button onClick={() => setShowModal(true)}>Crear torneo</Button>
                                    </Col>
                                    <Col>
                                        <button
                                            type="button"
                                            className="btn btn-info w-100"
                                            onClick={() => navigate(ROUTES.HOME.path, { replace: true })}
                                        >
                                            Volver al Inicio
                                        </button>
                                    </Col>
                                </Row>
                            </Form>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-4">
                <Row>
                    {torneos.length > 0 ? (
                        torneos.map((torneo) => (
                            <Col key={torneo.id} md={4} className="mb-3">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{torneo.nombreTorneo}</Card.Title>
                                    <Card.Text>
                                            <strong>Fecha:</strong> {new Date(torneo.fecha).toLocaleDateString()}
                                    </Card.Text>

                                        <Card.Text>
                                            <strong>Partidos Totales:</strong> {torneo.partidosTotales}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>No se encontraron torneos.</p>
                    )}
                </Row>
            </Container>

            {/* Modal para Crear Torneo */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Torneo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCrearTorneo}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del Torneo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingresa el nombre"
                                value={nuevoTorneo.nombreTorneo}
                                onChange={(e) =>
                                    setNuevoTorneo({ ...nuevoTorneo, nombreTorneo: e.target.value })
                                }
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha del Torneo</Form.Label>
                            <Form.Control
                                type="date"
                                value={nuevoTorneo.fecha}
                                onChange={(e) =>
                                    setNuevoTorneo({ ...nuevoTorneo, fecha: e.target.value })
                                }
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Partidos Totales</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ingresa el número de partidos"
                                value={nuevoTorneo.partidosTotales}
                                onChange={(e) =>
                                    setNuevoTorneo({ ...nuevoTorneo, partidosTotales: e.target.value })
                                }
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Guardar Torneo
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Torneos;
