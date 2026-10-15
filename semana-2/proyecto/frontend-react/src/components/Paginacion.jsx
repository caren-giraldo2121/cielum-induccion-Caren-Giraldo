export default function Paginacion({ page, pages, onChange }) {
  if (pages <= 1) return null;
  return (
    <nav className="paginacion" aria-label="Paginación">
      <button className="btn" disabled={page <= 1} onClick={() => onChange(page - 1)}>Anterior</button>
      <span>Página {page} de {pages}</span>
      <button className="btn" disabled={page >= pages} onClick={() => onChange(page + 1)}>Siguiente</button>
    </nav>
  );
}