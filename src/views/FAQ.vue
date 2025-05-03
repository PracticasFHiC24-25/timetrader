<template>
  <div class="faq-page">
    <Sidebar />
    <main class="main-content">
      <h1>Preguntes Freqüents</h1>
      <ul class="faq-list" role="tablist">
        <li
          v-for="(item, idx) in faqs"
          :key="idx"
          class="faq-item"
        >
          <button
            class="faq-question"
            @click="toggle(idx)"
            :aria-expanded="openIndex === idx"
            :aria-controls="'answer-' + idx"
            role="tab"
            :id="'question-' + idx"
          >
            {{ item.question }}
            <span aria-hidden="true">{{ openIndex === idx ? '−' : '+' }}</span>
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
.faq-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-bg);
}

.main-content {
  flex: 1;
  padding: var(--space-lg);
  max-width: 700px;
  margin: 0 auto;
}

.faq-list {
  list-style: none;
  padding: 0;
  margin-top: 3cm; /* Aproximadament 3 cm de separació */
}

/* Espai entre el títol i la primera pregunta */
.faq-list {
  list-style: none;
  padding: 0;
  margin-top: 1cm;
}

.faq-item + .faq-item {
  margin-top: var(--space-md);
}

.faq-question {
  width: 100%;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  padding: var(--space-md);
  font-size: var(--font-size-md);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.2s ease;
}
.faq-question:hover,
.faq-question:focus {
  background: var(--color-secondary-bg-hover);
}

.faq-answer {
  padding: var(--space-md);
  background: var(--color-white);
  border-left: 4px solid var(--color-primary);
}
</style>