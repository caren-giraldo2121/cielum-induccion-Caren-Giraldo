<script setup>
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'
import Toasts from './components/Toasts.vue'

const auth = useAuthStore()
const router = useRouter()

// Si el token desaparece (logout o 401), vuelve al login
watch(() => auth.isAuthenticated, (ok) => {
  if (!ok) router.push({ name: 'login' })
})
</script>

<template>
  <nav v-if="auth.isAuthenticated">
    <RouterLink to="/">Pedidos</RouterLink> |
    <RouterLink to="/pedidos/nuevo">Nuevo pedido</RouterLink> |
    <span>{{ auth.user?.nombre ?? auth.user?.name }}</span>
    <button @click="auth.logout()">Salir</button>
  </nav>
  <RouterView />
  <Toasts />
</template>