<template>
  <div class="tasks">
    <div class="header-section">
      <h1 class="page-title">Tasques i Events</h1>
      <div class="sort-section">
        <label class="input-label" for="sort-select">Ordenar per:</label>
        <select v-model="sortBy" @change="sortTasks" id="sort-select" class="input-field">
          <option value="priority">Prioritat</option>
          <option value="due">Data</option>
        </select>
      </div>
    </div>
    <div class="task-list row">
      <div v-for="task in sortedTasks" :key="task.id" class="col-md-4 col-sm-6 col-12">
        <TaskCard :task="task" @delete="openDeleteModal" @edit="openEditModal" />
      </div>
    </div>

    <!-- Botón flotante para abrir el modal de nueva tarea -->
    <button @click="openTaskModal" class="fab" aria-label="Afegir nova tasca">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
      </svg>
    </button>

    <!-- Modal para nueva tarea -->
    <div v-if="showTaskModal" class="modal" @click="closeTaskModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Nova Tasca</h3>
          <button class="close-btn" @click="closeTaskModal" aria-label="Tancar modal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitTask">
            <div class="form-group">
              <label class="input-label" for="task-title">Títol</label>
              <input v-model="newTask.title" id="task-title" required class="input-field" />
            </div>
            <div class="form-group">
              <label class="input-label" for="task-due">Data</label>
              <input v-model="newTask.due" id="task-due" type="date" required class="input-field" />
            </div>
            <div class="form-group">
              <label class="input-label" for="task-start-time">Hora d'inici</label>
              <input v-model="newTask.startTime" id="task-start-time" type="time" required class="input-field" />
            </div>
            <div class="form-group">
              <label class="input-label" for="task-end-time">Hora de finalització</label>
              <input v-model="newTask.endTime" id="task-end-time" type="time" required class="input-field" />
            </div>
            <div class="form-group">
              <label class="input-label" for="task-priority">Prioritat</label>
              <select v-model="newTask.priority" id="task-priority" required class="input-field">
                <option>Alta</option>
                <option>Mitja</option>
                <option>Baixa</option>
              </select>
            </div>
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="newTask.needsPreparation" />
                Requereix preparació
              </label>
            </div>
            <div v-if="newTask.needsPreparation" class="slide-in">
              <label class="input-label" for="task-preparation">Hores de preparació</label>
              <input v-model="newTask.preparation" id="task-preparation" type="number" min="1" class="input-field" />
            </div>
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="newTask.notify" />
                Notificació
              </label>
            </div>
            <div v-if="newTask.notify" class="slide-in">
              <label class="input-label" for="task-notify-hours">Hores abans</label>
              <select v-model="newTask.notifyHours" id="task-notify-hours" class="input-field">
                <option>4</option>
                <option>24</option>
                <option>48</option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="button" @click="closeTaskModal" class="btn btn-secondary">Cancelar</button>
              <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal para editar tarea -->
    <div v-if="showEditModal" class="modal" @click="closeEditModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Editar Tasca</h3>
          <button class="close-btn" @click="closeEditModal" aria-label="Tancar modal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveEditedTask">
            <div class="form-group">
              <label class="input-label" for="edit-task-title">Títol</label>
              <input v-model="editedTask.title" id="edit-task-title" required class="input-field" />
            </div>
            <div class="form-group">
              <label class="input-label" for="edit-task-due">Data</label>
              <input v-model="editedTask.due" id="edit-task-due" type="date" required class="input-field" />
            </div>
            <div class="form-group">
              <label class="input-label" for="edit-task-start-time">Hora d'inici</label>
              <input v-model="editedTask.startTime" id="edit-task-start-time" type="time" required class="input-field" />
            </div>
            <div class="form-group">
              <label class="input-label" for="edit-task-end-time">Hora de finalització</label>
              <input v-model="editedTask.endTime" id="edit-task-end-time" type="time" required class="input-field" />
            </div>
            <div class="form-group">
              <label class="input-label" for="edit-task-priority">Prioritat</label>
              <select v-model="editedTask.priority" id="edit-task-priority" required class="input-field">
                <option>Alta</option>
                <option>Mitja</option>
                <option>Baixa</option>
              </select>
            </div>
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="editedTask.needsPreparation" />
                Requereix preparació
              </label>
            </div>
            <div v-if="editedTask.needsPreparation" class="slide-in">
              <label class="input-label" for="edit-task-preparation">Hores de preparació</label>
              <input v-model="editedTask.preparation" id="edit-task-preparation" type="number" min="1" class="input-field" />
            </div>
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="editedTask.notify" />
                Notificació
              </label>
            </div>
            <div v-if="editedTask.notify" class="slide-in">
              <label class="input-label" for="edit-task-notify-hours">Hores abans</label>
              <select v-model="editedTask.notifyHours" id="edit-task-notify-hours" class="input-field">
                <option>4</option>
                <option>24</option>
                <option>48</option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="button" @click="closeEditModal" class="btn btn-secondary">Cancelar</button>
              <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal para confirmar eliminación -->
    <div v-if="showDeleteModal" class="modal" @click="closeDeleteModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Confirmar Esborrament</h3>
          <button class="close-btn" @click="closeDeleteModal" aria-label="Tancar modal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <p>Estàs segur que vols esborrar la tasca "{{ selectedTask?.title }}"?</p>
        </div>
        <div class="modal-footer">
          <button @click="closeDeleteModal" class="btn btn-secondary">No</button>
          <button @click="confirmDelete" class="btn btn-primary">Sí</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskCard from '../components/TaskCard.vue';

