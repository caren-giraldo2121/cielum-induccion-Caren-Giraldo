import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "../api/client";
import { useAuth } from "../auth/AuthContext";

/**
 * Lectura (GET) con token, carga y error.
 *   const { data, loading, error, refetch } = useApi("/pedidos", { page: 1 });
 * - Cancela la petición anterior si cambian path/params o se desmonta.
 * - Si el servidor responde 401, cierra la sesión.
 */
export function useApi(path, params, { enabled = true } = {}) {
  const { token, logout } = useAuth();
  const [state, setState] = useState({ data: null, loading: enabled, error: null });
  const [tick, setTick] = useState(0);
  const paramsKey = JSON.stringify(params ?? {});

  useEffect(() => {
    if (!enabled) return;
    const ctrl = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));

    apiFetch(path, { params: JSON.parse(paramsKey), token, signal: ctrl.signal })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) => {
        if (err.name === "AbortError") return;
        if (err.status === 401) logout();
        setState({ data: null, loading: false, error: err });
      });

    return () => ctrl.abort();
  }, [path, paramsKey, token, enabled, tick, logout]);

  const refetch = useCallback(() => setTick((t) => t + 1), []);
  return { ...state, refetch };
}

/**
 * Escritura (POST/PATCH/DELETE) con token.
 *   const { mutate, loading } = useMutation("PATCH");
 *   await mutate("/pedidos/3", { estado: "enviado" });   // lanza ApiError si falla
 */
export function useMutation(method = "POST") {
  const { token, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const mutate = useCallback(
    async (path, body) => {
      setLoading(true);
      try {
        return await apiFetch(path, { method, body, token });
      } catch (err) {
        if (err.status === 401) logout();
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [method, token, logout]
  );

  return { mutate, loading };
}