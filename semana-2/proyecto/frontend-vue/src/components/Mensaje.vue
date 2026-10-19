<script setup>
defineProps({ tipo: { type: String, default: "error" } });
</script>

<template>
  <div v-if="$slots.default" :class="['alert', tipo]"><slot /></div>
</template>