export default {
  components: { TaskCard },
  data() {
    return {
      tasks: [
        { id: 1, title: 'Estudiar examen', priority: 'Alta', due: '2025-04-20', startTime: '09:00', endTime: '12:00', completed: false },
        { id: 2, title: 'Lliurament projecte', priority: 'Mitja', due: '2025-04-22', startTime: '14:00', endTime: '16:00', completed: false },
      ],
      sortBy: 'priority',
      showTaskModal: false,
      showEditModal: false,
      showDeleteModal: false,
      selectedTask: null,
      newTask: {
        title: '',
        due: '',
        startTime: '',
        endTime: '',
        priority: 'Mitja',
        needsPreparation: false,
        preparation: 1,
        notify: false,
        notifyHours: 4,
      },
      editedTask: {
        id: null,
        title: '',
        due: '',
        startTime: '',
        endTime: '',
        priority: '',
        needsPreparation: false,
        preparation: 1,
        notify: false,
        notifyHours: 4,
      },
    };
  },
  computed: {
    sortedTasks() {
      const tasks = [...this.tasks];
      if (this.sortBy === 'priority') {
        const priorityOrder = { 'Alta': 1, 'Mitja': 2, 'Baixa': 3 };
        return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      }
      return tasks.sort((a, b) => new Date(a.due) - new Date(b.due));
    },
  },
  methods: {
    addTask(task) {
      this.tasks.push(task);
    },
    openTaskModal() {
      this.showTaskModal = true;
    },
    closeTaskModal() {
      this.showTaskModal = false;
      this.resetForm();
    },
    submitTask() {
      this.addTask({ ...this.newTask, id: Date.now(), completed: false });
      this.closeTaskModal();
    },
    resetForm() {
      this.newTask = {
        title: '',
        due: '',
        startTime: '',
        endTime: '',
        priority: 'Mitja',
        needsPreparation: false,
        preparation: 1,
        notify: false,
        notifyHours: 4,
      };
    },
    openEditModal(task) {
      this.selectedTask = task;
      this.editedTask = { ...task };
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
      this.selectedTask = null;
      this.editedTask = { id: null, title: '', due: '', startTime: '', endTime: '', priority: '', needsPreparation: false, preparation: 1, notify: false, notifyHours: 4 };
    },
    saveEditedTask() {
      const taskIndex = this.tasks.findIndex(t => t.id === this.editedTask.id);
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...this.editedTask };
      }
      this.closeEditModal();
    },
    openDeleteModal(task) {
      this.selectedTask = task;
      this.showDeleteModal = true;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.selectedTask = null;
    },
    confirmDelete() {
      this.tasks = this.tasks.filter(t => t.id !== this.selectedTask.id);
      this.closeDeleteModal();
    },
    cancelTask() {
      this.$router.push('/agenda');
    },
  },
};
</script>

