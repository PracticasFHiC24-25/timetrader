<!-- src/views/FAQ.vue -->
<template>
  <div class="faq-page">
    <main class="main-content">
      <h1>Preguntes Freqüents</h1>
      <p>Aquesta secció està en desenvolupament. Consulta les preguntes freqüents aviat.</p>
    </main>
  </div>
</template>

<script>
export default {
  name: 'FAQ',
};
</script>

<style scoped>
.faq-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  padding: 32px;
  width: 100%;
  background: #f9f9f9;
  flex-grow: 1;
  text-align: center;
}
</style>    