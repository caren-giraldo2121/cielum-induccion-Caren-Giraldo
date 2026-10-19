# React vs Vue

Después de construir el mismo frontend (login, pedidos con filtros y paginación, nuevo pedido con varios productos y cambio de estado) en `frontend-react/` y en `frontend-vue/`, esta es mi comparación.

## Tabla comparativa

| Aspecto | React | Vue |
|---|---|---|
| **Reactividad** | No es automática. El estado vive en `useState` y la pantalla solo se actualiza cuando llamo a `setAlgo(...)`. Si cambio un objeto "por dentro" sin crear uno nuevo, React no se entera, así que siempre tengo que copiar (`{...form}`, `prev.map(...)`). | Es automática. Con `ref()` y `reactive()` Vue detecta solo los cambios: puedo hacer `tareas.value.push(...)` o `l.precio_unitario = 5` y la vista se actualiza sin más. |
| **Sintaxis** | Todo es JavaScript: el HTML se escribe con JSX dentro de la función. Las listas se hacen con `.map()` y las condiciones con `&&` o el operador ternario. Para los inputs tengo que escribir `value` + `onChange` a mano. | Plantilla tipo HTML separada del `<script setup>`. Tiene directivas listas para usar: `v-for` para listas, `v-if` para condiciones y `v-model` para conectar un input con el estado en una sola palabra. |
| **Estado global** | Usé Context API (`AuthContext`) con un `Provider` que envuelve toda la app y un hook `useAuth()` para leerlo. Funciona, pero hay que armarlo a mano (contexto, provider, `useMemo`, `useCallback`). | Usé Pinia (`useAuthStore`). Es más directo: se define el store una vez y en cualquier componente se llama `useAuthStore()`. No hay que envolver la app en nada además de `app.use(createPinia())`. |
| **Rutas protegidas** | Hice un componente `<RutaProtegida>` que revisa el token y, si no hay, devuelve `<Navigate to="/login">`. | Uso una guarda global `router.beforeEach` y marco las rutas privadas con `meta: { requiereAuth: true }`. Queda todo en un solo lugar. |
| **Curva de aprendizaje** | Me costó más al principio: hay que entender bien los hooks, el arreglo de dependencias de `useEffect` y por qué el modo estricto ejecuta los efectos dos veces (el error de "señal interrumpida" salió de ahí). | Se me hizo más fácil arrancar porque la plantilla se parece a HTML normal y `v-model` ahorra mucho código. Lo que más hay que cuidar es acordarse del `.value` en los `ref` dentro del script. |
| **Cuándo usaría cada uno** | En proyectos grandes o equipos que ya trabajan con React, cuando se necesita su ecosistema enorme (librerías, React Native para móvil) o mucha flexibilidad para organizar el código. | En proyectos pequeños o medianos, paneles administrativos o formularios con mucha entrada de datos, y cuando el equipo quiere avanzar rápido con menos código repetido. |

## Conclusión

Los dos resuelven lo mismo y la lógica de negocio quedó casi igual (de hecho el `client.js` y los estilos son los mismos en ambos). La diferencia principal que noté es que **Vue hace más cosas por mí** (reactividad automática, `v-model`, Pinia), mientras que **React me obliga a ser más explícita**, lo que da más control pero también más código. Para este proyecto de pedidos, con muchos formularios, Vue fue más cómodo; para algo que vaya a crecer mucho o que necesite app móvil, elegiría React.
