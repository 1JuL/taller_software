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

  // Expresiones regulares para validación
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const direccionPattern = /^(?=(?:[^#]*#){0,1}[^#]*$)(?=(?:[^-]*-){0,1}[^-]*$)[a-zA-Z0-9\s#-]+$/;
  const telefonoPattern = /^3\d{9}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "nombre":
        if (!/^[a-zA-Z6\s]*$/.test(value)) return;
        break;

      case "apellido":
        if (!/^[a-zA-Z\s]*$/.test(value)) return;
        break;

      case "telefono":
        if (!/^\d*$/.test(value) || value.length > 10) return;
        break;

      case "direccion":
        if (!direccionPattern.test(value)) return;
        break;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];

    // Validación de todos los campos
    if (!formData.nombre.trim()) errors.push("El nombre es requerido");
    if (!formData.apellido.trim()) errors.push("El apellido es requerido");

    if (!formData.fechaNacimiento) {
      errors.push("La fecha de nacimiento es requerida");
    } else {
      const fecha = new Date(formData.fechaNacimiento);
      if (isNaN(fecha)) errors.push("Fecha inválida");
      const year = fecha.getFullYear();
      const currentYear = new Date().getFullYear()
      const hundredyear = currentYear - 100
      const sixyears = currentYear - 6
      if (year < hundredyear || year > sixyears) {
        errors.push(`Fecha de nacimiento fuera del rango válido (${hundredyear}-${sixyears})`);
      }
    }

    // Validación del teléfono
    if (!telefonoPattern.test(formData.telefono)) {
      errors.push("Teléfono debe tener 10 dígitos y comenzar con 3");
    } else {
      // Validación adicional: No ceros en el cuarto y quinto dígito
      if (formData.telefono[3] === "0" || formData.telefono[4] === "0") {
        errors.push("El teléfono no puede tener ceros en el cuarto y quinto dígito");
      }

      // Validación adicional: No más de 3 ceros seguidos
      if (/(0{4,})/.test(formData.telefono)) {
        errors.push("El teléfono no puede tener más de 3 ceros seguidos");
      }
    }

    if (!direccionPattern.test(formData.direccion)) {
      errors.push("La dirección solo permite letras, números, # y -");
    }

    if (!emailPattern.test(formData.email)) {
      errors.push("Correo electrónico inválido");
    }

    if (formData.password.length < 6) {
      errors.push("La contraseña debe tener al menos 6 caracteres");
    }

    if (errors.length > 0) {
      setMessage(errors.join(" || "));
      setType("error");
      setShow(true);
      return;
    }

    try {
      // Crear usuario en Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      const uid = user.uid; //

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

      console.log(userData)

      // Guardar en MongoDB
      await axios.post("https://api-arqui.vercel.app/personas",
        userData
      );

      setMessage("Registro exitoso!");
      setType("success");
      setShow(true);
      console.log("Registro Exitoso")
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
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
