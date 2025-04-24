<!-- src/views/AIAssistant.vue -->
<template>
  <div class="ai-assistant container">
    <h1>Asistente IA</h1>
    <AIChat />
  </div>
</template>

<script>
import AIChat from '../components/AIChat.vue';

export default {
  components: { AIChat },
};
</script>

<style scoped>
.ai-assistant { padding: 16px; }
</style>