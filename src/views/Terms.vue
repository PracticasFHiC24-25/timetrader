<template>
    <div class="terms-page">
      <Sidebar />
      <main class="main-content">
        <h1>Termes i Condicions</h1>
        <p>Aquesta secció està en desenvolupament. Consulta els nostres termes i condicions aviat.</p>
      </main>
    </div>
  </template>
  
  <script>
  import Sidebar from '../components/Sidebar.vue';
  
  export default {
    name: 'Terms',
    components: {
      Sidebar,
    },
  };
  </script>
  
  <style scoped>
  .terms-page {
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