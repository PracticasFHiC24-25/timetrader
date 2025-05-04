<template>
  <div class="settings-page">
    <!-- Sidebar -->
    <Sidebar v-model="isSidebarOpen" />

    <!-- Botó de menú hamburguesa (només visible en mòbils) -->
    <button
      class="hamburger"
      @click="isSidebarOpen = true"
      aria-label="Obrir menú lateral"
      v-if="!isSidebarOpen"
    >
      <i class="fas fa-bars"></i>
    </button>

    <main class="main-content">
      <h1>Configuració i Personalització</h1>
      <p>Aquesta secció està en desenvolupament.</p>
    </main>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'; // Importem el component del sidebar

export default {
  name: 'Settings',
  components: { Sidebar },
  data() {
    return {
      isSidebarOpen: false // Estat per controlar si el sidebar està obert
    };
  }
};
</script>

<style scoped>
.settings-page {
  min-height: 100vh;
  display: flex; /* Per alinear el sidebar i el contingut principal */
}

.main-content {
  padding: 32px;
  width: calc(100% - 250px); /* Ajustem l'amplada restant */
  margin-left: 250px; /* Espai per al sidebar */
  background: #f9f9f9;
  flex-grow: 1;
  text-align: center;
}

.hamburger {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #4A90E2;
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 1000;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0; /* Sense marge quan el sidebar està amagat */
    width: 100%; /* Ocupa tota l'amplada */
    padding: 20px;
  }

  .hamburger {
    display: block; /* Mostrem el botó hamburguesa en mòbils */
  }
}
</style>