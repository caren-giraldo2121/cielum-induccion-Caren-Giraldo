<script setup>
import { useToasts } from '../composables/useToasts'
const { toasts } = useToasts()
</script>

<template>
  <div class="toasts">
    <div v-for="t in toasts" :key="t.id" :class="['toast', t.tipo]">
      {{ t.mensaje }}
    </div>
  </div>
</template>

<style scoped>
.toasts { position: fixed; top: 1rem; right: 1rem; display: grid; gap: .5rem; }
.toast { padding: .6rem 1rem; border-radius: 6px; color: #fff; background: #2e7d32; }
.toast.error { background: #c62828; }
</style>