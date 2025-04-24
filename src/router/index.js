// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Agenda from '../views/Agenda.vue';
import Tasks from '../views/Tasks.vue';
import Notifications from '../views/Notifications.vue';
import AIAssistant from '../views/AIAssistant.vue';
import Support from '../views/Support.vue';
import Contact from '../views/Contact.vue';
import Terms from '../views/Terms.vue';
import FAQ from '../views/FAQ.vue';
import SmartPlanning from '../views/SmartPlanning.vue';
import ProjectManagement from '../views/ProjectManagement.vue';
import Settings from '../views/Settings.vue';
import Community from '../views/Community.vue';

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
  { path: '/smart-planning', component: SmartPlanning },
  { path: '/project-management', component: ProjectManagement },
  { path: '/settings', component: Settings },
  { path: '/community', component: Community },
  { path: '/support', component: Support },
  { path: '/contact', component: Contact },
  { path: '/terms', component: Terms },
  { path: '/faq', component: FAQ },
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