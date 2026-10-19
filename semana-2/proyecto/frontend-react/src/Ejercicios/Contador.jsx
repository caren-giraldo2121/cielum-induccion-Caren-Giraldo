import { useState } from "react";

export default function Contador() {
  const [valor, setValor] = useState(0);
  return (
    <div className="card">
      <h3>Contador</h3>
      <div className="contador-valor">{valor}</div>
      <div className="row">
        <button className="secundario" onClick={() => setValor((v) => v - 1)}>−1</button>
        <button className="secundario" onClick={() => setValor(0)}>Reiniciar</button>
        <button onClick={() => setValor((v) => v + 1)}>+1</button>
      </div>
    </div>
  );
}
