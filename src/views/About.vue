<template>
    <div class="about-page">
      <section class="hero-section">
        <h1>AROUT TIMETRADER</h1>
        <p class="description">
          TimeTrader és una plataforma web sofisticada dissenyada com a planificador de tasques i agenda digital per a estudiants i professionals. El nostre objectiu és optimitzar la gestió del temps i augmentar la productivitat a través d’una experiència personalitzada i fàcil d’utilitzar.
        </p>
      </section>
      <section class="features-section">
        <h2>PER QUÈ TRIAR TIMETRADER?</h2>
        <p class="sub-description">
          TimeTrader destaca per la seva interfície intuïtiva i funcions potents adaptades a les necessitats úniques de cada usuari, sigui estudiant o professional.
        </p>
        <ul>
          <li><strong>Gestió de Tasques Personalitzada:</strong> Organitza tasques i esdeveniments eficaçment amb eines adaptades a la teva professió.</li>
          <li><strong>Assistent Potenciat per IA:</strong> Rep suggeriments intel·ligents per a l’optimització de l’horari segons la teva disponibilitat i prioritats.</li>
          <li><strong>Eines de Col·laboració:</strong> Comparteix tasques i crea grups de treball per optimitzar l’equip.</li>
          <li><strong>Interfície Clara:</strong> Accedeix a la informació instantàniament amb un disseny senzill i estructurat.</li>
          <li><strong>Recordatoris i Notificacions:</strong> Mantingues al dia amb recordatoris automàtics per a tasques i terminis.</li>
        </ul>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AboutPage',
  }
  </script>
  
  <style scoped>
  .about-page {
    font-family: 'Open Sans', sans-serif;
    background-color: #F5F6FA; /* Gris Suau */
    padding: 2rem;
    min-height: 100vh;
  }
  
  .hero-section, .features-section {
    margin-bottom: 2rem;
  }
  
  h1 {
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 24px;
    line-height: 1.5em;
    margin-bottom: 16px;
    color: #333333; /* Negre per text principal */
  }
  
  h2 {
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 18px;
    line-height: 1.5em;
    margin-bottom: 16px;
    color: #333333;
  }
  
  .description, .sub-description {
    font-size: 16px;
    line-height: 1.6em;
    color: #333333;
    margin: 0 0 1rem;
    white-space: normal;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 1rem;
  }
  
  li {
    font-size: 16px;
    line-height: 1.6em;
    color: #333333;
    margin-bottom: 0.75rem;
    white-space: normal;
  }
  
  li strong {
    color: #4A90E2; /* Blau clar per destacar */
  }
  
  /* Ocultar icona de calendari flotant a la dreta inferior */
  .calendar-icon {
    display: none !important;
  }
  </style>