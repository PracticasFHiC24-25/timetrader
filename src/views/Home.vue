<!-- src/views/Home.vue -->
<template>
  <div class="home-page">
    <!-- Contingut principal -->
    <main class="main-content">
      <!-- Capçalera amb el logo i el títol -->
      <header class="header animate__animated animate__fadeInDown">
        <img src="@/assets/logo.png" alt="TimeTrader Logo" class="logo" />
        <h1 class="site-title">Time-Trader</h1>
      </header>

      <!-- Barra de navegació -->
      <nav class="nav-tabs animate__animated animate__fadeIn">
        <router-link to="/agenda/tasks" class="nav-tab">La Meva Agenda</router-link>
        <router-link to="/smart-planning" class="nav-tab">Planificació Intel·ligent</router-link>
        <router-link to="/project-management" class="nav-tab">Gestió de Projectes</router-link>
        <router-link to="/settings" class="nav-tab">Configuració i Personalització</router-link>
        <router-link to="/community" class="nav-tab">Comunitat i Col·laboració</router-link>
        <router-link to="/support" class="nav-tab">Suport i Contacte</router-link>
      </nav>

      <!-- Secció del lema -->
      <section class="slogan-section animate__animated animate__fadeIn">
        <h2>Organitza el teu temps, simplifica la teva vida!</h2>
      </section>

      <!-- Secció del calendari -->
      <section class="calendar-section animate__animated animate__fadeInUp">
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
            <h3 class="calendar-title">{{ monthName }} {{ year }}</h3>
            <button
              @click="nextMonth"
              @keypress.enter="nextMonth"
              aria-label="Mes següent"
              class="control-btn"
            >
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          <div class="calendar">
            <div class="calendar-header">
              <div v-for="day in ['Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte', 'Diumenge']" :key="day" class="header-day">
                {{ day }}
              </div>
            </div>
            <transition name="fade">
              <div :key="`${selectedYear}-${selectedMonth}`" class="calendar-body">
                <!-- Espais buits abans de l'1 -->
                <div
                  v-for="n in firstDayOffset"
                  :key="'empty-' + n"
                  class="calendar-day empty"
                ></div>
                <!-- Dies del mes -->
                <div
                  v-for="day in daysInMonth"
                  :key="day"
                  :class="[
                    'calendar-day',
                    { 'current-day': isCurrentDay(day) },
                    { 'event-day': hasEvent(day) }
                  ]"
                  @click="selectDay(day)"
                  @keypress.enter="selectDay(day)"
                  role="button"
                  tabindex="0"
                  :aria-label="`Dia ${day} de ${monthName}`"
                >
                  <span class="day-number">{{ day }}</span>
                  <span v-if="hasEvent(day)" class="event-indicator"></span>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer animate__animated animate__fadeIn">
        <router-link to="/terms">Termes i Condicions</router-link>
        <router-link to="/support">Suport</router-link>
        <router-link to="/faq">Preguntes Freqüents</router-link>
        <!--
        <a href="https://instagram.com/timetrader" target="_blank">
          <i class="fab fa-instagram"></i> @timetrader
        </a>
      -->
        <a href="mailto:timetrader@gmail.com">
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
    const today = new Date(); // Data actual (24 d'abril de 2025)
    return {
      currentDate: today,
      selectedMonth: today.getMonth(), // Mes actual (0-11)
      selectedYear: today.getFullYear(), // Any actual
    };
  },
  computed: {
    monthName() {
      const months = [
        'Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny',
        'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'
      ];
      return months[this.selectedMonth];
    },
    year() {
      return this.selectedYear;
    },
    firstDayOffset() {
      const firstDay = new Date(this.selectedYear, this.selectedMonth, 1).getDay();
      return (firstDay + 6) % 7; // Dilluns = 0, Diumenge = 6
    },
    daysInMonth() {
      return new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();
    },
  },
  methods: {
    previousMonth() {
      if (this.selectedMonth === 0) {
        this.selectedMonth = 11;
        this.selectedYear--;
      } else {
        this.selectedMonth--;
      }
    },
    nextMonth() {
      if (this.selectedMonth === 11) {
        this.selectedMonth = 0;
        this.selectedYear++;
      } else {
        this.selectedMonth++;
      }
    },
    isCurrentDay(day) {
      const today = this.currentDate;
      return (
        day === today.getDate() &&
        this.selectedMonth === today.getMonth() &&
        this.selectedYear === today.getFullYear()
      );
    },
    hasEvent(day) {
      const events = [6, 12, 24]; // Esdeveniments simulats
      return events.includes(day) && this.selectedMonth === this.currentDate.getMonth();
    },
    selectDay(day) {
      console.log(`Dia seleccionat: ${day} de ${this.monthName} ${this.year}`);
    },
  },
};
</script>
