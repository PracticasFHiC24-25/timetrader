<!-- src/views/Login.vue -->
<template>
  <div class="login-page">
    <main class="main-content">
      <header class="header">
        <h1>Iniciar Sessió</h1>
      </header>

      <section class="login-section">
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email">Correu electrònic</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="exemple@correu.com"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Contrasenya</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="La teva contrasenya"
              required
            />
          </div>
          <button type="submit" class="login-button">Iniciar Sessió</button>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          <p class="register-link">
            Encara no tens compte?
            <router-link to="/register">Registra't aquí</router-link>
          </p>
        </form>
      </section>
    </main>
  </div>
</template>

<script>
import { login } from '../auth';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    handleLogin() {
      if (this.email === 'user@example.com' && this.password === 'password123') {
        login();
        this.$router.push('/agenda/calendari');
      } else {
        this.errorMessage = 'Correu electrònic o contrasenya incorrectes.';
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #f5f7fa;
  font-family: 'Open Sans', sans-serif;
}

.main-content {
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}

.login-section {
  width: 100%;
  max-width: 500px;
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 0.9rem;
  color: #34495e;
  margin-bottom: 6px;
}

.form-group input {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  border-color: #4A90E2;
}

.login-button {
  padding: 10px;
  background: #4A90E2;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background: #3a78c2;
}

.error-message {
  color: #e74c3c;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 10px;
}

.register-link {
  font-size: 0.9rem;
  text-align: center;
  margin-top: 10px;
}

.register-link a {
  color: #4A90E2;
  text-decoration: none;
  font-weight: 600;
}

.register-link a:hover {
  text-decoration: underline;
}

@media (max-width: 767px) {
  .main-content {
    padding: 20px;
  }

  .header h1 {
    font-size: 2rem;
  }

  .login-section {
    padding: 20px;
  }
}
</style>
