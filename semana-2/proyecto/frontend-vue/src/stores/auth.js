import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { apiFetch, ApiError } from "../api/client.js";

function leer(clave) {
  try { return JSON.parse(localStorage.getItem(clave)); } catch { return null; }
}

// Store global con el usuario y el token (avanzado: Pinia)
export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("cielum_token") || null);
  const usuario = ref(leer("cielum_usuario"));
  const estaAutenticado = computed(() => !!token.value);

  async function login(email, password) {
    const data = await apiFetch("/auth/login", { method: "POST", body: { email, password } });
    token.value = data.token;
    usuario.value = data.usuario;
    localStorage.setItem("cielum_token", data.token);
    localStorage.setItem("cielum_usuario", JSON.stringify(data.usuario));
    return data.usuario;
  }

  function logout() {
    token.value = null;
    usuario.value = null;
    localStorage.removeItem("cielum_token");
    localStorage.removeItem("cielum_usuario");
  }

  // Petición autenticada: envía el token y cierra sesión si la API responde 401
  async function authFetch(path, opts = {}) {
    try {
      return await apiFetch(path, { ...opts, token: token.value });
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
      throw err;
    }
  }

  return { token, usuario, estaAutenticado, login, logout, authFetch };
});
