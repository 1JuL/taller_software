import React, { useState } from "react";

const Register = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData, null, 2));
  };

  return (
    <section className="w-100 h-100 d-flex justify-content-center align-items-center">
      <div
        className="p-4 m-3 shadow h-100 rounded bg-secondary text-white"
        style={{ maxWidth: "500px" }}>
        <h1 className="text-center mb-2">Formulario de Registro</h1>
        <form onSubmit={handleSubmit}>
          <div className="row mb-2">
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
          <div className="row mb-2">
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
          <div className="row mb-2">
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
          <div className="row mb-2">
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
          <div className="row mb-2">
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
          <div className="row mb-2">
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
        </form>
      </div>
    </section>
  );
};

export default Register;
