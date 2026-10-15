const BASE = import.meta.env.VITE_API_URL || "/api";

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
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

// Extrae un mensaje legible de las formas de error más comunes (FastAPI, Express, etc.)
function extractMessage(body, fallback) {
  if (!body) return fallback;
  if (typeof body === "string") return body;
  const d = body.detail ?? body.message ?? body.error;
  if (typeof d === "string") return d;
  if (Array.isArray(d)) return d.map((e) => e.msg || JSON.stringify(e)).join(". ");
  return fallback;
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
    throw new ApiError("No se pudo conectar con el servidor. Revisa tu conexión.", 0);
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
      res.status >= 500 ? "Error del servidor. Inténtalo de nuevo en unos minutos." :
      `Error ${res.status}`;
    throw new ApiError(extractMessage(data, fallback), res.status);
  }
  return data;
}