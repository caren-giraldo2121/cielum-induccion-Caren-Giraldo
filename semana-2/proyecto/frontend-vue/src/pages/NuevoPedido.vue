<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useApi, request } from '../composables/useApi'
import { useToasts } from '../composables/useToasts'

const router = useRouter()
const { mostrar } = useToasts()

const clientes = useApi()
const productos = useApi()

const clienteId = ref('')
const items = ref([{ productoId: '', cantidad: 1 }])
const enviando = ref(false)

const listaClientes = computed(() => clientes.data.value?.data ?? clientes.data.value ?? [])
const listaProductos = computed(() => productos.data.value?.data ?? productos.data.value ?? [])

const total = computed(() =>
  items.value.reduce((suma, it) => {
    const p = listaProductos.value.find(x => x.id === it.productoId)
    return suma + (p ? p.precio * it.cantidad : 0)
  }, 0)
)

onMounted(() => {
  clientes.execute('/clientes')
  productos.execute('/productos')
})

const agregarLinea = () => items.value.push({ productoId: '', cantidad: 1 })
const quitarLinea = (i) => items.value.splice(i, 1)

async function enviar() {
  enviando.value = true
  try {
    await request('/pedidos', {
      method: 'POST',
      body: JSON.stringify({
        clienteId: clienteId.value,
        items: items.value.filter(i => i.productoId),
      }),
    })
    mostrar('Pedido creado')
    router.push('/')
  } catch (e) {
    mostrar(e.message, 'error')
  } finally {
    enviando.value = false
  }
}
</script>

<template>
  <form @submit.prevent="enviar">
    <h2>Nuevo pedido</h2>

    <select v-model="clienteId" required>
      <option value="" disabled>Cliente...</option>
      <option v-for="c in listaClientes" :key="c.id" :value="c.id">{{ c.nombre }}</option>
    </select>

    <div v-for="(it, i) in items" :key="i">
      <select v-model="it.productoId" required>
        <option value="" disabled>Producto...</option>
        <option v-for="p in listaProductos" :key="p.id" :value="p.id">
          {{ p.nombre }} (${{ p.precio }})
        </option>
      </select>
      <input v-model.number="it.cantidad" type="number" min="1" />
      <button type="button" @click="quitarLinea(i)" :disabled="items.length === 1">x</button>
    </div>

    <button type="button" @click="agregarLinea">+ Producto</button>
    <p>Total: ${{ total }}</p>
    <button :disabled="enviando">{{ enviando ? 'Guardando...' : 'Crear pedido' }}</button>
  </form>
</template>