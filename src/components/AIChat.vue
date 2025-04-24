<!-- src/components/AIChat.vue -->
<template>
  <div class="card chat">
    <h2>Asistente IA</h2>
    <div class="chat-history">
      <p v-for="(message, index) in messages" :key="index" :class="{ 'user': message.isUser }">
        {{ message.text }}
      </p>
    </div>
    <input v-model="input" @keyup.enter="sendMessage" placeholder="Escribe tu consulta..." />
    <button @click="sendMessage">Enviar</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      messages: [
        { text: 'Hola, ¿cómo puedo optimizar tu horario?', isUser: false },
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
      if (input.includes('planifiquis') || input.includes('horario')) {
        return 'Propuesta: Sesión de estudio de 9:00 a 11:00, descanso de 15min, proyecto de 11:15 a 13:00. ¿Quieres añadir descansos o ajustar?';
      } else if (input.includes('descansos')) {
        return 'Ajustado: Sesión de estudio de 9:00 a 10:30, descanso 15min, proyecto de 10:45 a 12:15. ¿Confirmas?';
      } else if (input.includes('confirmas') || input.includes('implementa')) {
        return 'Horario implementado en tu calendario.';
      }
      return 'Por favor, especifica tu consulta (por ejemplo, "Planifica mi semana").';
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