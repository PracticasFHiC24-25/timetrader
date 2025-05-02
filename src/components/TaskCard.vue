<!-- src/components/TaskCard.vue -->
<template>
  <div class="card task-card">
    <h3>{{ task.title }}</h3>
    <p>Prioritat: <span :style="{ color: priorityColor }">{{ task.priority }}</span></p>
    <p>Data: {{ task.due }}</p>
    <p v-if="task.preparation">Preparació: {{ task.preparation }} horas</p>
    <button @click="$emit('complete', task.id)" :disabled="task.completed">
      {{ task.completed ? 'Completada' : 'Completar' }}
    </button>
    <button @click="$emit('edit', task.id)">Editar</button>
  </div>
</template>

<script>
export default {
  props: {
    task: Object,
  },
  computed: {
    priorityColor() {
      return this.task.priority === 'Alta' ? 'var(--accent-red)' :
              this.task.priority === 'Mitja' ? '#FFC107' : 'var(--accent-green)';
    },
  },
};
</script>

<style scoped>
.task-card {
  transition: box-shadow 0.3s, opacity 0.5s;
}
.task-card:hover { box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
.task-card.completed { border: 2px solid var(--accent-green); opacity: 0.8; }
h3 { font-size: 16px; margin: 0 0 8px; }
p { font-size: 14px; margin: 4px 0; }
button {
  background: var(--primary);
  color: white;
  border: none;
  padding: 8px 16px;
  margin-right: 8px;
  border-radius: 4px;
}
button:disabled { background: #CCCCCC; }
</style>