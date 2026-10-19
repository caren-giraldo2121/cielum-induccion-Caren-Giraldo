<script setup>
import { ref, computed, watch } from 'vue'
import { useApi } from '../composables/useApi'
import Paginacion from '../components/Paginacion.vue'

const { data, loading, error, execute } = useApi()
const page = ref(1)
const limit = 10

const pedidos = computed(() => data.value?.data ?? data.value ?? [])
const totalPages = computed(() => {
  const total = data.value?.total ?? 0
  return Math.max(1, Math.ceil(total / limit))
})

// Se ejecuta al montar y cada vez que cambia la página
watch(page, () => execute(`/pedidos?page=${page.value}&limit=${limit}`), { immediate: true })
</script>

<template>
  <h2>Pedidos</h2>
  <RouterLink to="/pedidos/nuevo">Nuevo pedido</RouterLink>

  <p v-if="loading">Cargando...</p>
  <p v-else-if="error" style="color: red">{{ error }}</p>
  <template v-else>
    <table>
      <thead>
        <tr><th>ID</th><th>Cliente</th><th>Total</th><th>Estado</th></tr>
      </thead>
      <tbody>
        <tr v-for="p in pedidos" :key="p.id">
          <td>{{ p.id }}</td>
          <td>{{ p.cliente?.nombre ?? p.clienteId }}</td>
          <td>${{ p.total }}</td>
          <td>{{ p.estado }}</td>
        </tr>
      </tbody>
    </table>
    <p v-if="!pedidos.length">No hay pedidos.</p>
    <Paginacion v-model:page="page" :total-pages="totalPages" />
  </template>
</template>