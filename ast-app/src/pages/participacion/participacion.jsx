import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { Toast, ToastContainer } from "react-bootstrap";
import { ROUTES } from "../../routes";

const Participacion = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        idTorneo: "",
        idPersona: "",
        puestoObtenido: "",
        partidosJugados: "",
    });
    const [torneos, setTorneos] = useState([]);
    const [personas, setPersonas] = useState([]);
    const [maxPartidos, setMaxPartidos] = useState(null); // Máximo de partidos del torneo seleccionado
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [torneosRes, personasRes] = await Promise.all([
                    axios.get("https://api-arqui.vercel.app/torneos"), // Cambia a tu endpoint de torneos
                    axios.get("https://api-arqui.vercel.app/personas"), // Cambia a tu endpoint de personas
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
            } catch (error) {
                showToast("Error al cargar torneos o personas", true);
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

        // Si se selecciona un torneo, actualiza el número máximo de partidos
        if (name === "idTorneo" && selectedOption) {
            setMaxPartidos(selectedOption.partidosTotales);
        } else if (name === "idTorneo") {
            setMaxPartidos(null); // Restablece si no se selecciona un torneo
        }

        setFormData(updatedFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { idTorneo, idPersona, puestoObtenido, partidosJugados } = formData;

            // Validación básica
            if (!idTorneo || !idPersona || puestoObtenido === "" || partidosJugados === "") {
                showToast("Todos los campos son obligatorios", true);
                return;
            }

            // Validar que partidosJugados no exceda el máximo
            if (parseInt(partidosJugados, 10) > maxPartidos) {
                showToast("La cantidad de partidos jugados no puede superar el máximo permitido", true);
                return;
            }

            // Enviar datos a la API
            console.log(formData);
            await axios.post("https://api-arqui.vercel.app/participaciones", formData);
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

            <h1 className="text-2xl font-bold mb-4 text-light">Agregar Participación</h1>
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
            <button
                type="button"
                className="btn btn-info w-100"
                onClick={() => navigate(ROUTES.HOME.path, { replace: true })}>
                Volver al Inicio
            </button>
        </div>
    );
};

export default Participacion;
