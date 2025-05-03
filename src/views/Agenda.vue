<template>
  <!-- Botón hamburguesa situado fuera del contenedor principal para asegurar posición fija -->
  <button
    class="menu-toggle-outside"
    v-if="!isSidebarOpen"
    @click="isSidebarOpen = true"
    aria-label="Obrir menú"
  >
    <i class="fas fa-bars"></i>
  </button>

  <div class="agenda">
    <Sidebar v-model="isSidebarOpen" />
    <div class="content container">
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

<style scoped>
.menu-toggle-outside {
  position: fixed;
  top: 16px;
  left: 0; /* Colocado en el borde izquierdo del viewport */
  background: none;
  border: none;
  padding: 8px; /* Añadido padding para que el icono no quede recortado */
  font-size: 24px;
  z-index: 1100;
}

/* Ocultar en pantallas grandes, mostrar en móvil */
@media (min-width: 769px) {
  .menu-toggle-outside {
    display: none;
  }
}

.agenda {
  display: flex;
}

.content {
  padding: 16px;
  flex-grow: 1;
  margin-left: 250px;
}

@media (max-width: 768px) {
  .content {
    margin-left: 0;
  }
}
</style>