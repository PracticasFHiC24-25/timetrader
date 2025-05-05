<!-- src/views/Terms.vue -->
<template>
  <div class="terms-page">
    <Sidebar />
    <main class="main-content">
      <h1>Termes Legals</h1>

      <nav class="nav-tabs" role="tablist">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="{ active: activeTab === tab }"
          @click="activeTab = tab"
          role="tab"
          :aria-selected="activeTab === tab"
        >
          {{ tab }}
        </button>
      </nav>

      <section role="tabpanel">
        <!-- Breadcrumb -->
        <nav class="breadcrumb" aria-label="Camí de navegació">
          <router-link to="/" class="breadcrumb-link">Inici</router-link>
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb-current">Termes Legals</span>
        </nav>
        <!-- Termes i Condicions -->
        <div v-if="activeTab === 'Termes i Condicions'">
          <h2>Termes i Condicions</h2>
          <p class="updated">Última actualització: 27 d'abril de 2025</p>
          <p>
            Benvingut/da a <strong>TimeTrader</strong>. Si us plau, llegeix atentament aquests
            Termes i Condicions d'ús abans d'utilitzar la nostra plataforma de gestió de
            temps. En accedir o utilitzar el nostre lloc web i serveis, acceptes quedar
            vinculat per aquests Termes.
          </p>
          <ol>
            <li>Acceptació dels Termes</li>
            <p>
              En utilitzar TimeTrader, acceptes aquests Termes i Condicions. Si no hi estàs
              d'acord, si us plau, no utilitzis la nostra plataforma.
            </p>
            <li>Descripció del Servei</li>
            <p>
              TimeTrader ofereix eines per gestionar tasques, horaris, calendaris i
              activitats personals o professionals. Ens reservem el dret de modificar o
              suspendre qualsevol part del servei en qualsevol moment sense previ avís.
            </p>
            <li>Registre i Compte d'Usuari</li>
            <p>
              Per accedir a certes funcionalitats, caldrà crear un compte. Ets responsable
              de mantenir la confidencialitat del teu compte i contrasenya. Acceptes
              proporcionar informació veraç, precisa i actualitzada.
            </p>
            <li>Ús Acceptable</li>
            <p>Acceptes utilitzar TimeTrader únicament per a propòsits lícits. Està prohibit:</p>
            <ul>
              <li>Fer ús fraudulent o malintencionat del servei.</li>
              <li>
                Transmetre continguts il·legals, difamatoris o que vulnerin drets de tercers.
              </li>
              <li>
                Intentar accedir de manera no autoritzada a sistemes o dades del lloc.
              </li>
            </ul>
            <li>Propietat Intel·lectual</li>
            <p>
              Tot el contingut de TimeTrader, incloent textos, gràfics, logotips,
              interfícies i programari, és propietat de TimeTrader o dels seus
              llicenciadors i està protegit per les lleis de propietat intel·lectual.
            </p>
            <li>Limitació de Responsabilitat</li>
            <p>TimeTrader no es responsabilitza de:</p>
            <ul>
              <li>Pèrdues o danys derivats de l'ús o impossibilitat d'ús del servei.</li>
              <li>
                Errors, interrupcions o retards en el servei. Utilitzes TimeTrader
                sota la teva pròpia responsabilitat.
              </li>
            </ul>
            <li>Modificacions dels Termes</li>
            <p>
              Ens reservem el dret de modificar aquests Termes en qualsevol moment. Les
              modificacions entraran en vigor una vegada publicades a la pàgina web.
              L'ús continuat de TimeTrader després d'aquests canvis implica l'acceptació
              dels nous Termes.
            </p>
            <li>Cancel·lació</li>
            <p>
              Pots cancel·lar el teu compte en qualsevol moment des de la configuració del
              teu perfil. Ens reservem el dret de suspendre o cancel·lar comptes que
              incompleixin aquests Termes. Aquests Termes es regeixen per la legislació
              vigent a Catalunya.
            </p>
            <li>Contacte</li>
            <p>
              Si tens dubtes sobre aquests Termes i Condicions, pots
              <a href="mailto:contact@timetrader.com">contactar-nos</a>.
            </p>
          </ol>

          <!-- Consentiment explícit GDPR -->
          <div class="terms-consent">
            <label>
              <input type="checkbox" v-model="consent.terms" />
              He llegit i accepto els Termes i Condicions
            </label>
            <button
              :disabled="!consent.terms"
              @click="onAcceptTerms"
            >
              Continuar
            </button>
          </div>
        </div>

        <!-- Política de Privacitat -->
        <div v-if="activeTab === 'Política de Privacitat'">
          <h2>Política de Privacitat</h2>
          <p class="updated">Última actualització: 27 d'abril de 2025</p>
          <p>
            A <strong>TimeTrader</strong> respectem la teva privacitat i ens comprometem a
            protegir la informació personal que comparteixes amb nosaltres. Aquesta
            Política de Privacitat explica com recopilem, utilitzem i protegim les teves
            dades.
          </p>
          <ol>
            <li>Responsable del Tractament</li>
            <p>
              El responsable de les dades és TimeTrader (<a href="mailto:contact@timetrader.com">contact@timetrader.com</a>).
            </p>
            <li>Informació que Recollim</li>
            <p>Podem recopilar les següents dades:</p>
            <ul>
              <li>
                <strong>Informació de registre</strong> (nom, email, contrasenya) – Base
                legal: execució de contracte.
              </li>
              <li>
                <strong>Informació d'ús</strong> (tasques, preferències) – Base legal:
                interès legítim.
              </li>
              <li>
                <strong>Informació tècnica</strong> (IP, navegador) – Base legal:
                consentiment previ (cookies) i interès legítim.
              </li>
            </ul>
            <li>Finalitats del Tractament</li>
            <p>Utilitzem les teves dades per a:</p>
            <ul>
              <li>Oferir i millorar els nostres serveis.</li>
              <li>Gestionar el teu compte i oferir suport tècnic.</li>
              <li>
                Enviar-te comunicacions relacionades amb el servei (actualitzacions,
                canvis, etc.).
              </li>
              <li>
                Analitzar l'ús de la plataforma per millorar l'experiència de l'usuari.
              </li>
            </ul>
            <li>Base Legal</li>
            <p>El tractament de les teves dades es basa en:</p>
            <ul>
              <li>L'execució del contracte (ús del servei).</li>
              <li>Consentiment en enviaments comercials.</li>
              <li>L'interès legítim per millorar el servei.</li>
            </ul>
            <li>Compartició de Dades</li>
            <p>No compartirem la teva informació personal amb tercers, excepte en els
              casos següents:</p>
            <ul>
              <li>
                Amb proveïdors de serveis que ens ajuden a gestionar la plataforma
                (sempre sota acord de confidencialitat).
              </li>
              <li>Si la llei ho requereix.</li>
            </ul>
            <li>Conservació de les Dades</li>
            <p>
              Conservarem les teves dades mentre mantinguis el teu compte actiu o sigui
              necessari per complir amb les obligacions legals.
            </p>
            <li>Seguretat de la Informació</li>
            <p>
              Hem implementat mesures tècniques i organitzatives per protegir les teves
              dades contra accessos no autoritzats, pèrdua o destrucció.
            </p>
            <li>Els Teus Drets</li>
            <p>Tens dret a:</p>
            <ul>
              <li>Accedir, rectificar o suprimir les teves dades.</li>
              <li>Oposar-te al tractament o sol·licitar la limitació.</li>
              <li>Portabilitat de les dades.</li>
              <li>Retirar el teu consentiment en qualsevol moment.</li>
              <li>
                Pots exercir aquests drets enviant un correu a
                <a href="mailto:contact@timetrader.com">contact@timetrader.com</a>.
              </li>
            </ul>
            <li>Canvis en aquesta Política</li>
            <p>
              Ens reservem el dret de modificar aquesta Política. Publicarem qualsevol
              canvi en aquesta pàgina. Recomanem revisar-la periòdicament.
            </p>
          </ol>
        </div>

        <!-- Política de Cookies -->
        <div v-if="activeTab === 'Política de Cookies'">
          <h2>Política de Cookies</h2>
          <p class="updated">Última actualització: 27 d'abril de 2025</p>
          <p>
            A <strong>TimeTrader</strong> utilitzem cookies per oferir-te una millor experiència d'usuari. A continuació s'explica què són les cookies, com les utilitzem i com pots gestionar-les.
          </p>
          <ol>
            <li>Què són les cookies?</li>
            <p>Les cookies són petits fitxers de text que es descarreguen al teu dispositiu quan visites un lloc web. Permeten emmagatzemar i recuperar informació sobre la teva navegació.</p>
            <li>Tipus de cookies que utilitzem</li>
            <ul>
              <li>Cookies tècniques: necessàries per a la sessió d'usuari i gestió de tasques.</li>
              <li>Cookies d'anàlisi: ens ajuden a comprendre com utilitzes TimeTrader per millorar els nostres serveis (ex. Google Analytics).</li>
              <li>Cookies de preferències: recorden les teves configuracions per personalitzar la teva experiència (idioma, horari preferit, etc.).</li>
            </ul>
            <li>Com pots gestionar les cookies?</li>
            <p>Pots configurar el teu navegador per acceptar, bloquejar o eliminar les cookies:</p>
            <ul>
              <li>Configuració del navegador: pots trobar opcions per gestionar cookies a les preferències del teu navegador (Chrome, Firefox, Safari, Edge, etc.).</li>
              <li>Panell de configuració: a TimeTrader oferirem una eina perquè puguis acceptar o rebutjar cookies opcionals quan accedeixis per primera vegada.</li>
              <li>Recorda: si desactives les cookies, alguns serveis poden no funcionar correctament.</li>
            </ul>
            <li>Cookies de tercers</li>
            <p>En alguns casos utilitzem serveis de tercers que poden instal·lar les seves pròpies cookies, com ara:</p>
            <ul>
              <li>Google Analytics</li>
            </ul>
            <p>Ens assegurem que aquests tercers compleixin les normatives de privacitat vigents.</p>
            <li>Actualitzacions de la Política de Cookies</li>
            <p>Podem actualitzar aquesta Política de Cookies en qualsevol moment. Qualsevol canvi important es notificarà a través del lloc web.</p>
          </ol>
          <!-- Panell per gestionar cookies -->
          <router-link to="/cookie-settings" class="cookie-settings-link">
            Configura les meves preferències de cookies
          </router-link>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Terms',
  data() {
    return {
      tabs: ['Termes i Condicions', 'Política de Privacitat', 'Política de Cookies'],
      activeTab: 'Termes i Condicions',
      consent: { terms: false }
    };
  },
  methods: {
    onAcceptTerms() {
      localStorage.setItem('acceptedTerms', 'true');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.terms-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}

@media (min-width: 768px) {
  .terms-page {
    flex-direction: row;
  }
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

@media (max-width: 767px) {
  .main-content {
    padding: 1rem;
  }
}

h1 {
  font-family: 'Montserrat';
  font-size: 24px;
  margin-bottom: 1.5rem;
}

@media (max-width: 767px) {
  h1 {
    font-size: 1.8rem;
  }
}

.nav-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #ddd;
}

.nav-tabs button {
  flex: 1;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  font-size: 1rem;
  color: #555;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.nav-tabs button.active {
  color: #4A90E2;
  border-bottom: 2px solid #4A90E2;
  font-weight: bold;
}

.nav-tabs button:hover {
  background-color: #e9ecef;
}

@media (max-width: 767px) {
  .nav-tabs {
    flex-direction: column;
  }
  .nav-tabs button {
    width: 100%;
    text-align: left;
  }
}

section {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 767px) {
  section {
    padding: 1rem;
  }
}

h2 {
  font-family: 'Montserrat';
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
}

@media (max-width: 767px) {
  h2 {
    font-size: 1.4rem;
  }
}

.updated {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 1rem;
  text-align: center;
}

p, ul, ol {
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 1rem;
}

ul, ol {
  padding-left: 1.5rem;
}

a {
  color: #4A90E2;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Consentiment de Termes */
.terms-consent {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.terms-consent label {
  font-size: 0.9rem;
}
.terms-consent button {
  padding: 0.5rem 1rem;
  background-color: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.terms-consent button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.terms-consent button:not(:disabled):hover {
  background-color: var(--color-primary-hover);
}

/* Forçar color blau */
.terms-consent button,
.terms-consent button:hover,
.terms-consent button:focus,
.terms-consent button:active {
  background-color: #4A90E2 !important;
  color: #fff !important;
}
/* Sidebar */
:deep(.sidebar) {
  width: 100%;
  max-width: 250px;
  background: #fff;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
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

@media (max-width: 767px) {
  :deep(.sidebar) {
    max-width: 100%;
    box-shadow: none;
  }

  .breadcrumb {
    display: none;
  }
}
</style>