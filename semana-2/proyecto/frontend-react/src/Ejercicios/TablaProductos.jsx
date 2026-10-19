import { useApi } from "../hooks/useApi.js";
import { Mensaje, Cargando, EstadoVacio } from "../components/ui.jsx";

const moneda = (n) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

export default function TablaProductos() {
  // Consume GET /productos (protegido por token) usando el custom hook.
  const { data: productos, loading, error, refetch } = useApi("/productos");

  return (
    <div className="card">
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0 }}>Tabla de productos</h3>
        <button className="secundario sm" onClick={() => refetch()} disabled={loading}>Recargar</button>
      </div>

      {loading && <Cargando>Cargando productos…</Cargando>}
      {error && !loading && <Mensaje tipo="error">{error}</Mensaje>}

      {!loading && !error && (
        Array.isArray(productos) && productos.length ? (
          <table>
            <thead>
              <tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Stock</th></tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id_producto}>
                  <td>{p.id_producto}</td>
                  <td>{p.nombre}</td>
                  <td>{moneda(p.precio)}</td>
                  <td>{p.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <EstadoVacio>No hay productos.</EstadoVacio>
      )}
    </div>
  );
}
