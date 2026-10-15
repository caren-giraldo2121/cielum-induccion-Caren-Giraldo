import { useState } from "react";

export default function ListaTareas() {
  const [texto, setTexto] = useState("");
  const [tareas, setTareas] = useState([]);

  function agregar(e) {
    e.preventDefault();
    const t = texto.trim();
    if (!t) return;
    setTareas((ts) => [...ts, { id: crypto.randomUUID(), texto: t, hecha: false }]);
    setTexto("");
  }
  const alternar = (id) => setTareas((ts) => ts.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t)));
  const borrar = (id) => setTareas((ts) => ts.filter((t) => t.id !== id));
  const pendientes = tareas.filter((t) => !t.hecha).length;

  return (
    <div className="card">
      <h3>Lista de tareas</h3>
      <form onSubmit={agregar} className="linea-simple">
        <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Nueva tarea" aria-label="Nueva tarea" />
        <button className="btn btn-primary">Agregar</button>
      </form>
      {tareas.length === 0 ? <p className="vacio">Aún no hay tareas.</p> : (
        <ul className="tareas">
          {tareas.map((t) => (
            <li key={t.id}>
              <label className="check">
                <input type="checkbox" checked={t.hecha} onChange={() => alternar(t.id)} />
                <span style={{ textDecoration: t.hecha ? "line-through" : "none" }}>{t.texto}</span>
              </label>
              <button className="btn btn-ghost" onClick={() => borrar(t.id)}>Borrar</button>
            </li>
          ))}
        </ul>
      )}
      <p className="muted">{pendientes} pendiente(s) de {tareas.length}</p>
    </div>
  );
}