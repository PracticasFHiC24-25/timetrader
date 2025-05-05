<template>
  <form @submit.prevent="submitTask" class="card">
    <h2>Nova Tasca</h2>
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
    <label>
      <input type="checkbox" v-model="task.needsPreparation" />
      Requiereix preparació
    </label>
    <div v-if="task.needsPreparation" class="slide-in">
      <label>Hores de preparació</label>
      <input v-model="task.preparation" type="number" min="1" />
    </div>
    <label>
      <input type="checkbox" v-model="task.notify" />
      Notificació
    </label>
    <div v-if="task.notify" class="slide-in">
      <label>Hores abans</label>
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
        startTime: '', // Camp per l'hora d'inici
        endTime: '',   // Camp per l'hora de finalització
        priority: 'Mitja',
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
        startTime: '', // Reinicia l'hora d'inici
        endTime: '',   // Reinicia l'hora de finalització
        priority: 'Mitja',
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