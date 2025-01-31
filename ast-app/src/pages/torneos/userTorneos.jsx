import React, { useState, useEffect } from "react";
import { ROUTES } from "../../routes";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Navbar,
    Container,
    Nav,
    Form,
    Row,
    Col,
    Card,
} from "react-bootstrap";

const UserTorneos = () => {
    const [torneos, setTorneos] = useState([]); // Todos los torneos
    const [torneosFiltrados, setTorneosFiltrados] = useState([]); // Torneos filtrados
    const [busqueda, setBusqueda] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_REACT_APP_API_URL}/torneos`)
            .then((response) => {
                setTorneos(response.data);
                setTorneosFiltrados(response.data); // Inicialmente, mostrar todos los torneos
            })
            .catch((error) => {
                console.error("Error al obtener los datos: ", error);
            });
    }, []);

    // Función para filtrar los torneos en tiempo real
    useEffect(() => {
        if (busqueda === "") {
            // Si el campo de búsqueda está vacío, mostrar todos los torneos
            setTorneosFiltrados(torneos);
        } else {
            // Filtrar los torneos según la búsqueda
            const resultados = torneos.filter((torneo) =>
                torneo.nombreTorneo.toLowerCase().includes(busqueda.toLowerCase())
            );
            setTorneosFiltrados(resultados);
        }
    }, [busqueda, torneos]);

    return (
        <>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>AST</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Row>
                                <Col xs="auto">
                                    <Form.Control
                                        type="text"
                                        placeholder="Buscar torneo"
                                        value={busqueda}
                                        onChange={(e) => setBusqueda(e.target.value)}
                                    />
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
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-4">
                <Row>
                    {torneosFiltrados.length > 0 ? (
                        torneosFiltrados.map((torneo) => (
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
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <h1 className="text-white">Cargando...</h1>
                    )}
                </Row>
            </Container>
        </>
    );
};

export default UserTorneos;