import { useEffect, useState } from "react";

// Intermedio: fetch "a mano" con carga y error (sin token).
// En el nivel avanzado esto se reemplaza por useApi("/productos").
export default function TablaProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);
    fetch(`${import.meta.env.VITE_API_URL || "/api"}/productos`, { signal: ctrl.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`El servidor respondió ${res.status}`);
        return res.json();
      })
      .then(setProductos)
      .catch((e) => { if (e.name !== "AbortError") setError(e.message); })
      .finally(() => { if (!ctrl.signal.aborted) setLoading(false); });
    return () => ctrl.abort();
  }, [intento]);

  return (
    <div className="card">
      <h3>Tabla de productos</h3>
      {loading && <p>Cargando productos…</p>}
      {error && (
        <p className="error" role="alert">
          {error} <button className="btn" onClick={() => setIntento((n) => n + 1)}>Reintentar</button>
        </p>
      )}
      {!loading && !error && (
        productos.length === 0 ? <p className="vacio">No hay productos.</p> : (
          <table>
            <thead><tr><th>ID</th><th>Nombre</th><th className="num">Precio</th><th className="num">Stock</th></tr></thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td><td>{p.nombre}</td>
                  <td className="num">{Number(p.precio).toLocaleString("es-CO")}</td>
                  <td className="num">{p.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
}