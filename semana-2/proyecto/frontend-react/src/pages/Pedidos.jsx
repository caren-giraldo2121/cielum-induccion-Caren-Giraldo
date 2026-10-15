import { useState } from "react";
import { Link } from "react-router-dom";
import { useApi, useMutation } from "../hooks/useApi";
import { useToast } from "../components/Toasts";
import Paginacion from "../components/Paginacion";

// SUPOSICIÓN: confirma estos valores con `\d pedidos` o el código de la API.
export const ESTADOS = ["Pendiente", "Procesando", "Enviado", "Entregado", "Cancelado"];
const LIMITE = 10;
const FILTROS_VACIOS = { estado: "", id_cliente: "", desde: "", hasta: "" };

const fecha = (s) => (s ? new Date(s).toLocaleDateString("es-CO") : "—");

export default function Pedidos() {
  const toast = useToast();
  const [filtros, setFiltros] = useState(FILTROS_VACIOS);
  const [pagina, setPagina] = useState(1);
  const [guardandoId, setGuardandoId] = useState(null);

  // SUPOSICIÓN: la API lee `pagina` y `limite` (así los devuelve) y los filtros con estos nombres.
  const params = { ...filtros, pagina, limite: LIMITE };
  const { data, loading, error, refetch } = useApi("/pedidos", params);
  const { mutate } = useMutation("PUT");

  const items = data?.resultados ?? [];
  const hayMas = items.length >= (data?.limite ?? LIMITE);

  function cambiarFiltro(e) {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
    setPagina(1);
  }

  async function cambiarEstado(pedido, estado) {
    setGuardandoId(pedido.id_pedido);
    try {
            // PUT /pedidos/:id con { id_cliente, estado }, como espera la API
      await mutate(`/pedidos/${pedido.id_pedido}`, { id_cliente: pedido.id_cliente, estado });
      toast.ok(`Pedido #${pedido.id_pedido} ahora está ${estado}.`);
      refetch();
    } catch (err) {
      toast.error(`No se pudo actualizar el pedido #${pedido.id_pedido}: ${err.message}`);
    } finally {
      setGuardandoId(null);
    }
  }

  return (
    <>
      <div className="page-head">
        <h1>Pedidos</h1>
        <Link className="btn btn-primary" to="/pedidos/nuevo">Nuevo pedido</Link>
      </div>

      <div className="card filtros">
        <label>Estado
          <select name="estado" value={filtros.estado} onChange={cambiarFiltro}>
            <option value="">Todos</option>
            {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
          </select>
        </label>
        <label>ID de cliente
          <input type="number" min="1" name="id_cliente" value={filtros.id_cliente} onChange={cambiarFiltro} />
        </label>
        <label>Desde
          <input type="date" name="desde" value={filtros.desde} onChange={cambiarFiltro} />
        </label>
        <label>Hasta
          <input type="date" name="hasta" value={filtros.hasta} onChange={cambiarFiltro} />
        </label>
        <button className="btn btn-ghost" onClick={() => { setFiltros(FILTROS_VACIOS); setPagina(1); }}>
          Limpiar filtros
        </button>
      </div>

      {error && (
        <div className="card error" role="alert">
          <p>{error.message}</p>
          <button className="btn" onClick={refetch}>Reintentar</button>
        </div>
      )}

      {!error && (
        <div className="card tabla-wrap" aria-busy={loading}>
          <table>
            <thead>
              <tr><th>#</th><th>Cliente</th><th>Fecha</th><th>Estado</th></tr>
            </thead>
            <tbody>
              {loading && items.length === 0 && (
                <tr><td colSpan="4" className="vacio">Cargando pedidos…</td></tr>
              )}
              {!loading && items.length === 0 && (
                <tr><td colSpan="4" className="vacio">No hay pedidos con estos filtros.</td></tr>
              )}
              {items.map((p) => (
                <tr key={p.id_pedido} className={loading ? "cargando" : ""}>
                  <td>{p.id_pedido}</td>
                  <td>Cliente {p.id_cliente}</td>
                  <td>{fecha(p.fecha_pedido)}</td>
                  <td>
                    <select
                      aria-label={`Estado del pedido ${p.id_pedido}`}
                      className={`estado estado-${String(p.estado).toLowerCase()}`}
                      value={p.estado}
                      disabled={guardandoId === p.id_pedido}
                      onChange={(e) => cambiarEstado(p, e.target.value)}
                    >
                      {/* incluye el estado actual aunque no esté en la lista */}
                      {[...new Set([p.estado, ...ESTADOS])].map((e) => <option key={e} value={e}>{e}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Paginacion page={pagina} hasNext={hayMas} onChange={setPagina} />
    </>
  );
}