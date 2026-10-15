export default function Paginacion({ page, hasNext, onChange }) {
  if (page === 1 && !hasNext) return null;
  return (
    <nav className="paginacion" aria-label="Paginación">
      <button className="btn" disabled={page <= 1} onClick={() => onChange(page - 1)}>Anterior</button>
      <span>Página {page}</span>
      <button className="btn" disabled={!hasNext} onClick={() => onChange(page + 1)}>Siguiente</button>
    </nav>
  );
}