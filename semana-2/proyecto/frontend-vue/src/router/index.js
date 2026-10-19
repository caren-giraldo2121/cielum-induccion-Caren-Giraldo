import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth.js";
import LoginView from "../views/LoginView.vue";
import PedidosView from "../views/PedidosView.vue";
import NuevoPedidoView from "../views/NuevoPedidoView.vue";
import EjerciciosView from "../views/EjerciciosView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/login", name: "login", component: LoginView },
    { path: "/", redirect: "/pedidos" },
    { path: "/pedidos", name: "pedidos", component: PedidosView, meta: { requiereAuth: true } },
    { path: "/pedidos/nuevo", name: "nuevo-pedido", component: NuevoPedidoView, meta: { requiereAuth: true } },
    { path: "/ejercicios", name: "ejercicios", component: EjerciciosView, meta: { requiereAuth: true } },
    { path: "/:pathMatch(.*)*", redirect: "/pedidos" },
  ],
});

// Guarda de ruta: sin token no se entra a las rutas privadas
router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.meta.requiereAuth && !auth.estaAutenticado) {
    return { name: "login", query: { redirect: to.fullPath } };
  }
  if (to.name === "login" && auth.estaAutenticado) {
    return { name: "pedidos" };
  }
});

export default router;
