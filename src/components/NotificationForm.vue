<!-- src/components/NotificationForm.vue -->
<template>
  <div class="card">
    <h2>Configurar Notificació</h2>
    <label>Tasca</label>
    <select v-model="notification.taskId">
      <option v-for="task in tasks" :key="task.id" :value="task.id">{{ task.title }}</option>
    </select>
    <label>Hores abans</label>
    <select v-model="notification.hours">
      <option>4</option>
      <option>24</option>
      <option>48</option>
    </select>
    <button @click="saveNotification">Guardar</button>
    <button @click="testNotification">Probar Notificació</button>
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
      alert(`Notificació guardada per ${this.taskTitle} ${this.notification.hours}h abans`);
      this.$emit('save', { ...this.notification });
    },
    testNotification() {
      alert('Notificació de proba enviada');
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