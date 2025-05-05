<template>
  <div class="ai-assistant-page">
    <main class="main-content">
      <!-- Capçalera professional -->
      <header class="header animate_animated animate_fadeInDown">
        <h1>Asistent IA</h1>
      </header>

      <!-- Secció d'introducció -->
      <section class="intro-section animate_animated animate_fadeInUp">
        <div class="intro-container">
          <h2>Com et pot ajudar l'Assistent IA?</h2>
          <ul class="intro-list">
            <li class="intro-item" v-for="(item, idx) in introItems" :key="idx" :style="{ animationDelay: `${idx * 0.1}s` }">
              <i class="fas" :class="item.icon"></i> {{ item.text }}
            </li>
          </ul>
        </div>
      </section>

      <!-- Component AIChat -->
      <section class="ai-chat-section animate_animated animate_fadeInUp">
        <div class="chat-container">
          <AIChat />
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer animate_animated animate_fadeInUp">
        <router-link to="/terms">Termes i Condicions</router-link>
        <router-link to="/support">Suport</router-link>
        <router-link to="/faq">Preguntes Freqüents</router-link>
      </footer>
    </main>
  </div>
</template>

<script>
import AIChat from '../components/AIChat.vue';

export default {
  components: { AIChat },
  data() {
    return {
      introItems: [
        { text: 'Reorganitzar el teu horari segons prioritats.', icon: 'fa-calendar-check' },
        { text: 'Suggerir el millor moment per a les teves tasques.', icon: 'fa-tasks' },
        { text: 'Donar consells personalitzats per a la teva productivitat.', icon: 'fa-lightbulb' }
      ]
    };
  }
};
</script>

<style scoped>
/* Importar fonts de Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans:wght@400;600&display=swap');

/* Comú */
.intro-item,
.footer a {
  transition: transform 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

.intro-item:hover,
.footer a:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Estils generals */
.ai-assistant-page {
  font-family: 'Open Sans', Arial, sans-serif;
  min-height: 100vh;
  background-color: #F7FAFC;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-content {
  flex: 1;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-family: 'Montserrat', Arial, sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1A202C;
  margin: 0;
}

/* Secció d'introducció */
.intro-section {
  width: 100%;
  max-width: 800px;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  padding: 2rem;
  background: linear-gradient(135deg, #E6F0FA 0%, #BEE3F8 100%);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.intro-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
  animation: pulse 10s infinite ease-in-out;
  z-index: 0;
}

.intro-container {
  position: relative;
  z-index: 1;
}

.intro-section h2 {
  font-family: 'Montserrat', Arial, sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #1A202C;
  margin-bottom: 1.5rem;
}

.intro-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.intro-item {
  font-family: 'Open Sans', Arial, sans-serif;
  font-size: 1.1rem;
  color: #2D3748;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: center;
  padding: 0.75rem;
  background: #ffffff;
  border-radius: 8px;
  animation: slideIn 0.5s ease forwards;
}

.intro-item i {
  color: #4A90E2;
  font-size: 1.2rem;
}

/* Secció AI Chat */
.ai-chat-section {
  width: 100%;
  max-width: 900px;
  margin-bottom: 3rem;
}

.chat-container {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  width: 100%;
  box-sizing: border-box;
}

.chat-container:hover {
  transform: translateY(-5px);
}

/* Footer */
.footer {
  text-align: center;
  padding: 2rem 0;
  background-color: #1A202C;
  width: 100%;
}

.footer a {
  font-family: 'Open Sans', Arial, sans-serif;
  font-size: 0.9rem;
  color: #A0AEC0;
  text-decoration: none;
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.footer a:hover {
  color: #E2E8F0;
  background-color: #2D3748;
}

/* Animacions */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.3;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .main-content {
    padding: 1.5rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .intro-section {
    padding: 1.5rem;
  }

  .intro-section h2 {
    font-size: 1.5rem;
  }

  .intro-item {
    font-size: 1rem;
    padding: 0.5rem;
  }

  .intro-item i {
    font-size: 1rem;
  }

  .chat-container {
    padding: 1rem;
  }

  .footer a {
    margin: 0.5rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 1rem;
  }

  .header h1 {
    font-size: 1.8rem;
  }

  .intro-section {
    padding: 1rem;
  }

  .intro-section h2 {
    font-size: 1.3rem;
  }

  .intro-item {
    font-size: 0.9rem;
  }

  .chat-container {
    padding: 0.75rem;
  }
}
</style>