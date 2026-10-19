import { ref } from 'vue'

// Estado fuera de la función: compartido por toda la app
const toasts = ref([])
let id = 0

export function useToasts() {
  function mostrar(mensaje, tipo = 'ok') {
    const t = { id: id++, mensaje, tipo }
    toasts.value.push(t)
    setTimeout(() => {
      toasts.value = toasts.value.filter(x => x.id !== t.id)
    }, 3000)
  }
  return { toasts, mostrar }
}