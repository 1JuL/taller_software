import React, { useState, useEffect } from "react";
import { Modal, Button, Card, Row, Col } from "react-bootstrap";
import axios from "axios";

const DetailsModal = ({ show, onClose, personaId }) => {
    const [participaciones, setParticipaciones] = useState([]);
    const [torneos, setTorneos] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga

    // Obtener las participaciones y los torneos
    useEffect(() => {
        if (personaId && show) { // Solo ejecutar si el modal está abierto y hay un personaId
            setIsLoading(true); // Activar el estado de carga
            setParticipaciones([]); // Limpiar las participaciones anteriores

            // Obtener las participaciones
            axios
                .get(`${import.meta.env.VITE_REACT_APP_API_URL}/participaciones`)
                .then((response) => {
                    const participacionesPersona = response.data.filter(
                        (participacion) => participacion.idPersona._id === personaId
                    );
                    setParticipaciones(participacionesPersona);
                })
                .catch((error) => {
                    console.error("Error al obtener participaciones: ", error);
                });

            // Obtener los torneos
            axios
                .get(`${import.meta.env.VITE_REACT_APP_API_URL}/torneos`)
                .then((response) => {
                    setTorneos(response.data);
                    setIsLoading(false); // Desactivar el estado de carga
                })
                .catch((error) => {
                    console.error("Error al obtener torneos: ", error);
                    setIsLoading(false); // Desactivar el estado de carga en caso de error
                });
        }
    }, [personaId, show]); // Dependencias: personaId y show

    // Función para obtener el nombre del torneo basado en el _id
    const getNombreTorneo = (torneoId) => {
        const torneo = torneos.find((t) => t._id === torneoId);
        return torneo ? torneo.nombreTorneo : "Torneo no encontrado";
    };

    // Limpiar el modal al cerrar
    const handleClose = () => {
        setParticipaciones([]); // Limpiar las participaciones
        setTorneos([]); // Limpiar los torneos
        onClose(); // Ejecutar la función onClose proporcionada por el padre
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Participaciones En Torneos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoading ? ( // Mostrar un mensaje de carga mientras se obtienen los datos
                    <p>Cargando participaciones...</p>
                ) : participaciones.length === 0 ? ( // Mostrar un mensaje si no hay participaciones
                    <p>No hay participaciones para esta persona.</p>
                ) : (
                    <Row>
                        {participaciones.map((participacion, index) => (
                            <Col md={4} key={index}>
                                <Card className="mb-4">
                                    <Card.Body>
                                        <Card.Text>
                                            <strong>Nombre del Torneo:</strong>{" "}
                                            {getNombreTorneo(participacion.idTorneo._id)}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>ID del Torneo:</strong>{" "}
                                            {participacion.idTorneo._id}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Fecha del Torneo:</strong>{" "}
                                            {participacion.idTorneo.fecha}
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
                        ))}
                    </Row>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DetailsModal;