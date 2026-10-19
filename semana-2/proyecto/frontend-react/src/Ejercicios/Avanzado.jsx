import { useApi } from "../hooks/useApi.js";
import { Mensaje, Cargando } from "../components/ui.jsx";

// Demuestra el hook useApi consumiendo un endpoint PROTEGIDO (/auth/perfil):
// solo responde si el token enviado en la cabecera es válido.
export default function Avanzado() {
  const { data, loading, error } = useApi("/auth/perfil");

  return (
    <div className="card">
      <h3>Avanzado · useApi + ruta protegida</h3>
      <p className="page-sub" style={{ marginBottom: 12 }}>
        Esta tarjeta llama a <code>/auth/perfil</code> con el token mediante el hook
        <code> useApi</code>. Además, todas estas páginas están envueltas en
        <code> &lt;RutaProtegida&gt;</code>: sin iniciar sesión te redirige al login.
      </p>
      {loading && <Cargando>Verificando token…</Cargando>}
      {error && !loading && <Mensaje tipo="error">{error}</Mensaje>}
      {data && !loading && !error && (
        <Mensaje tipo="ok">
          Token válido. Sesión de: <strong>{data.usuario?.email}</strong>
        </Mensaje>
      )}
    </div>
  );
}
