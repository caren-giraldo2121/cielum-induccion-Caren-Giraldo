<script setup>
defineProps({ page: Number, totalPages: Number })
const emit = defineEmits(['update:page'])
</script>

<template>
  <div class="pag">
    <button :disabled="page <= 1" @click="emit('update:page', page - 1)">Anterior</button>
    <span>Página {{ page }} de {{ totalPages }}</span>
    <button :disabled="page >= totalPages" @click="emit('update:page', page + 1)">Siguiente</button>
  </div>
</template>