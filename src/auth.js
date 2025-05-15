//auth.js
import { ref } from 'vue';

// Estat reactiu per a l'usuari actual
const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')) || null);

// Derivem l'estat d'autenticació de currentUser
const isAuthenticated = ref(!!currentUser.value);

// Funció per iniciar sessió
const login = (user) => {
  currentUser.value = user;
  isAuthenticated.value = true;
  localStorage.setItem('currentUser', JSON.stringify(user));
};

// Funció per tancar sessió
const logout = () => {
  currentUser.value = null;
  isAuthenticated.value = false;
  localStorage.removeItem('currentUser');
};

export { isAuthenticated, currentUser, login, logout };