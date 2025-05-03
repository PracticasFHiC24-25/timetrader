<!-- src/views/Home.vue -->
<template>
  <div class="home-page">
    <main class="main-content" role="main">
      <!-- Header amb menú hamburguesa -->
      <header class="header animate_animated animate_fadeInDown" role="banner">
        <img src="@/assets/logo.png" alt="TimeTrader Logo" class="logo" />
        <h1 class="site-title">Time-Trader</h1>
        <button class="hamburger" @click="toggleMobileMenu" aria-label="Obrir menú de navegació">
          <i class="fas" :class="isMobileMenuOpen ? 'fa-times' : 'fa-bars'"></i>
        </button>
      </header>

      <!-- Navegació (hamburguesa per mòbil, horitzontal per desktop) -->
      <nav
        class="nav-tabs animate_animated animate_fadeIn"
        role="navigation"
        aria-label="Menú principal"
        :class="{ 'nav-mobile-open': isMobileMenuOpen }"
      >
        <ul role="menubar" class="nav-list">
          <li v-for="(tab, idx) in navTabs" :key="idx" role="none">
            <router-link
              :to="tab.to"
              class="nav-tab"
              role="menuitem"
              :aria-current="$route.path === tab.to ? 'page' : undefined"
              tabindex="0"
              @click="isMobileMenuOpen = false"
            >
              {{ tab.label }}
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Slogan -->
      <section class="slogan-section animate_animated animate_fadeIn">
        <h2>Organitza el teu temps, simplifica la teva vida!</h2>
      </section>

      <!-- Calendari -->
      <section class="calendar-section animate_animated animate_fadeInUp" aria-labelledby="calendar-title">
        <div class="calendar-wrapper">
          <div class="calendar-controls">
            <button @click="previousMonth" @keypress.enter="previousMonth" aria-label="Mes anterior" class="control-btn">
              <i class="fas fa-chevron-left"></i>
            </button>
            <h3 id="calendar-title" class="calendar-title">
              {{ monthName }} {{ year }}
            </h3>
            <button @click="nextMonth" @keypress.enter="nextMonth" aria-label="Mes següent" class="control-btn">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          <div class="calendar" role="grid" aria-readonly="true">
            <div class="calendar-header" role="row">
              <div
                v-for="(day, index) in weekDays"
                :key="day"
                class="header-day"
                role="columnheader"
              >
                {{ windowWidth <= 600 ? shortWeekDays[index] : day }}
              </div>
            </div>
            <transition-group name="day-fade" tag="div" class="calendar-body" role="rowgroup">
              <div
                v-for="n in firstDayOffset"
                :key="'empty-' + n"
                class="calendar-day empty"
                role="gridcell"
                aria-hidden="true"
              ></div>
              <div
                v-for="day in daysInMonth"
                :key="day"
                class="calendar-day"
                :class="{ 'current-day': isCurrentDay(day), 'event-day': hasEvent(day) }"
                role="gridcell"
                tabindex="0"
                :aria-selected="isCurrentDay(day) ? 'true' : 'false'"
                :aria-label="'Dia ' + day + ' de ' + monthName"
                @click="selectDay(day)"
                @keypress.enter="selectDay(day)"
              >
                <span class="day-number">{{ day }}</span>
                <span v-if="hasEvent(day)" class="event-indicator" aria-hidden="true"></span>
              </div>
            </transition-group>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer animate_animated animate_fadeIn" role="contentinfo">
        <router-link to="/terms" role="link">Termes i Condicions</router-link>
        <router-link to="/support" role="link">Suport</router-link>
        <router-link to="/faq" role="link">Preguntes Freqüents</router-link>
        <a href="mailto:timetrader@gmail.com" role="link" aria-label="Enviar correu electrònic a timetrader@gmail.com">
          <i class="fas fa-envelope"></i> timetrader@gmail.com
        </a>
      </footer>
    </main>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    const today = new Date();
    return {
      currentDate: today,
      selectedMonth: today.getMonth(),
      selectedYear: today.getFullYear(),
      windowWidth: window.innerWidth,
      isMobileMenuOpen: false,
      navTabs: [
        { label: 'La Meva Agenda', to: '/agenda/calendari' },
        { label: 'Planificació Intel·ligent', to: '/smart-planning' },
        { label: 'Gestió de Projectes', to: '/project-management' },
        { label: 'Configuració i Personalització', to: '/settings' },
        { label: 'Comunitat i Col·laboració', to: '/community' },
        { label: 'Suport i Contacte', to: '/support' }
      ],
      weekDays: ['Dilluns','Dimarts','Dimecres','Dijous','Divendres','Dissabte','Diumenge']
    };
  },
  computed: {
    shortWeekDays() {
      return ['Dl', 'Dt', 'Dm', 'Dj', 'Dv', 'Ds', 'Dg'];
    },
    monthName() {
      const months = ['Gener','Febrer','Març','Abril','Maig','Juny','Juliol','Agost','Setembre','Octubre','Novembre','Desembre'];
      return months[this.selectedMonth];
    },
    year() {
      return this.selectedYear;
    },
    firstDayOffset() {
      const first = new Date(this.selectedYear, this.selectedMonth, 1).getDay();
      return (first + 6) % 7;
    },
    daysInMonth() {
      return new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();
    }
  },
  methods: {
    previousMonth() {
      if (this.selectedMonth === 0) {
        this.selectedMonth = 11;
        this.selectedYear--;
      } else this.selectedMonth--;
    },
    nextMonth() {
      if (this.selectedMonth === 11) {
        this.selectedMonth = 0;
        this.selectedYear++;
      } else this.selectedMonth++;
    },
    isCurrentDay(day) {
      const t = this.currentDate;
      return day === t.getDate() && this.selectedMonth === t.getMonth() && this.selectedYear === t.getFullYear();
    },
    hasEvent(day) {
      const events = [6,12,24];
      return events.includes(day) && this.selectedMonth === this.currentDate.getMonth();
    },
    selectDay(day) {
      console.log(`Dia seleccionat: ${day}`);
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>

<style scoped>
/* Comú */
.nav-tab,
button {
  display: inline-block;
  transition: transform 0.1s ease;
}
.nav-tab:hover,
button:hover {
  transform: scale(1.1);
}
.nav-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: var(--space-md);
}
.hamburger {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  margin-left: auto;
}

/* Responsive header & nav */
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
    gap: 1rem;
  }
}

/* Calendari responsive (dies de la setmana) */
@media (max-width: 600px) {
  .header-day {
    font-size: 0.75rem;
  }
}
</style>
