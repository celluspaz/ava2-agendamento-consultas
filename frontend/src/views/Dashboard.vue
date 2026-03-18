<template>
  <div>
    <div class="card">
      <div class="header">
        <div>
          <strong>Olá, {{ user?.name || "Usuário" }}</strong>
          <div>{{ user?.role === "secretary" ? "Secretária" : "Paciente" }}</div>
        </div>
        <div class="actions">
          <button @click="goAdmin" v-if="user?.role === 'secretary'">Painel Administrativo</button>
          <button @click="logout">Sair</button>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>Agendar Consulta</h2>
      <form @submit.prevent="onCreate">
        <div class="field">
          <label>Data e hora</label>
          <input v-model="dateTime" type="datetime-local" required />
        </div>
        <div class="field">
          <label>CEP</label>
          <input v-model="cep" type="text" required placeholder="Ex: 01001-000" />
        </div>
        <div class="field">
          <label>Motivo</label>
          <textarea v-model="reason" rows="2" />
        </div>
        <button type="submit">Agendar</button>
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">{{ success }}</p>
      </form>
    </div>

    <div class="card">
      <h2>Meus Agendamentos</h2>
      <div v-if="loading">Carregando...</div>
      <div v-if="!loading && appointments.length === 0">Nenhum agendamento encontrado.</div>
      <ul v-if="appointments.length">
        <li v-for="appt in appointments" :key="appt._id" class="item">
          <div>
            <strong>{{ formatDate(appt.dateTime) }}</strong>
            <span> - {{ appt.status }}</span>
          </div>
          <div>{{ appt.address.city }} ({{ appt.address.state }})</div>
          <div>Previsão: {{ appt.weather.summary }} {{ appt.weather.hasRainForecast ? "(Chuva prevista)" : "" }}</div>
          <div>{{ appt.reason }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../services/api";
import { getUser, logout as doLogout } from "../services/auth";

const router = useRouter();
const user = ref(getUser());
const appointments = ref([]);
const loading = ref(false);
const dateTime = ref("");
const cep = ref("");
const reason = ref("");
const error = ref("");
const success = ref("");

function fetchAppointments() {
  loading.value = true;
  api
    .get("/appointments")
    .then((resp) => {
      appointments.value = resp.data.appointments || [];
    })
    .catch(() => {
      error.value = "Falha ao carregar agendamentos";
    })
    .finally(() => {
      loading.value = false;
    });
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  return date.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

function logout() {
  doLogout();
  router.push("/login");
}

function goAdmin() {
  router.push("/admin");
}

async function onCreate() {
  error.value = "";
  success.value = "";

  try {
    const resp = await api.post("/appointments", {
      dateTime: dateTime.value,
      cep: cep.value,
      reason: reason.value,
    });

    success.value = "Agendamento criado com sucesso";
    dateTime.value = "";
    cep.value = "";
    reason.value = "";
    fetchAppointments();
  } catch (err) {
    error.value = err.response?.data?.error || "Falha ao criar agendamento";
  }
}

onMounted(() => {
  fetchAppointments();
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.actions button {
  margin-left: 8px;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  background: #2563eb;
  color: white;
}

.field {
  margin-bottom: 12px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
}

input,
textarea {
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

.item {
  border-top: 1px solid #e5e7eb;
  padding: 12px 0;
}

.error {
  color: #b91c1c;
  margin-top: 12px;
}

.success {
  color: #15803d;
  margin-top: 12px;
}
</style>
