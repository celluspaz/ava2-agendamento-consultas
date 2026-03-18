<template>
  <div>
    <div class="card">
      <div class="header">
        <div>
          <strong>Painel Administrativo</strong>
        </div>
        <div class="actions">
          <button @click="goDashboard">Voltar</button>
          <button @click="logout">Sair</button>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>Agendamentos</h2>
      <div v-if="loading">Carregando...</div>
      <div v-if="!loading && appointments.length === 0">Nenhum agendamento encontrado.</div>
      <ul v-if="appointments.length">
        <li v-for="appt in appointments" :key="appt._id" class="item">
          <div>
            <strong>{{ formatDate(appt.dateTime) }}</strong>
            <span> - {{ appt.status }}</span>
          </div>
          <div>
            Paciente: {{ appt.patient?.name }} ({{ appt.patient?.email }})
          </div>
          <div>
            {{ appt.address.city }} ({{ appt.address.state }}) - {{ appt.address.cep }}
          </div>
          <div>Previsão: {{ appt.weather.summary }} {{ appt.weather.hasRainForecast ? "(Chuva prevista)" : "" }}</div>

          <div class="status-actions">
            <button @click="changeStatus(appt._id, 'completed')">Concluído</button>
            <button @click="changeStatus(appt._id, 'canceled')">Cancelado</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../services/api";
import { logout as doLogout } from "../services/auth";

const router = useRouter();
const appointments = ref([]);
const loading = ref(false);
const error = ref("");

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

function goDashboard() {
  router.push("/dashboard");
}

async function changeStatus(id, status) {
  try {
    await api.patch(`/appointments/${id}/status`, { status });
    fetchAppointments();
  } catch {
    // ignore for now
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

.item {
  border-top: 1px solid #e5e7eb;
  padding: 12px 0;
}

.status-actions button {
  margin-right: 8px;
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  background: #2563eb;
  color: white;
}
</style>
