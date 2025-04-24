<!-- src/views/Home.vue -->
<template>
  <div class="home-page">
    <!-- Contingut principal -->
    <main class="main-content">
      <!-- Capçalera amb el logo i el títol -->
      <header class="header animate__animated animate__fadeInDown">
        <img src="@/assets/logo.png" alt="TimeTrader Logo" class="logo" />
        <h1 class="site-title">TimeTrader</h1>
      </header>

      <!-- Barra de navegació -->
      <nav class="nav-tabs animate__animated animate__fadeIn">
        <router-link to="/agenda/tasks" class="nav-tab">La Meva Agenda Intel·ligent</router-link>
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
        <a href="https://instagram.com/timetrader" target="_blank">
          <i class="fab fa-instagram"></i> @timetrader
        </a>
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

<style scoped>
/* Fonts */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans:wght@400;600&display=swap');

/* Animacions per al canvi de mes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Estils generals */
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  padding: 32px;
  width: 100%;
  background: #F5F6FA;
  flex-grow: 1;
}

/* Capçalera amb logo i títol */
.header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  justify-content: center;
}

.logo {
  height: 40px;
}

.site-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 1.5em;
  margin-bottom: 16px;
  color: #333333;
}

/* Barra de navegació */
.nav-tabs {
  display: flex;
  gap: 24px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 32px;
  padding-bottom: 8px;
  overflow-x: auto;
  white-space: nowrap;
  justify-content: center;
}

.nav-tab {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  text-decoration: none;
  color: #4A90E2;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.nav-tab:hover,
.nav-tab.router-link-active {
  background-color: rgba(74, 144, 226, 0.1);
  transform: scale(1.05);
}

/* Secció del lema */
.slogan-section {
  text-align: center;
  margin-bottom: 32px;
}

.slogan-section h2 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.5em;
  margin-bottom: 16px;
  color: #333333;
}

/* Secció del calendari */
.calendar-section {
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
}

.calendar-wrapper {
  width: 100%;
  max-width: 800px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 24px;
}

.calendar-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
}

.control-btn {
  background: #4A90E2;
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.control-btn:hover {
  background-color: #3a78c2;
  transform: scale(1.1);
}

.calendar-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #333333;
}

.calendar {
  display: block; /* Eliminem la graella del contenidor .calendar */
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 8px;
}

.header-day {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  padding: 6px;
  background: #e0e0e0;
  border-radius: 6px;
  color: #666666;
}

.calendar-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  min-height: 240px; /* Assegurem una alçada mínima per a la graella */
}

.calendar-day {
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
}

.calendar-day.empty {
  border: none;
  background: transparent;
  cursor: default;
}

.day-number {
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  color: #333333;
}

.calendar-day:hover {
  background-color: rgba(74, 144, 226, 0.1);
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.calendar-day:focus {
  outline: 2px solid #4A90E2;
  outline-offset: 2px;
}

.calendar-day.current-day {
  background-color: #4A90E2;
  border-color: #4A90E2;
  box-shadow: 0 0 10px rgba(74, 144, 226, 0.5);
  animation: pulse 1.5s infinite;
}

.calendar-day.current-day .day-number {
  color: white;
}

.calendar-day.event-day .event-indicator {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 10px;
  height: 10px;
  background-color: #50C878;
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(80, 200, 120, 0.5);
}

/* Animació per al dia actual */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(74, 144, 226, 0.5);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(74, 144, 226, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(74, 144, 226, 0);
  }
}

/* Footer */
.footer {
  padding: 16px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
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

/* Responsivitat */
@media (max-width: 768px) {
  .main-content {
    padding: 16px;
  }

  .nav-tabs {
    gap: 16px;
  }

  .logo {
    height: 32px;
  }

  .site-title {
    font-size: 20px;
  }

  .calendar-day {
    min-height: 36px;
  }

  .day-number {
    font-size: 16px;
  }

  .header-day {
    font-size: 12px;
    padding: 4px;
  }
}
</style>