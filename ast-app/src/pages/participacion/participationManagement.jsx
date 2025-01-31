import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { Toast, ToastContainer } from "react-bootstrap";
import { ROUTES } from "../../routes";

const ParticipationManagement = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        idTorneo: "",
        idPersona: "",
        puestoObtenido: "",
        partidosJugados: "",
    });
    const [torneos, setTorneos] = useState([]);
    const [personas, setPersonas] = useState([]);
    const [participaciones, setParticipaciones] = useState([]);
    const [maxPartidos, setMaxPartidos] = useState(null);
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);
    const [selectedParticipacion, setSelectedParticipacion] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [torneosRes, personasRes, participacionesRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/torneos`),
                    axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/personas`),
                    axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/participaciones`),
                ]);

                setTorneos(
                    torneosRes.data.map((torneo) => ({
                        value: torneo._id,
                        label: `${torneo.nombreTorneo} (ID: ${torneo._id}) - ${torneo.partidosTotales} partidos`,
                        partidosTotales: torneo.partidosTotales,
                    }))
                );

                setPersonas(
                    personasRes.data.map((persona) => ({
                        value: persona._id,
                        label: `${persona.nombre} ${persona.apellido}`,
                    }))
                );

                const participacionesWithDetails = participacionesRes.data.map((participacion) => {

                    const torneo = torneosRes.data.find((t) => t._id === participacion.idTorneo._id);
                    const persona = personasRes.data.find((p) => p._id === participacion.idPersona._id);

                    const torneoNombre = torneo ? torneo.nombreTorneo : "Torneo desconocido";
                    const personaNombre = persona ? `${persona.nombre} ${persona.apellido}` : "Persona desconocida";

                    return {
                        value: participacion._id,
                        label: `${torneoNombre} - ${personaNombre} - Participación ID: ${participacion._id}`,
                    };
                });

                setParticipaciones(participacionesWithDetails);
            } catch (error) {
                showToast("Error al cargar datos", true);
            }
        };

        fetchData();
    }, []);




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSelectChange = (selectedOption, { name }) => {
        const updatedFormData = { ...formData, [name]: selectedOption ? selectedOption.value : "" };

        if (name === "idTorneo" && selectedOption) {
            setMaxPartidos(selectedOption.partidosTotales);
        } else if (name === "idTorneo") {
            setMaxPartidos(null);
        }

        setFormData(updatedFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { idTorneo, idPersona, puestoObtenido, partidosJugados } = formData;

            if (!idTorneo || !idPersona || puestoObtenido === "" || partidosJugados === "") {
                showToast("Todos los campos son obligatorios", true);
                return;
            }

            if (parseInt(partidosJugados, 10) > maxPartidos) {
                showToast("La cantidad de partidos jugados no puede superar el máximo permitido", true);
                return;
            }

            await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/participaciones`, formData);
            showToast("Participación agregada con éxito", false);
            setFormData({
                idTorneo: "",
                idPersona: "",
                puestoObtenido: "",
                partidosJugados: "",
            });
            setMaxPartidos(null);
        } catch (error) {
            showToast(error.response?.data?.message || "Ocurrió un error al agregar la participación", true);
        }
    };

    const handleDelete = async () => {
        if (!selectedParticipacion) {
            showToast("Debe seleccionar una participación para eliminar", true);
            return;
        }

        try {
            await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/participaciones/${selectedParticipacion.value}`);
            showToast("Participación eliminada con éxito", false);
            setParticipaciones((prev) => prev.filter((p) => p.value !== selectedParticipacion.value));
            setSelectedParticipacion(null);
        } catch (error) {
            showToast(error.response?.data?.message || "Error al eliminar la participación", true);
        }
    };

    const showToast = (message, isError) => {
        setMessage(message);
        setShow(true);
    };

    return (
        <div className="container mx-auto mt-5">
            <ToastContainer position="top-center" className="mt-4">
                <Toast
                    onClose={() => setShow(false)}
                    show={show}
                    delay={3000}
                    autohide
                    className={message.includes("éxito") ? "bg-success text-white" : "bg-danger text-white"}
                >
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
            </ToastContainer>

            <h2 className="text-2xl font-bold mb-4 text-light">Agregar Participación</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-white text-sm font-medium">Torneo</label>
                    <Select
                        name="idTorneo"
                        options={torneos}
                        onChange={handleSelectChange}
                        placeholder="Selecciona un torneo"
                        isClearable
                    />
                </div>
                <div>
                    <label className="block text-white text-sm font-medium">Persona</label>
                    <Select
                        name="idPersona"
                        options={personas}
                        onChange={handleSelectChange}
                        placeholder="Selecciona una persona"
                        isClearable
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-light text-sm font-medium mr-4">Puesto Obtenido</label>
                    <input
                        type="number"
                        name="puestoObtenido"
                        value={formData.puestoObtenido}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md bg-light text-dark"
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-light text-sm font-medium mr-4">
                        Partidos Jugados {maxPartidos !== null && `(Máximo: ${maxPartidos})`}
                    </label>
                    <input
                        type="number"
                        name="partidosJugados"
                        value={formData.partidosJugados}
                        onChange={handleInputChange}
                        max={maxPartidos || ""}
                        className="w-full px-4 py-2 border rounded-md bg-light text-dark"
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-success w-100 mb-4 rounded-md hover:bg-blue-600 mt-4"
                >
                    Agregar Participación
                </button>
            </form>

            <h2 className="text-2xl font-bold mb-4 text-light">Eliminar Participación</h2>
            <div className="mt-4">
                <label className="block text-white text-sm font-medium">Seleccionar Participación</label>
                <Select
                    options={participaciones}
                    onChange={(option) => setSelectedParticipacion(option)}
                    placeholder="Selecciona una participación"
                    isClearable
                />
            </div>
            <button
                type="button"
                className="btn btn-danger w-100 mt-4 rounded-md hover:bg-red-600"
                onClick={handleDelete}
            >
                Eliminar Participación
            </button>

            <button
                type="button"
                className="btn btn-info w-100 mt-4"
                onClick={() => navigate(ROUTES.HOME.path, { replace: true })}
            >
                Volver al Inicio
            </button>
        </div>
    );
};

export default ParticipationManagement;