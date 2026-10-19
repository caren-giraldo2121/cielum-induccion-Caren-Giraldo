import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

export async function request(path, options = {}) {
  const auth = useAuthStore()
  const res = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token && { Authorization: `Bearer ${auth.token}` }),
      ...options.headers,
    },
  })
  if (res.status === 401) {
    auth.logout()
    throw new Error('Sesión expirada')
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || `Error ${res.status}`)
  }
  return res.json()
}

export function useApi() {
  const data = ref(null)
  const loading = ref(false)
  const error = ref('')

  async function execute(path, options) {
    loading.value = true
    error.value = ''
    try {
      data.value = await request(path, options)
      return data.value
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, execute }
}