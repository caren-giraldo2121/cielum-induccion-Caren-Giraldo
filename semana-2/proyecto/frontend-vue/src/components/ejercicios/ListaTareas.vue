<script setup>
import { computed, ref } from "vue";

// Básico: lista de tareas con v-for y v-model
const nueva = ref("");
const tareas = ref([
  { id: 1, texto: "Levantar la API", hecha: true },
  { id: 2, texto: "Conectar el frontend Vue", hecha: false },
]);
const pendientes = computed(() => tareas.value.filter((t) => !t.hecha).length);

function agregar() {
  const texto = nueva.value.trim();
  if (!texto) return;
  tareas.value.push({ id: Date.now(), texto, hecha: false });
  nueva.value = "";
}
const eliminar = (id) => (tareas.value = tareas.value.filter((t) => t.id !== id));
</script>

<template>
  <div class="card">
    <h3>Lista de tareas</h3>
    <form class="row" @submit.prevent="agregar">
      <input v-model="nueva" placeholder="Nueva tarea…" />
      <button type="submit">Agregar</button>
    </form>
    <div style="margin-top: 12px">
      <div v-for="t in tareas" :key="t.id" :class="['tarea', { hecha: t.hecha }]">
        <input v-model="t.hecha" type="checkbox" />
        <span>{{ t.texto }}</span>
        <button class="secundario sm" @click="eliminar(t.id)">Quitar</button>
      </div>
      <p v-if="!tareas.length" class="estado-vacio">Sin tareas.</p>
    </div>
    <p class="page-sub" style="margin: 10px 0 0">Pendientes: {{ pendientes }}</p>
  </div>
</template>
