// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Agenda from '../views/Agenda.vue';
import Tasks from '../views/Tasks.vue';
import Notifications from '../views/Notifications.vue';
import AIAssistant from '../views/AIAssistant.vue';
import Support from '../views/Support.vue';
import Terms from '../views/Terms.vue';
import FAQ from '../views/FAQ.vue';
import Settings from '../views/Settings.vue';
import Calendari from '@/views/Calendari.vue';
import Profile from '../views/Profile.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue'; //  Importem el component de registre
import About from '@/views/About.vue';

const routes = [
  { path: '/', component: Home },
  {
    path: '/agenda',
    component: Agenda,
    children: [
      { path: 'calendari', component: Calendari },
      { path: 'tasks', component: Tasks },
      { path: 'notifications', component: Notifications },
      { path: '/smart-planning', component: AIAssistant },
      { path: '/settings', component: Settings },
    ],
  },
  { path: '/support', component: Support },
  { path: '/terms', component: Terms },
  { path: '/faq', component: FAQ },
  { path: '/profile', component: Profile },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/about', component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    const savedPath = sessionStorage.getItem('path');
    if (savedPath) {
      sessionStorage.removeItem('path');
      return { path: savedPath };
    }
    return { top: 0 };
  },
});

export default router;