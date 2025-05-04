<!-- src/views/Notifications.vue -->
<template>
  <div class="notifications container">
    <h1>Notificacions</h1>
    <NotificationForm :tasks="tasks" @save="saveNotification" />
    <h2>Recordatoris Configurats</h2>
    <ul>
      <li v-for="notification in notifications" :key="notification.taskId">
        {{ taskTitle(notification.taskId) }} - {{ notification.hours }}h antes
      </li>
    </ul>
  </div>
</template>

<script>
import NotificationForm from '../components/NotificationForm.vue';

export default {
  components: { NotificationForm },
  data() {
    return {
      tasks: [
        { id: 1, title: 'Estudiar para examen', priority: 'Alta', due: '2025-04-20' },
        { id: 2, title: 'Entrega proyecto', priority: 'Media', due: '2025-04-22' },
      ],
      notifications: [],
    };
  },
  methods: {
    saveNotification(notification) {
      this.notifications.push(notification);
    },
    taskTitle(taskId) {
      const task = this.tasks.find(t => t.id === taskId);
      return task ? task.title : 'Tarea desconocida';
    },
  },
};
</script>

<style scoped>
.notifications { padding: 16px; }
ul { list-style: none; padding: 0; }
li { padding: 8px; border-bottom: 1px solid #E0E0E0; }
</style>