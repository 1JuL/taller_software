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
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useAuth } from "../../components/AuthContext"; // Importar el contexto de autenticación

const UserPayments = () => {
    const navigate = useNavigate();
    const { user } = useAuth(); // Obtener el usuario autenticado desde el contexto
    const [PagosPorMes, setPagosPorMes] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const obtenerPagosPorPersona = async () => {
            if (user && user.uid) { // Verificar que el usuario esté autenticado y tenga un uid
                try {
                    const response = await axios.get(
                        `https://api-arqui.vercel.app/pagos/persona/uid/${user.uid}`
                    );
                    setPagosPorMes(response.data);
                } catch (error) {
                    console.error("Error al obtener los pagos: ", error);
                }
            }
        };

        obtenerPagosPorPersona();
    }, [user]); // Dependencia: se ejecuta cuando el usuario cambia

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
                                        {new Date(pago.fechaPago).toISOString().substring(0, 10)} <br />{" "}
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
        </>
    );
};

export default UserPayments;