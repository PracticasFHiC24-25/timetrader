<template>
  <div class="about-page">
    <section class="hero-section animate_animated animate_fadeInDown">
      <div class="hero-container">
        <h1>ABOUT TIMETRADER</h1>
        <p class="description">
          TimeTrader és una plataforma web sofisticada dissenyada com a planificador de tasques i agenda digital per a estudiants i professionals. El nostre objectiu és optimitzar la gestió del temps i augmentar la productivitat a través d’una experiència personalitzada i fàcil d’utilitzar.
        </p>
      </div>
    </section>
    <section class="features-section animate_animated animate_fadeInUp">
      <div class="features-container">
        <nav class="breadcrumb" aria-label="Camí de navegació">
          <router-link to="/" class="breadcrumb-link">Inici</router-link>
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb-current">Termes Legals</span>
        </nav>
        <h2>PER QUÈ TRIAR TIMETRADER?</h2>
        <p class="sub-description">
          TimeTrader destaca per la seva interfície intuïtiva i funcions potents adaptades a les necessitats úniques de cada usuari, sigui estudiant o professional.
        </p>
        <ul>
          <li v-for="(feature, idx) in features" :key="idx" class="feature-item" :style="{ animationDelay: `${idx * 0.1}s` }">
            <strong>{{ feature.title }}</strong> {{ feature.description }}
          </li>
        </ul>
      </div>
    </section>
    <footer class="footer animate_animated animate_fadeInUp">
      <router-link to="/terms">Termes i Condicions</router-link>
      <router-link to="/support">Suport</router-link>
      <router-link to="/faq">Preguntes Freqüents</router-link>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  data() {
    return {
      features: [
        {
          title: 'Gestió de Tasques Personalitzada:',
          description: 'Organitza tasques i esdeveniments eficaçment amb eines adaptades a la teva professió.'
        },
        {
          title: 'Assistent Potenciat per IA:',
          description: 'Rep suggeriments intel·ligents per a l’optimització de l’horari segons la teva disponibilitat i prioritats.'
        },
        {
          title: 'Eines de Col·laboració:',
          description: 'Comparteix tasques i crea grups de treball per optimitzar l’equip.'
        },
        {
          title: 'Interfície Clara:',
          description: 'Accedeix a la informació instantàniament amb un disseny senzill i estructurat.'
        },
        {
          title: 'Recordatoris i Notificacions:',
          description: 'Mantingues al dia amb recordatoris automàtics per a tasques i terminis.'
        }
      ]
    };
  }
};
</script>

<style scoped>
/* Importar fonts de Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans:wght@400;600&display=swap');

/* Comú */
.feature-item,
.footer a {
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease, color 0.3s ease;
}

.feature-item:hover,
.footer a:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Estils generals */
.about-page {
  font-family: 'Open Sans', Arial, sans-serif;
  background-color: #F7FAFC;
  padding: 2.5rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Hero Section */
.hero-section {
  width: 100%;
  max-width: 900px;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  padding: 2rem;
  background: linear-gradient(135deg, #E6F0FA 0%, #BEE3F8 100%);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.hero-section::before {
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

.hero-container {
  position: relative;
  z-index: 1;
}

.hero-section h1 {
  font-family: 'Montserrat', Arial, sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  color: #1A202C;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #2D3748;
  max-width: 700px;
  margin: 0 auto;
}

/* Features Section */
.features-section {
  width: 100%;
  max-width: 900px;
  margin-bottom: 3rem;
}

.features-container {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.features-container:hover {
  transform: translateY(-5px);
}

.features-section h2 {
  font-family: 'Montserrat', Arial, sans-serif;
  font-weight: 700;
  font-size: 1.8rem;
  color: #1A202C;
  margin-bottom: 1rem;
  text-align: center;
}

.sub-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #2D3748;
  margin-bottom: 1.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.features-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-item {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #2D3748;
  padding: 1rem;
  background: #F9FAFB;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  animation: slideIn 0.5s ease forwards;
}

.feature-item strong {
  color: #4A90E2;
  font-weight: 600;
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

.breadcrumb {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: #7f8c8d;
  margin-bottom: 20px;
  align-self: flex-start;
}

.breadcrumb-link {
  color: #4A90E2;
  text-decoration: none;
  font-weight: 500;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #bdc3c7;
}

.breadcrumb-current {
  color: #2c3e50;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .about-page {
    padding: 1.5rem;
  }

  .hero-section {
    padding: 1.5rem;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .description {
    font-size: 1rem;
  }

  .features-container {
    padding: 1.5rem;
  }

  .features-section h2 {
    font-size: 1.5rem;
  }

  .sub-description {
    font-size: 1rem;
  }

  .feature-item {
    font-size: 1rem;
    padding: 0.75rem;
  }

  .footer {
    padding: 1.5rem 0;
  }

  .footer a {
    margin: 0.5rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .about-page {
    padding: 1rem;
  }

  .hero-section {
    padding: 1rem;
  }

  .hero-section h1 {
    font-size: 1.8rem;
  }

  .description {
    font-size: 0.9rem;
  }

  .features-container {
    padding: 1rem;
  }

  .features-section h2 {
    font-size: 1.3rem;
  }

  .sub-description {
    font-size: 0.9rem;
  }

  .feature-item {
    font-size: 0.9rem;
    padding: 0.5rem;
  }

  .breadcrumb {
    display: none;
  }

  .footer {
    padding: 1rem 0;
  }

  .footer a {
    margin: 0.5rem;
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
}
</style>