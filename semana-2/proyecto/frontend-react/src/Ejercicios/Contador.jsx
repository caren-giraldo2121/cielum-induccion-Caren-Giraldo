import { useState } from "react";

export default function Contador() {
  const [n, setN] = useState(0);
  return (
    <div className="card">
      <h3>Contador</h3>
      <p className="grande">{n}</p>
      <div className="acciones">
        <button className="btn" onClick={() => setN((v) => v - 1)}>−1</button>
        <button className="btn" onClick={() => setN(0)}>Reiniciar</button>
        <button className="btn btn-primary" onClick={() => setN((v) => v + 1)}>+1</button>
      </div>
    </div>
  );
}