<template>
    <div class="faq-page">
      <Sidebar />
      <main class="main-content">
        <h1>Preguntes Freqüents</h1>
        <p>Aquesta secció està en desenvolupament. Consulta les preguntes freqüents aviat.</p>
      </main>
    </div>
  </template>
  
  <script>
  import Sidebar from '@/components/Sidebar.vue';
  
  export default {
    name: 'FAQ',
    components: {
      Sidebar,
    },
  };
  </script>
  
  <style scoped>
  .faq-page {
    display: flex;
    min-height: 100vh;
  }
  
  .main-content {
    margin-left: 250px;
    padding: 32px;
    width: 100%;
  }
  
  @media (max-width: 768px) {
    .main-content {
      margin-left: 0;
    }
  }
  </style>