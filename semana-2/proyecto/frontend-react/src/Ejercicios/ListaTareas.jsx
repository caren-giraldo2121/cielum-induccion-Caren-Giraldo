import { useState } from "react";

export default function ListaTareas() {
  const [texto, setTexto] = useState("");
  const [tareas, setTareas] = useState([]);

  function agregar() {
    const t = texto.trim();
    if (!t) return;
    const id = Math.max(0, ...tareas.map((x) => x.id)) + 1;
    setTareas([...tareas, { id, texto: t, hecha: false }]);
    setTexto("");
  }

  function alternar(id) {
    setTareas(tareas.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t)));
  }

  function borrar(id) {
    setTareas(tareas.filter((t) => t.id !== id));
  }

  const pendientes = tareas.filter((t) => !t.hecha).length;

  return (
    <div className="card">
      <h3>Lista de tareas (v2)</h3>

      <div className="linea-simple">
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") agregar(); }}
          placeholder="Nueva tarea"
          aria-label="Nueva tarea"
        />
        <button type="button" className="btn btn-primary" onClick={agregar}>
          Agregar
        </button>
      </div>

      {tareas.length === 0 ? (
        <p className="vacio">Aún no hay tareas.</p>
      ) : (
        <ul className="tareas">
          {tareas.map((t) => (
            <li key={t.id}>
              <label className="check">
                <input type="checkbox" checked={t.hecha} onChange={() => alternar(t.id)} />
                <span style={{ textDecoration: t.hecha ? "line-through" : "none" }}>{t.texto}</span>
              </label>
              <button type="button" className="btn btn-ghost" onClick={() => borrar(t.id)}>Borrar</button>
            </li>
          ))}
        </ul>
      )}

      <p className="muted">{pendientes} pendiente(s) de {tareas.length}</p>
    </div>
  );
}