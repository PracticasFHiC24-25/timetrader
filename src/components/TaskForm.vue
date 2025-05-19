<template>
  <form @submit.prevent="submitTask" class="card">
    <label>Títol</label>
    <input v-model="task.title" required />
    <label>Data</label>
    <input v-model="task.due" type="date" required />
    <label>Hora d'inici</label>
    <input v-model="task.startTime" type="time" required />
    <label>Hora de finalització</label>
    <input v-model="task.endTime" type="time" required />
    <label>Prioritat</label>
    <select v-model="task.priority" required>
      <option>Alta</option>
      <option>Mitja</option>
      <option>Baixa</option>
    </select>
    <button type="submit">Guardar</button>
    <button type="button" @click="$emit('cancel')">Cancelar</button>
  </form>
</template>

<script>
export default {
  props: {
    initialTask: {
      type: Object,
      default: () => ({
        id: null,
        title: '',
        due: '',
        startTime: '',
        endTime: '',
        priority: 'Mitja',
        completed: false,
      }),
    },
  },
  data() {
    return {
      task: {
        id: null,
        title: '',
        due: '',
        startTime: '',
        endTime: '',
        priority: 'Mitja',
        completed: false,
      },
    };
  },
  watch: {
    initialTask: {
      immediate: true,
      deep: true,
      handler(newTask) {
        // Actualitzem l'objecte task amb les dades de initialTask
        this.task = { ...this.task, ...newTask };
      },
    },
  },
  methods: {
    submitTask() {
      // Validem que tots els camps obligatoris estiguin omplerts
      if (!this.task.title || !this.task.due || !this.task.startTime || !this.task.endTime) {
        alert("Si us plau, omple tots els camps obligatoris.");
        return;
      }
      // Validem que endTime sigui posterior a startTime
      const startDateTime = new Date(`${this.task.due}T${this.task.startTime}`);
      const endDateTime = new Date(`${this.task.due}T${this.task.endTime}`);
      if (endDateTime <= startDateTime) {
        alert("L'hora de finalització ha de ser posterior a l'hora d'inici.");
        return;
      }
      // Si no hi ha id (nova tasca), generem un id temporal
      const task = {
        ...this.task,
        id: this.task.id || Date.now(), // Manté l'id existent per a edicions
      };
      this.$emit('submit', task);
      this.resetForm();
    },
    resetForm() {
      this.task = {
        id: null,
        title: '',
        due: '',
        startTime: '',
        endTime: '',
        priority: 'Mitja',
        completed: false,
      };
    },
  },
};
</script>

<style scoped>
form {
  padding: 16px;
}
label {
  display: block;
  margin: 8px 0 4px;
}
input,
select {
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}
button {
  background: var(--primary);
  color: white;
}
button[type="button"] {
  background: var(--text-secondary);
}
.slide-in {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}
.slide-in[style] {
  max-height: 100px;
}
</style>