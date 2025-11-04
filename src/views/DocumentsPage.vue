<!-- src/views/DocumentsPage.vue -->
<template>
  <div class="documents-page">
    <div class="container">
      <!-- Información importante -->
      <div class="info-section">
        <div class="info-card">
          <div class="info-icon"><i class="bx bxs-book-content"></i></div>
          <div class="info-content">
            <h3>Estatutos y Reglamentos</h3>
            <p>Todos los documentos están disponibles para consulta de los comunarios.</p>
          </div>
        </div>
      </div>

      <!-- Filtros -->
      <div class="filters-section">
        <div class="filters-card">
          <div class="filter-group">
            <label>Buscar documento:</label>
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Buscar por título..."
              class="search-input"
            />
          </div>
          <div class="filter-group">
            <label>Ordenar por:</label>
            <select v-model="sortBy" class="sort-select">
              <option value="fecha-desc">Más recientes</option>
              <option value="fecha-asc">Más antiguos</option>
              <option value="titulo">Título A-Z</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Lista de documentos -->
      <div class="documents-section">
        <div class="documents-grid">
          <div v-for="documento in filteredDocuments" :key="documento.id" class="document-card">
            <div class="document-header">
              <div class="document-icon">
                <span class="file-icon"><i class="bx bxs-file-pdf"></i></span>
              </div>
              <div class="document-meta">
                <span class="document-date">{{ formatDate(documento.fecha) }}</span>
                <span v-if="documento.tamaño" class="document-size">{{ documento.tamaño }}</span>
              </div>
            </div>

            <div class="document-content">
              <h3 class="document-title">{{ documento.titulo }}</h3>
              <p v-if="documento.descripcion" class="document-description">
                {{ documento.descripcion }}
              </p>

              <div class="document-actions">
                <button @click="viewDocument(documento)" class="btn btn-primary">
                  <span class="btn-icon"><i class="bx bx-show"></i></span>
                  Ver Documento
                </button>
                <button @click="downloadDocument(documento)" class="btn btn-secondary">
                  <span class="btn-icon"><i class="bx bxs-download"></i></span>
                  Descargar
                </button>
              </div>
            </div>
          </div>

          <div v-if="filteredDocuments.length === 0" class="no-documents">
            <div class="no-content">
              <h3>📄 No hay documentos</h3>
              <p v-if="searchTerm">
                No se encontraron documentos que coincidan con "{{ searchTerm }}"
              </p>
              <p v-else>No hay documentos disponibles en este momento.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useContent } from '../composables/useContent'
import { ref, computed } from 'vue'

export default {
  name: 'DocumentsPage',
  setup() {
    const { documentsContent, formatDate } = useContent()

    // Estado reactivo
    const searchTerm = ref('')
    const sortBy = ref('fecha-desc')

    // Documentos filtrados y ordenados
    const filteredDocuments = computed(() => {
      let filtered = documentsContent.value || []

      // Filtrar por término de búsqueda
      if (searchTerm.value) {
        const term = searchTerm.value.toLowerCase()
        filtered = filtered.filter(
          (doc) =>
            doc.titulo.toLowerCase().includes(term) ||
            (doc.descripcion && doc.descripcion.toLowerCase().includes(term)),
        )
      }

      // Ordenar
      return filtered.sort((a, b) => {
        switch (sortBy.value) {
          case 'fecha-desc':
            return new Date(b.fecha) - new Date(a.fecha)
          case 'fecha-asc':
            return new Date(a.fecha) - new Date(b.fecha)
          case 'titulo':
            return a.titulo.localeCompare(b.titulo)
          default:
            return 0
        }
      })
    })

    // Funciones
    const viewDocument = (documento) => {
      // Simular vista de documento
      alert(`Abriendo: ${documento.titulo}\n\nAun no esta disponible`)
    }

    const downloadDocument = (documento) => {
      // Simular descarga
      alert(`Descargando: ${documento.titulo}\n\nAun no esta disponible el ${documento.tipo}.`)
    }

    return {
      documentsContent,
      searchTerm,
      sortBy,
      filteredDocuments,
      formatDate,
      viewDocument,
      downloadDocument,
    }
  },
}
</script>

<style scoped>
.documents-page {
  min-height: 80vh;
  padding: var(--spacing-xl) 0;
  background-color: var(--color-gris-claro);
}

.page-header {
  text-align: center;
}

.page-title {
  font-size: 3rem;
  color: var(--color-azul-andino);
  font-weight: 700;
}

.page-subtitle {
  font-size: 1.3rem;
  color: var(--color-gris);
  font-style: italic;
}

