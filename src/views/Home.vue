<template>
  <div class="home-page">
    <main class="main-content" role="main">
      <!-- Header amb menú hamburguesa -->
      <header class="header animate_animated animate_fadeInDown" role="banner">
        <div class="logo-title-group">
          <img src="@/assets/logo.png" alt="TimeTrader Logo" class="logo" />
          <h1 class="site-title">Time-Trader</h1>
        </div>
        <button class="hamburger" @click="toggleMobileMenu" aria-label="Obrir menú de navegació">
          <i class="fas" :class="isMobileMenuOpen ? 'fa-times' : 'fa-bars'"></i>
        </button>
      </header>

      <!-- Navegació -->
      <nav
        class="nav-tabs animate_animated animate_fadeIn"
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
              class="col-12 col-md"
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
      <section class="hero-section animate_animated animate_fadeIn">
        <div class="container text-center">
          <div class="testimonials-container">
            <transition name="fade" mode="out-in">
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
      <footer class="footer animate_animated animate_fadeIn" role="contentinfo">
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
        { label: 'Configuració i Personalització', to: '/settings' },
        { label: 'Suport i Contacte', to: '/support' },
        { label: 'Iniciar Sessió', to: '/login'}
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
.cta-button {
  display: inline-block;
  transition: transform 0.1s ease, background-color 0.3s ease, color 0.3s ease;
}
.nav-tab:hover,
button:hover,
.cta-button:hover {
  transform: scale(1.05);
}

/* Estils generals */
.home-page {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  line-height: 1.6em;
  color: #000000;
}

/* Header */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.logo-title-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-grow: 1;
  justify-content: center;
}

.logo {
  height: 60px;
}

.site-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 1.5em;
  margin-bottom: 0;
  color: #000000;
}

.hamburger {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #4A90E2;
}

/* Navegació */
.nav-tabs {
  background-color: #fff;
  padding: 1rem 0;
  border-bottom: 1px solid #ccc;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
}

.nav-tab {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: #4A90E2;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: color 0.3s ease, background-color 0.3s ease;
  text-align: center;
  width: 100%;
}

.nav-tab:hover {
  color: #fff;
  background-color: #4A90E2;
}

.nav-tab.login-tab {
  color: #ffffff;
  background-color: #4A90E2;
}

.nav-tab.login-tab:hover {
  background-color: #3a78c2;
}

/* Hero Section amb Testimonis i Frase a sota */
.hero-section {
  text-align: center;
  padding: 4rem 1rem;
  background: linear-gradient(135deg, #F5F6FA 0%, #E6E9F0 100%);
  border-bottom: 1px solid #ddd;
}

.testimonials-container {
  min-height: 80px; /* Espai reservat per evitar salts de layout */
  margin-bottom: 2rem;
}

.testimonial-content {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
}

.testimonial-text {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  color: #333333;
  margin-bottom: 0.5rem;
}

.testimonial-author {
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  color: #666666;
  margin-bottom: 0;
}

.hero-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 28px; /* Reduït per fer la lletra més petita */
  line-height: 1.5em;
  color: #000000;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px; /* Reduït per fer la lletra més petita */
  color: #333333;
  margin-bottom: 2rem;
}

.cta-button {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: #ffffff;
  background-color: #4A90E2;
  padding: 0.75rem 2rem;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #3a78c2;
}

/* Animació de transició per als testimonis */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Footer */
.footer {
  padding: 2rem;
  background-color: #f9f9f9;
  border-top: 1px solid #ccc;
}

.footer a {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  color: #4A90E2;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer a:hover {
  color: #3a78c2;
}

/* Responsive */
@media (max-width: 768px) {
  .hamburger {
    display: block;
  }

  .nav-tabs {
    display: none;
    flex-direction: column;
    background-color: white;
    border-top: 1px solid #ccc;
  }

  .nav-tabs.nav-mobile-open {
    display: flex;
  }

  .nav-list {
    flex-direction: column;
    gap: 0;
  }

  .nav-tab {
    padding: 1rem;
    border-bottom: 1px solid #eee;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .site-title {
    font-size: 20px;
  }

  .logo {
    height: 50px;
  }

  .logo-title-group {
    gap: 0.3rem;
  }

  .hero-title {
    font-size: 20px;
  }
  
  .hero-subtitle {
    font-size: 14px;
  }

  .testimonial-text {
    font-size: 14px;
  }

  .testimonial-author {
    font-size: 10px;
  }
}
</style>