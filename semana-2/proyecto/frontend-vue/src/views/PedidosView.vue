<script setup>
import { computed, reactive, ref } from "vue";
import { useApi } from "../composables/useApi.js";
import { useAuthStore } from "../stores/auth.js";
import Mensaje from "../components/Mensaje.vue";

const ESTADOS = ["Pendiente", "Pagado", "Enviado", "Entregado", "Cancelado"];
const inicial = () => ({ estado: "", id_cliente: "", desde: "", hasta: "", limite: 10 });

const auth = useAuthStore();
const form = reactive(inicial());          // lo que se escribe
const aplicados = ref(inicial());          // lo que se consulta
const pagina = ref(1);

const params = computed(() => ({ ...aplicados.value, pagina: pagina.value }));
const { data, loading, error, execute } = useApi("/pedidos", { params });

const pedidos = computed(() => data.value?.resultados ?? []);
const haySiguiente = computed(() => pedidos.value.length === Number(aplicados.value.limite));

const edits = reactive({});
const aviso = ref(null);
const guardandoId = ref(null);

function buscar() {
  pagina.value = 1;
  aplicados.value = { ...form };
}
function limpiar() {
  Object.assign(form, inicial());
  buscar();
}

async function guardarEstado(p) {
  const nuevo = edits[p.id_pedido] ?? p.estado;
  guardandoId.value = p.id_pedido;
  aviso.value = null;
  try {
    await auth.authFetch(`/pedidos/${p.id_pedido}`, {
      method: "PUT",
      body: { id_cliente: p.id_cliente, estado: nuevo },
    });
    aviso.value = { tipo: "ok", texto: `Pedido #${p.id_pedido} actualizado a "${nuevo}".` };
    delete edits[p.id_pedido];
    await execute();
  } catch (err) {
    aviso.value = { tipo: "error", texto: err.message };
  } finally {
    guardandoId.value = null;
  }
}
</script>

<template>
  <div>
    <div class="row" style="justify-content: space-between; align-items: center">
      <div>
        <h1 class="page-title">Pedidos</h1>
        <p class="page-sub">Listado con filtros, paginación y cambio de estado.</p>
      </div>
      <RouterLink to="/pedidos/nuevo"><button>+ Nuevo pedido</button></RouterLink>
    </div>

    <form class="card" @submit.prevent="buscar">
      <div class="row">
        <div class="field">
          <label>Estado</label>
          <select v-model="form.estado">
            <option value="">Todos</option>
            <option v-for="e in ESTADOS" :key="e" :value="e">{{ e }}</option>
          </select>
        </div>
        <div class="field">
          <label>ID cliente</label>
          <input v-model="form.id_cliente" type="number" min="1" />
        </div>
        <div class="field">
          <label>Desde</label>
          <input v-model="form.desde" type="date" />
        </div>
        <div class="field">
          <label>Hasta</label>
          <input v-model="form.hasta" type="date" />
        </div>
        <div class="field" style="max-width: 110px">
          <label>Por página</label>
          <select v-model.number="form.limite">
            <option v-for="n in [5, 10, 20, 50]" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <button type="submit">Buscar</button>
        <button type="button" class="secundario" @click="limpiar">Limpiar</button>
      </div>
    </form>

    <Mensaje v-if="aviso" :tipo="aviso.tipo">{{ aviso.texto }}</Mensaje>

    <div class="card">
      <div v-if="loading" class="cargando">Cargando pedidos…</div>
      <Mensaje v-else-if="error">{{ error }}</Mensaje>
      <template v-else-if="pedidos.length">
        <table>
          <thead>
            <tr><th>#</th><th>Cliente</th><th>Fecha</th><th>Estado</th><th style="width: 230px">Cambiar estado</th></tr>
          </thead>
          <tbody>
            <tr v-for="p in pedidos" :key="p.id_pedido">
              <td>{{ p.id_pedido }}</td>
              <td>{{ p.id_cliente }}</td>
              <td>{{ p.fecha_pedido ? String(p.fecha_pedido).slice(0, 10) : "—" }}</td>
              <td><span class="badge">{{ p.estado }}</span></td>
              <td>
                <div class="row" style="flex-wrap: nowrap; align-items: center">
                  <select :value="edits[p.id_pedido] ?? p.estado" @change="edits[p.id_pedido] = $event.target.value">
                    <option v-for="e in ESTADOS" :key="e" :value="e">{{ e }}</option>
                  </select>
                  <button
                    class="sm"
                    :disabled="guardandoId === p.id_pedido || (edits[p.id_pedido] ?? p.estado) === p.estado"
                    @click="guardarEstado(p)"
                  >{{ guardandoId === p.id_pedido ? "…" : "Guardar" }}</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button class="secundario sm" :disabled="pagina === 1 || loading" @click="pagina--">← Anterior</button>
          <span>Página {{ pagina }}</span>
          <button class="secundario sm" :disabled="!haySiguiente || loading" @click="pagina++">Siguiente →</button>
        </div>
      </template>
      <div v-else class="estado-vacio">No hay pedidos con esos filtros.</div>
    </div>
  </div>
</template>
