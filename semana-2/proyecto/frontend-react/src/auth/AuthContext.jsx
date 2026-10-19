import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { apiFetch, ApiError } from "../api/client.js";

const AuthContext = createContext(null);
const LS_TOKEN = "cielum_token";
const LS_USER = "cielum_usuario";

function leer(clave) {
  try { return JSON.parse(localStorage.getItem(clave)); } catch { return null; }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(LS_TOKEN) || null);
  const [usuario, setUsuario] = useState(() => leer(LS_USER));

  const logout = useCallback(() => {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem(LS_TOKEN);
    localStorage.removeItem(LS_USER);
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: { email, password },
    });
    setToken(data.token);
    setUsuario(data.usuario);
    localStorage.setItem(LS_TOKEN, data.token);
    localStorage.setItem(LS_USER, JSON.stringify(data.usuario));
    return data.usuario;
  }, []);

  // Llamadas autenticadas: inyecta el token y, si expiró (401), cierra sesión.
  const authFetch = useCallback(async (path, opts = {}) => {
    try {
      return await apiFetch(path, { ...opts, token });
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
      throw err;
    }
  }, [token, logout]);

  const value = useMemo(
    () => ({ token, usuario, estaAutenticado: !!token, login, logout, authFetch }),
    [token, usuario, login, logout, authFetch]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
