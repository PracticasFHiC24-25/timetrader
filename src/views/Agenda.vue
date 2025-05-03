<template>
  <div class="agenda">
    <!-- Botón hamburguesa fuera del sidebar -->
    <button
      class="menu-toggle-outside"
      v-if="!isSidebarOpen"
      @click="isSidebarOpen = true"
      aria-label="Obrir menú"
    >
      <i class="fas fa-bars"></i>
    </button>

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
.agenda {
  display: flex;
}

.menu-toggle-outside {
  position: fixed;
  top: 16px;
  left: 16px;
  background: none;
  border: none;
  font-size: 24px;
  z-index: 1000;
  display: none;
}

@media (max-width: 768px) {
  .menu-toggle-outside {
    display: block;
  }
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
