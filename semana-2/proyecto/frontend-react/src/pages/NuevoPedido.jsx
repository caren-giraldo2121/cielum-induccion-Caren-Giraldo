import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi, useMutation } from "../hooks/useApi";
import { useToast } from "../components/Toasts";

const dinero = (n) => Number(n).toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
const nuevaLinea = () => ({ key: crypto.randomUUID(), id_producto: "", cantidad: 1 });

// SUPOSICIÓN: formato del POST /pedidos. Ajusta esta función cuando veas tu controlador.
const construirBody = (idCliente, lineas, porId) => ({
  id_cliente: Number(idCliente),
  estado: "Pendiente",
  detalles: lineas.map((l) => ({
    id_producto: Number(l.id_producto),
    cantidad: Number(l.cantidad),
    precio_unitario: Number(porId[l.id_producto].precio),
  })),
});

export default function NuevoPedido() {
  const navigate = useNavigate();
  const toast = useToast();
  const prod = useApi("/productos");
  const cli = useApi("/clientes"); // SUPOSICIÓN: existe GET /clientes con { id_cliente, nombre }
  const { mutate, loading: enviando } = useMutation("POST");

  const [idCliente, setIdCliente] = useState("");
  const [lineas, setLineas] = useState([nuevaLinea()]);
  const [errores, setErrores] = useState([]);

  const productos = Array.isArray(prod.data) ? prod.data : [];
  const clientes = Array.isArray(cli.data) ? cli.data : cli.data?.resultados ?? [];
  const porId = Object.fromEntries(productos.map((p) => [String(p.id_producto), p]));

  const cambiarLinea = (key, campo, valor) =>
    setLineas((ls) => ls.map((l) => (l.key === key ? { ...l, [campo]: valor } : l)));
  const quitarLinea = (key) => setLineas((ls) => ls.filter((l) => l.key !== key));

  const total = lineas.reduce((acc, l) => {
    const p = porId[l.id_producto];
    return acc + (p ? Number(p.precio) * (Number(l.cantidad) || 0) : 0);
  }, 0);

  function validar() {
    const e = [];
    if (!idCliente) e.push("Elige un cliente.");
    if (lineas.length === 0) e.push("Agrega al menos un producto.");
    const vistos = new Set();
    lineas.forEach((l, i) => {
      const n = i + 1;
      const p = porId[l.id_producto];
      if (!p) return e.push(`Línea ${n}: elige un producto.`);
      if (vistos.has(l.id_producto)) e.push(`Línea ${n}: "${p.nombre}" ya está en el pedido.`);
      vistos.add(l.id_producto);
      const c = Number(l.cantidad);
      if (!Number.isInteger(c) || c < 1) e.push(`Línea ${n}: la cantidad debe ser un entero mayor a 0.`);
      else if (c > p.stock) e.push(`Línea ${n}: solo hay ${p.stock} unidades de "${p.nombre}".`);
    });
    return e;
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    const e = validar();
    setErrores(e);
    if (e.length) return;
    try {
      const res = await mutate("/pedidos", construirBody(idCliente, lineas, porId));
      const id = res?.id_pedido ?? res?.pedido?.id_pedido;
      toast.ok(id ? `Pedido #${id} creado.` : "Pedido creado.");
      navigate("/pedidos");
    } catch (err) {
      setErrores([err.message]);
      toast.error("No se pudo crear el pedido.");
    }
  }

  if (prod.loading || cli.loading) return <p>Cargando datos…</p>;
  const falla = prod.error || cli.error;
  if (falla) {
    return (
      <div className="card error" role="alert">
        <p>No se pudieron cargar los datos: {falla.message}</p>
        <button className="btn" onClick={() => { prod.refetch(); cli.refetch(); }}>Reintentar</button>
      </div>
    );
  }

  return (
    <>
      <div className="page-head"><h1>Nuevo pedido</h1></div>
      <form className="card" onSubmit={onSubmit} noValidate>
        <label>Cliente
          <select value={idCliente} onChange={(e) => setIdCliente(e.target.value)}>
            <option value="">Elige un cliente</option>
            {clientes.map((c) => (
              <option key={c.id_cliente} value={c.id_cliente}>{c.nombre}</option>
            ))}
          </select>
        </label>

        <fieldset>
          <legend>Productos</legend>
          {lineas.map((l, i) => {
            const p = porId[l.id_producto];
            return (
              <div className="linea" key={l.key}>
                <select aria-label={`Producto de la línea ${i + 1}`} value={l.id_producto}
                        onChange={(e) => cambiarLinea(l.key, "id_producto", e.target.value)}>
                  <option value="">Elige un producto</option>
                  {productos.map((pr) => (
                    <option key={pr.id_producto} value={pr.id_producto} disabled={pr.stock === 0}>
                      {pr.nombre} — {dinero(pr.precio)}{pr.stock === 0 ? " (agotado)" : ""}
                    </option>
                  ))}
                </select>
                <input type="number" min="1" step="1" aria-label={`Cantidad de la línea ${i + 1}`}
                       value={l.cantidad} onChange={(e) => cambiarLinea(l.key, "cantidad", e.target.value)} />
                <span className="num subtotal">{p ? dinero(Number(p.precio) * (Number(l.cantidad) || 0)) : "—"}</span>
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