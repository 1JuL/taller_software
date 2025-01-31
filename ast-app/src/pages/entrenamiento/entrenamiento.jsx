import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { ROUTES } from "../../routes";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Entrenamiento = () => {
  const navigate = useNavigate();
  const [entrenamientos, setEntrenamientos] = useState([]);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [idBuscar, setIdBuscar] = useState("");
  const [entrenamientoEncontrado, setEntrenamientoEncontrado] = useState(null);
  const [entrenamientoSeleccionado, setEntrenamientoSeleccionado] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [asistentes, setAsistentes] = useState([]);
  const [showAsistentesModal, setShowAsistentesModal] = useState(false);

  const fetchAsistentes = async (entrenamientoId) => {
    console.log("ID del entrenamiento:", entrenamientoId);

    try {
      const response = await fetch(
        `https://api-arqui.vercel.app/asistencias/entrenamiento/${entrenamientoId}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Datos de asistentes recibidos:", data);

        // Asegúrate de que `data` sea un array
        setAsistentes(Array.isArray(data) ? data : []);
        setShowAsistentesModal(true);
      } else {
        alert("Esta clase no tiene asistentes.");
        setAsistentes([]); // Vaciar la lista si hay error
      }
    } catch (error) {
      alert(`Error de conexión: ${error.message}`);
      setAsistentes([]); // Vaciar la lista en caso de error de conexión
    }
  };

  // Función para obtener los entrenamientos
  const fetchEntrenamientos = async () => {
    try {
      const response = await fetch(
        "https://api-arqui.vercel.app/entrenamientos"
      );
      if (response.ok) {
        const data = await response.json();

        // Filtrar los datos y formatear fecha/hora
        const filteredData = data.map(({ fecha, hora, _id }) => ({
          _id,
          fecha: new Date(fecha).toISOString().substring(0, 10), // Formato YYYY-MM-DD
          hora: hora.slice(0, 5), // Extraer solo HH:MM de "hora"
        }));

        setEntrenamientos(filteredData);
      } else {
        setError("Error al obtener los entrenamientos.");
      }
    } catch (err) {
      setError(`Error de conexión: ${err.message}`);
    }
  };
  // Función para obtener la lista de personas
  const fetchPersonas = async () => {
    try {
      const response = await fetch("https://api-arqui.vercel.app/personas");
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

  // Función para buscar un entrenamiento por ID
  const buscarEntrenamiento = async () => {
    try {
      const response = await fetch(
        `https://api-arqui.vercel.app/entrenamientos/${idBuscar}`
      );
      if (response.ok) {
        const data = await response.json();
        setEntrenamientoEncontrado(data); // Mostrar el entrenamiento encontrado
        setMensaje("Entrenamiento encontrado!");
      } else {
        setMensaje("Entrenamiento no encontrado.");
        setEntrenamientoEncontrado(null);
      }
    } catch (error) {
      setMensaje(`Error de conexión: ${error.message}`);
      setEntrenamientoEncontrado(null);
    }
  };

  // Función para eliminar un entrenamiento
  const eliminarEntrenamiento = async (id) => {
    try {
      const response = await fetch(
        `https://api-arqui.vercel.app/entrenamientos/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setMensaje("Entrenamiento eliminado con éxito.");
        setEntrenamientos(entrenamientos.filter((ent) => ent._id !== id)); // Filtrar el entrenamiento eliminado
      } else {
        setMensaje("Error al eliminar el entrenamiento.");
      }
    } catch (error) {
      setMensaje(`Error de conexión: ${error.message}`);
    }
  };

  // Función para seleccionar un entrenamiento
  const seleccionarEntrenamiento = (entrenamiento) => {
    setEntrenamientoSeleccionado(entrenamiento);
    setMensaje(`Entrenamiento ${entrenamiento._id} seleccionado.`);
    setShowModal(true); // Mostrar el modal al seleccionar un entrenamiento
  };

  // Función para registrar al estudiante en el entrenamiento
  const registrarEstudiante = async (entrenamientoId) => {
    try {
      const datos = {
        idPersona: selectedStudent,
        idEntrenamiento: entrenamientoId,
        asistencia: true,
      };

      // Ver los datos que se envían en la solicitud
      console.log("Datos que se envían:", datos);

      const response = await fetch("https://api-arqui.vercel.app/asistencias", {
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

  // Función para manejar el envío de un nuevo entrenamiento
  const handlePost = async () => {
    try {
      const response = await fetch(
        "https://api-arqui.vercel.app/entrenamientos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fecha, hora }), // Enviar los datos de fecha y hora
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMensaje("Entrenamiento creado con éxito!");
        fetchEntrenamientos(); // Actualizar la lista después de un POST
        console.log("Respuesta del servidor:", data);
      } else {
        const errorData = await response.json();
        setMensaje(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMensaje(`Error de conexión: ${error.message}`);
    }
  };

  // Función para actualizar un entrenamiento
  const actualizarEntrenamiento = async (id) => {
    try {
      const response = await fetch(
        `https://api-arqui.vercel.app/entrenamientos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fecha, hora }), // Enviar los nuevos datos de fecha y hora
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMensaje("Entrenamiento actualizado con éxito!");
        fetchEntrenamientos(); // Actualizar la lista después de la actualización
        setIsEditing(false); // Desactivar el modo de edición
        setFecha(""); // Limpiar el formulario
        setHora("");
      } else {
        setMensaje("Error al actualizar el entrenamiento.");
      }
    } catch (error) {
      setMensaje(`Error de conexión: ${error.message}`);
    }
  };
  const buscarEntrenamientoPorFecha = async () => {
    try {
      const response = await fetch(
        `https://api-arqui.vercel.app/entrenamientos/buscar/fecha/${fecha}`
      );
      if (response.ok) {
        const data = await response.json();
        setEntrenamientos(data); // Asumiendo que `data` contiene los entrenamientos encontrados
        setMensaje("Entrenamientos encontrados!");
      } else {
        const errorData = await response.json();
        setMensaje(errorData.message); // Mensaje en caso de no encontrar entrenamientos
        setEntrenamientos([]); // Limpiar los entrenamientos anteriores
      }
    } catch (error) {
      setMensaje(`Error de conexión: ${error.message}`);
      setEntrenamientos([]); // Limpiar los entrenamientos en caso de error
    }
  };

  const buscarEntrenamientoPorHora = async () => {
    try {
      const response = await fetch(
        `https://api-arqui.vercel.app/entrenamientos/buscar/hora/${hora}`
      );
      if (response.ok) {
        const data = await response.json();
        setEntrenamientos(data); // Asumiendo que `data` contiene los entrenamientos encontrados
        setMensaje("Entrenamientos encontrados!");
      } else {
        const errorData = await response.json();
        setMensaje(errorData.message); // Mostrar mensaje si no hay entrenamientos
        setEntrenamientos([]); // Limpiar la lista si no hay resultados
      }
    } catch (error) {
      setMensaje(`Error de conexión: ${error.message}`);
      setEntrenamientos([]); // Limpiar la lista en caso de error
    }
  };


  // Llamar a fetchEntrenamientos cuando el componente se monte
  useEffect(() => {
    fetchEntrenamientos();
  }, []);

  useEffect(() => {
    if (showModal) {
      fetchPersonas();
    }
  }, [showModal]);

  return (
    <div className="p-4" style={{ color: "white" }}>
      <h1>Entrenamientos</h1>

      {/* Input para búsqueda por ID */}
      <div className="mb-3">
        <label htmlFor="fechaBuscar" className="form-label">
          Buscar Entrenamiento por Fecha
        </label>
        <input
          type="date"
          id="fechaBuscar"
          className="form-control"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)} // Aquí capturas la fecha
        />
        <button
          type="button"
          className="btn btn-primary mt-2"
          onClick={buscarEntrenamientoPorFecha} // Función para buscar por fecha
        >
          Buscar Entrenamiento
        </button>
      </div>

      <div className="mb-3">
        <label htmlFor="horaBuscar" className="form-label">
          Buscar Entrenamiento por Hora
        </label>
        <input
          type="time"
          id="horaBuscar"
          className="form-control"
          value={hora} // Aquí mantienes el estado para la hora
          onChange={(e) => setHora(e.target.value)} // Actualizas el estado con la hora
        />
        <button
          type="button"
          className="btn btn-primary mt-2"
          onClick={buscarEntrenamientoPorHora} // Función para buscar por hora
        >
          Buscar Entrenamiento
        </button>
      </div>


      {/* Mensaje de estado */}
      {mensaje && <div className="mt-3 alert alert-info">{mensaje}</div>}

      {/* Mostrar el entrenamiento encontrado */}
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

      {/* Inputs para fecha y hora */}
      <div className="mb-3">
        <label htmlFor="fecha" className="form-label">
          Fecha
        </label>
        <input
          type="date"
          id="fecha"
          className="form-control"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="hora" className="form-label">
          Hora
        </label>
        <input
          type="time"
          id="hora"
          className="form-control"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />
      </div>

      {/* Botón para enviar los datos */}
      <button
        type="button"
        className="btn btn-success w-100"
        onClick={
          isEditing
            ? () => actualizarEntrenamiento(entrenamientoSeleccionado._id)
            : handlePost
        }
      >
        {isEditing ? "Guardar Cambios" : "Crear Entrenamiento"}
      </button>

      {/* Mostrar error si lo hay */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Mostrar entrenamientos */}
      {entrenamientos.length > 0 ? (
        <ul className="list-group">
          {entrenamientos.map(({ _id, fecha, hora }) => (
            <li
              key={_id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{fecha}</strong> - {hora}
              </div>
              <button
                className="btn btn-primary"
                onClick={() => seleccionarEntrenamiento({ _id, fecha, hora })}
              >
                Seleccionar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => eliminarEntrenamiento(_id)}
              >
                Eliminar
              </button>

              <button
                className="btn btn-warning"
                onClick={() => {
                  setIsEditing(true); // Activar el modo de edición
                  setEntrenamientoSeleccionado({ _id, fecha, hora }); // Llenar los datos para editar
                  setFecha(fecha); // Establecer los valores actuales
                  setHora(hora); // Establecer la hora actual
                }}
              >
                Editar
              </button>
              <button
                className="btn btn-info"
                onClick={() => fetchAsistentes(_id)} // Este botón abre el modal de asistentes
              >
                Ver Asistentes
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay entrenamientos disponibles.</p>
      )}

      {/* Modal para registrar un estudiante */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Estudiante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="studentSelect" className="form-label">
              Selecciona un Estudiante
            </label>
            <select
              id="studentSelect"
              className="form-control"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              <option value="">Seleccione un estudiante</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.nombre} {student.apellido}
                </option>
              ))}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button
            variant="primary"
            onClick={() => registrarEstudiante(entrenamientoSeleccionado._id)} // Cambio aquí
            disabled={!selectedStudent}
          >
            Registrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showAsistentesModal}
        onHide={() => setShowAsistentesModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Estudiantes Asistentes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {asistentes.length > 0 ? (
            <ul>
              {asistentes.map((asistencia) => (
                <li key={asistencia._id}>
                  {asistencia.idPersona.nombre} {asistencia.idPersona.apellido}
                  {/* Aquí asumiendo que el nombre está dentro de idPersona */}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay estudiantes registrados para este entrenamiento.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAsistentesModal(false)}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <ButtonGroup
        style={{
          position: "absolute",
          bottom: "0",
          right: "0",
          margin: "30px",
        }}>
        <button
          type="button"
          className="btn btn-info w-100"
          onClick={() => navigate(ROUTES.HOME.path, { replace: true })}>
          Volver al Inicio
        </button>
      </ButtonGroup>
    </div>
  );
};

export default Entrenamiento;