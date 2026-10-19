import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Login from '../pages/Login.vue'
import Pedidos from '../pages/Pedidos.vue'
import NuevoPedido from '../pages/NuevoPedido.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/', name: 'pedidos', component: Pedidos, meta: { requiresAuth: true } },
    { path: '/pedidos/nuevo', name: 'nuevo-pedido', component: NuevoPedido, meta: { requiresAuth: true } },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.name === 'login' && auth.isAuthenticated) {
    return { name: 'pedidos' }
  }
})

export default router