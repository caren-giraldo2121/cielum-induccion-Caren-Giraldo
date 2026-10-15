import { Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";

// Avanzado: useApi (con token) + ruta protegida.
// Este componente solo se muestra dentro de <RutaProtegida>, ver App.jsx.
export default function Avanzado() {
  const { data, loading, error, refetch } = useApi("/productos");
  const lista = Array.isArray(data) ? data : data?.items ?? [];

  return (
    <div className="card">
      <h3>useApi + ruta protegida</h3>
      <p className="muted">
        Esta vista vive bajo <code>RutaProtegida</code>: sin token te redirige a <Link to="/login">/login</Link> y
        vuelve aquí al iniciar sesión. <code>useApi</code> agrega el header <code>Authorization</code> y cierra la sesión si el servidor responde 401.
      </p>
      {loading && <p>Cargando…</p>}
      {error && <p className="error" role="alert">{error.message} <button className="btn" onClick={refetch}>Reintentar</button></p>}
      {!loading && !error && <p>{lista.length} producto(s) recibidos con token.</p>}
    </div>
  );
}