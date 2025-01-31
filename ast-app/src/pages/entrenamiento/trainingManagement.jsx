import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import EntrenamientoList from "../../components/EntrenamientoList"
import EntrenamientoForm from "../../components/EntrenamientoForm";
import BuscarEntrenamiento from "../../components/BuscarEntrenamiento";
import RegistrarEstudianteModal from "../../components/RegistrarEstudianteModal";
import AsistentesModal from "../../components/AsistentesModal";
import EditarEntrenamientoModal from "../../components/EditarEntrenamientoModal";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const TrainingManagement = () => {
    const navigate = useNavigate();
    const [entrenamientos, setEntrenamientos] = useState([]);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [entrenamientoEncontrado, setEntrenamientoEncontrado] = useState(null);
    const [entrenamientoSeleccionado, setEntrenamientoSeleccionado] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState("");
    const [asistentes, setAsistentes] = useState([]);
    const [showAsistentesModal, setShowAsistentesModal] = useState(false);
    const [showEditarModal, setShowEditarModal] = useState(false); // Estado para el modal de edición

    const fetchEntrenamientos = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/entrenamientos`);
            if (response.ok) {
                const data = await response.json();
                const filteredData = data.map(({ fecha, hora, _id }) => ({
                    _id,
                    fecha: new Date(fecha).toISOString().substring(0, 10),
                    hora: hora.slice(0, 5),
                }));
                setEntrenamientos(filteredData);
            } else {
                setError("Error al obtener los entrenamientos.");
            }
        } catch (err) {
            setError(`Error de conexión: ${err.message}`);
        }
    };

    const fetchPersonas = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/personas`);
            if (response.ok) {
                const data = await response.json();
                setStudents(data);
            } else {
                console.error("Error al obtener la lista de personas.");
            }
        } catch (error) {
            console.error(`Error de conexión: ${error.message}`);
        }
    };

    const fetchAsistentes = async (entrenamientoId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/asistencias/entrenamiento/${entrenamientoId}`);
            if (response.ok) {
                const data = await response.json();
                setAsistentes(Array.isArray(data) ? data : []);
                setShowAsistentesModal(true);
            } else {
                alert("Esta clase no tiene asistentes.");
                setAsistentes([]);
            }
        } catch (error) {
            alert(`Error de conexión: ${error.message}`);
            setAsistentes([]);
        }
    };

    const handlePost = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/entrenamientos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fecha, hora }),
            });
            if (response.ok) {
                const data = await response.json();
                setMensaje("Entrenamiento creado con éxito!");
                fetchEntrenamientos();
            } else {
                const errorData = await response.json();
                setMensaje(`Error: ${errorData.message}`);
            }
        } catch (error) {
            setMensaje(`Error de conexión: ${error.message}`);
        }
    };

    const actualizarEntrenamiento = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/entrenamientos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fecha, hora }),
            });
            if (response.ok) {
                const data = await response.json();
                setMensaje("Entrenamiento actualizado con éxito!");
                fetchEntrenamientos();
                setShowEditarModal(false); // Cerrar el modal después de guardar
            } else {
                setMensaje("Error al actualizar el entrenamiento.");
            }
        } catch (error) {
            setMensaje(`Error de conexión: ${error.message}`);
        }
    };

    const eliminarEntrenamiento = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/entrenamientos/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setMensaje("Entrenamiento eliminado con éxito.");
                setEntrenamientos(entrenamientos.filter((ent) => ent._id !== id));
            } else {
                setMensaje("Error al eliminar el entrenamiento.");
            }
        } catch (error) {
            setMensaje(`Error de conexión: ${error.message}`);
        }
    };

    const seleccionarEntrenamiento = (entrenamiento) => {
        setEntrenamientoSeleccionado(entrenamiento);
        setMensaje(`Entrenamiento ${entrenamiento._id} seleccionado.`);
        setShowModal(true);
    };

    const registrarEstudiante = async (entrenamientoId) => {
        try {
            const datos = {
                idPersona: selectedStudent,
                idEntrenamiento: entrenamientoId,
                asistencia: true,
            };
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/asistencias`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos),
            });
            if (response.ok) {
                alert("Estudiante registrado con éxito.");
                setShowModal(false);
                setSelectedStudent("");
            } else {
                alert("Error al registrar el estudiante.");
            }
        } catch (error) {
            alert(`Error de conexión: ${error.message}`);
        }
    };

    const buscarEntrenamientoPorFecha = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/entrenamientos/buscar/fecha/${fecha}`);
            if (response.ok) {
                const data = await response.json();
                setEntrenamientos(data);
                setMensaje("Entrenamientos encontrados!");
            } else {
                const errorData = await response.json();
                setMensaje(errorData.message);
                setEntrenamientos([]);
            }
        } catch (error) {
            setMensaje(`Error de conexión: ${error.message}`);
            setEntrenamientos([]);
        }
    };

    const buscarEntrenamientoPorHora = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/entrenamientos/buscar/hora/${hora}`);
            if (response.ok) {
                const data = await response.json();
                setEntrenamientos(data);
                setMensaje("Entrenamientos encontrados!");
            } else {
                const errorData = await response.json();
                setMensaje(errorData.message);
                setEntrenamientos([]);
            }
        } catch (error) {
            setMensaje(`Error de conexión: ${error.message}`);
            setEntrenamientos([]);
        }
    };

    useEffect(() => {
        fetchEntrenamientos();
    }, []);

    useEffect(() => {
        if (showModal) {
            fetchPersonas();
        }
    }, [showModal]);

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
            <div className="p-4" style={{ color: "white" }}>
                <h1>Entrenamientos</h1>

                <BuscarEntrenamiento
                    fecha={fecha}
                    setFecha={setFecha}
                    hora={hora}
                    setHora={setHora}
                    onBuscarPorFecha={buscarEntrenamientoPorFecha}
                    onBuscarPorHora={buscarEntrenamientoPorHora}
                />

                {mensaje && <div className="mt-3 alert alert-info">{mensaje}</div>}

                {entrenamientoEncontrado && (
                    <div className="mt-3">
                        <h3>Entrenamiento Encontrado</h3>
                        <p>
                            <strong>ID:</strong> {entrenamientoEncontrado._id}
                        </p>
                        <p>
                            <strong>Fecha:</strong>{" "}
                            {new Intl.DateTimeFormat("es-CO", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                            }).format(new Date(entrenamientoEncontrado.fecha))}
                        </p>
                        <p>
                            <strong>Hora:</strong> {entrenamientoEncontrado.hora.slice(0, 5)}
                        </p>
                    </div>
                )}

                <EntrenamientoForm
                    fecha={fecha}
                    setFecha={setFecha}
                    hora={hora}
                    setHora={setHora}
                    onSubmit={handlePost}
                />

                {error && <div className="alert alert-danger">{error}</div>}

                {entrenamientos.length > 0 ? (
                    <EntrenamientoList
                        entrenamientos={entrenamientos}
                        onSelect={seleccionarEntrenamiento}
                        onDelete={eliminarEntrenamiento}
                        onEdit={(entrenamiento) => {
                            setEntrenamientoSeleccionado(entrenamiento);
                            setFecha(entrenamiento.fecha);
                            setHora(entrenamiento.hora);
                            setShowEditarModal(true); // Abrir el modal de edición
                        }}
                        onViewAsistentes={fetchAsistentes}
                    />
                ) : (
                    <p>No hay entrenamientos disponibles.</p>
                )}

                <RegistrarEstudianteModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    students={students}
                    selectedStudent={selectedStudent}
                    setSelectedStudent={setSelectedStudent}
                    onRegistrar={() => registrarEstudiante(entrenamientoSeleccionado._id)}
                />

                <AsistentesModal
                    show={showAsistentesModal}
                    onHide={() => setShowAsistentesModal(false)}
                    asistentes={asistentes}
                />

                <EditarEntrenamientoModal
                    show={showEditarModal}
                    onHide={() => setShowEditarModal(false)}
                    entrenamiento={entrenamientoSeleccionado}
                    fecha={fecha}
                    setFecha={setFecha}
                    hora={hora}
                    setHora={setHora}
                    onGuardar={() => actualizarEntrenamiento(entrenamientoSeleccionado._id)}
                />
            </div>
        </>
    );
};

export default TrainingManagement;