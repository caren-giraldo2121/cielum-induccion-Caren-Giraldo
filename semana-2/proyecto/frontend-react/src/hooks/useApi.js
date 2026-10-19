import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";

/**
 * Custom hook de datos con token.
 * - Hace la petición autenticada y expone { data, loading, error, refetch }.
 * - Por defecto (auto=true) ejecuta un GET al montar y cuando cambian los params.
 */
export function useApi(path, { auto = true, method = "GET", params, body } = {}) {
  const { authFetch } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(auto);
  const [error, setError] = useState(null);

  const paramsKey = JSON.stringify(params || {});

  const execute = useCallback(
    async (override = {}) => {
      setLoading(true);
      setError(null);
      try {
        const res = await authFetch(path, { method, params, body, ...override });
        setData(res);
        return res;
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message || "Ocurrió un error");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authFetch, path, method, paramsKey]
  );

  useEffect(() => {
    if (!auto) return;
    const ctrl = new AbortController();
    execute({ signal: ctrl.signal }).catch(() => {});
    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, execute]);

  return { data, loading, error, refetch: execute, execute };
}
