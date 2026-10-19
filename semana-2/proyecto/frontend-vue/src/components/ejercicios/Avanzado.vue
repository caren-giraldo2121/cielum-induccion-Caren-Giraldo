<script setup>
import { useAuthStore } from "../../stores/auth.js";
import { useApi } from "../../composables/useApi.js";
import Mensaje from "../Mensaje.vue";

// Avanzado: store de Pinia (usuario + token) y guarda de ruta
const auth = useAuthStore();
const { data, loading, error } = useApi("/auth/perfil");
const tokenCorto = (t) => (t ? `${t.slice(0, 18)}…${t.slice(-8)}` : "—");
</script>

<template>
  <div class="card">
    <h3>Avanzado · Pinia + guarda de ruta</h3>
    <p class="page-sub" style="margin-bottom: 12px">
      El store <code>useAuthStore</code> guarda el usuario y el token. La guarda
      <code>router.beforeEach</code> bloquea las rutas con <code>meta.requiereAuth</code> si no hay token.
    </p>
    <table>
      <tbody>
        <tr><th>Usuario</th><td>{{ auth.usuario?.nombre }} ({{ auth.usuario?.email }})</td></tr>
        <tr><th>Token</th><td><code>{{ tokenCorto(auth.token) }}</code></td></tr>
        <tr><th>¿Autenticado?</th><td>{{ auth.estaAutenticado ? "Sí" : "No" }}</td></tr>
      </tbody>
    </table>
    <div style="margin-top: 12px">
      <div v-if="loading" class="cargando">Verificando token contra /auth/perfil…</div>
      <Mensaje v-else-if="error">{{ error }}</Mensaje>
      <Mensaje v-else-if="data" tipo="ok">Token válido. La API reconoce a {{ data.usuario?.email }}.</Mensaje>
    </div>
  </div>
</template>
