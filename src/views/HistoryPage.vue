<!-- src/views/HistoryPage.vue -->
<template>
  <div class="history-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Historia y Cultura</h1>
      </div>

      <div class="content-grid">
        <!-- Historia principal -->
        <!-- <section class="history-section">
          <div class="section-card">
            <h2 class="section-title">
              <span class="title-icon">📚</span>
              {{ historyContent.titulo || 'Historia de Chaicuriri' }}
            </h2>
            <div class="history-content">
              <p class="history-text">
                {{ historyContent.resena_historica || 'Información de historia próximamente...' }}
              </p>

              <div v-if="historyContent.fundacion" class="foundation-info">
                <h3>Fundación</h3>
                <p><strong>Fecha:</strong> {{ historyContent.fundacion.fecha }}</p>
                <p><strong>Contexto:</strong> {{ historyContent.fundacion.contexto }}</p>
              </div>
            </div>
          </div>
        </section> -->

        <!-- Símbolos culturales -->
        <!-- <section class="symbols-section">
          <div class="section-card">
            <h2 class="section-title">
              <span class="title-icon">🎭</span>
              Símbolos Culturales
            </h2>
            <div class="symbols-grid">
              <div
                v-for="simbolo in historyContent.simbolos_culturales"
                :key="simbolo.nombre"
                class="symbol-card"
              >
                <h4>{{ simbolo.nombre }}</h4>
                <p class="symbol-description">{{ simbolo.descripcion }}</p>
                <p class="symbol-meaning">
                  <strong>Significado:</strong> {{ simbolo.significado }}
                </p>
              </div>

              <div v-if="!historyContent.simbolos_culturales?.length" class="no-content">
                <p>Información de símbolos culturales próximamente...</p>
              </div>
            </div>
          </div>
        </section> -->

        <!-- Fiestas tradicionales -->
        <!-- <section class="festivities-section">
          <div class="section-card">
            <h2 class="section-title">
              <span class="title-icon">🎉</span>
              Fiestas y Celebraciones
            </h2>
            <div class="festivities-list">
              <div
                v-for="fiesta in historyContent.fiestas"
                :key="fiesta.nombre"
                class="festivity-card"
              >
                <div class="festivity-header">
                  <h4>{{ fiesta.nombre }}</h4>
                  <span class="festivity-date">{{ fiesta.fecha }}</span>
                </div>
                <p class="festivity-description">{{ fiesta.descripcion }}</p>
              </div>

              <div v-if="!historyContent.fiestas?.length" class="no-content">
                <p>Información de fiestas tradicionales próximamente...</p>
              </div>
            </div>
          </div>
        </section> -->

        <!-- Danzas -->
        <!-- <section class="dances-section">
          <div class="section-card">
            <h2 class="section-title">
              <span class="title-icon">💃</span>
              Danzas Tradicionales
            </h2>
            <div class="dances-list">
              <div v-for="danza in historyContent.danzas" :key="danza.nombre" class="dance-card">
                <h4>{{ danza.nombre }}</h4>
                <p class="dance-description">{{ danza.descripcion }}</p>
                <div v-if="danza.instrumentos?.length" class="dance-instruments">
                  <strong>Instrumentos:</strong> {{ danza.instrumentos.join(', ') }}
                </div>
              </div>

              <div v-if="!historyContent.danzas?.length" class="no-content">
                <p>Información de danzas tradicionales próximamente...</p>
              </div>
            </div>
          </div>
        </section> -->
      </div>
    </div>
  </div>
</template>

<script>
import { useContent } from '../composables/useContent'

export default {
  name: 'HistoryPage',
  setup() {
    const { historyContent, loading, error } = useContent()

    return {
      historyContent,
      loading,
      error,
    }
  },
}
</script>

<style scoped>
.history-page {
  min-height: 80vh;
  padding: var(--spacing-xl) 0;
  background-color: var(--color-gris-claro);
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.page-title {
  font-size: 3rem;
  color: var(--color-rojo-andino);
  margin-bottom: var(--spacing-sm);
  font-weight: 700;
}

.page-subtitle {
  font-size: 1.3rem;
  color: var(--color-gris);
  font-style: italic;
}

.content-grid {
  display: grid;
  gap: var(--spacing-lg);
}

.section-card {
  background: var(--color-blanco);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  border-left: 4px solid var(--color-amarillo-andino);
}

.section-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-verde-andino);
  font-size: 1.8rem;
  margin-bottom: var(--spacing-lg);
  font-weight: 600;
}

.title-icon {
  font-size: 2rem;
}

.history-text {
  font-size: 1.1rem;
  line-height: 1.8;
  text-align: justify;
  margin-bottom: var(--spacing-lg);
}

.foundation-info {
  background-color: var(--color-gris-claro);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  border-left: 3px solid var(--color-azul-andino);
}

.foundation-info h3 {
  color: var(--color-azul-andino);
  margin-bottom: var(--spacing-sm);
}

.symbols-grid {
  display: grid;
  gap: var(--spacing-md);
}

.symbol-card {
  background-color: var(--color-gris-claro);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  border-left: 3px solid var(--color-rojo-andino);
}

.symbol-card h4 {
  color: var(--color-rojo-andino);
  margin-bottom: var(--spacing-xs);
}

.symbol-description {
  margin-bottom: var(--spacing-xs);
}

.symbol-meaning {
  font-style: italic;
  color: var(--color-gris);
}

.festivities-list,
.dances-list {
  display: grid;
  gap: var(--spacing-md);
}

.festivity-card,
.dance-card {
  background-color: var(--color-gris-claro);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  border-left: 3px solid var(--color-verde-andino);
}

.festivity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xs);
}

.festivity-header h4,
.dance-card h4 {
  color: var(--color-verde-andino);
  margin: 0;
}

.festivity-date {
  background-color: var(--color-naranja-andino);
  color: var(--color-blanco);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
}

.festivity-description,
.dance-description {
  margin: var(--spacing-xs) 0;
}

.dance-instruments {
  margin-top: var(--spacing-xs);
  font-size: 0.9rem;
  color: var(--color-gris);
}

.no-content {
  text-align: center;
  color: var(--color-gris);
  font-style: italic;
  padding: var(--spacing-lg);
}

/* Responsive */
@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }

  .page-subtitle {
    font-size: 1.1rem;
  }

  .section-card {
    padding: var(--spacing-lg);
  }

  .festivity-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }
}
</style>
