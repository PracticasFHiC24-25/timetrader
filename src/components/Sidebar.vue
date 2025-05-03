<template>
  <nav :class="{ sidebar: true, open: modelValue }">
    <!-- Botón de cerrar sidebar SOLO visible en móvil -->
    <button
      class="close-toggle"
      @click="$emit('update:modelValue', false)"
      aria-label="Tancar menú"
    >
      <i class="fas fa-times"></i>
    </button>

    <!-- Botón de inicio -->
    <router-link to="/" class="back-home" @click="$emit('update:modelValue', false)">
      <i class="fas fa-arrow-left"></i> Inici
    </router-link>

    <ul>
      <li><router-link to="/agenda/tasks" @click="$emit('update:modelValue', false)">
        <i class="fas fa-check"></i> Tasques i Events</router-link></li>
      <li><router-link to="/agenda/notifications" @click="$emit('update:modelValue', false)">
        <i class="fas fa-bell"></i> Notificacio</router-link></li>
      <li><router-link to="/agenda/ai-assistant" @click="$emit('update:modelValue', false)">
        <i class="fas fa-robot"></i> Asistent IA</router-link></li>
      <li><router-link to="/community" @click="$emit('update:modelValue', false)">
        <i class="fas fa-life-ring"></i> Comunitat</router-link></li>
      <li><router-link to="/support" @click="$emit('update:modelValue', false)">
        <i class="fas fa-envelope"></i> Suport i Contacte</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    modelValue: Boolean,
  },
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: #FFFFFF;
  border-right: 1px solid #E0E0E0;
  padding: 16px;
  position: fixed;
  height: 100%;
  transition: transform 0.3s ease;
  z-index: 999;
}
.sidebar ul { list-style: none; padding: 0; }
.sidebar li { margin: 8px 0; }
.sidebar a {
  color: var(--text-primary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
}
.sidebar a:hover { background: var(--secondary); }

.close-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  position: absolute;
  top: 16px;
  right: 16px;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    width: 200px;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .close-toggle {
    display: block;
  }
}
</style>
