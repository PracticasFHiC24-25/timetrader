<!-- src/views/Support.vue -->
<template>
    <div class="support-page">
      <main class="main-content">
        <h1>Suport i Contacte</h1>
        <p>Aquesta secció està en desenvolupament. Contacta amb nosaltres a <a href="mailto:timetrader@gmail.com">timetrader@gmail.com</a>.</p>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Support',
  };
  </script>
  
  <style scoped>
  .support-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .main-content {
    padding: 32px;
    width: 100%;
    background: #f9f9f9;
    flex-grow: 1;
    text-align: center;
  }
  </style>