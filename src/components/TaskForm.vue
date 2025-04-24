<!-- src/components/TaskForm.vue -->
<template>
  <form @submit.prevent="submitTask" class="card">
    <h2>Nueva Tarea</h2>
    <label>Título</label>
    <input v-model="task.title" required />
    <label>Fecha</label>
    <input v-model="task.due" type="date" required />
    <label>Prioridad</label>
    <select v-model="task.priority" required>
      <option>Alta</option>
      <option>Media</option>
      <option>Baja</option>
    </select>
    <label>
      <input type="checkbox" v-model="task.needsPreparation" />
      Requiere preparación
    </label>
    <div v-if="task.needsPreparation" class="slide-in">
      <label>Horas de preparación</label>
      <input v-model="task.preparation" type="number" min="1" />
    </div>
    <label>
      <input type="checkbox" v-model="task.notify" />
      Notificación
    </label>
    <div v-if="task.notify" class="slide-in">
      <label>Horas antes</label>
      <select v-model="task.notifyHours">
        <option>4</option>
        <option>24</option>
        <option>48</option>
      </select>
    </div>
    <button type="submit">Guardar</button>
    <button type="button" @click="$emit('cancel')">Cancelar</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      task: {
        title: '',
        due: '',
        priority: 'Media',
        needsPreparation: false,
        preparation: 1,
        notify: false,
        notifyHours: 4,
      },
    };
  },
  methods: {
    submitTask() {
      this.$emit('submit', { ...this.task, id: Date.now() });
      this.resetForm();
    },
    resetForm() {
      this.task = {
        title: '',
        due: '',
        priority: 'Media',
        needsPreparation: false,
        preparation: 1,
        notify: false,
        notifyHours: 4,
      };
    },
  },
};
</script>

<style scoped>
form { padding: 16px; }
label { display: block; margin: 8px 0 4px; }
input, select {
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
}
button { background: var(--primary); color: white; }
button[type="button"] { background: var(--text-secondary); }
.slide-in {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}
.slide-in[style] { max-height: 100px; }
</style>