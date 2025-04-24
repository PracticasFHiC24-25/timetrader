<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <Sidebar />
    <div class="content container">
      <h1>Bienvenido a TimeTrader</h1>
      <div class="task-list row">
        <div v-for="task in tasks" :key="task.id" class="col-md-4">
          <TaskCard :task="task" @complete="completeTask" @edit="editTask" />
        </div>
      </div>
      <button class="fab" @click="addTask"><i class="fas fa-plus"></i></button>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import TaskCard from '../components/TaskCard.vue';

export default {
  components: { Sidebar, TaskCard },
  data() {
    return {
      tasks: [
        { id: 1, title: 'Estudiar para examen', priority: 'Alta', due: '2025-04-20', completed: false },
        { id: 2, title: 'Entrega proyecto', priority: 'Media', due: '2025-04-22', completed: false },
      ],
    };
  },
  methods: {
    addTask() {
      this.$router.push('/agenda/tasks');
    },
    completeTask(id) {
      const task = this.tasks.find(t => t.id === id);
      task.completed = true;
    },
    editTask(id) {
      this.$router.push(`/agenda/tasks?edit=${id}`);
    },
  },
};
</script>

<style scoped>
.home { display: flex; }
.content { padding: 16px; flex-grow: 1; margin-left: 250px; }
.task-list { margin-top: 16px; }
.fab {
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: 56px;
  height: 56px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  border: none;
  font-size: 24px;
  transition: transform 0.3s;
}
.fab:hover { transform: scale(1.1); }
@media (max-width: 768px) {
  .content { margin-left: 0; }
}
</style>