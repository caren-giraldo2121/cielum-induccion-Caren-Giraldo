<script setup>
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../stores/auth.js";
import Mensaje from "../components/Mensaje.vue";

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const form = reactive({ email: "", password: "" });
const error = ref("");
const enviando = ref(false);

async function entrar() {
  error.value = "";
  if (!form.email || !form.password) {
    error.value = "Ingresa tu correo y contraseña.";
    return;
  }
  enviando.value = true;
  try {
    await auth.login(form.email, form.password);
    router.replace(route.query.redirect || "/pedidos");
  } catch (err) {
    error.value = err.status === 401 ? "Correo o contraseña incorrectos." : err.message;
  } finally {
    enviando.value = false;
  }
}
</script>

<template>
  <div class="login-wrap">
    <form class="card login-card" @submit.prevent="entrar">
      <div class="marca">Cielum</div>
      <div class="lema">Panel de pedidos · Vue</div>

      <Mensaje v-if="error">{{ error }}</Mensaje>

      <div class="field">
        <label for="email">Correo</label>
        <input id="email" v-model="form.email" type="email" autocomplete="username" placeholder="tucorreo@cielum.com" />
      </div>
      <div class="field">
        <label for="password">Contraseña</label>
        <input id="password" v-model="form.password" type="password" autocomplete="current-password" placeholder="••••••" />
      </div>

      <button type="submit" style="width: 100%" :disabled="enviando">
        {{ enviando ? "Entrando…" : "Iniciar sesión" }}
      </button>
      <p class="pista">Prueba: caren@cielum.com / 123456</p>
    </form>
  </div>
</template>
