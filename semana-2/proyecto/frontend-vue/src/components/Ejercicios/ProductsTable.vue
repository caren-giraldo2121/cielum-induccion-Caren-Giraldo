<script setup>
import { onMounted } from 'vue'
import { useApi } from '../../composables/useApi'

const { data, loading, error, execute } = useApi()
onMounted(() => execute('/productos'))
</script>

<template>
  <p v-if="loading">Cargando...</p>
  <p v-else-if="error">{{ error }}</p>
  <table v-else>
    <thead><tr><th>ID</th><th>Nombre</th><th>Precio</th></tr></thead>
    <tbody>
      <tr v-for="p in (data?.data ?? data ?? [])" :key="p.id">
        <td>{{ p.id }}</td><td>{{ p.nombre }}</td><td>${{ p.precio }}</td>
      </tr>
    </tbody>
  </table>
</template>