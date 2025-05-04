<template>
  <div class="notifications">
    <h1 class="page-title animate_animated animate_fadeInDown">Notificacions</h1>
    <div class="card animate_animated animate_fadeInUp">
      <NotificationForm :tasks="tasks" @save="saveNotification" />
    </div>
    <h2 class="section-title animate_animated animate_fadeInUp">Recordatoris Configurats</h2>
    <ul class="notification-list">
      <li
        v-for="(notification, idx) in notifications"
        :key="notification.taskId"
        class="notification-item animate_animated animate_fadeInUp"
        :style="{ animationDelay: `${idx * 0.1}s` }"
      >
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

    <!-- Modal per editar notificació -->
    <div v-if="showModal" class="modal" @click="closeModal">
      <div class="modal-content animate_animated animate_slideIn">
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

    <!-- Modal per confirmar esborrament -->
    <div v-if="showDeleteModal" class="modal" @click="closeDeleteModal">
      <div class="modal-content animate_animated animate_slideIn">
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
/* Importar fonts de Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans:wght@400;600&display=swap');

/* Comú */
.notification-item,
.btn,
.edit-btn,
.delete-btn,
.close-btn {
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
}

.notification-item:hover,
.btn:hover,
.edit-btn:hover,
.delete-btn:hover,
.close-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Estils generals */
.notifications {
  font-family: 'Open Sans', Arial, sans-serif;
  max-width: 900px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #F7FAFC;
  min-height: 100vh;
}

/* Títols */
.page-title {
  font-family: 'Montserrat', Arial, sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1A202C;
  margin-bottom: 2rem;
  text-align: center;
}

.section-title {
  font-family: 'Montserrat', Arial, sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #1A202C;
  margin: 2.5rem 0 1.5rem;
}

/* Card Styles */
.card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
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
  background: #ffffff;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  gap: 1rem;
}

.notification-item span {
  font-size: 1.1rem;
  color: #2D3748;
}

.button-group {
  display: flex;
  gap: 0.75rem;
}

.edit-btn,
.delete-btn {
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.edit-btn {
  background: #4A90E2;
  color: #ffffff;
}

.edit-btn:hover {
  background: #2B6CB0;
}

.delete-btn {
  background: #DC3545;
  color: #ffffff;
}

.delete-btn:hover {
  background: #C82333;
}

.edit-btn .icon,
.delete-btn .icon {
  width: 20px;
  height: 20px;
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
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: #ffffff;
  border-radius: 12px;
  width: 450px;
  max-width: 90%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #E2E8F0;
}

.modal-header h3 {
  font-family: 'Montserrat', Arial, sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1A202C;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn svg {
  width: 24px;
  height: 24px;
  stroke: #718096;
}

.close-btn:hover svg {
  stroke: #4A90E2;
}

.modal-body {
  padding: 1.5rem;
}

.task-label {
  font-family: 'Open Sans', Arial, sans-serif;
  font-size: 1rem;
  color: #718096;
  margin-bottom: 1rem;
}

.task-label span {
  font-weight: 600;
  color: #2D3748;
}

.input-label {
  font-family: 'Open Sans', Arial, sans-serif;
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #2D3748;
  margin-bottom: 0.5rem;
}

.input-field {
  font-family: 'Open Sans', Arial, sans-serif;
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 1rem;
  color: #2D3748;
  background: #F9FAFB;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input-field:focus {
  outline: none;
  border-color: #4A90E2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #E2E8F0;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn {
  font-family: 'Open Sans', Arial, sans-serif;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  min-width: 100px;
  text-align: center;
}

.btn-secondary {
  background: #E5E7EB;
  color: #2D3748;
}

.btn-secondary:hover {
  background: #D1D5DB;
}

.btn-primary {
  background: linear-gradient(90deg, #4A90E2, #63B3ED);
  color: #ffffff;
}

.btn-primary:hover {
  background: linear-gradient(90deg, #2B6CB0, #4A90E2);
}

.btn:active {
  transform: scale(0.98);
}

/* Animacions */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Responsive */
@media (max-width: 768px) {
  .notifications {
    padding: 1rem;
    margin: 1rem auto;
  }

  .page-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .card {
    padding: 1rem;
  }

  .notification-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.75rem;
  }

  .notification-item span {
    font-size: 1rem;
  }

  .edit-btn,
  .delete-btn {
    width: 36px;
    height: 36px;
  }

  .edit-btn .icon,
  .delete-btn .icon {
    width: 18px;
    height: 18px;
  }

  .modal-content {
    width: 90%;
    max-width: 400px;
  }

  .btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
    min-width: 80px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.8rem;
  }

  .section-title {
    font-size: 1.3rem;
  }

  .card {
    padding: 0.75rem;
  }

  .notification-item {
    padding: 0.5rem;
  }

  .notification-item span {
    font-size: 0.9rem;
  }

  .edit-btn,
  .delete-btn {
    width: 32px;
    height: 32px;
  }

  .edit-btn .icon,
  .delete-btn .icon {
    width: 16px;
    height: 16px;
  }

  .modal-header h3 {
    font-size: 1.3rem;
  }

  .modal-body {
    padding: 1rem;
  }

  .btn {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    min-width: 70px;
  }
}
</style>