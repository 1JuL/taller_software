import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toast, ToastContainer } from "react-bootstrap";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import MsgToast from "./MsgToast";
import { ROUTES } from "../routes";

const Register = ({ role = "user" }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [emailValid, setEmailValid] = useState(true);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    telefono: "",
    direccion: "",
    email: "",
    password: "",
  });

  const getTitle = () => {
    switch (role) {
      case "admin":
        return "Administrador";
      case "staff":
        return "Entrenador";
      case "user":
      default:
        return "Usuario";
    }
  };

  const goBack = () => {
    switch (role) {
      case "admin":
        return navigate(ROUTES.HOME.path, { replace: true });
      case "staff":
        return navigate(ROUTES.HOME.path, { replace: true });
      case "user":
        return navigate(ROUTES.HOME.path, { replace: true });
      case null:
      default:
        return navigate(ROUTES.ROOT.path, { replace: true });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "nombre") {
      if (!/^[a-zA-Z6\s]*$/.test(value)) return;
    }

    if (name === "apellido") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }

    if (name === "telefono") {
      if (!/^\d*$/.test(value)) {
        setMessage("El teléfono solo puede contener números.");
        setType("error");
        setShow(true);
        return;
      }

      // Limitar a solo dígitos
      const newValue = value.replace(/\D/g, ""); // Eliminar cualquier carácter que no sea un dígito

      // Permitir la escritura progresiva hasta 10 dígitos
      if (newValue.length > 10) {
        setMessage("El teléfono debe tener máximo 10 dígitos.");
        setType("error");
        setShow(true);
        return;
      }

      // Validar solo cuando el usuario haya ingresado los 10 dígitos
      if (newValue.length === 10) {
        const phonePattern = /^3\d{9}$/; // Empieza con 3 y tiene 9 dígitos más
        const zeroPattern = /00000+/; // No puede tener más de 3 ceros consecutivos

        if (!phonePattern.test(newValue)) {
          setMessage("El teléfono debe empezar con 3 y tener 10 dígitos.");
          setType("error");
          setShow(true);
          return;
        }

        if (zeroPattern.test(newValue)) {
          setMessage(
            "El teléfono no puede tener más de cuatro ceros consecutivos."
          );
          setType("error");
          setShow(true);
          return;
        }
      }
    }

    if (name === "email") {
      // Validación del email solo al cambiarlo, no en cada letra
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (name === "direccion") {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (name === "fechaNacimiento") {
      const year = new Date(value).getFullYear();
      const currentYear = new Date().getFullYear();

      if (year < 1875) {
        setMessage("La fecha de nacimiento no puede ser anterior a 1875.");
        setType("error");
        setShow(true);
        return;
      } else if (year > currentYear) {
        setMessage("Digite una fecha válida.");
        setType("error");
        setShow(true);
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const direccionPattern = /^[a-zA-Z]{4,12}#\d{1,3}([A-Za-z]{3})?-\d{1,3}([A-Za-z]{3})?$/;
    if (!direccionPattern.test(formData.direccion)) {
      setMessage("La dirección no tiene el formato correcto.");
      setType("error");
      setShow(true);
      return; // Detener el envío si la dirección es inválida
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(formData.email)) {
      setMessage("Por favor, ingresa un correo electrónico válido.");
      setType("error");
      setShow(true);
      return; // Detener el envío si el email es inválido
    }

    try {
      // 1. Crear el usuario en Firebase Auth
      const { email, password } = formData;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const uid = user.uid; // Obtener el UID del usuario creado

      // 2. Guardar los datos adicionales en MongoDB
      const userData = {
        uid,
        nombre: formData.nombre,
        apellido: formData.apellido,
        fechaNacimiento: formData.fechaNacimiento,
        telefono: formData.telefono,
        direccion: formData.direccion,
        email: formData.email,
        role,
      };
      const response = await axios.post(
        "https://api-arqui.vercel.app/personas",
        userData
      );
      console.log("Persona creada:", response.data);

      setMessage("Registro exitoso");
      setType("success");
      setShow(true);
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar la persona:", error);
      setMessage(`Hubo un problema: ${error.message || error}`);
      setType("error");
      setShow(true);
    }
  };

  return (
    <section className="h-100 d-flex justify-content-center align-items-center text-white">
      <div
        className="card p-4 shadow mh-100 my-2 overflow-auto bg-secondary text-white"
        style={{ maxWidth: "500px" }}>
        <h1 className="text-center mb-4">
          Formulario de Registro {getTitle()}
        </h1>{" "}
        {/* Muestra el rol en el título */}
        {/* Toast para mostrar mensajes de error */}
        <MsgToast type={type} message={message} show={show} setShow={setShow} />
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-12">
              <label className="form-label" htmlFor="nombre">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className="form-control bg-dark text-white border-light"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12">
              <label className="form-label" htmlFor="apellido">
                Apellido
              </label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                className="form-control bg-dark text-white border-light"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12">
              <label className="form-label" htmlFor="fechaNacimiento">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                id="fechaNacimiento"
                name="fechaNacimiento"
                className="form-control bg-dark text-white border-light"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12">
              <label className="form-label" htmlFor="telefono">
                Teléfono
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                className="form-control bg-dark text-white border-light"
                value={formData.telefono}
                onChange={handleChange}
                maxLength="10"
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12">
              <label className="form-label" htmlFor="direccion">
                Dirección
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                className="form-control bg-dark text-white border-light"
                value={formData.direccion}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control bg-dark text-white border-light"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12">
              <label className="form-label" htmlFor="password">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control bg-dark text-white border-light"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Registrarme
          </button>
          <button
            type="button"
            className="btn btn-light w-100 mt-3"
            onClick={goBack}>
            Volver
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
