import { useState } from "react";

export default function ListaTareas() {
  const [tareas, setTareas] = useState([
    { id: 1, texto: "Levantar la API", hecha: true },
    { id: 2, texto: "Conectar el frontend", hecha: false },
  ]);
  const [texto, setTexto] = useState("");

  const agregar = (e) => {
    e.preventDefault();
    const t = texto.trim();
    if (!t) return;
    setTareas((prev) => [...prev, { id: Date.now(), texto: t, hecha: false }]);
    setTexto("");
  };

  const alternar = (id) =>
    setTareas((prev) => prev.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t)));

  const eliminar = (id) => setTareas((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="card">
      <h3>Lista de tareas</h3>
      <form className="row" onSubmit={agregar}>
        <input placeholder="Nueva tarea…" value={texto} onChange={(e) => setTexto(e.target.value)} />
        <button type="submit">Agregar</button>
      </form>
      <div style={{ marginTop: 12 }}>
        {tareas.length === 0 && <p className="estado-vacio">Sin tareas.</p>}
        {tareas.map((t) => (
          <div key={t.id} className={`tarea ${t.hecha ? "hecha" : ""}`}>
            <input type="checkbox" checked={t.hecha} onChange={() => alternar(t.id)} />
            <span>{t.texto}</span>
            <button className="secundario sm" onClick={() => eliminar(t.id)}>Quitar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
