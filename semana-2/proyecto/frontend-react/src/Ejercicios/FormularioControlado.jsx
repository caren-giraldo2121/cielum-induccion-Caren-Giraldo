import { useState } from "react";
import { Mensaje } from "../components/ui.jsx";

const INICIAL = { nombre: "", email: "", rol: "cliente", acepta: false };

export default function FormularioControlado() {
  const [form, setForm] = useState(INICIAL);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const onChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const validar = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es obligatorio.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Correo no válido.";
    if (!form.acepta) e.acepta = "Debes aceptar los términos.";
    return e;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const e = validar();
    setErrores(e);
    setEnviado(Object.keys(e).length === 0);
  };

  return (
    <div className="card">
      <h3>Formulario controlado</h3>
      {enviado && <Mensaje tipo="ok">¡Datos válidos! Hola, {form.nombre}.</Mensaje>}
      <form onSubmit={onSubmit}>
        <div className="field">
          <label>Nombre</label>
          <input name="nombre" value={form.nombre} onChange={onChange} />
          {errores.nombre && <small className="error">{errores.nombre}</small>}
        </div>
        <div className="field">
          <label>Correo</label>
          <input name="email" type="email" value={form.email} onChange={onChange} />
          {errores.email && <small className="error">{errores.email}</small>}
        </div>
        <div className="field">
          <label>Rol</label>
          <select name="rol" value={form.rol} onChange={onChange}>
            <option value="cliente">Cliente</option>
            <option value="vendedor">Vendedor</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <div className="field tarea" style={{ borderBottom: "none" }}>
          <input id="acepta" type="checkbox" name="acepta" checked={form.acepta} onChange={onChange} />
          <label htmlFor="acepta" style={{ margin: 0 }}>Acepto los términos</label>
        </div>
        {errores.acepta && <small className="error">{errores.acepta}</small>}
        <div style={{ marginTop: 12 }}>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
}
