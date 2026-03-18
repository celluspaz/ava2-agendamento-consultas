# AVA2 - Sistema de Agendamento de Consultas

Projeto de exemplo de uma aplicação de agendamento para clínica médica.

## 🧭 Funcionalidades

- Registro e login seguro (JWT) de pacientes e secretárias
- Agendamento de consultas com verificação de horário disponível
- Consulta automática de endereço pelo CEP (ViaCEP)
- Integração com previsões de clima (OpenWeatherMap) para alertar sobre chuva
- Painel administrativo para gerenciamento de atendimentos

---

## 📦 Estrutura do Projeto

- `backend/` - API em Node.js + Express + MongoDB
- `frontend/` - Aplicação cliente em Vue.js (Vite)

---

## 🛠️ Configuração e Execução

### Backend

1. Acesse a pasta do backend:
   ```bash
   cd backend
   ```
2. Copie o arquivo de exemplo e configure as variáveis de ambiente:
   ```bash
   copy .env.example .env
   ```
3. Instale dependências e execute:
   ```bash
   npm install
   npm run dev
   ```

> ⚠️ Garanta que o MongoDB esteja em execução e que `MONGO_URI` esteja correto.

### Frontend

1. Acesse a pasta do frontend:
   ```bash
   cd frontend
   ```
2. Copie o arquivo `.env.example` para `.env` e ajuste o `VITE_API_BASE` caso necessário.
   ```bash
   copy .env.example .env
   ```
3. Instale dependências e execute:
   ```bash
   npm install
   npm run dev
   ```

---

## 🔐 Autenticação

- O backend usa JWT para autenticação.
- O token é armazenado localmente no front-end e enviado em `Authorization: Bearer <token>`.

---

## 🔗 Integrações Externas

- **CEP**: ViaCEP ([https://viacep.com.br](https://viacep.com.br))
- **Clima**: OpenWeatherMap ([https://openweathermap.org](https://openweathermap.org))
  - Configure `OPENWEATHER_API_KEY` no `.env` do backend.

---

## 📌 Próximos Melhorias (opcionais)

- Validação de horários para evitar agendamentos sobrepostos
- Edição/remoção de agendamentos
- Notificações por email ou WhatsApp
- Melhorias na UI/UX (design responsivo, feedbacks)

---

## ✅ Deploy

Este projeto está pronto para deploy em serviços como:

- Backend: Heroku, Railway, Render, Vercel (Serverless), AWS/GCP/Azure
- Frontend: Vercel, Netlify, Surge, GitHub Pages (build estático)

Para produção, lembre-se de configurar as variáveis de ambiente e usar `npm run build` (frontend) e `NODE_ENV=production` (backend).
