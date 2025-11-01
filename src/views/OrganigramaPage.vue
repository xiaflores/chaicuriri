<!-- src/views/OrganigramaPage.vue -->
<template>
  <div class="organigrama-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Autoridades de la comunidad</h1>
      </div>

      <!-- Organigrama Visual -->
      <section class="organigrama-visual">
        <div class="organigrama-container">
          <!-- Nivel 1: Máximas Autoridades -->
          <div class="nivel nivel-1">
            <h3 class="nivel-title">Autoridades comunales</h3>
            <div class="autoridades-maximas">
              <div
                v-for="autoridad in organigramaData.maximas_autoridades"
                :key="autoridad.id"
                class="autoridad-card nivel-1-card"
                @click="showDetails(autoridad)"
              >
                <div class="autoridad-foto">
                  <div class="foto-placeholder">👤</div>
                </div>
                <div class="autoridad-info">
                  <h4>{{ autoridad.cargo }}</h4>
                  <p>{{ autoridad.nombre }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Nivel 2: Subcentral -->
          <div class="nivel nivel-2">
            <h3 class="nivel-title">{{ organigramaData.subcentral?.nombre }}</h3>
            <div class="subcentral-container">
              <div class="subcentral-directorio">
                <div
                  v-for="directivo in organigramaData.subcentral?.directorio"
                  :key="directivo.id"
                  class="autoridad-card nivel-2-card"
                  @click="showDetails(directivo)"
                >
                  <div class="autoridad-foto small">
                    <div class="foto-placeholder">👤</div>
                  </div>
                  <div class="autoridad-info">
                    <h5>{{ directivo.cargo }}</h5>
                    <p>{{ directivo.nombre }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Nivel 3: Sindicatos -->
          <div class="nivel nivel-3">
            <h3 class="nivel-title">Sindicatos</h3>
            <div class="sindicatos-container">
              <div
                v-for="sindicato in organigramaData.sindicatos"
                :key="sindicato.id"
                class="sindicato-card"
                @click="showSindicatoDetails(sindicato)"
              >
                <div class="sindicato-header">
                  <h4>{{ sindicato.nombre }}</h4>
                  <p class="sector">{{ sindicato.sector_geografico }}</p>
                  <p class="familias">{{ sindicato.numero_familias }} familias</p>
                </div>

                <div class="sindicato-directorio">
                  <div
                    v-for="directivo in sindicato.directorio"
                    :key="directivo.cargo"
                    class="directivo-mini"
                  >
                    <div class="mini-foto">👤</div>
                    <div class="mini-info">
                      <span class="mini-cargo">{{ directivo.cargo.split(' ').pop() }}</span>
                      <span class="mini-nombre">{{ directivo.nombre.split(' ')[0] }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Información Detallada -->
      <section class="info-detallada">
        <div class="info-grid">
          <!-- Sistema de Elección -->
          <!-- <div class="info-card">
            <h3>🗳️ Sistema de Elección</h3>
            <div class="info-content">
              <p><strong>Modalidad:</strong> {{ organigramaData.sistema_eleccion?.modalidad }}</p>
              <p>
                <strong>Duración:</strong> {{ organigramaData.sistema_eleccion?.duracion_cargos }}
              </p>
              <p><strong>Renovación:</strong> {{ organigramaData.sistema_eleccion?.renovacion }}</p>

              <h4>Requisitos:</h4>
              <ul>
                <li
                  v-for="requisito in organigramaData.sistema_eleccion?.requisitos_generales"
                  :key="requisito"
                >
                  {{ requisito }}
                </li>
              </ul>
            </div>
          </div> -->

          <!-- Coordinación -->
          <!-- <div class="info-card">
            <h3>🤝 Coordinación</h3>
            <div class="info-content">
              <h4>Reuniones Regulares:</h4>
              <div class="reunion-item">
                <span class="reunion-tipo">Máximas Autoridades:</span>
                <span class="reunion-freq">{{
                  organigramaData.coordinacion_intersectorial?.reuniones_regulares
                    ?.maximas_autoridades
                }}</span>
              </div>
              <div class="reunion-item">
                <span class="reunion-tipo">Subcentral:</span>
                <span class="reunion-freq">{{
                  organigramaData.coordinacion_intersectorial?.reuniones_regulares?.subcentral
                }}</span>
              </div>
              <div class="reunion-item">
                <span class="reunion-tipo">Sindicatos:</span>
                <span class="reunion-freq">{{
                  organigramaData.coordinacion_intersectorial?.reuniones_regulares?.sindicatos
                }}</span>
              </div>

              <h4>Asamblea General:</h4>
              <p>
                {{ organigramaData.coordinacion_intersectorial?.asamblea_general?.frecuencia }} -
                {{ organigramaData.coordinacion_intersectorial?.asamblea_general?.toma_decisiones }}
              </p>
            </div>
          </div> -->
        </div>
      </section>

      <!-- Modal de Detalles -->
      <div v-if="selectedPerson" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeModal">✕</button>

          <div class="modal-header">
            <div class="modal-foto">
              <div class="foto-placeholder large">👤</div>
            </div>
            <div class="modal-info">
              <h2>{{ selectedPerson.cargo }}</h2>
              <h3>{{ selectedPerson.nombre }}</h3>
              <p v-if="selectedPerson.periodo" class="periodo">
                Período: {{ selectedPerson.periodo }}
              </p>
            </div>
          </div>

          <div class="modal-body">
            <div v-if="selectedPerson.responsabilidades" class="responsabilidades">
              <h4>Responsabilidades:</h4>
              <ul>
                <li v-for="resp in selectedPerson.responsabilidades" :key="resp">
                  {{ resp }}
                </li>
              </ul>
            </div>

            <div v-if="selectedPerson.contacto" class="contacto-modal">
              <h4>Contacto:</h4>
              <p v-if="selectedPerson.contacto.telefono">
                📞 {{ selectedPerson.contacto.telefono }}
              </p>
              <p v-if="selectedPerson.contacto.email">📧 {{ selectedPerson.contacto.email }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de Sindicato -->
      <div v-if="selectedSindicato" class="modal-overlay" @click="closeSindicatoModal">
        <div class="modal-content sindicato-modal" @click.stop>
          <button class="modal-close" @click="closeSindicatoModal">✕</button>

          <div class="modal-header">
            <h2>{{ selectedSindicato.nombre }}</h2>
            <p class="sindicato-descripcion">{{ selectedSindicato.descripcion }}</p>
          </div>

          <div class="modal-body">
            <div class="sindicato-info-grid">
              <div class="info-section">
                <h4>Información General</h4>
                <p><strong>Sector:</strong> {{ selectedSindicato.sector_geografico }}</p>
                <p><strong>Familias:</strong> {{ selectedSindicato.numero_familias }}</p>
              </div>

              <div class="info-section">
                <h4>Directorio</h4>
                <div class="directorio-completo">
                  <div
                    v-for="directivo in selectedSindicato.directorio"
                    :key="directivo.cargo"
                    class="directivo-item"
                  >
                    <div class="directivo-foto-small">👤</div>
                    <div class="directivo-datos">
                      <h5>{{ directivo.cargo }}</h5>
                      <p>{{ directivo.nombre }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="info-section full-width">
                <h4>Actividades Principales</h4>
                <ul>
                  <li
                    v-for="actividad in selectedSindicato.actividades_principales"
                    :key="actividad"
                  >
                    {{ actividad }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrganigramaPage',
  data() {
    return {
      organigramaData: {},
      selectedPerson: null,
      selectedSindicato: null,
      loading: false,
      error: null,
    }
  },
  async mounted() {
    await this.loadOrganigramaData()
  },
  methods: {
    async loadOrganigramaData() {
      this.loading = true
      try {
        const response = await fetch('/data/organigrama.json')
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`)
        }
        this.organigramaData = await response.json()
      } catch (error) {
        console.error('Error cargando organigrama:', error)
        this.error = error.message
        this.loadDefaultData()
      } finally {
        this.loading = false
      }
    },

    loadDefaultData() {
      this.organigramaData = {
        maximas_autoridades: [
          { id: 1, cargo: 'Alcalde Comunal', nombre: 'Juan Carlos Mamani Quispe' },
          { id: 2, cargo: 'Corregidor', nombre: 'Roberto Ticona Choque' },
        ],
        subcentral: {
          nombre: 'Subcentral Chaicuriri',
          directorio: [],
        },
        sindicatos: [],
        sistema_eleccion: {},
        coordinacion_intersectorial: {},
      }
    },

    showDetails(person) {
      this.selectedPerson = person
    },

    showSindicatoDetails(sindicato) {
      this.selectedSindicato = sindicato
    },

    closeModal() {
      this.selectedPerson = null
    },

    closeSindicatoModal() {
      this.selectedSindicato = null
    },
  },
}
</script>

<style scoped>
.organigrama-page {
  min-height: 80vh;
  padding: var(--spacing-xl) 0;
  background-color: var(--color-gris-claro);
}

.page-header {
  text-align: center;
  /* margin-bottom: var(--spacing-xl); */
}

.page-title {
  font-size: 3rem;
  color: var(--color-azul-andino);
  /* margin-bottom: var(--spacing-sm); */
  font-weight: 700;
}

.page-subtitle {
  font-size: 1.3rem;
  color: var(--color-gris);
  font-style: italic;
}

/* Organigrama Visual */
.organigrama-visual {
  margin-bottom: var(--spacing-xl);
}

.organigrama-container {
  background: var(--color-blanco);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  overflow-x: auto;
}

.nivel {
  margin-bottom: var(--spacing-xl);
  position: relative;
}

.nivel-title {
  text-align: center;
  color: var(--color-rojo-andino);
  font-size: 1.5rem;
  margin-bottom: var(--spacing-lg);
  font-weight: 600;
}

/* Nivel 1: Máximas Autoridades */
.autoridades-maximas {
  padding-top: var(--spacing-md);
  display: flex;
  justify-content: center;
  gap: var(--spacing-xl);
}

.nivel-1-card {
  background: linear-gradient(135deg, var(--color-rojo-andino), var(--color-naranja-andino));
  color: var(--color-blanco);
  min-width: 200px;
}

/* Nivel 2: Subcentral */
.subcentral-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.subcentral-directorio {
  /* padding-top: var(--spacing-lg); */
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.nivel-2-card {
  margin-top: 60px;
  background: linear-gradient(135deg, var(--color-verde-andino), var(--color-azul-andino));
  color: var(--color-blanco);
  min-width: 150px;
}

/* Nivel 3: Sindicatos */
.sindicatos-container {
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
}

.sindicato-card {
  background: linear-gradient(135deg, var(--color-amarillo-andino), var(--color-naranja-andino));
  color: var(--color-oscuro);
  min-width: 250px;
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-light);
}

.sindicato-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-medium);
}

.sindicato-header h4 {
  margin-bottom: var(--spacing-xs);
  font-size: 1.2rem;
}

.sector {
  font-style: italic;
  margin-bottom: var(--spacing-xs);
}

.familias {
  font-weight: 600;
  margin-bottom: var(--spacing-md);
}

.sindicato-directorio {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.directivo-mini {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  background: rgba(255, 255, 255, 0.3);
  padding: var(--spacing-xs);
  border-radius: var(--border-radius);
}

.mini-foto {
  width: 55px;
  height: 55px;
  background: var(--color-oscuro);
  color: var(--color-blanco);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

.mini-info {
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
}

.mini-cargo {
  font-weight: 600;
}

.mini-nombre {
  color: var(--color-gris);
}

/* Autoridad Cards Generales */
.autoridad-card {
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-light);
  position: relative;
  padding-top: calc(var(--spacing-md) + 20px);
}

.autoridad-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-medium);
}

.autoridad-foto {
  /* margin-bottom: var(--spacing-sm); */
  margin-top: -100px; /* eleva la foto por encima de la tarjeta */
  position: relative;
  z-index: 2;
}

.foto-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(17, 17, 17, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.autoridad-foto.small .foto-placeholder {
  width: 95px;
  height: 95px;
  font-size: 1.5rem;
}

.foto-placeholder.large {
  width: 100px;
  height: 100px;
  font-size: 3rem;
}

.autoridad-info h4,
.autoridad-info h5 {
  margin-bottom: var(--spacing-xs);
  font-weight: 600;
}

.autoridad-info p {
  font-size: 0.9rem;
  opacity: 0.9;
}

/* Líneas de Conexión */
.connection-line {
  position: absolute;
  background: var(--color-gris);
}

.connection-line.down {
  width: 2px;
  height: 30px;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
}

.connection-horizontal {
  height: 2px;
  background: var(--color-gris);
  width: 60%;
  margin: 0 auto var(--spacing-lg);
}

.connection-horizontal-multi {
  height: 2px;
  background: var(--color-gris);
  width: 80%;
  margin: 0 auto var(--spacing-lg);
}

/* Información Detallada */
.info-detallada {
  margin-top: var(--spacing-xl);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--spacing-lg);
}

.info-card {
  background: var(--color-blanco);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  border-left: 4px solid var(--color-verde-andino);
}

.info-card h3 {
  color: var(--color-azul-andino);
  margin-bottom: var(--spacing-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.info-content h4 {
  color: var(--color-rojo-andino);
  margin: var(--spacing-md) 0 var(--spacing-sm) 0;
}

.info-content ul {
  list-style-type: none;
  padding-left: 0;
}

.info-content li {
  padding: var(--spacing-xs) 0;
  border-bottom: 1px solid var(--color-gris-claro);
  color: var(--color-gris);
}

.reunion-item {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-xs) 0;
  border-bottom: 1px solid var(--color-gris-claro);
}

.reunion-tipo {
  font-weight: 500;
}

.reunion-freq {
  color: var(--color-verde-andino);
  font-weight: 600;
}

/* Modales */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-md);
}

.modal-content {
  background: var(--color-blanco);
  border-radius: var(--border-radius);
  max-width: 600px;
  max-height: 90vh;
  overflow: auto;
  position: relative;
  padding: var(--spacing-xl);
}

.sindicato-modal {
  max-width: 800px;
}

.modal-close {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background: rgba(0, 0, 0, 0.5);
  color: var(--color-blanco);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 1.2rem;
  z-index: 1001;
}

.modal-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-gris-claro);
}

.modal-foto {
  flex-shrink: 0;
}

.modal-info h2 {
  color: var(--color-rojo-andino);
  margin-bottom: var(--spacing-xs);
}

.modal-info h3 {
  color: var(--color-oscuro);
  margin-bottom: var(--spacing-xs);
}

.periodo {
  color: var(--color-gris);
  font-style: italic;
}

.responsabilidades ul {
  list-style-type: disc;
  padding-left: var(--spacing-md);
}

.responsabilidades li {
  margin-bottom: var(--spacing-xs);
  color: var(--color-gris);
  line-height: 1.5;
}

.contacto-modal p {
  margin-bottom: var(--spacing-xs);
  color: var(--color-oscuro);
}

.sindicato-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.info-section.full-width {
  grid-column: 1 / -1;
}

.info-section h4 {
  color: var(--color-verde-andino);
  margin-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--color-verde-andino);
  padding-bottom: var(--spacing-xs);
}

.directorio-completo {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.directivo-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  background: var(--color-gris-claro);
  border-radius: var(--border-radius);
}

.directivo-foto-small {
  width: 35px;
  height: 35px;
  background: var(--color-verde-andino);
  color: var(--color-blanco);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.directivo-datos h5 {
  margin-bottom: 2px;
  color: var(--color-oscuro);
  font-size: 0.9rem;
}

.directivo-datos p {
  color: var(--color-gris);
  font-size: 0.8rem;
  margin: 0;
}

.sindicato-descripcion {
  color: var(--color-gris);
  font-style: italic;
  margin-top: var(--spacing-xs);
}

/* Responsive */
@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }

  .autoridades-maximas {
    flex-direction: column;
    align-items: center;
  }

  .subcentral-directorio {
    padding-top: var(--spacing-lg);
    flex-direction: column;
    align-items: center;
  }

  .sindicatos-container {
    flex-direction: column;
    align-items: center;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    margin: var(--spacing-sm);
    max-height: 95vh;
  }

  .modal-header {
    flex-direction: column;
    text-align: center;
  }

  .sindicato-info-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .organigrama-container {
    padding: var(--spacing-md);
  }

  .autoridad-card {
    min-width: auto;
    width: 100%;
    max-width: 250px;
  }

  .sindicato-card {
    min-width: auto;
    width: 100%;
  }
}
</style>
