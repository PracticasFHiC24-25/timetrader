<template>
  <div class="ai-assistant-page">
    <main class="main-content">
      <!-- Capçalera professional -->
      <header class="header">
        <h1>Asistent IA</h1>
      </header>

      <section class="intro-section">
        <h2>Com et pot ajudar l'Assistent IA?</h2>
        <ul class="intro-list">
          <li><i class="fas fa-calendar-check"></i> Reorganitzar el teu horari segons prioritats.</li>
          <li><i class="fas fa-tasks"></i> Suggerir el millor moment per a les teves tasques.</li>
          <li><i class="fas fa-lightbulb"></i> Donar consells personalitzats per a la teva productivitat.</li>
        </ul>
      </section>

      <!-- Component AIChat -->
      <section class="ai-chat-section">
        <AIChat />
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
import AIChat from '../components/AIChat.vue';

export default {
  components: { AIChat },
};
</script>

<style scoped>
.ai-assistant-page {
  min-height: 100vh;
  background: #f5f7fa;
}

.main-content {
  padding: 40px;
  display: flex;
  margin: 1.2rem auto;
  flex-direction: column;
  align-items: center;
}

.header {
  text-align: center;
  margin-bottom: 10px;
}

.header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
}

.intro-section {
  width: 100%;
  max-width: 700px;
  margin-bottom: 40px;
  text-align: center;
}

.intro-section h2 {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 15px;
}

.intro-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.intro-list li {
  font-size: 0.85rem;
  color: #34495e;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
}

.intro-list i {
  color: #4A90E2;
}

.ai-chat-section {
  width: 100%;
  max-width: 800px;
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}

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

@media (max-width: 767px) {
  .main-content {
    padding: 20px;
  }

  .header h1 {
    font-size: 2rem;
  }

  .intro-section h2 {
    font-size: 1rem;
  }

  .intro-list li {
    font-size: 0.8rem;
  }

  .ai-chat-section {
    padding: 20px;
  }
}
</style>