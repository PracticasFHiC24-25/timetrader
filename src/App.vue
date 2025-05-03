<template>
  <div id="app">
    <router-view></router-view>

    <!-- Botón flotante para el calendario -->
    <router-link to="/agenda/calendari" class="calendar-button">
      <svg class="calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9h18M9 3v2m6-2v2M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm2 10h4v4H7v-4z"/>
      </svg>
    </router-link>
  </div>
</template>

<style>
.calendar-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #4a90e2;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: background 0.2s ease, transform 0.2s ease;
  z-index: 1000;
}

.calendar-button:hover {
  background: #357abd;
  transform: scale(1.1);
}

.calendar-icon {
  width: 24px;
  height: 24px;
  color: #fff;
}

@media (max-width: 576px) {
  .calendar-button {
    width: 40px;
    height: 40px;
    bottom: 15px;
    right: 15px;
  }

  .calendar-icon {
    width: 20px;
    height: 20px;
  }
}
</style>