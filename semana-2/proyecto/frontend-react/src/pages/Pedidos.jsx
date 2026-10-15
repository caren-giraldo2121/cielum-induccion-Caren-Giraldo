import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApi, useMutation } from "../hooks/useApi";
import { useToast } from "../components/Toasts";
import Paginacion from "../components/Paginacion";

export const ESTADOS = ["pendiente", "preparando", "enviado", "entregado", "cancelado"];
const LIMIT = 10;
const FILTROS_VACIOS = { estado: "", cliente: "", desde: "", hasta: "" };

const dinero = (n) => Number(n).toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
const fecha = (s) => (s ? new Date(s).toLocaleDateString("es-CO") : "—");

export default function Pedidos() {
  const toast = useToast();
  const [filtros, setFiltros] = useState(FILTROS_VACIOS);
  const [clienteDebounced, setClienteDebounced] = useState("");
  const [page, setPage] = useState(1);
  const [guardandoId, setGuardandoId] = useState(null);

  // Espera 400 ms tras escribir el cliente antes de consultar
  useEffect(() => {
    const t = setTimeout(() => setClienteDebounced(filtros.cliente), 400);
    return () => clearTimeout(t);
  }, [filtros.cliente]);

  const params = { ...filtros, cliente: clienteDebounced, page, limit: LIMIT };
  const { data, loading, error, refetch } = useApi("/pedidos", params);
  const { mutate } = useMutation("PATCH");

  // La API puede devolver { items, total } o directamente un arreglo
  const items = Array.isArray(data) ? data : data?.items ?? [];
  const total = Array.isArray(data) ? data.length : data?.total ?? items.length;
  const pages = Math.max(1, Math.ceil(total / LIMIT));

  function cambiarFiltro(e) {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
    setPage(1);
  }

  async function cambiarEstado(pedido, estado) {
    setGuardandoId(pedido.id);
    try {
      await mutate(`/pedidos/${pedido.id}`, { estado });
      toast.ok(`Pedido #${pedido.id} ahora está ${estado}.`);
      refetch();
    } catch (err) {
      toast.error(`No se pudo actualizar el pedido #${pedido.id}: ${err.message}`);
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
        <label>Cliente
          <input name="cliente" value={filtros.cliente} onChange={cambiarFiltro} placeholder="Nombre del cliente" />
        </label>
        <label>Desde
          <input type="date" name="desde" value={filtros.desde} onChange={cambiarFiltro} />
        </label>
        <label>Hasta
          <input type="date" name="hasta" value={filtros.hasta} onChange={cambiarFiltro} />
        </label>
        <button className="btn btn-ghost" onClick={() => { setFiltros(FILTROS_VACIOS); setPage(1); }}>
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
              <tr><th>#</th><th>Cliente</th><th>Fecha</th><th>Productos</th><th className="num">Total</th><th>Estado</th></tr>
            </thead>
            <tbody>
              {loading && items.length === 0 && (
                <tr><td colSpan="6" className="vacio">Cargando pedidos…</td></tr>
              )}
              {!loading && items.length === 0 && (
                <tr><td colSpan="6" className="vacio">No hay pedidos con estos filtros.</td></tr>
              )}
              {items.map((p) => (
                <tr key={p.id} className={loading ? "cargando" : ""}>
                  <td>{p.id}</td>
                  <td>{p.cliente}</td>
                  <td>{fecha(p.fecha || p.created_at)}</td>
                  <td>{p.items?.length ?? "—"}</td>
                  <td className="num">{dinero(p.total ?? 0)}</td>
                  <td>
                    <select
                      aria-label={`Estado del pedido ${p.id}`}
                      className={`estado estado-${p.estado}`}
                      value={p.estado}
                      disabled={guardandoId === p.id}
                      onChange={(e) => cambiarEstado(p, e.target.value)}
                    >
                      {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Paginacion page={page} pages={pages} onChange={setPage} />
    </>
  );
}