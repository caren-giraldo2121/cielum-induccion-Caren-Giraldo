import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { apiFetch } from "../api/client";

const AuthContext = createContext(null);
const KEY = "token";

export function AuthProvider({ children }) {
  // Nota: localStorage es simple pero expuesto a XSS. En producción, prefiere cookie httpOnly.
  const [token, setToken] = useState(() => localStorage.getItem(KEY));

  const login = useCallback(async (email, password) => {
    const data = await apiFetch("/auth/login", { method: "POST", body: { email, password } });
    const t = data.token || data.access_token;
    if (!t) throw new Error("La respuesta del login no incluye token.");
    localStorage.setItem(KEY, t);
    setToken(t);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(KEY);
    setToken(null);
  }, []);

  const value = useMemo(() => ({ token, isAuth: !!token, login, logout }), [token, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}