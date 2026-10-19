import { ref, watch, onUnmounted, toValue } from "vue";
import { useAuthStore } from "../stores/auth.js";

/**
 * Composable de datos con token.
 * Devuelve { data, loading, error, execute }.
 * Si auto=true hace el GET al montar y otra vez cuando cambian los params (reactivos).
 */
export function useApi(path, { auto = true, params } = {}) {
  const auth = useAuthStore();
  const data = ref(null);
  const loading = ref(auto);
  const error = ref("");
  let ctrl = null;

  async function execute(opts = {}) {
    ctrl?.abort();
    ctrl = new AbortController();
    loading.value = true;
    error.value = "";
    try {
      const res = await auth.authFetch(toValue(path), {
        params: toValue(params),
        signal: ctrl.signal,
        ...opts,
      });
      data.value = res;
      loading.value = false;
      return res;
    } catch (err) {
      if (err.name === "AbortError") return; // cancelada: no es error
      error.value = err.message || "Ocurrió un error";
      loading.value = false;
      throw err;
    }
  }

  if (auto) {
    watch(() => JSON.stringify(toValue(params) || {}), () => execute().catch(() => {}), { immediate: true });
  }
  onUnmounted(() => ctrl?.abort());

  return { data, loading, error, execute };
}
