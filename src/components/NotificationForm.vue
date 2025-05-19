<template>
  <div class="form-container">
    <h2 class="form-title">Configurar Notificació</h2>
    <div class="form-group">
      <label class="input-label" for="task-select">Tasca</label>
      <select v-model="notification.taskId" id="task-select" class="input-field">
        <option v-for="task in tasks" :key="task.id" :value="task.id">{{ task.title }}</option>
      </select>
    </div>
    <div class="form-group">
      <label class="input-label" for="hours-select">Hores abans</label>
      <select v-model="notification.hours" id="hours-select" class="input-field">
        <option>1</option>
        <option>2</option> 
        <option>4</option> 
        <option>12</option> 
        <option>24</option> 
        <option>48</option>
      </select>
    </div>
    <div class="form-actions">
      <button @click="saveNotification" class="btn btn-primary btn-small">Guardar</button>
      <button @click="testNotification" class="btn btn-primary btn-small">Probar Notificació</button>
    </div>
  </div>
</template>

<script>
export default {
  props: { tasks: Array },
  data() {
    return {
      notification: { taskId: null, hours: 1 },
    };
  },
  methods: {
    saveNotification() {
      if (!this.notification.taskId) {
        alert('Si us plau, selecciona una tasca abans de guardar.');
        return;
      }
      const notification = { ...this.notification, id: Date.now() }; // Añadir ID único
      let notifications = JSON.parse(sessionStorage.getItem('notifications') || '[]');
      notifications.push(notification);
      sessionStorage.setItem('notifications', JSON.stringify(notifications));
      this.$emit('save', notification);
      this.notification = { taskId: null, hours: 4 }; // Reiniciar formulario
    },
    testNotification() {
      alert('Notificació de proba enviada');
    },
  },
};
</script>

<style scoped>
.form-container {
  padding: 0;
}

.form-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.input-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  background: #f9fafb;
  transition: border-color 0.2s ease;
}

.input-field:focus {
  outline: none;
  border-color: #4a90e2;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}

.btn-small {
  padding: 0.4rem 0.75rem;
  font-size: 0.65rem;
}

.btn-secondary {
  background: #e5e7eb;
  color: #333;
}

.btn-secondary:hover {
  background: #d1d5db;
}

.btn-primary {
  background: #4a90e2;
  color: #fff;
}

.btn-primary:hover {
  background: #357abd;
}

.btn:active {
  transform: scale(0.98);
}
</style>