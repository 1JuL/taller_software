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
import Toast from "react-bootstrap/Toast";
import axios from "axios";
import PersonModal from "../../components/PersonModal";

const Home = () => {
    const navigate = useNavigate();
    const [personas, setPersonas] = useState([]);
    const [selectedPersona, setSelectedPersona] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("view");
    const [showToast, setShowToast] = useState(false);
    const [personaToDelete, setPersonaToDelete] = useState(null);

    useEffect(() => {
        axios
            .get("https://api-arqui.vercel.app/personas")
            .then((response) => {
                setPersonas(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener los datos: ", error);
            });
    }, []);

    const handleEdit = (persona) => {
        setSelectedPersona(persona);
        setModalMode("edit");
        setShowModal(true);
    };

    const handleView = (persona) => {
        setSelectedPersona(persona);
        setModalMode("view");
        setShowModal(true);
    };

    const handleSave = (updatedPersona) => {
        const personaId = selectedPersona._id;
        axios
            .put(`https://api-arqui.vercel.app/personas/${personaId}`, updatedPersona)  // Usamos el `id` para la URL
            .then((response) => {
                setPersonas(personas.map((p) => (p._id === personaId ? response.data : p)));
                setShowModal(false);
            })
            .catch((error) => {
                console.error("Error al actualizar la persona: ", error);
            });
    };

    const handleDeleteRequest = (persona) => {
        setPersonaToDelete(persona);
        setShowToast(true);
    };

    const handleDeleteCancel = () => {
        setPersonaToDelete(null);
        setShowToast(false);
    };

    const handleDeleteConfirm = () => {
        if (personaToDelete) {
            axios
                .delete(`https://api-arqui.vercel.app/personas/${personaToDelete._id}`)
                .then(() => {
                    setPersonas(personas.filter((p) => p._id !== personaToDelete._id));
                    setShowToast(false); // Cerrar el Toast
                })
                .catch((error) => {
                    console.error("Error al eliminar la persona: ", error);
                });
        }
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
                    <Navbar.Collapse id="basic-navbar-nav ">
                        <Nav className="me-auto">
                            <Form>
                                <Row>
                                    <Col xs="auto">
                                        <Form.Control type="text" placeholder="Usuario" className="mr-sm-2" />
                                    </Col>
                                    <Col xs="auto">
                                        <Button type="submit">Buscar</Button>
                                    </Col>
                                    <Col>
                                        <button
                                            type="button"
                                            className="btn btn-info w-100"
                                            onClick={() => navigate(ROUTES.HOME.path, { replace: true })}>
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
                    {personas.map((persona, index) => (
                        <Col md={4} key={index}>
                            <Card className="mt-2">
                                <Card.Body>
                                    <Card.Title>{`${persona.nombre} ${persona.apellido}`}</Card.Title>
                                    <Card.Text>
                                        <strong>Fecha de Nacimiento:</strong> {formatFechaNacimiento(persona.fechaNacimiento)}
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
                                    <Button variant="primary" className="me-2" onClick={() => handleView(persona)}>
                                        Ver Detalles
                                    </Button>
                                    <Button variant="warning" className="me-2" onClick={() => handleEdit(persona)}>
                                        Actualizar
                                    </Button>
                                    <Button variant="danger" className="me-2" onClick={() => handleDeleteRequest(persona)}>
                                        Eliminar
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>

            <PersonModal
                show={showModal}
                onClose={() => setShowModal(false)}
                persona={selectedPersona}
                onSave={handleSave}
                mode={modalMode}
            />

            <Toast
                style={{
                    position: "fixed",
                    top: 20,
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#343a40",
                    color: "#fff"
                }}
                show={showToast}
                onClose={handleDeleteCancel}
                delay={5000}
                autohide
            >
                <Toast.Body>
                    <p>¿Estás seguro de que deseas eliminar a esta persona?</p>
                    <Button variant="danger" onClick={handleDeleteConfirm} className="me-2">
                        Sí
                    </Button>
                    <Button variant="primary" onClick={handleDeleteCancel}>
                        No
                    </Button>
                </Toast.Body>
            </Toast>

        </>
    );
};

export default Home;
