import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi, useMutation } from "../hooks/useApi";
import { useToast } from "../components/Toasts";

const dinero = (n) => Number(n).toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
const nuevaLinea = () => ({ key: crypto.randomUUID(), producto_id: "", cantidad: 1 });

export default function NuevoPedido() {
  const navigate = useNavigate();
  const toast = useToast();
  const { data: productos, loading, error, refetch } = useApi("/productos");
  const { mutate, loading: enviando } = useMutation("POST");

  const [cliente, setCliente] = useState("");
  const [lineas, setLineas] = useState([nuevaLinea()]);
  const [errores, setErrores] = useState([]);

  const lista = Array.isArray(productos) ? productos : productos?.items ?? [];
  const porId = Object.fromEntries(lista.map((p) => [String(p.id), p]));

  const cambiarLinea = (key, campo, valor) =>
    setLineas((ls) => ls.map((l) => (l.key === key ? { ...l, [campo]: valor } : l)));
  const quitarLinea = (key) => setLineas((ls) => ls.filter((l) => l.key !== key));

  const total = lineas.reduce((acc, l) => {
    const p = porId[l.producto_id];
    return acc + (p ? p.precio * (Number(l.cantidad) || 0) : 0);
  }, 0);

  function validar() {
    const e = [];
    if (!cliente.trim()) e.push("Escribe el nombre del cliente.");
    if (lineas.length === 0) e.push("Agrega al menos un producto.");
    const vistos = new Set();
    lineas.forEach((l, i) => {
      const n = i + 1;
      const p = porId[l.producto_id];
      if (!p) return e.push(`Línea ${n}: elige un producto.`);
      if (vistos.has(l.producto_id)) e.push(`Línea ${n}: "${p.nombre}" ya está en el pedido.`);
      vistos.add(l.producto_id);
      const c = Number(l.cantidad);
      if (!Number.isInteger(c) || c < 1) e.push(`Línea ${n}: la cantidad debe ser un entero mayor a 0.`);
      else if (p.stock !== undefined && c > p.stock) e.push(`Línea ${n}: solo hay ${p.stock} unidades de "${p.nombre}".`);
    });
    return e;
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    const e = validar();
    setErrores(e);
    if (e.length) return;
    try {
      const pedido = await mutate("/pedidos", {
        cliente: cliente.trim(),
        items: lineas.map((l) => ({ producto_id: Number(l.producto_id), cantidad: Number(l.cantidad) })),
      });
      toast.ok(pedido?.id ? `Pedido #${pedido.id} creado.` : "Pedido creado.");
      navigate("/pedidos");
    } catch (err) {
      setErrores([err.message]);
      toast.error("No se pudo crear el pedido.");
    }
  }

  if (loading) return <p>Cargando productos…</p>;
  if (error) {
    return (
      <div className="card error" role="alert">
        <p>No se pudieron cargar los productos: {error.message}</p>
        <button className="btn" onClick={refetch}>Reintentar</button>
      </div>
    );
  }

  return (
    <>
      <div className="page-head"><h1>Nuevo pedido</h1></div>
      <form className="card" onSubmit={onSubmit} noValidate>
        <label>Cliente
          <input value={cliente} onChange={(e) => setCliente(e.target.value)} />
        </label>

        <fieldset>
          <legend>Productos</legend>
          {lineas.map((l, i) => {
            const p = porId[l.producto_id];
            return (
              <div className="linea" key={l.key}>
                <select aria-label={`Producto de la línea ${i + 1}`} value={l.producto_id}
                        onChange={(e) => cambiarLinea(l.key, "producto_id", e.target.value)}>
                  <option value="">Elige un producto</option>
                  {lista.map((pr) => (
                    <option key={pr.id} value={pr.id} disabled={pr.stock === 0}>
                      {pr.nombre} — {dinero(pr.precio)}{pr.stock === 0 ? " (agotado)" : ""}
                    </option>
                  ))}
                </select>
                <input type="number" min="1" step="1" aria-label={`Cantidad de la línea ${i + 1}`}
                       value={l.cantidad} onChange={(e) => cambiarLinea(l.key, "cantidad", e.target.value)} />
                <span className="num subtotal">{p ? dinero(p.precio * (Number(l.cantidad) || 0)) : "—"}</span>
                <button type="button" className="btn btn-ghost" onClick={() => quitarLinea(l.key)}
                        aria-label={`Quitar línea ${i + 1}`}>Quitar</button>
              </div>
            );
          })}
          <button type="button" className="btn" onClick={() => setLineas((ls) => [...ls, nuevaLinea()])}>
            Agregar producto
          </button>
        </fieldset>

        <p className="total">Total: <strong>{dinero(total)}</strong></p>

        {errores.length > 0 && (
          <ul className="error" role="alert">{errores.map((m) => <li key={m}>{m}</li>)}</ul>
        )}

        <div className="acciones">
          <button type="button" className="btn btn-ghost" onClick={() => navigate("/pedidos")}>Cancelar</button>
          <button className="btn btn-primary" disabled={enviando}>{enviando ? "Guardando…" : "Crear pedido"}</button>
        </div>
      </form>
    </>
  );
}