<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useApi } from "../composables/useApi.js";
import { useAuthStore } from "../stores/auth.js";
import Mensaje from "../components/Mensaje.vue";

const ESTADOS = ["Pendiente", "Pagado", "Enviado", "Entregado", "Cancelado"];
const moneda = (n) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n || 0);
const lineaVacia = () => ({ id_producto: "", cantidad: 1, precio_unitario: "" });

const auth = useAuthStore();
const router = useRouter();
const { data: clientes, loading: cargandoC, error: errC } = useApi("/clientes");
const { data: productos, loading: cargandoP, error: errP } = useApi("/productos");

const idCliente = ref("");
const estado = ref("Pendiente");
const detalles = ref([lineaVacia()]);
const error = ref("");
const enviando = ref(false);

const listaClientes = computed(() => (Array.isArray(clientes.value) ? clientes.value : []));
const listaProductos = computed(() => (Array.isArray(productos.value) ? productos.value : []));
const subtotal = (l) => (Number(l.cantidad) || 0) * (Number(l.precio_unitario) || 0);
const total = computed(() => detalles.value.reduce((acc, l) => acc + subtotal(l), 0));

// Al elegir un producto se autocompleta el precio del catálogo
function elegirProducto(l) {
  const prod = listaProductos.value.find((p) => String(p.id_producto) === String(l.id_producto));
  if (prod) l.precio_unitario = prod.precio;
}
const agregarLinea = () => detalles.value.push(lineaVacia());
const quitarLinea = (i) => detalles.value.splice(i, 1);

async function crear() {
  error.value = "";
  if (!idCliente.value) return (error.value = "Selecciona un cliente.");
  const limpias = detalles.value.filter((l) => l.id_producto);
  if (!limpias.length) return (error.value = "Agrega al menos un producto.");
  if (limpias.some((l) => !(Number(l.cantidad) > 0))) return (error.value = "Las cantidades deben ser mayores que 0.");
  if (limpias.some((l) => !(Number(l.precio_unitario) > 0))) return (error.value = "Los precios deben ser mayores que 0.");

  enviando.value = true;
  try {
    await auth.authFetch("/pedidos", {
      method: "POST",
      body: {
        id_cliente: Number(idCliente.value),
        estado: estado.value,
        detalles: limpias.map((l) => ({
          id_producto: Number(l.id_producto),
          cantidad: Number(l.cantidad),
          precio_unitario: Number(l.precio_unitario),
        })),
      },
    });
    router.replace("/pedidos");
  } catch (err) {
    error.value = err.message;
  } finally {
    enviando.value = false;
  }
}
</script>

<template>
  <div v-if="cargandoC || cargandoP" class="cargando">Cargando catálogo…</div>
  <div v-else>
    <h1 class="page-title">Nuevo pedido</h1>
    <p class="page-sub">Selecciona el cliente y agrega uno o más productos.</p>

    <Mensaje v-if="errC || errP">{{ errC || errP }}</Mensaje>
    <Mensaje v-if="error">{{ error }}</Mensaje>

    <form @submit.prevent="crear">
      <div class="card">
        <div class="row">
          <div class="field">
            <label>Cliente</label>
            <select v-model="idCliente">
              <option value="">— Selecciona —</option>
              <option v-for="c in listaClientes" :key="c.id_cliente" :value="c.id_cliente">
                {{ c.id_cliente }} · {{ c.nombre }}
              </option>
            </select>
          </div>
          <div class="field" style="max-width: 200px">
            <label>Estado</label>
            <select v-model="estado">
              <option v-for="e in ESTADOS" :key="e" :value="e">{{ e }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="card">
        <h3>Productos</h3>
        <table>
          <thead>
            <tr><th>Producto</th><th style="width: 110px">Cantidad</th><th style="width: 150px">Precio unit.</th><th style="width: 130px">Subtotal</th><th></th></tr>
          </thead>
          <tbody>
            <tr v-for="(l, i) in detalles" :key="i">
              <td>
                <select v-model="l.id_producto" @change="elegirProducto(l)">
                  <option value="">— Producto —</option>
                  <option v-for="p in listaProductos" :key="p.id_producto" :value="p.id_producto">{{ p.nombre }}</option>
                </select>
              </td>
              <td><input v-model="l.cantidad" type="number" min="1" /></td>
              <td><input v-model="l.precio_unitario" type="number" min="0" step="0.01" /></td>
              <td>{{ moneda(subtotal(l)) }}</td>
              <td>
                <button v-if="detalles.length > 1" type="button" class="secundario sm" @click="quitarLinea(i)">✕</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div style="margin-top: 12px">
          <button type="button" class="secundario sm" @click="agregarLinea">+ Agregar producto</button>
        </div>
        <div class="row" style="justify-content: flex-end; margin-top: 14px; font-weight: 700">
          Total: {{ moneda(total) }}
        </div>
      </div>

      <div class="row">
        <button type="submit" :disabled="enviando">{{ enviando ? "Creando…" : "Crear pedido" }}</button>
        <button type="button" class="secundario" @click="router.push('/pedidos')">Cancelar</button>
      </div>
    </form>
  </div>
</template>
