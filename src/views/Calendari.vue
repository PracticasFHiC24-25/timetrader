<!-- src/views/Tasks.vue -->
<template>
    <div class="calendari-page">
      <main class="main-content">
        <!-- Calendari ampliat copiat de Home.vue (punt 4) -->
        <section class="calendar-section">
          <div class="calendar-wrapper">
            <div class="calendar-controls">
              <button
                @click="previousMonth"
                aria-label="Mes anterior"
                class="control-btn"
              >
                ‹
              </button>
              <h3 class="calendar-title">{{ monthName }} {{ year }}</h3>
              <button
                @click="nextMonth"
                aria-label="Mes següent"
                class="control-btn"
              >
                ›
              </button>
            </div>
            <div class="calendar-grid">
              <div class="calendar-header" v-for="day in weekDays" :key="day">
                {{ day }}
              </div>
              <button
                v-for="n in firstDayOffset"
                :key="'empty-'+n"
                class="calendar-day empty"
                disabled
              ></button>
              <button
                v-for="day in daysInMonth"
                :key="day"
                class="calendar-day"
                @click="onDayClick(day)"
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
        // En clicar un dia, redirigeix a Support.vue
        this.$router.push('/support');
      }
    }
  };
  </script>
  
  <style scoped>
  .tasks-page {
    display: flex;
    min-height: 100vh;
  }
  
  main.main-content {
    flex: 1;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: start;
  }
  
  /* Estils del calendari ampliat */
  .calendar-section {
    width: 100%;
  }
  .calendar-wrapper {
    max-width: 800px;
    margin: 0 auto;
  }
  .calendar-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  .control-btn {
    background: var(--color-primary);
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  .control-btn:hover {
    background: var(--color-primary-hover);
  }
  .calendar-title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
  }
  .calendar-header {
    text-align: center;
    font-weight: bold;
  }
  .calendar-day {
    padding: 1rem;
    background: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    font-size: 1.125rem;
    cursor: pointer;
    transition: transform 0.1s ease, box-shadow 0.2s ease;
  }
  .calendar-day:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .calendar-day.empty {
    background: transparent;
    border: none;
    cursor: default;
  }
  </style>