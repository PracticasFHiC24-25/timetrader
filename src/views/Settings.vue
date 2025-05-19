<template>
  <div class="settings-page">
    <header class="settings-header">
      <h1>Configuració</h1>
    </header>
    <section class="settings-section">
      <form @submit.prevent="saveSettings" class="settings-form">
        <div class="form-group">
          <label for="backgroundColor">Color de fons:</label>
          <div class="input-wrapper">
            <input
              type="color"
              id="backgroundColor"
              v-model="settings.backgroundColor"
              required
            />
            <span class="color-preview" :style="{ backgroundColor: settings.backgroundColor }"></span>
          </div>
        </div>
        <div class="form-group">
          <label for="buttonColor">Color dels botons:</label>
          <div class="input-wrapper">
            <input
              type="color"
              id="buttonColor"
              v-model="settings.buttonColor"
              required
            />
            <span class="color-preview" :style="{ backgroundColor: settings.buttonColor }"></span>
          </div>
        </div>
        <div class="form-group">
          <label for="fontSize">Mida de la lletra (px):</label>
          <input
            type="number"
            id="fontSize"
            v-model.number="settings.fontSize"
            min="12"
            max="24"
            required
          />
        </div>
        <div class="form-group">
          <label for="darkMode">Mode fosc:</label>
          <input
            type="checkbox"
            id="darkMode"
            v-model="settings.darkMode"
          />
        </div>
        <div class="form-actions">
          <button type="submit" class="save-button">Desar Canvis</button>
        </div>
      </form>
      <p v-if="message" class="message">{{ message }}</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data() {
    return {
      settings: {
        backgroundColor: localStorage.getItem('backgroundColor') || '#f5f7fa',
        buttonColor: localStorage.getItem('buttonColor') || '#4A90E2',
        fontSize: parseInt(localStorage.getItem('fontSize')) || 16,
        darkMode: localStorage.getItem('darkMode') === 'true'
      },
      message: ''
    };
  },
  methods: {
    saveSettings() {
      localStorage.setItem('backgroundColor', this.settings.backgroundColor);
      localStorage.setItem('buttonColor', this.settings.buttonColor);
      localStorage.setItem('fontSize', this.settings.fontSize);
      localStorage.setItem('darkMode', this.settings.darkMode);

      document.body.style.backgroundColor = this.settings.backgroundColor;
      document.querySelectorAll('.save-button').forEach(btn => {
        btn.style.backgroundColor = this.settings.buttonColor;
      });
      document.body.style.fontSize = `${this.settings.fontSize}px`;
      document.body.classList.toggle('dark-mode', this.settings.darkMode);
      this.message = 'Canvis desats correctament!';
      setTimeout(() => (this.message = ''), 2000);
    }
  },
  mounted() {
    document.body.style.backgroundColor = this.settings.backgroundColor;
    document.querySelectorAll('.save-button').forEach(btn => {
      btn.style.backgroundColor = this.settings.buttonColor;
    });
    document.body.style.fontSize = `${this.settings.fontSize}px`;
    document.body.classList.toggle('dark-mode', this.settings.darkMode);
  }
};
</script>

<style scoped>
.settings-page {
  padding: 16px;
  box-sizing: border-box;
}

.settings-header {
  margin-bottom: 20px;
}

.settings-header h1 {
  font-size: 1.8rem;
  color: #2c3e50;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
}

.settings-section {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  align-items: center;
  gap: 15px;
}

.form-group label {
  font-size: 1rem;
  color: #34495e;
  width: 150px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-group input[type="color"] {
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  cursor: pointer;
}

.form-group input[type="number"] {
  width: 60px;
  padding: 5px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.color-preview {
  width: 25px;
  height: 25px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
}

.save-button {
  padding: 8px 16px;
  background: v-bind('settings.buttonColor');
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.save-button:hover {
  opacity: 0.9;
}

.message {
  color: #2ecc71;
  font-size: 0.9rem;
  margin-top: 10px;
  font-family: 'Open Sans', sans-serif;
}

/* Estils per al mode fosc */
body.dark-mode {
  background-color: #2c3e50;
  color: #ecf0f1;
}

body.dark-mode .settings-section {
  background: #34495e;
  border-color: #5d6d7e;
}

body.dark-mode .form-group label {
  color: #ecf0f1;
}

body.dark-mode .form-group input[type="number"] {
  background: #4a6070;
  color: #ecf0f1;
  border-color: #5d6d7e;
}

body.dark-mode .save-button {
  background: #e74c3c;
}

body.dark-mode .save-button:hover {
  background: #c0392b;
}

@media (max-width: 767px) {
  .settings-page {
    padding: 15px;
  }

  .settings-section {
    padding: 15px;
  }

  .form-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .form-group label {
    width: auto;
  }

  .input-wrapper {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>