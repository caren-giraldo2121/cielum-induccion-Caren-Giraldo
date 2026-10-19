<script setup>
import { ref } from 'vue'

const nueva = ref('')
const tareas = ref([])
let id = 0

function agregar() {
  const texto = nueva.value.trim()
  if (!texto) return
  tareas.value.push({ id: id++, texto, hecha: false })
  nueva.value = ''
}
const eliminar = (id) => (tareas.value = tareas.value.filter(t => t.id !== id))
</script>

<template>
  <input v-model="nueva" @keyup.enter="agregar" placeholder="Nueva tarea" />
  <button @click="agregar">Agregar</button>
  <ul>
    <li v-for="t in tareas" :key="t.id">
      <input type="checkbox" v-model="t.hecha" />
      <span :style="{ textDecoration: t.hecha ? 'line-through' : 'none' }">{{ t.texto }}</span>
      <button @click="eliminar(t.id)">x</button>
    </li>
  </ul>
</template>