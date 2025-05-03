<!-- src/components/AIChat.vue -->
<template>
  <div class="card chat">
    <h2>Asistent IA</h2>
    <div class="chat-history">
      <p v-for="(message, index) in messages" :key="index" :class="{ 'user': message.isUser }">
        {{ message.text }}
      </p>
    </div>
    <input v-model="input" @keyup.enter="sendMessage" placeholder="Escriu la teva consulta..." />
    <button @click="sendMessage">Enviar</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      messages: [
        { text: 'Hola, com puc optimizar el teu horari?', isUser: false },
      ],
    };
  },
  methods: {
    sendMessage() {
      if (!this.input) return;
      this.messages.push({ text: this.input, isUser: true });
      const response = this.generateResponse(this.input);
      this.messages.push({ text: response, isUser: false });
      this.input = '';
    },
    generateResponse(input) {
      if (input.includes('planifiquis') || input.includes('horari')) {
        return 'Proposta: Sessió d\'estudi de 9:00 a 11:00, descans de 15min, projecte de 11:15 a 13:00. Vols afegir descansos o ajustar?';
      } else if (input.includes('descansos')) {
        return 'Ajustat: Sessió d\'estudi de 9:00 a 10:30, descans de 15min, projecte de 10:45 a 12:15. ¿Confirmes?';
      } else if (input.includes('confirmes') || input.includes('implementa')) {
        return 'Horario implementado en tu calendario.';
      }
      return 'Siusplau, especifica la teva consulta (por exemple, "Planifica la meva semana").';
    },
  },
};
</script>

<style scoped>
.chat { padding: 16px; max-height: 400px; overflow-y: auto; }
.chat-history { margin-bottom: 16px; }
.chat-history p { margin: 8px; padding: 8px; border-radius: 4px; }
.chat-history .user { background: var(--secondary); text-align: right; }
input { width: 100%; padding: 8px; }
</style>