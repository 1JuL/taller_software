import React, { useState, useEffect, useContext } from "react";
import { ROUTES } from "../../routes";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";
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
} from "react-bootstrap";

const UserParticipaciones = () => {
    const [participaciones, setParticipaciones] = useState([]);
    const [participacionesFiltradas, setParticipacionesFiltradas] = useState([]);
    const [torneos, setTorneos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.uid) {
            setIsLoading(true);

            axios
                .get(`${import.meta.env.VITE_REACT_APP_API_URL}/participaciones/persona/${user.uid}`)
                .then((response) => {
                    setParticipaciones(response.data);
                    setParticipacionesFiltradas(response.data);
                })
                .catch((error) => {
                    console.error("Error al obtener participaciones: ", error);
                });


            axios
                .get(`${import.meta.env.VITE_REACT_APP_API_URL}/torneos`)
                .then((response) => {
                    setTorneos(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error al obtener torneos: ", error);
                    setIsLoading(false);
                });
        }
    }, [user]);


    const getNombreTorneo = (torneoId) => {
        const torneo = torneos.find((t) => t._id === torneoId._id);
        return torneo ? torneo.nombreTorneo : "Torneo no encontrado";
    };


    useEffect(() => {
        if (busqueda === "") {
            setParticipacionesFiltradas(participaciones);
        } else {
            const resultados = participaciones.filter((participacion) =>
                getNombreTorneo(participacion.idTorneo).toLowerCase().includes(busqueda.toLowerCase())
            );
            setParticipacionesFiltradas(resultados);
        }
    }, [busqueda, participaciones, torneos]);

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
                    {isLoading ? ( // Mostrar un mensaje de carga mientras se obtienen los datos
                        <h1 className="text-white">Cargando...</h1>
                    ) : participacionesFiltradas.length > 0 ? ( // Mostrar las participaciones si hay datos
                        participacionesFiltradas.map((participacion) => (
                            <Col key={participacion._id} md={4} className="mb-3">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>
                                            {getNombreTorneo(participacion.idTorneo)}
                                        </Card.Title>
                                        <Card.Text>
                                            <strong>Fecha del Torneo:</strong>{" "}
                                            {participacion.idTorneo.fecha.substring(0, 10)}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Puesto Obtenido:</strong>{" "}
                                            {participacion.puestoObtenido}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Partidos Jugados:</strong>{" "}
                                            {participacion.partidosJugados}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Promedio de Participación:</strong>{" "}
                                            {participacion.promedioParticipacion.toFixed(2)}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : ( // Mostrar un mensaje si no hay participaciones
                        <h1 className="text-white">No hay participaciones para mostrar.</h1>
                    )}
                </Row>
            </Container>
        </>
    );
};

export default UserParticipaciones;