.info-section {
  margin-bottom: var(--spacing-sm);
}

.info-card {
  background: linear-gradient(135deg, var(--color-amarillo-andino), var(--color-naranja-andino));
  color: var(--color-blanco);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  box-shadow: var(--shadow-light);
}

.info-icon {
  font-size: 3rem;
  flex-shrink: 0;
}

.info-content h3 {
  margin-bottom: var(--spacing-sm);
  font-size: 1.3rem;
}

.filters-section {
  margin-bottom: var(--spacing-lg);
}

.filters-card {
  background: var(--color-blanco);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.filter-group label {
  font-weight: 600;
  color: var(--color-oscuro);
  font-size: 0.9rem;
}

.search-input,
.sort-select {
  padding: var(--spacing-xs) var(--spacing-sm);
  border: 1px solid var(--color-gris);
  border-radius: var(--border-radius);
  background: var(--color-blanco);
  font-size: 0.9rem;
  min-width: 200px;
}

.search-input:focus,
.sort-select:focus {
  outline: none;
  border-color: var(--color-azul-andino);
}

.documents-section {
  margin-bottom: var(--spacing-xl);
}

.documents-grid {
  display: grid;
  gap: var(--spacing-lg);
}

.document-card {
  background: var(--color-blanco);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  overflow: hidden;
  transition: all 0.3s ease;
  border-left: 4px solid var(--color-azul-andino);
}

.document-card:hover {
  box-shadow: var(--shadow-medium);
  transform: translateY(-2px);
}

.document-header {
  background: linear-gradient(135deg, var(--color-gris-claro), #f8f9fa);
  padding: var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.document-icon {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.file-icon {
  font-size: 2rem;
}

.file-type {
  background-color: var(--color-rojo-andino);
  color: var(--color-blanco);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.document-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--spacing-xs);
}

.document-date {
  color: var(--color-gris);
  font-size: 0.9rem;
}

.document-size {
  color: var(--color-gris);
  font-size: 0.8rem;
  font-weight: 500;
}

.document-content {
  padding: var(--spacing-lg);
}

.document-title {
  color: var(--color-oscuro);
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
}

.document-description {
  color: var(--color-gris);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.document-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-primary {
  background-color: var(--color-verde-andino);
  color: var(--color-blanco);
}

.btn-primary:hover {
  background-color: #256b47;
}

.btn-secondary {
  background-color: transparent;
  color: var(--color-azul-andino);
  border: 2px solid var(--color-azul-andino);
}

.btn-secondary:hover {
  background-color: var(--color-azul-andino);
  color: var(--color-blanco);
}

.btn-icon {
  font-size: 1rem;
}

.no-documents {
  grid-column: 1 / -1;
}

.no-content {
  text-align: center;
  padding: var(--spacing-xl);
  background: var(--color-blanco);
  border-radius: var(--border-radius);
  color: var(--color-gris);
}

.categories-section {
  margin-bottom: var(--spacing-xl);
}

.categories-card {
  background: var(--color-blanco);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  border-left: 4px solid var(--color-verde-andino);
}

.categories-card h3 {
  color: var(--color-verde-andino);
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.category-item {
  background-color: var(--color-gris-claro);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  text-align: center;
}

.category-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-sm);
}

.category-item h4 {
  color: var(--color-rojo-andino);
  margin-bottom: var(--spacing-sm);
}

.category-item ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item li {
  padding: var(--spacing-xs) 0;
  color: var(--color-gris);
  font-size: 0.9rem;
}

.contact-section {
  margin-bottom: var(--spacing-xl);
}

.contact-card {
  background: var(--color-blanco);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  border-left: 4px solid var(--color-amarillo-andino);
}

.contact-card h3 {
  color: var(--color-azul-andino);
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.contact-item {
  background-color: var(--color-gris-claro);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
}

.contact-item strong {
  color: var(--color-rojo-andino);
  display: block;
  margin-bottom: var(--spacing-sm);
}

.contact-item p {
  color: var(--color-gris);
  font-size: 0.9rem;
  margin-bottom: var(--spacing-xs);
}

.contact-item p:last-child {
  margin-bottom: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }

  .filters-card {
    flex-direction: column;
    align-items: stretch;
    gap: var(--spacing-md);
  }

  .search-input,
  .sort-select {
    min-width: auto;
    width: 100%;
  }

  .document-header {
    flex-direction: column;
    gap: var(--spacing-sm);
    align-items: flex-start;
  }

  .document-meta {
    align-items: flex-start;
  }

  .document-actions {
    flex-direction: column;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }

  .info-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
