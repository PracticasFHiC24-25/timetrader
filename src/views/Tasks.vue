<!-- src/views/Tasks.vue -->
<template>
  <div class="tasks container">
    <h1>Tareas y Eventos</h1>
    <TaskForm @submit="addTask" @cancel="cancelTask" />
    <div>
      <label>Ordenar por:</label>
      <select v-model="sortBy" @change="sortTasks">
        <option value="priority">Prioridad</option>
        <option value="due">Fecha</option>
      </select>
    </div>
    <div class="task-list row">
      <div v-for="task in sortedTasks" :key="task.id" class="col-md-4">
        <TaskCard :task="task" @complete="completeTask" @edit="editTask" />
      </div>
    </div>
  </div>
</template>

<script>
import TaskForm from '../components/TaskForm.vue';
import TaskCard from '../components/TaskCard.vue';

export default {
  components: { TaskForm, TaskCard },
  data() {
    return {
      tasks: [
        { id: 1, title: 'Estudiar para examen', priority: 'Alta', due: '2025-04-20', completed: false },
        { id: 2, title: 'Entrega proyecto', priority: 'Media', due: '2025-04-22', completed: false },
      ],
      sortBy: 'priority',
    };
  },
  computed: {
    sortedTasks() {
      const tasks = [...this.tasks];
      if (this.sortBy === 'priority') {
        const priorityOrder = { 'Alta': 1, 'Media': 2, 'Baja': 3 };
        return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      }
      return tasks.sort((a, b) => new Date(a.due) - new Date(b.due));
    },
  },
  methods: {
    addTask(task) {
      this.tasks.push(task);
    },
    completeTask(id) {
      const task = this.tasks.find(t => t.id === id);
      task.completed = true;
    },
    editTask(id) {
      alert(`Editar tarea ${id} (implementar formulario de edición)`);
    },
    cancelTask() {
      this.$router.push('/agenda');
    },
  },
};
</script>

<style scoped>
.tasks { padding: 16px; }
</style>