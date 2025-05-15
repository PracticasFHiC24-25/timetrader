<!-- src/components/Sidebar.vue -->
<template>
  <nav :class="{ sidebar: true, open: modelValue }">
    <!-- Botó de tancar sidebar per mòbil -->
    <button
      class="close-toggle"
      @click="$emit('update:modelValue', false)"
      aria-label="Tancar menú"
    >
      <i class="fas fa-times"></i>
    </button>

    <div class="sidebar-content">
      <ul>
        <li>
          <router-link
            to="/agenda/calendari"
            @click="updateSection('calendari')"
            :class="{ active: selectedSection === 'calendari' }"
          >
            <i class="fas fa-calendar"></i> Calendari
          </router-link>
        </li>
        <li>
          <router-link
            to="/agenda/tasks"
            @click="updateSection('tasks')"
            :class="{ active: selectedSection === 'tasks' }"
          >
            <i class="fas fa-check"></i> Tasques i Events
          </router-link>
        </li>
        <li>
          <router-link
            to="/agenda/notifications"
            @click="updateSection('notifications')"
            :class="{ active: selectedSection === 'notifications' }"
          >
            <i class="fas fa-bell"></i> Notificacions
          </router-link>
        </li>
        <li>
          <router-link
            to="/smart-planning"
            @click="updateSection('smart-planning')"
            :class="{ active: selectedSection === 'smart-planning' }"
          >
            <i class="fas fa-brain"></i> Planificació Intel·ligent
          </router-link>
        </li>
        <li>
          <router-link
            to="/settings"
            @click="updateSection('settings')"
            :class="{ active: selectedSection === 'settings' }"
          >
            <i class="fas fa-cog"></i> Configuració
          </router-link>
        </li>
      </ul>

      <!-- Tancar sessió abaix de tot -->
      <div v-if="isAuthenticated" class="logout-container">
        <button class="logout-button" @click="handleLogout">
          <i class="fas fa-sign-out-alt"></i> Tancar Sessió
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { isAuthenticated, logout } from '../auth';

export default {
  props: {
    modelValue: Boolean,
    selectedSection: String
  },
  emits: ['update:modelValue', 'updateSection'],
  computed: {
    isAuthenticated() {
      return isAuthenticated.value;
    }
  },
  methods: {
    updateSection(section) {
      this.$emit('updateSection', section);
      this.$emit('update:modelValue', false);
    },
    handleLogout() {
      if (confirm('Segur que vols tancar sessió?')) {
        logout();
        this.$emit('update:modelValue', false);
        this.$router.push('/login');
      }
    }
  },
  watch: {
    '$route.path'(newPath) {
      // Sincronitzem selectedSection quan canvia la ruta
      if (newPath === '/agenda/calendari') this.$emit('updateSection', 'calendari');
      else if (newPath === '/agenda/tasks') this.$emit('updateSection', 'tasks');
      else if (newPath === '/agenda/notifications') this.$emit('updateSection', 'notifications');
      else if (newPath === '/smart-planning') this.$emit('updateSection', 'smart-planning');
      else if (newPath === '/agenda/settings') this.$emit('updateSection', 'settings');
    }
  }
};
</script>

<style scoped>
.sidebar {
  font-family: 'Montserrat', sans-serif;
  width: 250px;
  background: #FFFFFF;
  border-right: 1px solid #E0E0E0;
  padding: 16px;
  position: fixed;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease;
  z-index: 999;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  flex-grow: 1;
  margin-top: 40px;
}

.sidebar li {
  margin: 8px 0;
}

.sidebar a,
.sidebar .logout-button {
  color: var(--text-primary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
}

.sidebar a:hover,
.sidebar .logout-button:hover {
  background: var(--secondary);
}

.sidebar a.active {
  background: #4A90E2;
  color: #FFFFFF;
  font-weight: 600;
}

.logout-container {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #ddd;
}

.logout-button {
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  font-size: 16px;
  cursor: pointer;
}

.close-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  position: absolute;
  top: 16px;
  right: 0px;
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