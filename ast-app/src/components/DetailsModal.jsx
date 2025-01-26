//DetailsModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button, Card, Row, Col } from "react-bootstrap";
import axios from "axios";

const DetailsModal = ({ show, onClose, personaId }) => {
    const [participaciones, setParticipaciones] = useState([]);

    useEffect(() => {
        if (personaId) {
            axios
                .get(`https://api-arqui.vercel.app/participaciones`)
                .then((response) => {
                    const participacionesPersona = response.data.filter(
                        (participacion) => participacion.idPersona._id === personaId // Asegúrate de que el ID coincide
                    );
                    setParticipaciones(participacionesPersona);
                })
                .catch((error) => {
                    console.error("Error al obtener participaciones: ", error);
                });
        }
    }, [personaId]);

    return (
        <Modal show={show} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Participaciones En Torneos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {participaciones.length === 0 ? (
                    <p>No hay participaciones para esta persona.</p>
                ) : (
                    <Row>
                        {participaciones.map((participacion, index) => (
                            <Col md={4} key={index}>
                                <Card className="mb-4">
                                    <Card.Body>

                                        <Card.Text>
                                            <strong>Fecha del Torneo:</strong> {participacion.idTorneo.fecha}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Puesto Obtenido:</strong> {participacion.puestoObtenido}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Partidos Jugados:</strong> {participacion.partidosJugados}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Promedio de Participación:</strong> {participacion.promedioParticipacion.toFixed(2)}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DetailsModal;
