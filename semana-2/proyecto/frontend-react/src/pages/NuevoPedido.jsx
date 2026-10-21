import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi.js";
import { useAuth } from "../auth/AuthContext.jsx";
import { Mensaje, Cargando } from "../components/ui.jsx";

// Un pedido nuevo solo puede nacer Pendiente, Pagado o Enviado (la API también lo valida).
// Entregado y Cancelado se asignan después desde la lista de pedidos.
const ESTADOS = ["Pendiente", "Pagado", "Enviado"];
const moneda = (n) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n || 0);

const lineaVacia = () => ({ id_producto: "", cantidad: 1, precio_unitario: "" });

export default function NuevoPedido() {
  const { authFetch } = useAuth();
  const navigate = useNavigate();

  const { data: clientes, loading: cargandoClientes, error: errClientes } = useApi("/clientes");
  const { data: productos, loading: cargandoProductos, error: errProductos } = useApi("/productos");

  const [idCliente, setIdCliente] = useState("");
  const [estado, setEstado] = useState("Pendiente");
  const [detalles, setDetalles] = useState([lineaVacia()]);
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const listaProductos = Array.isArray(productos) ? productos : [];
  const listaClientes = Array.isArray(clientes) ? clientes : [];

  const cambiarLinea = (i, campo, valor) => {
    setDetalles((prev) => {
      const copia = prev.map((l) => ({ ...l }));
      copia[i][campo] = valor;
      // al elegir producto, autocompleta el precio con el del catálogo
      if (campo === "id_producto") {
        const prod = listaProductos.find((p) => String(p.id_producto) === String(valor));
        if (prod) copia[i].precio_unitario = prod.precio;
      }
      return copia;
    });
  };

  const agregarLinea = () => setDetalles((prev) => [...prev, lineaVacia()]);
  const quitarLinea = (i) => setDetalles((prev) => prev.filter((_, idx) => idx !== i));

  const total = detalles.reduce(
    (acc, l) => acc + (Number(l.cantidad) || 0) * (Number(l.precio_unitario) || 0),
    0
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!idCliente) return setError("Selecciona un cliente.");
    const limpias = detalles.filter((l) => l.id_producto);
    if (limpias.length === 0) return setError("Agrega al menos un producto.");
    for (const l of limpias) {
      if (!(Number(l.cantidad) > 0)) return setError("Las cantidades deben ser mayores que 0.");
      if (!(Number(l.precio_unitario) > 0)) return setError("Los precios deben ser mayores que 0.");
    }

    const body = {
      id_cliente: Number(idCliente),
      estado,
      detalles: limpias.map((l) => ({
        id_producto: Number(l.id_producto),
        cantidad: Number(l.cantidad),
        precio_unitario: Number(l.precio_unitario),
      })),
    };

    setEnviando(true);
    try {
      const res = await authFetch("/pedidos", { method: "POST", body });
      const id = res?.pedido?.id_pedido;
      navigate("/pedidos", { replace: true, state: { creado: id } });
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  };

  if (cargandoClientes || cargandoProductos) return <Cargando>Cargando catálogo…</Cargando>;

  return (
    <div>
      <h1 className="page-title">Nuevo pedido</h1>
      <p className="page-sub">Selecciona el cliente y agrega uno o más productos.</p>

      {(errClientes || errProductos) && (
        <Mensaje tipo="error">{errClientes || errProductos}</Mensaje>
      )}
      {error && <Mensaje tipo="error">{error}</Mensaje>}

      <form onSubmit={onSubmit}>
        <div className="card">
          <div className="row">
            <div className="field">
              <label>Cliente</label>
              <select value={idCliente} onChange={(e) => setIdCliente(e.target.value)}>
                <option value="">— Selecciona —</option>
                {listaClientes.map((c) => (
                  <option key={c.id_cliente} value={c.id_cliente}>
                    {c.id_cliente} · {c.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="field" style={{ maxWidth: 200 }}>
              <label>Estado</label>
              <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Productos</h3>
          <table>
            <thead>
              <tr><th>Producto</th><th style={{ width: 110 }}>Cantidad</th><th style={{ width: 150 }}>Precio unit.</th><th style={{ width: 130 }}>Subtotal</th><th></th></tr>
            </thead>
            <tbody>
              {detalles.map((l, i) => (
                <tr key={i}>
                  <td>
                    <select value={l.id_producto} onChange={(e) => cambiarLinea(i, "id_producto", e.target.value)}>
                      <option value="">— Producto —</option>
                      {listaProductos.map((p) => (
                        <option key={p.id_producto} value={p.id_producto}>{p.nombre}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input type="number" min="1" value={l.cantidad}
                           onChange={(e) => cambiarLinea(i, "cantidad", e.target.value)} />
                  </td>
                  <td>
                    <input type="number" min="0" step="0.01" value={l.precio_unitario}
                           onChange={(e) => cambiarLinea(i, "precio_unitario", e.target.value)} />
                  </td>
                  <td>{moneda((Number(l.cantidad) || 0) * (Number(l.precio_unitario) || 0))}</td>
                  <td>
                    {detalles.length > 1 && (
                      <button type="button" className="secundario sm" onClick={() => quitarLinea(i)}>✕</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 12 }}>
            <button type="button" className="secundario sm" onClick={agregarLinea}>+ Agregar producto</button>
          </div>
          <div className="row" style={{ justifyContent: "flex-end", marginTop: 14, fontWeight: 700 }}>
            Total: {moneda(total)}
          </div>
        </div>

        <div className="row">
          <button type="submit" disabled={enviando}>{enviando ? "Creando…" : "Crear pedido"}</button>
          <button type="button" className="secundario" onClick={() => navigate("/pedidos")}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
