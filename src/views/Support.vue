<!-- src/views/Support.vue -->
<template>
  <div class="support-page">
    <Sidebar />
    <main class="main-content">
      <h1>Suport i Contacte</h1>

      <!-- Formulari de contacte -->
      <section class="contact-form-section" aria-labelledby="contact-title">
        <h2 id="contact-title">Contacta amb nosaltres</h2>
        <form @submit.prevent="submitForm" class="contact-form" novalidate>
          <div class="form-group">
            <label for="name">Nom</label>
            <input
              id="name"
              type="text"
              v-model.trim="form.name"
              required
              aria-required="true"
            />
          </div>
          <div class="form-group">
            <label for="email">Correu electrònic</label>
            <input
              id="email"
              type="email"
              v-model.trim="form.email"
              required
              aria-required="true"
            />
          </div>
          <div class="form-group">
            <label for="subject">Assumpte</label>
            <input
              id="subject"
              type="text"
              v-model="form.subject"
            />
          </div>
          <div class="form-group">
            <label for="message">Missatge</label>
            <textarea
              id="message"
              rows="5"
              v-model.trim="form.message"
              required
              aria-required="true"
            ></textarea>
          </div>
          <button
            type="submit"
            class="submit-btn"
            :disabled="!isFormValid"
          >
            Enviar
          </button>
        </form>
        <p v-if="submitted" class="success-message" role="status">
          Gràcies pel teu missatge! Et respondrem aviat.
        </p>
        <p class="alt-contact">
          Si no vols utilitzar aquest formulari o prefereixes, escriu-nos a 
          <a href="mailto:support@timetrader.com">support@timetrader.com</a>.
        </p>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Support',
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      submitted: false
    };
  },
  computed: {
    isFormValid() {
      const { name, email, message } = this.form;
      return name && email.includes('@') && message;
    }
  },
  methods: {
    submitForm() {
      if (!this.isFormValid) return;
      console.log('Form data:', this.form);
      this.submitted = true;
      this.form = { name: '', email: '', subject: '', message: '' };
    }
  }
};
</script>

<style scoped>
.support-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-bg);
}

@media (min-width: 768px) {
  .support-page {
    flex-direction: row;
  }
}

.main-content {
  flex: 1;
  padding: var(--space-lg);
  overflow-y: auto;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: var(--space-sm); /* Espai petit abans del formulari */
}

/* Aquí s'indica l'espai entre el títol <h2> i el formulari */
.contact-form-section h2 + .contact-form {
  margin-top: 2rem;
}

.contact-form-section {
  max-width: 600px;
  margin: 0 auto;
  background: var(--color-white);
  padding: var(--space-lg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.contact-form {
  display: grid;
  gap: var(--space-md);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-md); /* Espai entre el final del missatge i el botó */
}

.form-group label {
  margin-bottom: var(--space-xs);
}

.form-group input,
.form-group textarea {
  padding: var(--space-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-md);
  resize: vertical;
}

.submit-btn {
  padding: var(--space-sm) var(--space-lg);
  background-color: #4A90E2;
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-md);
  cursor: pointer;
  transition: background 0.2s ease;
  align-self: start;
}
.submit-btn:hover,
.submit-btn:focus {
  background-color: #4A90E2;
}
.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.success-message {
  margin-top: var(--space-md);
  color: var(--color-success);
  font-weight: 600;
}

.alt-contact {
  margin-top: var(--space-md);
  text-align: center;
  color: var(--color-secondary);
  margin-bottom: var(--space-md);
}

:deep(.sidebar) {
  width: 100%;
  max-width: 250px;
  background: var(--color-white);
  padding: var(--space-md);
  box-shadow: var(--shadow-md);
}

@media (max-width: 767px) {
  :deep(.sidebar) {
    display: none;
  }
}
</style>