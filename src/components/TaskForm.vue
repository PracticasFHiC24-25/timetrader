<template>
  <form @submit.prevent="submitTask" class="card">
    <label>Títol</label>
    <input v-model="task.title" required :class="{ 'error': errors.title }" />
    <label>Data</label>
    <input v-model="task.due" type="date" required :class="{ 'error': errors.due }" />
    <label>Hora d'inici</label>
    <input v-model="task.startTime" type="time" required :class="{ 'error': errors.startTime }" />
    <label>Hora de finalització</label>
    <input v-model="task.endTime" type="time" required :class="{ 'error': errors.endTime }" />
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
      errors: {
        title: false,
        due: false,
        startTime: false,
        endTime: false,
      },
    };
  },
  watch: {
    initialTask: {
      immediate: true,
      deep: true,
      handler(newTask) {
        console.log('initialTask recibido:', newTask);
        this.task = {
          ...this.task,
          ...newTask,
        };
      },
    },
  },
  methods: {
    submitTask() {
      // Forzar la reactividad y esperar a que los valores se actualicen
      this.$nextTick(() => {
        // Reiniciar errores
        this.errors = {
          title: false,
          due: false,
          startTime: false,
          endTime: false,
        };

        // Depuración detallada
        console.log('Valores antes de validar:', {
          title: this.task.title,
          due: this.task.due,
          startTime: this.task.startTime,
          endTime: this.task.endTime,
          titleType: typeof this.task.title,
          dueType: typeof this.task.due,
          startTimeType: typeof this.task.startTime,
          endTimeType: typeof this.task.endTime,
        });

        // Validación
        let hasError = false;
        if (!this.task.title || this.task.title.trim() === '') {
          this.errors.title = true;
          hasError = true;
        }
        if (!this.task.due || this.task.due === '') {
          this.errors.due = true;
          hasError = true;
        }
        if (!this.task.startTime || this.task.startTime === '') {
          this.errors.startTime = true;
          hasError = true;
        }
        if (!this.task.endTime || this.task.endTime === '') {
          this.errors.endTime = true;
          hasError = true;
        }

        if (hasError) {
          console.log('Validación fallida. Errores:', this.errors);
          alert("Si us plau, omple tots els camps obligatoris.");
          return;
        }

        // Validar que endTime sea posterior a startTime
        const startDateTime = new Date(`${this.task.due}T${this.task.startTime}`);
        const endDateTime = new Date(`${this.task.due}T${this.task.endTime}`);
        if (endDateTime <= startDateTime) {
          alert("L'hora de finalització ha de ser posterior a l'hora d'inici.");
          return;
        }

        // Preparar y emitir la tarea
        const task = {
          ...this.task,
          id: this.task.id || Date.now(),
        };
        console.log('Tarea emitida:', task);
        this.$emit('submit', task);
        this.resetForm();
      });
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
      this.errors = {
        title: false,
        due: false,
        startTime: false,
        endTime: false,
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
input.error,
select.error {
  border-color: #e53e3e;
  background-color: #ffebee;
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