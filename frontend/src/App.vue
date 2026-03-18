<template>
  <div class="app">
    <header class="app-header">
      <h1>Clínica - Agendamentos</h1>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #f7f7f7;
}

.app {
  max-width: 960px;
  margin: 0 auto;
  padding: 16px;
}

.app-header {
  padding: 16px 0;
  text-align: center;
  border-bottom: 1px solid #e3e3e3;
}

main {
  padding: 16px 0;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
}

button {
  cursor: pointer;
}
</style>
