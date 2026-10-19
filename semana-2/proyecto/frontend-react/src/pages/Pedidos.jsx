import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../hooks/useApi.js";
import { useAuth } from "../auth/AuthContext.jsx";
import { Mensaje, Cargando, EstadoVacio } from "../components/ui.jsx";

const ESTADOS = ["Pendiente", "Pagado", "Enviado", "Entregado", "Cancelado"];
const FILTROS_INICIALES = { estado: "", id_cliente: "", desde: "", hasta: "", limite: 10 };

export default function Pedidos() {
  const { authFetch } = useAuth();

  const [form, setForm] = useState(FILTROS_INICIALES);      // lo que se escribe
  const [aplicados, setAplicados] = useState(FILTROS_INICIALES); // lo que se consulta
  const [pagina, setPagina] = useState(1);

  const params = useMemo(
    () => ({
      estado: aplicados.estado || undefined,
      id_cliente: aplicados.id_cliente || undefined,
      desde: aplicados.desde || undefined,
      hasta: aplicados.hasta || undefined,
      pagina,
      limite: aplicados.limite,
    }),
    [aplicados, pagina]
  );

  const { data, loading, error, refetch } = useApi("/pedidos", { params });
  const pedidos = data?.resultados ?? [];
  const haySiguiente = pedidos.length === Number(aplicados.limite);

  // edición de estado por fila
  const [edits, setEdits] = useState({});
  const [aviso, setAviso] = useState(null);
  const [guardandoId, setGuardandoId] = useState(null);

  const onFiltro = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const buscar = (e) => {
    e.preventDefault();
    setPagina(1);
    setAplicados(form);
    setEdits({});
  };

  const limpiar = () => {
    setForm(FILTROS_INICIALES);
    setAplicados(FILTROS_INICIALES);
    setPagina(1);
  };

  const guardarEstado = async (pedido) => {
    const nuevoEstado = edits[pedido.id_pedido] ?? pedido.estado;
    setGuardandoId(pedido.id_pedido);
    setAviso(null);
    try {
      await authFetch(`/pedidos/${pedido.id_pedido}`, {
        method: "PUT",
        body: { id_cliente: pedido.id_cliente, estado: nuevoEstado },
      });
      setAviso({ tipo: "ok", texto: `Pedido #${pedido.id_pedido} actualizado a "${nuevoEstado}".` });
      await refetch();
      setEdits((prev) => {
        const copia = { ...prev };
        delete copia[pedido.id_pedido];
        return copia;
      });
    } catch (err) {
      setAviso({ tipo: "error", texto: err.message });
    } finally {
      setGuardandoId(null);
    }
  };

  return (
    <div>
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="page-title">Pedidos</h1>
          <p className="page-sub">Listado con filtros, paginación y cambio de estado.</p>
        </div>
        <Link to="/pedidos/nuevo"><button>+ Nuevo pedido</button></Link>
      </div>

      {/* Filtros */}
      <form className="card" onSubmit={buscar}>
        <div className="row">
          <div className="field">
            <label>Estado</label>
            <select name="estado" value={form.estado} onChange={onFiltro}>
              <option value="">Todos</option>
              {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          <div className="field">
            <label>ID cliente</label>
            <input name="id_cliente" type="number" min="1" value={form.id_cliente} onChange={onFiltro} />
          </div>
          <div className="field">
            <label>Desde</label>
            <input name="desde" type="date" value={form.desde} onChange={onFiltro} />
          </div>
          <div className="field">
            <label>Hasta</label>
            <input name="hasta" type="date" value={form.hasta} onChange={onFiltro} />
          </div>
          <div className="field" style={{ maxWidth: 110 }}>
            <label>Por página</label>
            <select name="limite" value={form.limite} onChange={onFiltro}>
              {[5, 10, 20, 50].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>
        <div className="row">
          <button type="submit">Buscar</button>
          <button type="button" className="secundario" onClick={limpiar}>Limpiar</button>
        </div>
      </form>

      {aviso && <Mensaje tipo={aviso.tipo}>{aviso.texto}</Mensaje>}

      {/* Resultados */}
      <div className="card">
        {loading && <Cargando>Cargando pedidos…</Cargando>}
        {error && !loading && <Mensaje tipo="error">{error}</Mensaje>}

        {!loading && !error && (
          pedidos.length ? (
            <>
              <table>
                <thead>
                  <tr>
                    <th>#</th><th>Cliente</th><th>Fecha</th><th>Estado</th><th style={{ width: 230 }}>Cambiar estado</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map((p) => (
                    <tr key={p.id_pedido}>
                      <td>{p.id_pedido}</td>
                      <td>{p.id_cliente}</td>
                      <td>{p.fecha_pedido ? String(p.fecha_pedido).slice(0, 10) : "—"}</td>
                      <td><span className="badge">{p.estado}</span></td>
                      <td>
                        <div className="row" style={{ flexWrap: "nowrap", alignItems: "center" }}>
                          <select
                            value={edits[p.id_pedido] ?? p.estado}
                            onChange={(e) => setEdits((prev) => ({ ...prev, [p.id_pedido]: e.target.value }))}
                          >
                            {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
                          </select>
                          <button
                            className="sm"
                            disabled={guardandoId === p.id_pedido || (edits[p.id_pedido] ?? p.estado) === p.estado}
                            onClick={() => guardarEstado(p)}
                          >
                            {guardandoId === p.id_pedido ? "…" : "Guardar"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pagination">
                <button className="secundario sm" disabled={pagina === 1 || loading}
                        onClick={() => setPagina((p) => Math.max(1, p - 1))}>← Anterior</button>
                <span>Página {pagina}</span>
                <button className="secundario sm" disabled={!haySiguiente || loading}
                        onClick={() => setPagina((p) => p + 1)}>Siguiente →</button>
              </div>
            </>
          ) : <EstadoVacio>No hay pedidos con esos filtros.</EstadoVacio>
        )}
      </div>
    </div>
  );
}
