<template>
  <div class="card">
    <h2>Login</h2>
    <form @submit.prevent="onSubmit">
      <div class="field">
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>
      <div class="field">
        <label>Senha</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">Entrar</button>
    </form>
    <p>
      Não tem conta? <router-link to="/register">Cadastre-se</router-link>
    </p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../services/auth";

const router = useRouter();
const email = ref("");
const password = ref("");
const error = ref("");

async function onSubmit() {
  error.value = "";
  try {
    await login(email.value.trim(), password.value);
    router.push("/dashboard");
  } catch (err) {
    error.value = err.response?.data?.error || "Falha ao fazer login";
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 12px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
}

button {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  background: #2563eb;
  color: white;
  font-weight: 600;
}

.error {
  color: #b91c1c;
  margin-top: 12px;
}
</style>
