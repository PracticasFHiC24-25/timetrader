<template>
  <div class="terms-page">
    <Sidebar />
    <main class="main-content">
      <h1>Termes Legals</h1>

      <div>
        <button v-for="tab in tabs" :key="tab" @click="activeTab = tab">
          {{ tab }}
        </button>
      </div>

      <div>
        <div v-if="activeTab === 'Termes i Condicions'">
          <h2>Termes i Condicions</h2>
          <p>Última actualització: 27 d'abril de 2025</p>
          <p>
            Benvingut/da a <strong>TimeTrader</strong>. Si us plau, llegeix atentament aquests Termes i Condicions d'ús abans d'utilitzar la nostra plataforma de gestió de temps. En accedir o utilitzar el nostre lloc web i serveis, acceptes quedar vinculat per aquests Termes.</p>
            
            <ol>
              <li>Acceptació dels Termes</li>
              <p>En utilitzar TimeTrader, acceptes aquests Termes i Condicions. Si no hi estàs d'acord, si us plau, no utilitzis la nostra plataforma.</p>
              <li>Descripció del Servei</li>
              <p>TimeTrader ofereix eines per gestionar tasques, horaris, calendaris i activitats personals o professionals. Ens reservem el dret de modificar o suspendre qualsevol part del servei en qualsevol moment sense previ avís.</p>

              <li>Registre i Compte d'Usuari</li>
              <p>Per accedir a certes funcionalitats, caldrà crear un compte. Ets responsable de mantenir la confidencialitat del teu compte i contrasenya. Acceptes proporcionar informació veraç, precisa i actualitzada.</p>

              <li>Ús Acceptable</li>
              <p>Acceptes utilitzar TimeTrader únicament per a propòsits lícits. Està prohibit:</p>
              
              <ul>Fer ús fraudulent o malintencionat del servei.</ul>
              <ul>Transmetre continguts il·legals, difamatoris o que vulnerin drets de tercers.</ul>
              <ul>Intentar accedir de manera no autoritzada a sistemes o dades del lloc.</ul>
              
              <li>Propietat Intel·lectual</li>
              <p>Tot el contingut de TimeTrader, incloent textos, gràfics, logotips, interfícies i programari, és propietat de TimeTrader o dels seus llicenciadors i està protegit per les lleis de propietat intel·lectual.</p>
              <li>Limitació de Responsabilitat</li>
              <p>TimeTrader no es responsabilitza de:</p>
              
              <ul>Pèrdues o danys derivats de l'ús o impossibilitat d'ús del servei.</ul>
              <ul> Errors, interrupcions o retards en el servei. Utilitzes TimeTrader sota la teva pròpia responsabilitat.</ul>
              
              <li>Modificacions dels Termes</li>
              <p>Ens reservem el dret de modificar aquests Termes en qualsevol moment. Les modificacions entraran en vigor una vegada publicades a la pàgina web. L'ús continuat de TimeTrader després d'aquests canvis implica l'acceptació dels nous Termes.</p>
        
              <li>Cancel·lació</li>
              <p>Pots cancel·lar el teu compte en qualsevol moment des de la configuració del teu perfil. Ens reservem el dret de suspendre o cancel·lar comptes que incompleixin aquests Termes.
              Aquests Termes es regeixen per la legislació vigent a Catalunya.</p>

              <li>Contacte</li>
              <p>Si tens dubtes sobre aquests Termes i Condicions, pots 
              <a href="mailto:contact@timetrader.com">contactar-nos.</a>
              </p>
            </ol>
        </div>

        <div v-if="activeTab === 'Política de Privacitat'">
          <h2>Política de Privacitat</h2>
          <p>Última actualització: 27 d'abril de 2025</p>
          <p>
            A <strong>TimeTrader</strong> respectem la teva privacitat i ens comprometem a protegir la informació personal que comparteixes amb nosaltres. Aquesta Política de Privacitat explica com recopilem, utilitzem i protegim les teves dades.</p>           
            <ol>
              <li>Responsable del Tractament</li>
              <p>El responsable de les dades és TimeTrader. Pots contactar-nos a través de: <a href="mailto:contact@timetrader.com">TimeTrader</a></p>
              <li>Informació que Recollim</li>
              <p>Podem recopilar les següents dades:</p>
              
              <ul>Informació de registre: nom, adreça electrònica, contrasenya.</ul>
              <ul>Informació d'ús: tasques creades, horaris, preferències.</ul>
              <ul>Informació tècnica: adreça IP, navegador, dispositiu i dades de connexió.</ul>
              
              <li>Finalitats del Tractament</li>
              <p>Utilitzem les teves dades per a: </p>
              
              <ul>Oferir i millorar els nostres serveis.</ul>
              <ul>Gestionar el teu compte i oferir suport tècnic.</ul>
              <ul>Enviar-te comunicacions relacionades amb el servei (actualitzacions, canvis, etc.).</ul>
              <ul>Analitzar l'ús de la plataforma per millorar l'experiència de l'usuari.</ul>

              <li>Base Legal</li>
              <p>El tractament de les teves dades es basa en:</p>
                
              <ul>L'execució del contracte (ús del servei).</ul>
              <ul>El teu consentiment (en determinats casos, com enviament de comunicacions comercials).</ul>
              <ul>L'interès legítim per millorar el servei.</ul>

              <li>Compartició de Dades</li>
              <p>No compartirem la teva informació personal amb tercers, excepte en els casos següents:</p>
              
              <ul>Amb proveïdors de serveis que ens ajuden a gestionar la plataforma (sempre sota acord de confidencialitat).</ul>
              <ul>Si la llei ho requereix.</ul>
              
              <li>Conservació de les Dades</li>
              <p>Conservarem les teves dades mentre mantinguis el teu compte actiu o sigui necessari per complir amb les
                obligacions legals.</p>

              <ul>Pèrdues o danys derivats de l'ús o impossibilitat d'ús del servei.</ul>
              <ul>Errors, interrupcions o retards en el servei. Utilitzes TimeTrader sota la teva pròpia responsabilitat.</ul>
              
              <li>Seguretat de la Informació</li>
              <p>Hem implementat mesures tècniques i organitzatives per protegir les teves dades contra accessos no
                autoritzats, pèrdua o destrucció.</p>
        
              <li> Els Teus Drets</li>
              <p>Tens dret a:</p>
              
              <ul>Accedir, rectificar o suprimir les teves dades personals.</ul>
              <ul>Oposar-te al tractament o sol·licitar-ne la limitació.</ul>
              <ul>Sol·licitar la portabilitat de les dades.</ul>
              <ul>Retirar el teu consentiment en qualsevol moment.</ul>
              <ul>Pots exercir aquests drets <a href="mailto:contact@timetrader.com">contactant-nos.</a></ul>
              
              <li>Canvis en aquesta Política</li>
              <p>Ens reservem el dret de modificar aquesta Política de Privacitat. Publicarem qualsevol canvi en aquesta
                pàgina. Recomanem revisar-la periòdicament.
              </p>
            </ol>
        </div>

        <div v-if="activeTab === 'Política de Cookies'">
          <h2>Política de Cookies</h2>
          <p>Última actualització: 27 d'abril de 2025</p>
          <p>A <strong>TimeTrader</strong> utilitzem cookies per oferir-te una millor experiència d'usuari. A continuació t'expliquem què
          són les cookies, com les utilitzem i com pots gestionar-les.</p>
          <ol>
            <li>Què són les cookies?</li>
            <p>Les cookies són petits fitxers de text que es descarreguen al teu dispositiu quan visites un lloc web.
              Permeten emmagatzemar i recuperar informació sobre la teva navegació.</p>
            <li>Tipus de cookies que utilitzem</li>
            
            <ul>Cookies tècniques: necessàries per al funcionament correcte del lloc web (ex. inici de sessió, gestió de
              tasques).</ul>
            <ul>Cookies d'anàlisi: ens ajuden a comprendre com utilitzes TimeTrader per millorar els nostres serveis (ex.
              Google Analytics).</ul>
            <ul>Cookies de preferències: recorden les teves configuracions per personalitzar la teva experiència (idioma,
              horari preferit, etc.).</ul>
            
            <li>Com pots gestionar les cookies?</li>
            
            <p>Pots configurar el teu navegador per acceptar, bloquejar o eliminar les cookies:</p>
            
            <ul>Configuració del navegador: pots trobar opcions per gestionar cookies a les preferències del teu navegador
              (Chrome, Firefox, Safari, Edge, etc.).</ul>
            <ul>Panell de configuració: a TimeTrader oferirem una eina perquè puguis acceptar o rebutjar cookies opcionals
                quan accedeixis per primera vegada.</ul>
            <ul>Recorda: si desactives les cookies, alguns serveis poden no funcionar correctament.</ul>
            
            <li>Cookies de tercers</li>
            <p>En alguns casos utilitzem serveis de tercers que poden instal·lar les seves pròpies cookies, com ara:</p>
            
            <ul>Google Analytics</ul>
            <p>Ens assegurem que aquests tercers compleixin les normatives de privacitat vigents.</p>
            <li>Actualitzacions de la Política de Cookies</li>
            <p>Podem actualitzar aquesta Política de Cookies en qualsevol moment. Qualsevol canvi important es notificarà a
              través del lloc web.</p>
        </ol>
        </div>
      </div>
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
        };
      },
    };
  </script>