<style scoped>
/* General Styles */
.tasks {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  font-family: 'Inter', sans-serif;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
}

/* Header Section */
.header-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 1.5rem 2rem;
  border-radius: 12px 12px 0 0;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1.5rem;
  text-align: center;
  letter-spacing: -0.02em;
}

.sort-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  background: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* Task List */
.task-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

/* Floating Action Button */
.fab {
  position: fixed;
  bottom: 80px;
  right: 18px;
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1001;
}

.fab:hover {
  background: linear-gradient(135deg, #357abd 0%, #2a5b9e 100%);
  transform: scale(1.15) rotate(90deg);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.fab .icon {
  width: 24px;
  height: 24px;
  color: #ffffff;
  transition: transform 0.3s ease;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.4s ease;
}

.modal-content {
  background: #ffffff;
  border-radius: 16px;
  width: 550px;
  max-width: 95%;
  max-height: 90vh; /* Limitar al 90% de l'alçada de la pantalla */
  overflow-y: auto; /* Permetre desplaçament vertical si cal */
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2rem;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
}

.modal-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.close-btn:hover {
  transform: rotate(90deg);
}

.close-btn svg {
  width: 22px;
  height: 22px;
  stroke: #4a5568;
}

.modal-body {
  padding: 2rem;
  background: #ffffff;
  max-height: calc(90vh - 100px); /* Ajustar alçada màxima segons el header i footer */
  overflow-y: auto; /* Permetre desplaçament si el contingut és massa llarg */
}

.modal-footer {
  padding: 1.25rem 2rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  background: #f8fafc;
}

/* Form Styles */
.form-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

.input-label {
  display: block;
  font-size: 0.95rem;
  font-weight: 500;
  color: #2d3748;
  margin-bottom: 0.5rem;
  letter-spacing: 0.01em;
  line-height: 1.5;
  overflow: visible;
  white-space: nowrap;
}

.checkbox-label {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: #2d3748;
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.checkbox-label input {
  margin-right: 0.75rem;
  accent-color: #4a90e2;
}

.input-field {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  color: #1a202c;
  background: #f7fafc;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.input-field:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  background: #ffffff;
}

.input-field:hover {
  border-color: #cbd5e0;
}

.slide-in {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
}

.slide-in[style] {
  max-height: 120px;
}

/* Button Styles */
.btn {
  padding: 0.875rem 1.75rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.btn-secondary {
  background: #e2e8f0;
  color: #2d3748;
}

.btn-secondary:hover {
  background: #cbd5e0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary {
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  color: #ffffff;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #357abd 0%, #2a5b9e 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:active {
  transform: translateY(1px);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .tasks {
    padding: 1.5rem;
    margin: 1rem;
  }

  .page-title {
    font-size: 1.75rem;
  }

  .sort-section {
    flex-direction: column;
    align-items: stretch;
    padding: 0.5rem 1rem;
  }

  .input-label {
    margin-bottom: 0.5rem;
  }

  .modal-content {
    width: 90%;
    max-height: 90vh;
  }

  .modal-body {
    padding: 1.5rem;
    max-height: calc(90vh - 100px);
  }

  .btn {
    padding: 0.75rem 1.25rem;
    font-size: 0.95rem;
    min-width: 80px;
  }
}

@media (max-width: 576px) {
  .tasks {
    padding: 1rem;
    margin: 0.5rem;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .sort-section {
    padding: 0.5rem;
  }

  .modal-content {
    width: 95%;
    max-height: 90vh;
  }

  .modal-header h3 {
    font-size: 1.25rem;
  }

  .modal-body {
    padding: 1rem;
    max-height: calc(90vh - 100px);
  }

  .btn {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    min-width: 70px;
  }

  .fab {
    width: 40px;
    height: 40px;
    bottom: 65px;
    right: 12px;
  }

  .fab .icon {
    width: 20px;
    height: 20px;
  }
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>