<template>
  <div class="calendari-page">
    <main class="main-content">
      <section class="calendar-section">
        <div class="calendar-card">
          <!-- Controls and Selector -->
          <div class="calendar-controls-container">
            <div class="view-selector">
              <label for="view-mode" class="view-label">Vista:</label>
              <select v-model="viewMode" id="view-mode" @change="updateView" class="view-select">
                <option value="month">Mensual</option>
                <option value="week">Setmanal</option>
                <option value="day">Diària</option>
              </select>
            </div>
            <div class="calendar-controls">
              <button @click="previousPeriod" aria-label="Període anterior" class="control-btn">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <h3 class="calendar-title" :class="{ 'current-day': viewMode === 'day' && isCurrentDay(selectedDay, selectedMonth, selectedYear) }">
                <span v-if="viewMode === 'month'">{{ monthName }} {{ year }}</span>
                <span v-if="viewMode === 'week'">Setmana del {{ weekStartDate }} al {{ weekEndDate }} {{ year }}</span>
                <span v-if="viewMode === 'day'">{{ selectedDay }} {{ monthName }} {{ year }}</span>
              </h3>
              <button @click="nextPeriod" aria-label="Període següent" class="control-btn">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Vista Mensual -->
          <div v-if="viewMode === 'month'" class="calendar-grid">
            <div class="calendar-header" v-for="day in weekDays" :key="day" :class="{ 'short': useShortDays }">
              {{ useShortDays ? day.slice(0, 2) : day }}
            </div>
            <div v-for="n in firstDayOffset" :key="'empty-'+n" class="calendar-day empty"></div>
            <button
              v-for="day in daysInMonth"
              :key="day"
              class="calendar-day"
              :class="{ 
                'has-task': hasTask(day), 
                'current-day': isCurrentDay(day, selectedMonth, selectedYear) 
              }"
              @click="onDayClick(day)"
            >
              <div class="day-number">{{ day }}</div>
              <div v-if="hasTask(day)" class="task-list">
                <div
                  v-for="task in getTasksForDay(day)"
                  :key="task.id"
                  class="task-item"
                  :title="task.title"
                >
                  {{ task.title }}
                </div>
              </div>
            </button>
          </div>

          <!-- Vista Setmanal -->
          <div v-if="viewMode === 'week'" class="calendar-grid week-view">
            <div
              class="day-header"
              v-for="(day, index) in weekDays"
              :key="day"
              :style="{ gridColumn: index + 2 }"
              :class="{ 'current-day': isCurrentDay(weekDaysDates[index].day, selectedMonth, selectedYear) }"
            >
              <div class="day-name">{{ useShortDays ? day.slice(0, 2) : day }}</div>
              <div class="day-number">{{ weekDaysDates[index].day }}</div>
            </div>
            <div
              class="time-slot"
              v-for="hour in hours"
              :key="hour"
              :style="{ height: timeSlotHeight + 'px', gridRow: (hour - 6) + ' / span 1' }"
            >
              {{ hour }}:00
            </div>
            <div
              v-for="(day, index) in weekDaysDates"
              :key="'day-' + index"
              class="week-day-slot calendar-day"
              :style="{ gridColumn: index + 2, gridRow: '2 / span 16' }"
            >
              <div
                v-for="task in getTasksForDay(day.day, true)"
                :key="task.id"
                class="task-event"
                :style="getTaskStyle(task, day.day)"
                :title="task.title"
              >
                {{ task.title }}
              </div>
            </div>
          </div>

          <!-- Vista Diària -->
          <div v-if="viewMode === 'day'" class="day-view">
            <div class="day-grid">
              <div
                class="time-slot"
                v-for="hour in hours"
                :key="hour"
                :style="{ height: timeSlotHeight + 'px', gridRow: (hour - 7) + ' / span 1' }"
              >
                {{ hour }}:00
              </div>
              <div class="day-events" :style="{ gridRow: '2 / span 16' }">
                <div
                  v-for="task in getTasksForDay(selectedDay)"
                  :key="task.id"
                  class="task-event"
                  :style="getTaskStyle(task, selectedDay)"
                  :title="task.title"
                >
                  {{ task.title }}
                </div>
              </div>
            </div>
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
      selectedDay: today.getDate(),
      selectedWeek: 0,
      viewMode: 'month',
      weekDaysFull: ['Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte', 'Diumenge'],
      weekDaysShort: ['Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds', 'Dg'],
      useShortDays: false,
      hours: Array.from({ length: 16 }, (_, i) => i + 8), // De 8 a 23
      timeSlotHeight: 50,
      tasks: [],
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
    weekStartDate() {
      const firstDayOfMonth = new Date(this.selectedYear, this.selectedMonth, 1);
      const firstMonday = new Date(firstDayOfMonth);
      firstMonday.setDate(firstDayOfMonth.getDate() - ((firstDayOfMonth.getDay() + 6) % 7));
      const weekStart = new Date(firstMonday);
      weekStart.setDate(firstMonday.getDate() + this.selectedWeek * 7);
      return weekStart.getDate();
    },
    weekEndDate() {
      const firstDayOfMonth = new Date(this.selectedYear, this.selectedMonth, 1);
      const firstMonday = new Date(firstDayOfMonth);
      firstMonday.setDate(firstDayOfMonth.getDate() - ((firstDayOfMonth.getDay() + 6) % 7));
      const weekEnd = new Date(firstMonday);
      weekEnd.setDate(firstMonday.getDate() + this.selectedWeek * 7 + 6);
      return weekEnd.getDate();
    },
    weekDaysDates() {
      const months = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'];
      const firstDayOfMonth = new Date(this.selectedYear, this.selectedMonth, 1);
      const firstMonday = new Date(firstDayOfMonth);
      firstMonday.setDate(firstDayOfMonth.getDate() - ((firstDayOfMonth.getDay() + 6) % 7));
      const weekStart = new Date(firstMonday);
      weekStart.setDate(firstMonday.getDate() + this.selectedWeek * 7);
      const dates = [];
      for (let i = 0; i < 7; i++) {
        const currentDay = new Date(weekStart);
        currentDay.setDate(weekStart.getDate() + i);
        dates.push({
          day: currentDay.getDate(),
          month: months[currentDay.getMonth()],
          year: currentDay.getFullYear()
        });
      }
      return dates;
    },
  },
  methods: {
    saveTasks() {
      sessionStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    loadTasks() {
      const storedTasks = JSON.parse(sessionStorage.getItem('tasks') || '[]');
      if (storedTasks.length > 0) {
        this.tasks = storedTasks;
      }
    },
    previousPeriod() {
      if (this.viewMode === 'month') {
        if (this.selectedMonth === 0) {
          this.selectedMonth = 11;
          this.selectedYear--;
        } else {
          this.selectedMonth--;
        }
      } else if (this.viewMode === 'week') {
        this.selectedWeek--;
        if (this.selectedWeek < 0) {
          if (this.selectedMonth === 0) {
            this.selectedMonth = 11;
            this.selectedYear--;
          } else {
            this.selectedMonth--;
          }
          const weeksInMonth = Math.ceil((this.daysInMonth + this.firstDayOffset) / 7);
          this.selectedWeek = weeksInMonth - 1;
        }
      } else if (this.viewMode === 'day') {
        const currentDay = new Date(this.selectedYear, this.selectedMonth, this.selectedDay);
        currentDay.setDate(currentDay.getDate() - 1);
        this.selectedDay = currentDay.getDate();
        this.selectedMonth = currentDay.getMonth();
        this.selectedYear = currentDay.getFullYear();
      }
    },
    nextPeriod() {
      if (this.viewMode === 'month') {
        if (this.selectedMonth === 11) {
          this.selectedMonth = 0;
          this.selectedYear++;
        } else {
          this.selectedMonth++;
        }
      } else if (this.viewMode === 'week') {
        this.selectedWeek++;
        const weeksInMonth = Math.ceil((this.daysInMonth + this.firstDayOffset) / 7);
        if (this.selectedWeek >= weeksInMonth) {
          if (this.selectedMonth === 11) {
            this.selectedMonth = 0;
            this.selectedYear++;
          } else {
            this.selectedMonth++;
          }
          this.selectedWeek = 0;
        }
      } else if (this.viewMode === 'day') {
        const currentDay = new Date(this.selectedYear, this.selectedMonth, this.selectedDay);
        currentDay.setDate(currentDay.getDate() + 1);
        this.selectedDay = currentDay.getDate();
        this.selectedMonth = currentDay.getMonth();
        this.selectedYear = currentDay.getFullYear();
      }
    },
    updateView() {
      if (this.viewMode === 'week') {
        const currentDate = new Date(this.selectedYear, this.selectedMonth, this.selectedDay);
        const firstDayOfMonth = new Date(this.selectedYear, this.selectedMonth, 1);
        const firstMonday = new Date(firstDayOfMonth);
        firstMonday.setDate(firstDayOfMonth.getDate() - ((firstDayOfMonth.getDay() + 6) % 7));
        const diffDays = Math.floor((currentDate - firstMonday) / (1000 * 60 * 60 * 24));
        this.selectedWeek = Math.floor(diffDays / 7);
      }
    },
    onDayClick(day, isWeekView = false) {
      if (isWeekView) {
        const firstDayOfMonth = new Date(this.selectedYear, this.selectedMonth, 1);
        const firstMonday = new Date(firstDayOfMonth);
        firstMonday.setDate(firstDayOfMonth.getDate() - ((firstDayOfMonth.getDay() + 6) % 7));
        const weekStart = new Date(firstMonday);
        weekStart.setDate(firstMonday.getDate() + this.selectedWeek * 7);
        const clickedDay = new Date(weekStart);
        const dayIndex = this.weekDaysDates.findIndex(d => d.day === day);
        clickedDay.setDate(weekStart.getDate() + dayIndex);
        this.selectedDay = clickedDay.getDate();
        this.selectedMonth = clickedDay.getMonth();
        this.selectedYear = clickedDay.getFullYear();
      } else {
        this.selectedDay = day;
      }
      this.$router.push('/agenda/tasks');
    },
    checkScreenSize() {
      this.useShortDays = window.innerWidth < 768;
    },
    hasTask(day, isWeekView = false) {
      let fullDate;
      if (isWeekView) {
        const firstDayOfMonth = new Date(this.selectedYear, this.selectedMonth, 1);
        const firstMonday = new Date(firstDayOfMonth);
        firstMonday.setDate(firstDayOfMonth.getDate() - ((firstDayOfMonth.getDay() + 6) % 7));
        const weekStart = new Date(firstMonday);
        weekStart.setDate(firstMonday.getDate() + this.selectedWeek * 7);
        const currentDay = new Date(weekStart);
        const dayIndex = this.weekDaysDates.findIndex(d => d.day === day);
        currentDay.setDate(weekStart.getDate() + dayIndex);
        fullDate = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate());
      } else {
        fullDate = new Date(this.selectedYear, this.selectedMonth, day);
      }
      const taskDate = new Date(fullDate.getFullYear(), fullDate.getMonth(), fullDate.getDate());
      return this.tasks.some(task => {
        const taskDueDate = new Date(task.due);
        const normalizedTaskDate = new Date(taskDueDate.getFullYear(), taskDueDate.getMonth(), taskDueDate.getDate());
        return normalizedTaskDate.getTime() === taskDate.getTime() && !task.completed;
      });
    },
    getTasksForDay(day, isWeekView = false) {
      let fullDate;
      if (isWeekView) {
        const firstDayOfMonth = new Date(this.selectedYear, this.selectedMonth, 1);
        const firstMonday = new Date(firstDayOfMonth);
        firstMonday.setDate(firstDayOfMonth.getDate() - ((firstDayOfMonth.getDay() + 6) % 7));
        const weekStart = new Date(firstMonday);
        weekStart.setDate(firstMonday.getDate() + this.selectedWeek * 7);
        const currentDay = new Date(weekStart);
        const dayIndex = this.weekDaysDates.findIndex(d => d.day === day);
        currentDay.setDate(weekStart.getDate() + dayIndex);
        fullDate = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate());
      } else {
        fullDate = new Date(this.selectedYear, this.selectedMonth, day);
      }
      const taskDate = new Date(fullDate.getFullYear(), fullDate.getMonth(), fullDate.getDate());
      return this.tasks.filter(task => {
        const taskDueDate = new Date(task.due);
        const normalizedTaskDate = new Date(taskDueDate.getFullYear(), taskDueDate.getMonth(), taskDueDate.getDate());
        return normalizedTaskDate.getTime() === taskDate.getTime() && !task.completed;
      });
    },
    getTaskStyle(task, day) {
      const startHour = parseInt(task.startTime.split(':')[0]) - 8;
      const endHour = parseInt(task.endTime.split(':')[0]) - 8;
      const duration = endHour - startHour;
      let fullDate = new Date(this.selectedYear, this.selectedMonth, day);
      if (this.viewMode === 'week') {
        const firstDayOfMonth = new Date(this.selectedYear, this.selectedMonth, 1);
        const firstMonday = new Date(firstDayOfMonth);
        firstMonday.setDate(firstDayOfMonth.getDate() - ((firstDayOfMonth.getDay() + 6) % 7));
        const weekStart = new Date(firstMonday);
        weekStart.setDate(firstMonday.getDate() + this.selectedWeek * 7);
        const currentDay = new Date(weekStart);
        const dayIndex = this.weekDaysDates.findIndex(d => d.day === day);
        currentDay.setDate(weekStart.getDate() + dayIndex);
        fullDate = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate());
      }
      const taskDate = new Date(fullDate.getFullYear(), fullDate.getMonth(), fullDate.getDate());
      const taskDueDate = new Date(task.due);
      const normalizedTaskDate = new Date(taskDueDate.getFullYear(), taskDueDate.getMonth(), taskDueDate.getDate());
      if (normalizedTaskDate.getTime() === taskDate.getTime()) {
        return {
          top: `${startHour * this.timeSlotHeight}px`,
          height: `${duration * this.timeSlotHeight}px`,
          backgroundColor: '#28a745',
          color: '#fff',
          borderRadius: '4px',
          padding: '2px 4px',
          position: 'absolute',
          width: 'calc(100% - 4px)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        };
      }
      return {};
    },
    isCurrentDay(day, month, year) {
      const currentDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
      const compareDate = new Date(year, month, day);
      return currentDay.getTime() === compareDate.getTime();
    },
  },
  mounted() {
    this.loadTasks();
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
  background-color: #f4f7fa;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem 0;
  overflow: hidden;
}

