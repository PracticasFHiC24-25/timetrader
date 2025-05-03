<!-- src/views/Home.vue -->
<template>
  <div class="home-page">
    <!-- Contingut principal -->
    <main class="main-content" role="main">
      <!-- Capçalera amb el logo i el títol (punt 3: accessibilitat) -->
      <header class="header animate_animated animate_fadeInDown" role="banner">
        <img
          src="@/assets/logo.png"
          alt="TimeTrader Logo"
          class="logo"
        />
        <h1 class="site-title">Time-Trader</h1>
      </header>

      <!-- Barra de navegació (punt 3: accessibilitat) -->
      <nav
        class="nav-tabs animate_animated animate_fadeIn"
        role="navigation"
        aria-label="Menú principal"
      >
        <ul role="menubar" class="nav-list">
          <li v-for="(tab, idx) in navTabs" :key="idx" role="none">
            <router-link
              :to="tab.to"
              class="nav-tab"
              role="menuitem"
              :aria-current="$route.path === tab.to ? 'page' : undefined"
              tabindex="0"
            >
              {{ tab.label }}
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Secció del lema -->
      <section class="slogan-section animate_animated animate_fadeIn">
        <h2>Organitza el teu temps, simplifica la teva vida!</h2>
      </section>

      <!-- Secció del calendari (punt 3: accessibilitat) -->
      <section
        class="calendar-section animate_animated animate_fadeInUp"
        aria-labelledby="calendar-title"
      >
        <div class="calendar-wrapper">
          <div class="calendar-controls">
            <button
              @click="previousMonth"
              @keypress.enter="previousMonth"
              aria-label="Mes anterior"
              class="control-btn"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
            <h3 id="calendar-title" class="calendar-title">
              {{ monthName }} {{ year }}
            </h3>
            <button
              @click="nextMonth"
              @keypress.enter="nextMonth"
              aria-label="Mes següent"
              class="control-btn"
            >
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          <div class="calendar" role="grid" aria-readonly="true">
            <div class="calendar-header" role="row">
              <div
                v-for="day in weekDays"
                :key="day"
                class="header-day"
                role="columnheader"
              >
                {{ day }}
              </div>
            </div>
            <transition-group
              name="day-fade"
              tag="div"
              class="calendar-body"
              role="rowgroup"
            >
              <!-- Espais buits abans de l'1 -->
              <div
                v-for="n in firstDayOffset"
                :key="'empty-' + n"
                class="calendar-day empty"
                role="gridcell"
                aria-hidden="true"
              ></div>
              <!-- Dies del mes amb accessibilitat -->
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
                <span
                  v-if="hasEvent(day)"
                  class="event-indicator"
                  aria-hidden="true"
                ></span>
              </div>
            </transition-group>
          </div>
        </div>
      </section>

      <!-- Footer (punt 3: accessibilitat) -->
      <footer class="footer animate_animated animate_fadeIn" role="contentinfo">
        <router-link to="/terms" role="link">Termes i Condicions</router-link>
        <router-link to="/support" role="link">Suport</router-link>
        <router-link to="/faq" role="link">Preguntes Freqüents</router-link>
        <a
          href="mailto:timetrader@gmail.com"
          role="link"
          aria-label="Enviar correu electrònic a timetrader@gmail.com"
        >
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
    }
  }
};
</script>

<style scoped>
/* Escalament de tots els botons i enllaços de menú al hover */
.nav-tab,
button {
  display: inline-block;
  transition: transform 0.1s ease;
}
.nav-tab:hover,
button:hover {
  transform: scale(1.1);
}

/* Nav: mostrar en horitzontal sense punts de llista */
.nav-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: var(--space-md);
}
</style>