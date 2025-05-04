<template>
  <div class="notifications">
    <h1 class="page-title">Notificacions</h1>
    <div class="card">
      <NotificationForm :tasks="tasks" @save="saveNotification" />
    </div>
    <h2 class="section-title">Recordatoris Configurats</h2>
    <ul class="notification-list">
      <li v-for="notification in notifications" :key="notification.taskId" class="notification-item">
        <span>{{ taskTitle(notification.taskId) }} - {{ notification.hours }}h abans</span>
        <div class="button-group">
          <button @click="openModal(notification.taskId)" class="edit-btn" aria-label="Editar notificació">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </button>
          <button @click="openDeleteModal(notification.taskId)" class="delete-btn" aria-label="Esborrar notificació">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
      </li>
    </ul>

    <!-- Modal para editar notificación -->
    <div v-if="showModal" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Editar Notificació</h3>
          <button class="close-btn" @click="closeModal" aria-label="Tancar modal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <p class="task-label">Tasca: <span>{{ taskTitle(selectedTaskId) }}</span></p>
          <label class="input-label" for="edit-hours">Hores abans</label>
          <select v-model="editedHours" id="edit-hours" class="input-field">
            <option>4</option>
            <option>24</option>
            <option>48</option>
          </select>
        </div>
        <div class="modal-footer">
          <button @click="closeModal" class="btn btn-secondary">Cancelar</button>
          <button @click="saveEditedNotification" class="btn btn-primary">Guardar</button>
        </div>
      </div>
    </div>

    <!-- Modal para confirmar borrado -->
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
          <p>Estàs segur que vols esborrar la notificació per "{{ taskTitle(selectedTaskId) }}"?</p>
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
      showModal: false,
      selectedTaskId: null,
      editedHours: 4,
      showDeleteModal: false,
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
    openModal(taskId) {
      this.selectedTaskId = taskId;
      const notification = this.notifications.find(n => n.taskId === taskId);
      this.editedHours = notification.hours;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    saveEditedNotification() {
      const notification = this.notifications.find(n => n.taskId === this.selectedTaskId);
      if (notification) {
        notification.hours = this.editedHours;
      }
      this.closeModal();
    },
    openDeleteModal(taskId) {
      this.selectedTaskId = taskId;
      this.showDeleteModal = true;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
    },
    confirmDelete() {
      this.notifications = this.notifications.filter(n => n.taskId !== this.selectedTaskId);
      this.closeDeleteModal();
    },
  },
};
</script>

<style scoped>
/* General Styles */
.notifications {
  max-width: 800px;
  margin: 1.2rem auto;
  padding: 1.5rem;
  background: #f8f9fa;
  font-family: 'Inter', sans-serif;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  text-align: center;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 2rem 0 1rem;
}

/* Card Styles */
.card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

/* Notification List Styles */
.notification-list {
  list-style: none;
  padding: 0;
}

.notification-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  gap: 1.5rem;
}

.notification-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.button-group {
  display: flex;
  gap: 0.5rem;
}

.edit-btn {
  background: #4a90e2;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
}

.edit-btn:hover {
  background: #357abd;
}

.delete-btn {
  background: #dc3545;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
}

.delete-btn:hover {
  background: #c82333;
}

.edit-btn .icon,
.delete-btn .icon {
  width: 16px;
  height: 16px;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: #fff;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn svg {
  width: 20px;
  height: 20px;
  stroke: #666;
}

.modal-body {
  padding: 1.5rem;
}

.task-label {
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
}

.task-label span {
  font-weight: 500;
  color: #1a1a1a;
}

.input-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  background: #f9fafb;
  transition: border-color 0.2s ease;
}

.input-field:focus {
  outline: none;
  border-color: #4a90e2;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  text-align: center;
}

.btn-secondary {
  background: #e5e7eb;
  color: #333;
}

.btn-secondary:hover {
  background: #d1d5db;
}

.btn-primary {
  background: #4a90e2;
  color: #fff;
}

.btn-primary:hover {
  background: #357abd;
}

.btn:active {
  transform: scale(0.98);
}

@media (max-width: 576px) {
  .btn {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    min-width: 60px;
  }
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>