main.main-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem 1rem;
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
  min-width: 280px;
  transition: transform 0.3s ease;
}

.calendar-controls-container {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}

.calendar-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
}

.control-btn {
  background: #4a90e2;
  color: #fff;
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  font-size: clamp(0.8rem, 2vw, 1rem);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin: 0 0.25rem;
}

.control-btn:hover {
  background: #357abd;
  transform: translateY(-2px);
}

.control-btn:active {
  transform: translateY(0);
}

.icon {
  width: 16px;
  height: 16px;
}

.calendar-title {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 600;
  color: #333;
  text-align: center;
  flex: 0 0 auto;
  margin: 0 0.5rem;
  font-family: 'Inter', sans-serif;
  white-space: nowrap;
}

.calendar-title.current-day {
  background: #e6f0fa;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 2px solid #4a90e2;
}

.view-selector {
  display: flex;
  align-items: center;
}

.view-label {
  font-size: 1rem;
  color: #333;
  margin-right: 0.5rem;
}

.view-select {
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #e9ecef;
  font-size: 1rem;
  cursor: pointer;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(40px, 1fr));
  gap: 0.3rem;
  width: 100%;
  box-sizing: border-box;
}

.week-view {
  display: grid;
  grid-template-columns: 50px repeat(7, 1fr);
  grid-template-rows: 60px repeat(16, 50px);
  gap: 0.3rem;
  position: relative;
  min-height: 890px;
  background-image: linear-gradient(to bottom, transparent 49px, #e9ecef 50px);
  background-size: 100% 50px;
  background-position: 0 60px;
}

.day-grid {
  display: grid;
  grid-template-columns: 50px 1fr;
  grid-template-rows: 60px repeat(16, 50px);
  gap: 0.3rem;
  width: 100%;
  position: relative;
  min-height: 890px;
  background-image: linear-gradient(to bottom, transparent 49px, #e9ecef 50px);
  background-size: 100% 50px;
  background-position: 0 60px;
}

.time-slot {
  grid-column: 1;
  text-align: right;
  padding-right: 0.5rem;
  font-size: 0.9rem;
  color: #666;
  position: relative;
  z-index: 1;
}

.day-header {
  grid-row: 1 / span 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  font-weight: 600;
  font-size: clamp(0.7rem, 1.5vw, 0.9rem);
  color: #666;
  background: #e9ecef;
  border: 1px solid #d1d5db;
  border-right: none;
  box-sizing: border-box;
  width: 100%;
  text-transform: uppercase;
  font-family: 'Inter', sans-serif;
}

.day-header:last-child {
  border-right: 1px solid #d1d5db;
}

.day-header.current-day {
  background: #e6f0fa;
  color: #333;
  border: 2px solid #4a90e2;
  border-right: none;
}

.day-header.current-day:last-child {
  border-right: 2px solid #4a90e2;
}

.day-name {
  font-size: clamp(0.7rem, 1.5vw, 0.9rem);
  font-weight: 600;
}

.day-number {
  font-weight: 600;
  font-size: clamp(0.8rem, 2vw, 1rem);
  margin-top: 0.2rem;
  color: #333;
}

.calendar-day.current-day .day-number {
  color: #000;
}

.day-events {
  grid-column: 2;
  grid-row: 2 / span 16;
  position: relative;
}

.day-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.task-list {
  max-height: 50px;
  overflow-y: auto;
  width: 100%;
  font-size: clamp(0.6rem, 1.2vw, 0.75rem);
  color: #333;
  text-align: left;
}

.task-item {
  padding: 0.1rem 0.3rem;
  background: #28a745;
  color: #fff;
  border-radius: 3px;
  margin-bottom: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: clamp(0.6rem, 1.2vw, 0.75rem);
}

.task-event {
  position: absolute;
  border-radius: 4px;
  padding: 2px 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  whiteSpace: 'nowrap';
}

.week-day-slot {
  position: relative;
  grid-row: 2 / span 16;
  border-left: 1px solid #e9ecef;
}

.week-day-slot:last-child {
  border-right: 1px solid #e9ecef;
}

.week-day-slot.calendar-day {
  position: relative;
  min-height: 80px;
}

.calendar-header {
  text-align: center;
  font-weight: 600;
  font-size: clamp(0.7rem, 1.5vw, 0.9rem);
  color: #666;
  padding: 0.5rem;
  text-transform: uppercase;
  background: #e9ecef;
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
}

.calendar-header.short {
  font-size: clamp(0.6rem, 1.3vw, 0.8rem);
}

.calendar-day {
  padding: clamp(0.5rem, 1.5vw, 0.75rem);
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  font-size: clamp(0.8rem, 2vw, 1rem);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  text-align: center;
  color: #333;
  font-weight: 500;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
}

.calendar-day:hover {
  background: #e6f0fa;
  transform: scale(1.05);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.calendar-day.has-task {
  background: #d4edda;
  border-color: #28a745;
  color: #333;
}

.calendar-day.has-task:hover {
  background: #c3e6cb;
  transform: scale(1.05);
}

.calendar-day.current-day {
  background: #e6f0fa;
  border: 2px solid #4a90e2;
  color: #333;
}

.calendar-day.current-day:hover {
  background: #d0e4f7;
  transform: scale(1.05);
}

.calendar-day.empty {
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  min-height: 80px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .calendar-section {
    margin-top: 50px;
  }

  .calendar-card {
    padding: 1rem;
  }

  .calendar-controls-container {
    flex-direction: column;
    gap: 0.5rem;
  }

  .calendar-controls {
    justify-content: center;
    align-items: center;
    gap: 0;
  }

  .calendar-title {
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    margin: 0 0.5rem;
    white-space: nowrap;
  }

  .calendar-title.current-day {
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    padding: 0.3rem 0.6rem;
  }

  .control-btn {
    width: 28px;
    height: 28px;
    padding: 0.3rem;
    margin: 0 0.2rem;
  }

  .icon {
    width: 12px;
    height: 12px;
  }

  .calendar-grid {
    grid-template-columns: repeat(7, minmax(30px, 1fr));
    gap: 0.2rem;
  }

  .week-view {
    grid-template-columns: 40px repeat(7, 1fr);
    grid-template-rows: 50px repeat(16, 40px);
    min-height: 690px;
    background-size: 100% 40px;
    background-position: 0 50px;
  }

  .day-grid {
    grid-template-columns: 40px 1fr;
    grid-template-rows: 50px repeat(16, 40px);
    min-height: 690px;
    background-size: 100% 40px;
    background-position: 0 50px;
  }

  .time-slot {
    font-size: 0.7rem;
  }

  .day-header {
    font-size: clamp(0.6rem, 1.2vw, 0.7rem);
  }

  .day-name {
    font-size: clamp(0.6rem, 1.2vw, 0.7rem);
  }

  .day-number {
    font-size: clamp(0.7rem, 1.5vw, 0.9rem);
    margin-top: 0.1rem;
  }

  .month-label {
    font-size: 0.6rem;
  }

  .calendar-day {
    padding: 0.4rem;
    font-size: clamp(0.7rem, 1.5vw, 0.9rem);
    min-height: 60px;
  }

  .week-day-slot.calendar-day {
    min-height: 60px;
  }

  .calendar-day.empty {
    min-height: 60px;
  }

  .calendar-header {
    font-size: clamp(0.6rem, 1.2vw, 0.7rem);
    padding: 0.4rem;
  }

  .task-list {
    max-height: 30px;
    font-size: clamp(0.5rem, 1vw, 0.65rem);
  }

  .task-item {
    font-size: clamp(0.5rem, 1vw, 0.65rem);
  }

  .task-event {
    font-size: 0.7rem;
  }
}

@media (min-width: 769px) {
  .calendar-grid {
    grid-template-columns: repeat(7, minmax(80px, 1fr));
  }

  .week-view {
    grid-template-columns: 50px repeat(7, 1fr);
    grid-template-rows: 60px repeat(16, 50px);
    min-height: 890px;
  }

  .day-grid {
    grid-template-columns: 50px 1fr;
    grid-template-rows: 60px repeat(16, 50px);
    min-height: 890px;
  }

  .calendar-day {
    min-height: 100px;
  }

  .week-day-slot.calendar-day {
    min-height: 100px;
  }

  .calendar-day.empty {
    min-height: 100px;
  }
}

@media (min-width: 577px) and (max-width: 768px) {
  .calendar-grid {
    grid-template-columns: repeat(7, minmax(50px, 1fr));
  }

  .week-view {
    grid-template-columns: 40px repeat(7, 1fr);
    grid-template-rows: 50px repeat(16, 40px);
    min-height: 690px;
  }

  .day-grid {
    grid-template-columns: 40px 1fr;
    grid-template-rows: 50px repeat(16, 40px);
    min-height: 690px;
  }

  .calendar-day {
    min-height: 80px;
  }

  .week-day-slot.calendar-day {
    min-height: 80px;
  }

  .calendar-day.empty {
    min-height: 80px;
  }
}
</style>