import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/main.css';
import 'animate.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import mitt from 'mitt';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Crear un event bus
const bus = mitt();
const app = createApp(App);
app.config.globalProperties.$bus = bus; // Fer l'event bus accessible globalment
app.use(router).mount('#app');

// Exportar el bus per a ús en altres components
export { bus };