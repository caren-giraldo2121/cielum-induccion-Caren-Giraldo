export function Mensaje({ tipo = "error", children }) {
  if (!children) return null;
  return <div className={`alert ${tipo}`}>{children}</div>;
}

export function Cargando({ children = "Cargando…" }) {
  return <div className="cargando">{children}</div>;
}

export function EstadoVacio({ children }) {
  return <div className="estado-vacio">{children}</div>;
}
