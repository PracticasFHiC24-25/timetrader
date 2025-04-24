// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Agenda from '../views/Agenda.vue';
import Tasks from '../views/Tasks.vue';
import Notifications from '../views/Notifications.vue';
import AIAssistant from '../views/AIAssistant.vue';

const routes = [
  { path: '/', component: Home },
  { 
    path: '/agenda', 
    component: Agenda, 
    children: [
      { path: 'tasks', component: Tasks },
      { path: 'notifications', component: Notifications },
      { path: 'ai-assistant', component: AIAssistant },
    ]
  },
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