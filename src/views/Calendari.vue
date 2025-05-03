<!-- src/views/Calendari.vue -->
<template>
  <div class="calendari-page">
    <main class="main-content">
      <section class="calendar-section">
        <div class="calendar-card">
          <div class="calendar-controls">
            <button @click="previousMonth" aria-label="Mes anterior" class="control-btn">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <h3 class="calendar-title">{{ monthName }} {{ year }}</h3>
            <button @click="nextMonth" aria-label="Mes següent" class="control-btn">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
          <div class="calendar-grid">
            <div class="calendar-header" v-for="day in weekDays" :key="day" :class="{ 'short': useShortDays }">
              {{ useShortDays ? day.slice(0, 2) : day }}
            </div>
            <div
              v-for="n in firstDayOffset"
              :key="'empty-'+n"
              class="calendar-day empty"
            ></div>
            <button
              v-for="day in daysInMonth"
              :key="day"
              class="calendar-day"
              :class="{ 'has-task': hasTask(day) }"
              @click="onDayClick(day)"
              :title="getTaskTitle(day)"
            >
              {{ day }}
            </button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Calendari',
  data() {
    const today = new Date();
    return {
      currentDate: today,
      selectedMonth: today.getMonth(),
      selectedYear: today.getFullYear(),
      weekDaysFull: ['Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte', 'Diumenge'],
      weekDaysShort: ['Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds', 'Dg'],
      useShortDays: false,
      tasks: [
        { id: 1, title: 'Estudiar examen', priority: 'Alta', due: '2025-05-20', completed: false },
        { id: 2, title: 'Lliurament projecte', priority: 'Mitja', due: '2025-05-22', completed: false },
      ],
    };
  },
  computed: {
    monthName() {
      const months = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'];
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
    },
    weekDays() {
      return this.useShortDays ? this.weekDaysShort : this.weekDaysFull;
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
    onDayClick(day) {
      this.$router.push('/support');
    },
    checkScreenSize() {
      this.useShortDays = window.innerWidth < 768;
    },
    hasTask(day) {
      const fullDate = new Date(this.selectedYear, this.selectedMonth, day).toISOString().split('T')[0];
      return this.tasks.some(task => task.due === fullDate && !task.completed);
    },
    getTaskTitle(day) {
      const fullDate = new Date(this.selectedYear, this.selectedMonth, day).toISOString().split('T')[0];
      const task = this.tasks.find(task => task.due === fullDate && !task.completed);
      return task ? task.title : '';
    },
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  },
};
</script>

<style scoped>
.calendari-page {
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: #f4f7fa;
  justify-content: center;
  align-items: flex-start; /* Cambiado a flex-start para móviles */
  padding: 1rem 0; /* Padding vertical para pantallas pequeñas */
}

main.main-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0 1rem; /* Padding horizontal para móviles */
  width: 100%;
}

.calendar-section {
  width: 100%;
  display: flex;
  justify-content: center;
}

.calendar-card {
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: 100%;
  max-width: 900px;
  min-width: 280px; /* Reducido para móviles */
  transition: transform 0.3s ease;
}

.calendar-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap; /* Permitir que se ajuste en pantallas pequeñas */
}

.control-btn {
  background: #4a90e2;
  color: #fff;
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  font-size: clamp(0.8rem, 2vw, 1rem); /* Ajustado para móviles */
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin: 0 0.25rem; /* Espaciado entre botones */
}

.control-btn:hover {
  background: #357abd;
  transform: translateY(-2px);
}

.control-btn:active {
  transform: translateY(0);
}

.icon {
  width: 16px; /* Reducido para móviles */
  height: 16px; /* Reducido para móviles */
}

.calendar-title {
  font-size: clamp(1.2rem, 3vw, 1.8rem); /* Ajustado para móviles */
  font-weight: 600;
  color: #333;
  text-align: center;
  flex: 1;
  margin: 0 0.5rem; /* Reducido margen */
  font-family: 'Inter', sans-serif;
  white-space: nowrap; /* Evitar que el título se desborde */
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(40px, 1fr)); /* Ajustado para móviles */
  gap: 0.3rem;
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto; /* Permitir desplazamiento horizontal si es necesario */
}

.calendar-header {
  text-align: center;
  font-weight: 600;
  font-size: clamp(0.7rem, 1.5vw, 0.9rem); /* Ajustado para móviles */
  color: #666;
  padding: 0.5rem;
  text-transform: uppercase;
  background: #e9ecef;
  border-radius: 6px;
}

.calendar-header.short {
  font-size: clamp(0.6rem, 1.3vw, 0.8rem);
}

.calendar-day {
  padding: clamp(0.5rem, 1.5vw, 0.75rem); /* Ajustado para móviles */
  background: #ffffff;
  border: 1px solid #e9ecef; /* Reducido borde */
  border-radius: 8px;
  font-size: clamp(0.8rem, 2vw, 1rem); /* Ajustado para móviles */
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  text-align: center;
  color: #333;
  font-weight: 500;
  min-height: 50px; /* Reducido para móviles */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
}

.calendar-day:hover {
  background: #e6f0fa;
  transform: scale(1.05);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Reducido sombra */
}

.calendar-day.has-task {
  background: #28a745;
  border-color: #28a745;
  color: #fff;
  font-weight: 600;
}

.calendar-day.has-task:hover {
  background: #218838;
  transform: scale(1.05);
}

.calendar-day.empty {
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  min-height: 50px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Nuevos breakpoints para pantallas muy pequeñas */
@media (max-width: 576px) {
  .calendar-card {
    padding: 1rem;
  }

  .calendar-controls {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .calendar-title {
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    margin: 0;
  }

  .control-btn {
    width: 32px;
    height: 32px;
    padding: 0.4rem;
  }

  .icon {
    width: 14px;
    height: 14px;
  }

  .calendar-grid {
    grid-template-columns: repeat(7, minmax(30px, 1fr));
    gap: 0.2rem;
  }

  .calendar-day {
    padding: 0.4rem;
    font-size: clamp(0.7rem, 1.5vw, 0.9rem);
    min-height: 40px;
  }

  .calendar-day.empty {
    min-height: 40px;
  }

  .calendar-header {
    font-size: clamp(0.6rem, 1.2vw, 0.7rem);
    padding: 0.4rem;
  }
}

/* Ajustes para pantallas intermedias */
@media (min-width: 577px) and (max-width: 768px) {
  .calendar-grid {
    grid-template-columns: repeat(7, minmax(50px, 1fr));
  }

  .calendar-day {
    min-height: 60px;
  }

  .calendar-day.empty {
    min-height: 60px;
  }
}

/* Ajustes para pantallas grandes */
@media (min-width: 769px) {
  .calendar-grid {
    grid-template-columns: repeat(7, minmax(80px, 1fr));
  }

  .calendar-day {
    min-height: 80px;
  }

  .calendar-day.empty {
    min-height: 80px;
  }
}
</style>