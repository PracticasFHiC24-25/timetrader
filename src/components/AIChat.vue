<template>
  <div class="card chat">
    <div class="chat-history">
      <div v-for="(message, index) in messages" :key="index" class="message" :class="{ 'user': message.isUser }">
        <div class="message-content">
          <p>{{ message.text }}</p>
        </div>
      </div>
    </div>
    <div class="input-group mt-3">
      <input v-model="input" @keyup.enter="sendMessage" type="text" class="form-control border-secondary" placeholder="Escriu la teva consulta..." />
      <button @click="sendMessage" class="btn btn-primary ms-2">Envia</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      messages: [
        { text: 'Hola, com puc optimitzar el teu horari?', isUser: false },
      ],
      tasks: JSON.parse(sessionStorage.getItem('tasks') || '[]'),
    };
  },
  methods: {
    sendMessage() {
      if (!this.input.trim()) return;
      this.messages.push({ text: this.input.trim(), isUser: true });
      const response = this.generateResponse(this.input.trim());
      this.messages.push({ text: response, isUser: false });
      this.input = '';
      this.$nextTick(() => {
        const el = this.$el.querySelector('.chat-history');
        el.scrollTop = el.scrollHeight;
      });
    },

    generateResponse(input) {
      input = input.toLowerCase();

      const today = new Date().toISOString().split('T')[0];
      const tomorrowDate = new Date();
      tomorrowDate.setDate(tomorrowDate.getDate() + 1);
      const tomorrow = tomorrowDate.toISOString().split('T')[0];

      if (input.includes('planifiquis') || input.includes('horari')) {
        return 'Proposta: Sessió d\'estudi de 9:00 a 11:00';}
      else if (input.includes('avui')) {
        const tasksToday = this.tasks.filter(t => t.dueDate === today);
        if (tasksToday.length) {
          const titles = tasksToday.map(t => `"${t.title}"`).join(', ');
          return `Aquestes són les teves ${tasksToday.length} tasques per avui: ${titles}. Amb quina vols començar?`;
        } else {
          return 'No tens cap tasca per avui.';
        }
      }
      else if (input.includes('demà')) {
        const tasksTomorrow = this.tasks.filter(t => t.dueDate === tomorrow);
        if (tasksTomorrow.length) {
          const titles = tasksTomorrow.map(t => `"${t.title}"`).join(', ');
          return `Demà tens ${tasksTomorrow.length} tasques: ${titles}. Vols que t’en recordi a quina hora?`;
        } else {
          return 'No tens cap tasca per demà.';
        }
      }
      else if (input.includes('urgents') || input.includes('urgent')) {
        const urgentTasks = this.tasks.filter(t => t.priority === 'Alta');
        if (urgentTasks.length) {
          const titles = urgentTasks.map(t => `"${t.title}"`).join(', ');
          return `Tens ${urgentTasks.length} tasca(s) urgent(s): ${titles}. Vols ajornar-les o marcar-les com a completades?`;
        } else {
          return 'No tens cap tasca urgent.';
        }
      }
      else if (input.includes('suggeriment')) {
        if (this.tasks.length) {
          const oldest = this.tasks.slice().sort((a, b) => a.id - b.id)[0];
          return `La tasca més antiga pendent és “${oldest.title}” amb data de venciment ${oldest.dueDate}.`;
        } else {
          return 'Primer has d\'afegir alguna cosa al teu calendari.';
        }
      }
      else if (input.includes('motivació')) {
      const frases = [
        'Anem-hi, que tu pots! 💪',
        'Cada pas endavant et porta més a prop de la teva meta.',
        'No deixis que els obstacles et frenin, aprèn d’ells.',
        'Avui és la teva oportunitat per brillar amb força!'
      ];
      const i = Math.floor(Math.random() * frases.length);
      return frases[i];}
      else {
        return 'Ho sento, no he reconegut aquesta comanda. Prova amb una comanda que contingui “avui”, “demà”, “urgents”, “suggeriment”, "hoarari" o "motivació".';
      }
    },
  },
};
</script>

<style scoped>
.chat {
  padding: 20px;
  max-height: 500px;
  overflow-y: auto;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 10px;
}

.chat-history {
  margin-bottom: 16px;
}

.message {
  display: flex;
  margin: 8px 0;
}

.message-content {
  padding: 10px 15px;
  border-radius: 8px;
  max-width: 70%;
}

.user .message-content {
  background-color: #e9ecef;
  color: #2c3e50;
  text-align: right;
  margin-left: auto;
}

.message-content p {
  margin: 0;
  word-wrap: break-word;
}

.input-group {
  display: flex;
  gap: 10px;
}

input {
  flex: 1;
  border-radius: 20px;
  padding: 10px;
}

button {
  border-radius: 20px;
  padding: 10px 20px;
}
</style>