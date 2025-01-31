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
import DetailsModal from "../../components/DetailsModal";
import axios from "axios";

const Users = () => {
    const navigate = useNavigate();
    const [personas, setPersonas] = useState([]); // Personas con rol /role/user
    const [allPersonas, setAllPersonas] = useState([]); // Todas las personas (para búsqueda)
    const [selectedPersona, setSelectedPersona] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // Obtener solo las personas con el rol /role/user
        axios
            .get(`${import.meta.env.VITE_REACT_APP_API_URL}/personas/role/user`)
            .then((response) => {
                setPersonas(response.data);
                setAllPersonas(response.data); // Guardar todas las personas para la búsqueda
            })
            .catch((error) => {
                console.error("Error al obtener los datos: ", error);
            });
    }, []);

    // Función para filtrar las personas en tiempo real
    useEffect(() => {
        if (searchTerm.trim() === "") {
            // Si el campo de búsqueda está vacío, mostrar todas las personas
            setPersonas(allPersonas);
        } else {
            // Filtrar las personas según la búsqueda
            const filteredPersonas = allPersonas.filter((persona) =>
                `${persona.nombre} ${persona.apellido}`
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
            setPersonas(filteredPersonas);
        }
    }, [searchTerm, allPersonas]);

    const handleViewDetails = (persona) => {
        setSelectedPersona(persona);
        setShowDetailsModal(true);
    };

    const formatFechaNacimiento = (fecha) => {
        return fecha.substring(0, 10);
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand className="text-white">AST</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Form>
                                <Row>
                                    <Col xs="auto">
                                        <Form.Control
                                            type="text"
                                            placeholder="Buscar usuario"
                                            className="mr-sm-2"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
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
                            </Form>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <section className="container-fluid mh-100 bg-secondary overflow-auto">
                <Row className="m-4 p-4">
                    {personas.length > 0 ? (
                        personas.map((persona, index) => (
                            <Col md={4} key={index}>
                                <Card className="mt-2">
                                    <Card.Body>
                                        <Card.Title>{`${persona.nombre} ${persona.apellido}`}</Card.Title>
                                        <Card.Text>
                                            <strong>Fecha de Nacimiento:</strong>{" "}
                                            {formatFechaNacimiento(persona.fechaNacimiento)}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Teléfono:</strong> {persona.telefono}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Dirección:</strong> {persona.direccion}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Email:</strong> {persona.email}
                                        </Card.Text>
                                        <Button
                                            variant="primary"
                                            onClick={() => handleViewDetails(persona)}
                                        >
                                            Ver Detalles
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>No se encontraron personas.</p>
                    )}
                </Row>
            </section>

            <DetailsModal
                show={showDetailsModal}
                onClose={() => setShowDetailsModal(false)}
                personaId={selectedPersona?._id}
            />
        </>
    );
};

export default Users;