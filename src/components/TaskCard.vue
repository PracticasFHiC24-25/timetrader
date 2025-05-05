<template>
  <div class="card task-card">
    <h3>{{ task.title }}</h3>
    <p>Prioritat: <span :style="{ color: priorityColor }">{{ task.priority }}</span></p>
    <p>Data: {{ task.due }}</p>
    <p v-if="task.startTime">Hora d'inici: {{ task.startTime }}</p>
    <p v-if="task.endTime">Hora de finalització: {{ task.endTime }}</p>
    <p v-if="task.preparation">Preparació: {{ task.preparation }} hores</p>
    <p v-if="task.notify">Notificació: {{ task.notifyHours }}h abans</p>
    <div class="button-group">
      <button @click="$emit('edit', task)" class="btn btn-edit">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
      </button>
      <button @click="$emit('delete', task)" class="btn btn-delete">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
        </svg>
        <span>Eliminar</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: Object,
  },
  computed: {
    priorityColor() {
      return this.task.priority === 'Alta' ? '#e53e3e' :
             this.task.priority === 'Mitja' ? '#d69e2e' : '#38a169';
    },
  },
};
</script>

<style scoped>
.task-card {
  transition: box-shadow 0.3s, opacity 0.5s;
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.task-card:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.75rem;
}

p {
  font-size: 0.95rem;
  color: #4a5568;
  margin: 0.5rem 0;
}

.button-group {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  justify-content: flex-end;
  align-items: center;
}

.btn {
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-edit {
  background: #4a90e2;
  color: #ffffff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.btn-edit:hover {
  background: #357abd;
  transform: scale(1.1);
}

.btn-delete {
  background: #e53e3e;
  color: #ffffff;
  padding: 0.5rem 1rem;
  gap: 0.5rem;
}

.btn-delete:hover {
  background: #c53030;
  transform: scale(1.05);
}

.btn .icon {
  width: 20px;
  height: 20px;
}

.btn span {
  font-size: 0.95rem;
  font-weight: 500;
}
</style>