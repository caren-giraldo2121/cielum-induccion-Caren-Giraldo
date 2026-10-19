<script setup>
import ListaTareas from "../components/ejercicios/ListaTareas.vue";
import TablaProductos from "../components/ejercicios/TablaProductos.vue";
import Avanzado from "../components/ejercicios/Avanzado.vue";
</script>

<template>
  <div>
    <h1 class="page-title">Ejercicios</h1>
    <p class="page-sub">Básico, intermedio y avanzado de Vue integrados con la API.</p>

    <h3 style="margin: 18px 0 10px">Básico</h3>
    <ListaTareas />

    <h3 style="margin: 26px 0 10px">Intermedio</h3>
    <TablaProductos />

    <h3 style="margin: 26px 0 10px">Avanzado</h3>
    <Avanzado />
  </div>
</template>
