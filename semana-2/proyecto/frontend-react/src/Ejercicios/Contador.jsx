import { useState } from "react";

export default function Contador() {
  const [n, setN] = useState(0);
  const [paso, setPaso] = useState(1);
  const [historial, setHistorial] = useState([]);

  function mover(delta) {
    const nuevo = n + delta;
    setN(nuevo);
    setHistorial((h) => [`${delta > 0 ? "+" : ""}${delta} → ${nuevo}`, ...h].slice(0, 5));
  }

  function reiniciar() {
    setN(0);
    setHistorial([]);
  }

  return (
    <div className="card">
      <h3>Contador</h3>
      <p className="grande">{n}</p>

      <label>Paso
        <input type="number" min="1" value={paso}
               onChange={(e) => setPaso(Math.max(1, Number(e.target.value) || 1))} />
      </label>

      <div className="acciones">
        <button className="btn" onClick={() => mover(-paso)}>−{paso}</button>
        <button className="btn" onClick={reiniciar}>Reiniciar</button>
        <button className="btn btn-primary" onClick={() => mover(paso)}>+{paso}</button>
      </div>

      {historial.length > 0 && (
        <ul className="muted">{historial.map((h, i) => <li key={i}>{h}</li>)}</ul>
      )}
    </div>
  );
}