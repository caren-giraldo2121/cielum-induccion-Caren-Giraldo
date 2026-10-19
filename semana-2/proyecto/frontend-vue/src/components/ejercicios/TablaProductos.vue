<script setup>
import { useApi } from "../../composables/useApi.js";
import Mensaje from "../Mensaje.vue";

// Intermedio: tabla que consume GET /productos con estados de carga y error
const { data: productos, loading, error, execute } = useApi("/productos");
const moneda = (n) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);
</script>

<template>
  <div class="card">
    <div class="row" style="justify-content: space-between; align-items: center">
      <h3 style="margin: 0">Tabla de productos</h3>
      <button class="secundario sm" :disabled="loading" @click="execute().catch(() => {})">Recargar</button>
    </div>
    <div v-if="loading" class="cargando">Cargando productos…</div>
    <Mensaje v-else-if="error">{{ error }}</Mensaje>
    <table v-else-if="productos?.length">
      <thead><tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Stock</th></tr></thead>
      <tbody>
        <tr v-for="p in productos" :key="p.id_producto">
          <td>{{ p.id_producto }}</td>
          <td>{{ p.nombre }}</td>
          <td>{{ moneda(p.precio) }}</td>
          <td>{{ p.stock }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else class="estado-vacio">No hay productos.</div>
  </div>
</template>
