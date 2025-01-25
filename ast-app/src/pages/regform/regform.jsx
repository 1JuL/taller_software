import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    telefono: "",
    direccion: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "telefono" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(JSON.stringify(formData, null, 2));

    try {
      const response = await axios.post(
        "https://api-arqui.vercel.app/personas",
        formData
      );
      console.log("Persona creada:", response.data);
      alert("Registro exitoso");
    } catch (error) {
      console.error("Error al registrar la persona:", error);
      alert("Hubo un problema al registrar la persona");
    }
  };

  return (
    <section className=" h-100 d-flex justify-content-center align-items-center bg-#213547 text-white">
      <div
        className="card p-4 shadow mh-100 my-2 overflow-auto bg-secondary text-white"
        style={{ maxWidth: "500px" }}>
        <h1 className="text-center mb-4">Formulario de Registro</h1>
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
          <button type="submit" className="btn btn-primary w-100">
            Registrarme
          </button>
          <button
            type="button"
            className="btn btn-light w-100 mt-3"
            onClick={() => navigate("/")}>
            Volver al Inicio
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
