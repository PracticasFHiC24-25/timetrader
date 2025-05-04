// src/auth.js
import { ref } from 'vue';

// Estat reactiu per a l'autenticació
const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true');

// Funció per iniciar sessió
const login = () => {
  isAuthenticated.value = true;
  localStorage.setItem('isAuthenticated', 'true');
};

// Funció per tancar sessió
const logout = () => {
  isAuthenticated.value = false;
  localStorage.removeItem('isAuthenticated');
};

export { isAuthenticated, login, logout };