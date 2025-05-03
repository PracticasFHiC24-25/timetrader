<!-- src/views/Faq.vue -->
<template>
  <div class="faq-page">
    <main class="main-content">
      <!-- Capçalera professional -->
      <header class="header">
        <h1>Preguntes Freqüents</h1>
        <p class="subtitle">Troba respostes ràpides a les preguntes més habituals sobre TimeTrader.</p>
      </header>

      <!-- Llista de preguntes freqüents -->
      <section class="faq-section">
        <!-- Breadcrumb -->
        <nav class="breadcrumb" aria-label="Camí de navegació">
          <router-link to="/" class="breadcrumb-link">Inici</router-link>
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb-current">Preguntes Freqüents</span>
        </nav>
        <ul class="faq-list" role="tablist">
          <li v-for="(item, idx) in faqs" :key="idx" class="faq-item">
            <button
              class="faq-question"
              @click="toggle(idx)"
              :aria-expanded="openIndex === idx"
              :aria-controls="'answer-' + idx"
              role="tab"
              :id="'question-' + idx"
            >
              <span>{{ item.question }}</span>
              <i :class="openIndex === idx ? 'fas fa-minus' : 'fas fa-plus'"></i>
            </button>
            <div
              v-show="openIndex === idx"
              :id="'answer-' + idx"
              class="faq-answer"
              role="tabpanel"
              :aria-labelledby="'question-' + idx"
            >
              <p>{{ item.answer }}</p>
            </div>
          </li>
        </ul>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <router-link to="/terms">Termes i Condicions</router-link>
        <router-link to="/support">Suport</router-link>
        <router-link to="/faq">Preguntes Freqüents</router-link>
      </footer>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Faq',
  data() {
    return {
      openIndex: null,
      faqs: [
        {
          question: 'Com puc afegir una nova tasca al calendari?',
          answer: 'Ves a "La Meva Agenda", clica el botó "Crear nova tasca", introdueix títol, data i hora o període, assigna prioritat i guarda. La tasca apareixerà al calendari automàticament.'
        },
        {
          question: 'Com funciona el canvi de vista (dia/setmana/mes)?',
          answer: 'A la part superior del calendari hi ha un menú desplegable per escollir vista per dia, setmana o mes. Selecciona la que prefereixis per ajustar la planificació a la teva necessitat.'
        },
        {
          question: 'Com puc configurar recordatoris per a les meves tasques?',
          answer: 'Des de "La Meva Agenda", selecciona una tasca creada, clica "Afegir recordatori" i tria quant de temps abans vols rebre l\'alerta.'
        },
        {
          question: 'Com exporto el meu calendari per utilitzar-lo en altres aplicacions?',
          answer: 'A Configuració, selecciona "Exportar calendari". S\'generarà un fitxer Calendari que podràs importar a Google Calendar, Outlook o altres serveis compatibles.'
        },
        {
          question: 'Què és l\'Assistent IA i com l\'utilitzo?',
          answer: 'L\'Assistent IA reorganitza el teu horari segons les teves prioritats i disponibilitat: obre la pestanya "Assistent IA", escriu la teva consulta i rep una proposta d\'horari optimitzat.'
        },
        {
          question: 'Com canvio la meva configuració personal i preferències?',
          answer: 'Ves a "Configuració i Personalització" des del menú principal, on podràs ajustar l\'idioma, zona horària, notificacions i preferències de visualització.'
        },
        {
          question: 'Com funciona la Gestió de Projectes?',
          answer: 'A "Gestió de Projectes", pots crear projectes, assignar tasques, col·laborar amb altres usuaris i veure el progrés en un tauler visual.'
        },
        {
          question: 'Com puc contactar amb el suport si tinc problemes?',
          answer: 'Al peu de pàgina i a la secció "Suport i Contacte" trobaràs un formulari o pots enviar un correu a support@timetrader.com.'
        }
      ]
    };
  },
  methods: {
    toggle(idx) {
      this.openIndex = this.openIndex === idx ? null : idx;
    }
  }
};
</script>

<style scoped>
/* Contenedor principal */
.faq-page {
  min-height: 100vh;
  background: #f5f7fa;
}

/* Área principal de contingut */
.main-content {
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Capçalera */
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.header .subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
}

/* Secció de preguntes freqüents */
.faq-section {
  width: 100%;
  max-width: 800px;
  margin-bottom: 40px;
}

.faq-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.faq-item {
  margin-bottom: 15px;
}

.faq-question {
  width: 100%;
  background: #fff;
  border: 1px solid #e0e0e0;
  padding: 15px 20px;
  font-size: 1.1rem;
  color: #34495e;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.faq-question:hover,
.faq-question:focus {
  background-color: #f9f9f9;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.faq-question i {
  color: #4A90E2;
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.faq-question[aria-expanded="true"] i {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 20px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-top: none;
  border-radius: 0 0 8px 8px;
  font-size: 1rem;
  color: #34495e;
  line-height: 1.6;
  animation: fadeIn 0.3s ease-in-out;
}

/* Animació per a l'expansió */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Footer */
.footer {
  text-align: center;
  padding: 20px 0;
  border-top: 1px solid #e0e0e0;
  width: 100%;
}

.footer a {
  margin: 0 15px;
  text-decoration: none;
  color: #4A90E2;
}

.footer a:hover {
  text-decoration: underline;
}

.breadcrumb {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: #7f8c8d;
  margin-bottom: 20px;
  align-self: flex-start;
}

.breadcrumb-link {
  color: #4A90E2;
  text-decoration: none;
  font-weight: 500;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #bdc3c7;
}

.breadcrumb-current {
  color: #2c3e50;
  font-weight: 600;
}

/* Responsivitat */
@media (max-width: 767px) {
  .main-content {
    padding: 20px;
  }

  .header h1 {
    font-size: 2rem;
  }

  .header .subtitle {
    font-size: 1rem;
  }

  .faq-question {
    padding: 12px 15px;
    font-size: 1rem;
  }

  .faq-answer {
    padding: 15px;
    font-size: 0.9rem;
  }

  .breadcrumb {
    display: none;
  }
}
</style>