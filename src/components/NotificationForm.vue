<!-- src/components/NotificationForm.vue -->
<template>
  <div class="card">
    <h2>Configurar Notificación</h2>
    <label>Tarea</label>
    <select v-model="notification.taskId">
      <option v-for="task in tasks" :key="task.id" :value="task.id">{{ task.title }}</option>
    </select>
    <label>Horas antes</label>
    <select v-model="notification.hours">
      <option>4</option>
      <option>24</option>
      <option>48</option>
    </select>
    <button @click="saveNotification">Guardar</button>
    <button @click="testNotification">Probar Notificación</button>
  </div>
</template>

<script>
export default {
  props: { tasks: Array },
  data() {
    return {
      notification: { taskId: null, hours: 4 },
    };
  },
  methods: {
    saveNotification() {
      alert(`Notificación guardada para ${this.taskTitle} ${this.notification.hours}h antes`);
      this.$emit('save', { ...this.notification });
    },
    testNotification() {
      alert('Notificación de prueba enviada');
    },
    taskTitle() {
      const task = this.tasks.find(t => t.id === this.notification.taskId);
      return task ? task.title : '';
    },
  },
};
</script>

<style scoped>
select, button { margin: 8px 0; }
</style>