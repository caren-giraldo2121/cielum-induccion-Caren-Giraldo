<script setup>
import { watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "./stores/auth.js";

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

// Si el token desaparece (logout o expiró), vuelve al login
watch(() => auth.estaAutenticado, (ok) => {
  if (!ok && route.meta.requiereAuth) router.push({ name: "login" });
});

function salir() {
  auth.logout();
  router.push({ name: "login" });
}
</script>

<template>
  <template v-if="auth.estaAutenticado && route.name !== 'login'">
    <header class="navbar">
      <div class="brand">Cielum · Vue</div>
      <nav>
        <RouterLink to="/pedidos" active-class="" exact-active-class="activo">Pedidos</RouterLink>
        <RouterLink to="/pedidos/nuevo" exact-active-class="activo">Nuevo pedido</RouterLink>
        <RouterLink to="/ejercicios" exact-active-class="activo">Ejercicios</RouterLink>
      </nav>
      <div class="spacer" />
      <span class="usuario">{{ auth.usuario?.nombre }}</span>
      <button class="secundario sm" @click="salir">Salir</button>
    </header>
    <div class="container"><RouterView /></div>
  </template>
  <RouterView v-else />
</template>
