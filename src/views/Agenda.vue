<!-- src/views/Agenda.vue -->
<template>
  <div class="agenda">
    <Sidebar />
    <div class="content container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';

export default {
  components: { Sidebar },
};
</script>

<style scoped>
.agenda { display: flex; }
.content { padding: 16px; flex-grow: 1; margin-left: 250px; }
@media (max-width: 768px) {
  .content { margin-left: 0; }
}
</style>