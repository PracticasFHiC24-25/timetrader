<template>
  <div class="agenda">
    <Sidebar v-model="isSidebarOpen" />
    <div class="content container">
      <!-- Botón hamburguesa dentro del contenido para alinearlo al inicio -->
      <button
        class="menu-toggle-inside"
        v-if="!isSidebarOpen"
        @click="isSidebarOpen = true"
        aria-label="Obrir menú"
      >
        <i class="fas fa-bars"></i>
      </button>

      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';

export default {
  components: { Sidebar },
  data() {
    return {
      isSidebarOpen: false,
    };
  },
};
</script>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans:wght@400;600&display=swap');

<style scoped>
.menu-toggle-inside {
  position: absolute;
  top: 32px;
  left: 38px;
  background: none;
  border: none;
  padding: 0; /* Elimina el espacio extra */
  font-size: 24px;
  line-height: 1;
  z-index: 1100;
  width: auto;
  height: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Ocultar en pantallas grandes, mostrar en móvil */
@media (min-width: 769px) {
  .menu-toggle-inside {
    display: none;
  }
}

.agenda {
  display: flex;
}

.content {
  position: relative;
  padding: 16px;
  flex-grow: 1;
  margin-left: 250px;
  align-items: center;
  max-width: 100%;
  width: auto;
}


@media (max-width: 768px) {
  .content {
    margin-left: 0;
    justify-content: center;
  }
}
</style>