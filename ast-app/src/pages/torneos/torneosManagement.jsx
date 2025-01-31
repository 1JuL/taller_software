import React, { useState, useEffect } from "react";
import { ROUTES } from "../../routes";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Navbar,
    Container,
    Nav,
    Form,
    Button,
    Row,
    Col,
    Card,
    Modal,
} from "react-bootstrap";

const TorneosManagement = () => {
    const [torneos, setTorneos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [nuevoTorneo, setNuevoTorneo] = useState({
        nombreTorneo: "",
        fecha: "",
        partidosTotales: "",
    });
    const [torneoEnEdicion, setTorneoEnEdicion] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_REACT_APP_API_URL}/torneos`)
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
        if (!nuevoTorneo.nombreTorneo || !nuevoTorneo.fecha || !nuevoTorneo.partidosTotales) {
            alert("Todos los campos son obligatorios");
            return;
        }

        axios
            .post(`${import.meta.env.VITE_REACT_APP_API_URL}/torneos`, nuevoTorneo)
            .then((response) => {
                setTorneos([...torneos, response.data]);
                setShowModal(false);
                setNuevoTorneo({ nombreTorneo: "", fecha: "", partidosTotales: "" });
            })
            .catch((error) => {
                console.error("Error al crear el torneo: ", error);
                alert("Ocurrió un error al crear el torneo.");
            });
    };

    const handleAbrirModalEdicion = (torneo) => {
        const torneoEd = {
            nombreTorneo: torneo.nombreTorneo,
            fecha: torneo.fecha ? torneo.fecha.split("T")[0] : "",
            partidosTotales: torneo.partidosTotales,
        }
        setTorneoEnEdicion({ ...torneoEd }); // Copiar los datos del torneo en edición
        setShowEditModal(true);
    };

    const handleActualizarTorneo = (e) => {
        console.log(torneoEnEdicion)
        e.preventDefault();
        if (!torneoEnEdicion.nombreTorneo || !torneoEnEdicion.fecha || !torneoEnEdicion.partidosTotales) {
            alert("Todos los campos son obligatorios");
            return;
        }

        axios
            .put(`${import.meta.env.VITE_REACT_APP_API_URL}/torneos/actualizar/${torneoEnEdicion._id}`, torneoEnEdicion)
            .then((response) => {
                setTorneos(
                    torneos.map((t) =>
                        t._id === torneoEnEdicion._id ? response.data : t
                    )
                );
                setShowEditModal(false);
                setTorneoEnEdicion(null); // Limpiar el estado
            })
            .catch((error) => {
                console.error("Error al actualizar el torneo: ", error);
                alert("Ocurrió un error al actualizar el torneo.");
            });
    };

    const handleBorrarTorneo = (_id) => {
        if (window.confirm("¿Estás seguro de que deseas borrar este torneo?")) {
            axios
                .delete(`${import.meta.env.VITE_REACT_APP_API_URL}/torneos/${_id}`)
                .then(() => {
                    setTorneos(torneos.filter((torneo) => torneo._id !== _id));
                    alert("Torneo eliminado con éxito");
                })
                .catch((error) => {
                    console.error("Error al eliminar el torneo: ", error);
                    alert("Ocurrió un error al eliminar el torneo.");
                });
        }
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
                            <Col key={torneo._id} md={4} className="mb-3">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{torneo.nombreTorneo}</Card.Title>
                                        <Card.Text>
                                            <strong>Fecha:</strong>{" "}
                                            {torneo.fecha.substring(0, 10)}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Partidos Totales:</strong>{" "}
                                            {torneo.partidosTotales}
                                        </Card.Text>
                                        <Button
                                            variant="warning"
                                            className="me-2"
                                            onClick={() => handleAbrirModalEdicion(torneo)}
                                        >
                                            Actualizar
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleBorrarTorneo(torneo._id)}
                                        >
                                            Borrar
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>No se encontraron torneos.</p>
                    )}
                </Row>
            </Container>

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
                                    setNuevoTorneo({
                                        ...nuevoTorneo,
                                        partidosTotales: e.target.value,
                                    })
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

            {torneoEnEdicion && (
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Torneo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleActualizarTorneo}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre del Torneo</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={torneoEnEdicion.nombreTorneo}
                                    onChange={(e) =>
                                        setTorneoEnEdicion({
                                            ...torneoEnEdicion,
                                            nombreTorneo: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Fecha del Torneo</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={torneoEnEdicion.fecha}
                                    onChange={(e) =>
                                        setTorneoEnEdicion({
                                            ...torneoEnEdicion,
                                            fecha: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Partidos Totales</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={torneoEnEdicion.partidosTotales}
                                    onChange={(e) =>
                                        setTorneoEnEdicion({
                                            ...torneoEnEdicion,
                                            partidosTotales: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Guardar Cambios
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
};

export default TorneosManagement;
