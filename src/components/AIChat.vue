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
        { text: 'Hola, com puc optimizar el teu horari?', isUser: false },
      ],
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
        this.$el.querySelector('.chat-history').scrollTop = this.$el.querySelector('.chat-history').scrollHeight;
      });
    },
    generateResponse(input) {
      if (input.includes('planifiquis') || input.includes('horari')) {
        return 'Proposta: Sessió d\'estudi de 9:00 a 11:00, descans de 15min, projecte de 11:15 a 13:00. Vols afegir descansos o ajustar?';
      } else if (input.includes('descansos')) {
        return 'Ajustat: Sessió d\'estudi de 9:00 a 10:30, descans de 15min, projecte de 10:45 a 12:15. ¿Confirmes?';
      } else if (input.includes('confirmes') || input.includes('implementa')) {
        return 'Horario implementado en tu calendario.';
      }
      return 'Siusplau, especifica la teva consulta (per exemple, "Planifica la meva setmana").';
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