const BASE = import.meta.env.VITE_API_URL || "/api";

export class ApiError extends Error {
  constructor(message, status, detalles) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.detalles = detalles;
  }
}

function buildUrl(path, params) {
  const qs = new URLSearchParams();
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v !== "" && v !== null && v !== undefined) qs.set(k, v);
  });
  const q = qs.toString();
  return `${BASE}${path}${q ? `?${q}` : ""}`;
}

// Extrae un mensaje legible de las formas de error de la API (Express + Zod)
function extractMessage(body, fallback) {
  if (!body) return fallback;
  if (typeof body === "string") return body;
  let msg = body.error ?? body.message ?? fallback;
  // La API devuelve errores de validación en "detalles": [{campo, mensaje}]
  if (Array.isArray(body.detalles) && body.detalles.length) {
    const extra = body.detalles
      .map((d) => d.mensaje || d.message || JSON.stringify(d))
      .join(". ");
    msg = extra ? `${msg}: ${extra}` : msg;
  }
  return msg;
}

export async function apiFetch(path, { method = "GET", body, token, params, signal } = {}) {
  let res;
  try {
    res = await fetch(buildUrl(path, params), {
      method,
      signal,
      headers: {
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (e) {
    if (e.name === "AbortError") throw e;
    throw new ApiError("No se pudo conectar con el servidor. ¿Está encendida la API?", 0);
  }

  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const fallback =
      res.status === 401 ? "Sesión no válida o expirada." :
      res.status === 403 ? "No tienes permiso para hacer esto." :
      res.status === 404 ? "No se encontró el recurso." :
      res.status >= 500 ? "Error del servidor. Inténtalo de nuevo más tarde." :
      `Error ${res.status}`;
    throw new ApiError(extractMessage(data, fallback), res.status, data?.detalles);
  }
  return data;
}
