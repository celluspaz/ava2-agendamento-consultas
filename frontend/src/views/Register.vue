<template>
  <div class="card">
    <h2>Cadastro</h2>
    <form @submit.prevent="onSubmit">
      <div class="field">
        <label>Nome</label>
        <input v-model="name" type="text" required />
      </div>
      <div class="field">
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>
      <div class="field">
        <label>Senha</label>
        <input v-model="password" type="password" required />
      </div>
      <div class="field">
        <label>Tipo de usuário</label>
        <select v-model="role">
          <option value="patient">Paciente</option>
          <option value="secretary">Secretária</option>
        </select>
      </div>
      <button type="submit">Cadastrar</button>
    </form>
    <p>
      Já tem conta? <router-link to="/login">Faça login</router-link>
    </p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "../services/auth";

const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");
const role = ref("patient");
const error = ref("");

async function onSubmit() {
  error.value = "";
  try {
    await register(name.value.trim(), email.value.trim(), password.value, role.value);
    router.push("/dashboard");
  } catch (err) {
    error.value = err.response?.data?.error || "Falha ao cadastrar";
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

input,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
}

button {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  background: #16a34a;
  color: white;
  font-weight: 600;
}

.error {
  color: #b91c1c;
  margin-top: 12px;
}
</style>
