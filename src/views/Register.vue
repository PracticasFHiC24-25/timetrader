<!-- src/views/Register.vue -->
<template>
    <div class="register-page">
      <main class="main-content">
        <header class="header">
          <h1>Registra't</h1>
        </header>
  
        <section class="register-section">
          <form @submit.prevent="handleRegister" class="register-form">
            <div class="form-group">
              <label for="name">Nom complet</label>
              <input type="text" id="name" v-model="name" required />
            </div>
            <div class="form-group">
              <label for="email">Correu electrònic</label>
              <input type="email" id="email" v-model="email" required />
            </div>
            <div class="form-group">
              <label for="password">Contrasenya</label>
              <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit" class="register-button">Crear Compte</button>
          </form>
          <p class="login-link">
            Ja tens compte?
            <router-link to="/login">Inicia sessió aquí</router-link>
          </p>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Register',
    data() {
      return {
        name: '',
        email: '',
        password: ''
      };
    },
    methods: {
      handleRegister() {
        // Aquí hi aniria la lògica de registre (a una API real, etc.)
        console.log('Usuari registrat:', this.name, this.email);
        alert('Registre complet! Ara pots iniciar sessió.');
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>
  .register-page {
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
  
  .register-section {
    width: 100%;
    max-width: 500px;
    background: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .register-form {
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
  
  .register-button {
    padding: 10px;
    background: #4A90E2;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .register-button:hover {
    background: #3a78c2;
  }
  
  .login-link {
    font-size: 0.9rem;
    text-align: center;
    margin-top: 10px;
  }
  
  .login-link a {
    color: #4A90E2;
    text-decoration: none;
    font-weight: 600;
  }
  
  .login-link a:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 767px) {
    .main-content {
      padding: 20px;
    }
  
    .header h1 {
      font-size: 2rem;
    }
  
    .register-section {
      padding: 20px;
    }
  }
  </style>
  