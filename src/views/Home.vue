<template>
  <div class="home-page">
    <main class="main-content" role="main">
      <!-- Header amb menú hamburguesa -->
      <header class="header animate_animated animate_fadeInDown" role="banner">
        <div class="logo-title-group">
          <img src="@/assets/logo.png" alt="TimeTrader Logo" class="logo" />
          <h1 class="site-title">Time-Trader</h1>
        </div>
        <button class="hamburger" @click="toggleMobileMenu" aria-label="Obrir o tancar menú de navegació">
          <i class="fas" :class="isMobileMenuOpen ? 'fa-times' : 'fa-bars'"></i>
        </button>
      </header>

      <!-- Navegació -->
      <nav
        class="nav-tabs"
        role="navigation"
        aria-label="Menú principal"
        :class="{ 'nav-mobile-open': isMobileMenuOpen }"
      >
        <div class="container">
          <ul role="menubar" class="nav-list row">
            <li
              v-for="(tab, idx) in filteredNavTabs"
              :key="idx"
              role="none"
              class="col-12 col-md nav-item animate_animated animate_slideIn"
              :style="{ animationDelay: `${idx * 0.1}s` }"
            >
              <router-link
                :to="tab.to"
                class="nav-tab"
                :class="{ 'login-tab': tab.to === '/login' }"
                role="menuitem"
                :aria-current="$route.path === tab.to ? 'page' : undefined"
                tabindex="0"
                @click="isMobileMenuOpen = false"
              >
                {{ tab.label }}
              </router-link>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Hero Section amb Testimonis i Frase a sota -->
      <section class="hero-section animate_animated animate_fadeInUp">
        <div class="container text-center">
          <div class="testimonials-container">
            <transition name="slide" mode="out-in">
              <div :key="currentTestimonialIndex" class="testimonial">
                <div class="testimonial-content">
                  <p class="testimonial-text">"{{ testimonials[currentTestimonialIndex].quote }}"</p>
                  <p class="testimonial-author">
                    - {{ testimonials[currentTestimonialIndex].user }}, {{ testimonials[currentTestimonialIndex].role }}
                  </p>
                </div>
              </div>
            </transition>
          </div>
          <h2 class="hero-title">Organitza el teu temps, simplifica la teva vida!</h2>
          <p class="hero-subtitle">
            Planifica les teves tasques i maximitza la teva productivitat amb Time-Trader.
          </p>
          <router-link to="/login" class="cta-button">
            Comença Ara
          </router-link>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer animate_animated animate_fadeInUp" role="contentinfo">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-md-auto"><router-link to="/terms" role="link">Termes i Condicions</router-link></div>
            <div class="col-12 col-md-auto"><router-link to="/support" role="link">Suport</router-link></div>
            <div class="col-12 col-md-auto"><router-link to="/faq" role="link">Preguntes Freqüents</router-link></div>
            <div class="col-12 col-md-auto">
              <a href="mailto:timetrader@gmail.com" role="link" aria-label="Enviar correu electrònic a timetrader@gmail.com">
                <i class="fas fa-envelope"></i> timetrader@gmail.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      windowWidth: window.innerWidth,
      isMobileMenuOpen: false,
      isAuthenticated: false,
      currentTestimonialIndex: 0,
      testimonials: [
        {
          quote: "Time-Trader m'ha ajudat a organitzar les meves reunions i tenir més temps per a mi!",
          user: "Anna",
          role: "empresària"
        },
        {
          quote: "Des que faig servir Time-Trader, no oblido cap tasca important. És increïble!",
          user: "Marc",
          role: "estudiant"
        },
        {
          quote: "La planificació intel·ligent ha fet que la meva productivitat es dispari. Gràcies!",
          user: "Clara",
          role: "dissenyadora gràfica"
        },
        {
          quote: "Mai havia estat tan organitzat. Time-Trader és el millor descobriment de l'any!",
          user: "Jordi",
          role: "professor"
        }
      ],
      navTabs: [
        { label: 'Què és Time-Trader?', to: '/about' },
        { label: 'Termes i Condicions', to: '/terms' },
        { label: 'Suport i Contacte', to: '/support' },
        { label: 'Iniciar Sessió', to: '/login' }
      ]
    };
  },
  computed: {
    filteredNavTabs() {
      return this.navTabs.filter(tab => {
        if (tab.hiddenWhenAuthenticated && this.isAuthenticated) {
          return false;
        }
        if (tab.hiddenWhenUnauthenticated && !this.isAuthenticated) {
          return false;
        }
        return true;
      });
    }
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth > 768) {
        this.isMobileMenuOpen = false;
      }
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    rotateTestimonials() {
      this.currentTestimonialIndex = (this.currentTestimonialIndex + 1) % this.testimonials.length;
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    setInterval(this.rotateTestimonials, 5000);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>

<style scoped>
/* Importar fonts de Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans:wght@400;600&display=swap');

/* Comú */
.nav-tab,
button,
.cta-button,
.footer a {
  transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

.nav-tab:hover,
button:hover,
.cta-button:hover,
.footer a:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Estils generals */
.home-page {
  font-family: 'Open Sans', Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #2D3748;
  background-color: #F7FAFC;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Header */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo-title-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo {
  height: 50px;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.1);
}

.site-title {
  font-family: 'Montserrat', Arial, sans-serif;
  font-weight: 700;
  font-size: 2rem;
  color: #1A202C;
  margin: 0;
}

/* Navegació */
.nav-tabs {
  background-color: #ffffff;
  padding: 1rem 0;
  border-bottom: 1px solid #E2E8F0;
  z-index: 999;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.nav-item {
  animation: slideIn 0.5s ease forwards;
}

.nav-tab {
  font-family: 'Open Sans', Arial, sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #4A90E2;
  text-decoration: none;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  text-align: center;
  display: block;
}

.nav-tab:hover {
  background-color: #EDF2F7;
  color: #2B6CB0;
}

.nav-tab.login-tab {
  color: #ffffff;
  background-color: #4A90E2;
}

.nav-tab.login-tab:hover {
  background-color: #2B6CB0;
  color: #ffffff;
}

.hamburger {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #4A90E2;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.3s ease;
}

.hamburger:hover {
  transform: scale(1.1);
}

/* Hero Section */
.hero-section {
  text-align: center;
  padding: 5rem 1rem;
  background: linear-gradient(135deg, #E6F0FA 0%, #BEE3F8 100%);
  position: relative;
  overflow: hidden;
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

.testimonials-container {
  min-height: 120px;
  margin-bottom: 2.5rem;
  position: relative;
  z-index: 1;
}

.testimonial-content {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  margin: 0 auto;
  text-align: left;
  transition: transform 0.3s ease;
}

.testimonial-content:hover {
  transform: translateY(-5px);
}

.testimonial-text {
  font-family: 'Open Sans', Arial, sans-serif;
  font-size: 1.1rem;
  color: #2D3748;
  margin-bottom: 0.75rem;
}

.testimonial-author {
  font-family: 'Open Sans', Arial, sans-serif;
  font-size: 0.9rem;
  color: #718096;
}

.hero-title {
  font-family: 'Montserrat', Arial, sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  color: #1A202C;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.hero-subtitle {
  font-family: 'Open Sans', Arial, sans-serif;
  font-size: 1.25rem;
  color: #4A5568;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
}

.cta-button {
  font-family: 'Open Sans', Arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(90deg, #4A90E2, #63B3ED);
  padding: 0.75rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  display: inline-block;
  animation: pulseCta 2s infinite ease-in-out;
  position: relative;
  z-index: 1;
}

.cta-button:hover {
  background: linear-gradient(90deg, #2B6CB0, #4A90E2);
}

/* Footer */
.footer {
  padding: 2rem;
  background-color: #1A202C;
  color: #E2E8F0;
}

.footer a {
  font-family: 'Open Sans', Arial, sans-serif;
  font-size: 0.9rem;
  color: #A0AEC0;
  text-decoration: none;
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

@keyframes slideInNav {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
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

@keyframes pulseCta {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(74, 144, 226, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(74, 144, 226, 0);
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Responsive */
@media (max-width: 768px) {
  .hamburger {
    display: block;
  }

  .nav-tabs {
    display: none;
    position: fixed;
    top: 90px;
    left: 0;
    width: 100%;
    height: calc(100vh - 90px);
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 998;
    overflow-y: auto;
  }

  .nav-tabs.nav-mobile-open {
    display: block;
    animation: slideInNav 0.3s ease forwards;
    padding-top: 1rem;
  }

  .nav-list {
    flex-direction: column;
    gap: 0;
    padding: 1.5rem;
  }

  .nav-item {
    width: 100%;
  }

  .nav-tab {
    padding: 1rem;
    border-bottom: 1px solid #E2E8F0;
    font-size: 1.1rem;
  }

  .site-title {
    font-size: 1.5rem;
  }

  .logo {
    height: 40px;
  }

  .hero-section {
    padding: 3rem 1rem;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .testimonial-text {
    font-size: 1rem;
  }

  .testimonial-author {
    font-size: 0.8rem;
  }

  .cta-button {
    padding: 0.6rem 2rem;
    font-size: 1rem;
  }

  .footer {
    padding: 1.5rem;
  }

  .footer a {
    font-size: 0.85rem;
    margin: 0.5rem;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 1rem;
  }

  .site-title {
    font-size: 1.25rem;
  }

  .logo {
    height: 35px;
  }

  .nav-tab {
    font-size: 1rem;
    padding: 0.75rem;
  }

  .nav-list {
    padding: 1rem;
  }

  .hero-title {
    font-size: 1.5rem;
  }

  .hero-subtitle {
    font-size: 0.9rem;
  }

  .testimonial-content {
    padding: 1rem;
  }

  .cta-button {
    padding: 0.5rem 1.5rem;
    font-size: 0.9rem;
  }

  .footer {
    padding: 1rem;
  }

  .footer a {
    font-size: 0.8rem;
    margin: 0.5rem;
    padding: 0.4rem 0.8rem;
  }
}
</style>