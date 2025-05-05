<!-- src/views/Support.vue -->
<template>
  <div class="support-page">
    <main class="main-content">

      <!-- Capçalera professional -->
      <header class="header">
        <h1>Suport i Contacte</h1>
        <p class="subtitle">Estem aquí per ajudar-te. Contacta amb nosaltres i et respondrem el més aviat possible!</p>
      </header>

      <!-- Formulari de contacte -->
      <section class="contact-form-section" aria-labelledby="contact-title">
        <!-- Breadcrumb -->
        <nav class="breadcrumb" aria-label="Camí de navegació">
          <router-link to="/" class="breadcrumb-link">Inici</router-link>
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb-current">Suport</span>
        </nav>

        <h2 id="contact-title">Envia'ns un missatge</h2>
        <form @submit.prevent="submitForm" class="contact-form" novalidate>
          <div class="form-group">
            <label for="name">
              <i class="fas fa-user"></i> Nom
            </label>
            <input
              id="name"
              type="text"
              v-model.trim="form.name"
              required
              aria-required="true"
              :class="{ 'error': showErrors && !form.name }"
              placeholder="El teu nom"
            />
            <span v-if="showErrors && !form.name" class="error-message">El nom és obligatori</span>
          </div>
          <div class="form-group">
            <label for="email">
              <i class="fas fa-envelope"></i> Correu electrònic
            </label>
            <input
              id="email"
              type="email"
              v-model.trim="form.email"
              required
              aria-required="true"
              :class="{ 'error': showErrors && !form.email.includes('@') }"
              placeholder="El teu correu electrònic"
            />
            <span v-if="showErrors && !form.email.includes('@')" class="error-message">Introdueix un correu electrònic vàlid</span>
          </div>
          <div class="form-group">
            <label for="subject">
              <i class="fas fa-tag"></i> Assumpte
            </label>
            <input
              id="subject"
              type="text"
              v-model="form.subject"
              placeholder="Assumpte del missatge"
            />
          </div>
          <div class="form-group">
            <label for="message">
              <i class="fas fa-comment"></i> Missatge
            </label>
            <textarea
              id="message"
              rows="5"
              v-model.trim="form.message"
              required
              aria-required="true"
              :class="{ 'error': showErrors && !form.message }"
              placeholder="Escriu el teu missatge aquí..."
            ></textarea>
            <span v-if="showErrors && !form.message" class="error-message">El missatge és obligatori</span>
          </div>
          <button
            type="submit"
            class="submit-btn"
            :disabled="!isFormValid"
          >
            Enviar Missatge
          </button>
        </form>
        <p v-if="submitted" class="success-message" role="status">
          Gràcies pel teu missatge! Et respondrem aviat.
        </p>
      </section>

      <!-- Secció de contacte alternatiu -->
      <section class="alternative-contact-section">
        <h2>Contacte alternatiu</h2>
        <div class="contact-info">
          <p><i class="fas fa-envelope"></i> <a href="mailto:support@timetrader.com">support@timetrader.com</a></p>
          <p><i class="fas fa-phone"></i> +34 123 456 789</p>
          <p><i class="fas social_media"></i> @TimeTrader</p>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <router-link to="/terms">Termes i Condicions</router-link>
        <router-link to="/support">Suport</router-link>
        <router-link to="/faq">Preguntes Freqüents</router-link>
      </footer>
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
      submitted: false,
      showErrors: false
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
      if (!this.isFormValid) {
        this.showErrors = true;
        return;
      }
      console.log('Form data:', this.form);
      this.submitted = true;
      this.showErrors = false;
      this.form = { name: '', email: '', subject: '', message: '' };
    }
  }
};
</script>

<style scoped>
/* Contenedor principal */
.support-page {
  min-height: 100vh;
  background: #f5f7fa;
}

/* Área principal de contingut */
.main-content {
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Capçalera */
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.header .subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
}

/* Secció del formulari */
.contact-form-section {
  width: 100%;
  max-width: 700px;
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}

.contact-form-section h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

.contact-form {
  display: grid;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 1rem;
  color: #34495e;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-group label i {
  color: #4A90E2;
}

.form-group input,
.form-group textarea {
  padding: 12px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #4A90E2;
  box-shadow: 0 0 5px rgba(74, 144, 226, 0.3);
  outline: none;
}

.form-group .error {
  border-color: #e74c3c;
}

.form-group .error-message {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 5px;
}

.form-group textarea {
  resize: vertical;
}

.submit-btn {
  padding: 12px 30px;
  background-color: #4A90E2;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
  align-self: center;
}

.submit-btn:hover,
.submit-btn:focus {
  background-color: #357ABD;
  transform: scale(1.05);
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  transform: none;
}

.success-message {
  margin-top: 20px;
  color: #2ecc71;
  font-weight: 600;
  text-align: center;
}

/* Secció de contacte alternatiu */
.alternative-contact-section {
  width: 100%;
  max-width: 700px;
  text-align: center;
  margin-bottom: 40px;
}

.alternative-contact-section h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 20px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-info p {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 1rem;
  color: #34495e;
}

.contact-info i {
  color: #4A90E2;
}

.contact-info a {
  color: #4A90E2;
  text-decoration: none;
}

.contact-info a:hover {
  text-decoration: underline;
}

/* Footer */
.footer {
  text-align: center;
  padding: 20px 0;
  border-top: 1px solid #e0e0e0;
  width: 100%;
}

.footer a {
  margin: 0 15px;
  text-decoration: none;
  color: #4A90E2;
}

.footer a:hover {
  text-decoration: underline;
}

.breadcrumb {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: #7f8c8d;
  margin-bottom: 20px;
  align-self: flex-start;
}

.breadcrumb-link {
  color: #4A90E2;
  text-decoration: none;
  font-weight: 500;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #bdc3c7;
}

.breadcrumb-current {
  color: #2c3e50;
  font-weight: 600;
}

/* Responsivitat */
@media (max-width: 767px) {
  .main-content {
    padding: 20px;
  }

  .header h1 {
    font-size: 2rem;
  }

  .header .subtitle {
    font-size: 1rem;
  }

  .contact-form-section {
    padding: 20px;
  }

  .contact-form-section h2,
  .alternative-contact-section h2 {
    font-size: 1.5rem;
  }

  .form-group input,
  .form-group textarea {
    padding: 10px;
  }

  .submit-btn {
    width: 100%;
    padding: 12px;
  }

  .contact-info {
    gap: 10px;
  }

  .breadcrumb {
    display: none;
  }
}
</style>