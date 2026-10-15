import { useState } from "react";

const INICIAL = { nombre: "", email: "", rol: "cliente", acepta: false };

export default function FormularioControlado() {
  const [form, setForm] = useState(INICIAL);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(null);

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  function validar() {
    const e = {};
    if (form.nombre.trim().length < 2) e.nombre = "Escribe al menos 2 caracteres.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Correo no válido.";
    if (!form.acepta) e.acepta = "Debes aceptar los términos.";
    return e;
  }

  function onSubmit(ev) {
    ev.preventDefault();
    const e = validar();
    setErrores(e);
    if (Object.keys(e).length === 0) {
      setEnviado(form);
      setForm(INICIAL);
    }
  }

  return (
    <div className="card">
      <h3>Formulario controlado</h3>
      <form onSubmit={onSubmit} noValidate>
        <label>Nombre
          <input name="nombre" value={form.nombre} onChange={onChange} />
          {errores.nombre && <small className="error">{errores.nombre}</small>}
        </label>
        <label>Correo
          <input name="email" type="email" value={form.email} onChange={onChange} />
          {errores.email && <small className="error">{errores.email}</small>}
        </label>
        <label>Rol
          <select name="rol" value={form.rol} onChange={onChange}>
            <option value="cliente">Cliente</option>
            <option value="vendedor">Vendedor</option>
            <option value="admin">Administrador</option>
          </select>
        </label>
        <label className="check">
          <input name="acepta" type="checkbox" checked={form.acepta} onChange={onChange} />
          <span>Acepto los términos</span>
        </label>
        {errores.acepta && <small className="error">{errores.acepta}</small>}
        <button className="btn btn-primary">Enviar</button>
      </form>
      {enviado && <pre className="salida">{JSON.stringify(enviado, null, 2)}</pre>}
    </div>
  );
}