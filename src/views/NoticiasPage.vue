<!-- src/views/NewsPage.vue -->
<template>
  <div class="news-page">
    <div class="container">
      <!-- Filtros -->
      <div class="filters-section">
        <div class="filters-container">
          <!-- Filtro por Categoría -->
          <div class="filter-group">
            <label>Categoría:</label>
            <select v-model="selectedCategory" class="filter-select">
              <option value="">Todas las categorías</option>
              <option value="Convocatoria">Convocatorias</option>
              <option value="Evento">Eventos</option>
              <option value="Comunicado">Comunicadoh</option>
              <option value="solicitudes">Solicitudes</option>
            </select>
          </div>

          <!-- Filtro por Estado -->
          <div class="filter-group">
            <label>Estado:</label>
            <select v-model="selectedStatus" class="filter-select">
              <option value="">Todos los estados</option>
              <option value="vigente">Vigente</option>
              <option value="en_seguimiento">En Seguimiento</option>
              <option value="terminado">Terminado</option>
              <option value="archivado">Archivado</option>
            </select>
          </div>

          <!-- Buscador -->
          <div class="filter-group search-group">
            <label>Buscar:</label>
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Buscar noticia..."
              class="search-input"
            />
          </div>
        </div>
      </div>

      <!-- Contador de resultados -->
      <div class="results-counter">
        <p v-if="loading">⏳ Cargando noticias...</p>
        <p v-else-if="filteredNews && filteredNews.length > 0">
          {{ filteredNews.length }} noticia(s) encontrada(s)
        </p>
        <p v-else>No hay noticias disponibles</p>
      </div>

      <!-- Grid tipo Pinterest -->
      <div class="pinterest-grid" v-if="!loading && paginatedNews && paginatedNews.length > 0">
        <div
          v-for="noticia in paginatedNews"
          :key="noticia.id"
          class="news-card"
          :style="{ height: getCardHeight() + 'px' }"
          @click="openLightbox(noticia)"
        >
          <!-- Etiqueta de Estado -->
          <div class="status-badge" :class="getStatusClass(noticia.estado)">
            {{ getStatusLabel(noticia.estado) }}
          </div>

          <!-- Imagen de la noticia -->
          <div class="news-image">
            <img
              v-if="noticia.imagen"
              :src="noticia.imagen"
              :alt="noticia.titulo"
              class="news-img"
              @error="handleImageError"
            />
            <div v-else class="image-placeholder">
              <span class="doc-icon">📰</span>
              <span class="doc-preview">{{ noticia.titulo }}</span>
            </div>
          </div>

          <!-- Información de la noticia -->
          <div class="news-info">
            <h3 class="news-title">{{ noticia.titulo }}</h3>
            <p class="news-date">{{ formatDate(noticia.fecha) }}</p>

            <!-- Información adicional según categoría -->
            <div class="additional-info">
              <div v-if="noticia.institucion_destino" class="info-item">
                <strong>Destino:</strong> {{ noticia.institucion_destino }}
              </div>
              <div v-if="noticia.fecha_recepcion" class="info-item">
                <strong>Recepción:</strong> {{ formatDate(noticia.fecha_recepcion) }}
              </div>
            </div>

            <div class="news-category">
              {{ getCategoryLabel(noticia.categoria) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Botón Cargar Más -->
      <div v-if="hasMoreNews" class="load-more-section">
        <button @click="loadMore" class="load-more-btn" :disabled="loading">
          <span v-if="loading">Cargando...</span>
          <span v-else>Cargar Más Noticias</span>
        </button>
      </div>

      <!-- Lightbox para vista ampliada -->
      <div v-if="lightboxOpen" class="lightbox-overlay" @click="closeLightbox">
        <div class="lightbox-container" @click.stop>
          <!-- Botón cerrar -->
          <button class="lightbox-close" @click="closeLightbox">✕</button>

          <!-- Navegación -->
          <button
            class="nav-arrow nav-prev"
            @click="previousNews"
            :disabled="currentLightboxIndex <= 0"
          >
            ◀
          </button>
          <button
            class="nav-arrow nav-next"
            @click="nextNews"
            :disabled="currentLightboxIndex >= filteredNews.length - 1"
          >
            ▶
          </button>

          <!-- Contenido de la noticia -->
          <div class="lightbox-content">
            <!-- Imagen ampliada -->
            <div class="lightbox-image">
              <div class="status-badge large" :class="getStatusClass(currentNews.estado)">
                {{ getStatusLabel(currentNews.estado) }}
              </div>
              <img
                v-if="currentNews.imagen"
                :src="currentNews.imagen"
                :alt="currentNews.titulo"
                class="lightbox-img"
                @error="handleImageError"
              />
              <div v-else class="image-placeholder large">
                <span class="doc-icon large">📰</span>
                <span class="doc-preview large">{{ currentNews.titulo }}</span>
              </div>
            </div>

            <!-- Información detallada -->
            <div class="lightbox-info">
              <h2>{{ currentNews.titulo }}</h2>
              <div class="news-meta">
                <div class="meta-item">
                  <strong>Fecha:</strong> {{ formatDate(currentNews.fecha) }}
                </div>
                <div class="meta-item">
                  <strong>Categoría:</strong> {{ getCategoryLabel(currentNews.categoria) }}
                </div>
                <div class="meta-item">
                  <strong>Estado:</strong> {{ getStatusLabel(currentNews.estado) }}
                </div>
              </div>

              <div class="news-description-full">
                <h4>Descripción:</h4>
                <p>{{ currentNews.descripcion || currentNews.contenido }}</p>
              </div>

              <!-- Información específica por categoría -->
              <div v-if="currentNews.institucion_destino" class="specific-info">
                <h4>Información de Trámite:</h4>
                <p><strong>Institución:</strong> {{ currentNews.institucion_destino }}</p>
                <p v-if="currentNews.numero_documento">
                  <strong>Número:</strong> {{ currentNews.numero_documento }}
                </p>
                <p v-if="currentNews.fecha_recepcion">
                  <strong>Recepcionado:</strong> {{ formatDate(currentNews.fecha_recepcion) }}
                </p>
              </div>

              <div v-if="currentNews.autor" class="specific-info">
                <h4>Publicado por:</h4>
                <p>{{ currentNews.autor }}</p>
              </div>
            </div>
          </div>

          <!-- Indicador de posición -->
          <div class="lightbox-counter">
            {{ currentLightboxIndex + 1 }} / {{ filteredNews.length }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'

export default {
  name: 'NewsPage',
  setup() {
    // Estado reactivo
    const selectedCategory = ref('')
    const selectedStatus = ref('')
    const searchTerm = ref('')
    const currentPage = ref(1)
    const itemsPerPage = 12
    const loading = ref(false)

    // Lightbox
    const lightboxOpen = ref(false)
    const currentLightboxIndex = ref(0)

    // Datos
    const newsData = ref([])

    // Cargar datos de noticias
    const loadNewsData = async () => {
      loading.value = true
      try {
        // En Vite, los archivos en public se acceden directamente sin /public
        console.log('🔍 Intentando cargar noticias...')
        const response = await fetch('/data/noticias.json')

        console.log('📡 Response status:', response.status)
        console.log('📡 Response ok:', response.ok)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('✅ Noticias cargadas exitosamente:', data)
        console.log('📊 Total de noticias:', data.length)
        newsData.value = data
      } catch (error) {
        console.error('❌ Error cargando noticias:', error)
        console.error('❌ Tipo de error:', error.name)
        console.error('❌ Mensaje:', error.message)

        // Datos de respaldo para debug
        newsData.value = [
          {
            id: 1,
            titulo: 'Solicitud de Tractor para la Comunidad',
            categoria: 'solicitudes',
            fecha: '2025-09-03',
            descripcion:
              "Solicitud formal enviada al Gobierno Autónomo Municipal de Caripuyo de un tractor para el 'kurpeo' o arado de las parcelas de los comunarios de Chaicuriri. Todos los comunarios deben estar presentes en la comunidad el día sábado 25 de octubre para el Kurpeo.",
            estado: 'en_seguimiento',
            imagen: '/images/archivo/Solicitud-tractor.jpg',
            institucion_destino: 'GAM Caripuyo',
            fecha_recepcion: '2025-09-03',
          },
        ]
        console.log('📋 Usando datos de respaldo temporales')
      } finally {
        loading.value = false
      }
    }

    // Computed - Noticias filtradas
    const filteredNews = computed(() => {
      let filtered = newsData.value

      // Filtrar por categoría
      if (selectedCategory.value) {
        filtered = filtered.filter((news) => news.categoria === selectedCategory.value)
      }

      // Filtrar por estado
      if (selectedStatus.value) {
        filtered = filtered.filter((news) => news.estado === selectedStatus.value)
      }

      // Filtrar por búsqueda
      if (searchTerm.value) {
        const term = searchTerm.value.toLowerCase()
        filtered = filtered.filter(
          (news) =>
            news.titulo.toLowerCase().includes(term) ||
            (news.descripcion && news.descripcion.toLowerCase().includes(term)) ||
            (news.contenido && news.contenido.toLowerCase().includes(term)),
        )
      }

      // Ordenar por fecha (más recientes primero)
      return filtered.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    })

    // Computed - Noticias paginadas
    const paginatedNews = computed(() => {
      if (!filteredNews.value || !Array.isArray(filteredNews.value)) {
        return []
      }
      return filteredNews.value.slice(0, currentPage.value * itemsPerPage)
    })

    // Computed - Hay más noticias
    const hasMoreNews = computed(() => {
      if (!paginatedNews.value || !filteredNews.value) {
        return false
      }
      return paginatedNews.value.length < filteredNews.value.length
    })

    // Computed - Noticia actual en lightbox
    const currentNews = computed(() => {
      if (!filteredNews.value || !filteredNews.value[currentLightboxIndex.value]) {
        return {}
      }
      return filteredNews.value[currentLightboxIndex.value]
    })

    // Métodos
    const formatDate = (dateString) => {
      if (!dateString) return 'Fecha no disponible'
      const date = new Date(dateString)
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }

    const getStatusClass = (estado) => {
      const classes = {
        vigente: 'status-vigente',
        en_seguimiento: 'status-seguimiento',
        terminado: 'status-terminado',
        archivado: 'status-archivado',
      }
      return classes[estado] || 'status-default'
    }

    const getStatusLabel = (estado) => {
      const labels = {
        vigente: 'Vigente',
        en_seguimiento: 'En Seguimiento',
        terminado: 'Terminado',
        archivado: 'Archivado',
      }
      return labels[estado] || estado
    }

    const getCategoryLabel = (categoria) => {
      const labels = {
        Convocatoria: 'Convocatoria',
        Evento: 'Evento',
        Desarrollo: 'Desarrollo',
        Infraestructura: 'Infraestructura',
        solicitudes: 'Solicitud',
      }
      return labels[categoria] || categoria
    }

    const getExcerpt = (content) => {
      if (!content) return 'Sin descripción disponible'
      return content.length > 120 ? content.substring(0, 120) + '...' : content
    }

    const getCardHeight = () => {
      // Altura variable para efecto Pinterest
      return Math.floor(Math.random() * 150) + 400
    }

    const loadMore = () => {
      currentPage.value++
    }

    const handleImageError = (event) => {
      console.error('Error cargando imagen:', event.target.src)
      event.target.style.display = 'none'
    }

    const openLightbox = (noticia) => {
      currentLightboxIndex.value = filteredNews.value.findIndex((news) => news.id === noticia.id)
      lightboxOpen.value = true
      document.body.style.overflow = 'hidden'
    }

    const closeLightbox = () => {
      lightboxOpen.value = false
      document.body.style.overflow = 'auto'
    }

    const nextNews = () => {
      if (!filteredNews.value) return
      if (currentLightboxIndex.value < filteredNews.value.length - 1) {
        currentLightboxIndex.value++
      }
    }

    const previousNews = () => {
      if (currentLightboxIndex.value > 0) {
        currentLightboxIndex.value--
      }
    }

    // Navegación con teclado
    const handleKeydown = (event) => {
      if (!lightboxOpen.value) return

      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowLeft') previousNews()
      if (event.key === 'ArrowRight') nextNews()
    }

    onMounted(() => {
      loadNewsData()
      document.addEventListener('keydown', handleKeydown)
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeydown)
    })

    return {
      selectedCategory,
      selectedStatus,
      searchTerm,
      loading,
      lightboxOpen,
      currentLightboxIndex,
      filteredNews,
      paginatedNews,
      hasMoreNews,
      currentNews,
      formatDate,
      getStatusClass,
      getStatusLabel,
      getCategoryLabel,
      getExcerpt,
      getCardHeight,
      loadMore,
      handleImageError,
      openLightbox,
      closeLightbox,
      nextNews,
      previousNews,
    }
  },
}
</script>

<style scoped>
.news-page {
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
  margin-bottom: var(--spacing-sm);
  font-weight: 700;
}

.page-subtitle {
  font-size: 1.3rem;
  color: var(--color-gris);
  font-style: italic;
}

/* Filtros */
.filters-section {
  margin-bottom: var(--spacing-lg);
}

.filters-container {
  background: var(--color-blanco);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
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

.filter-select,
.search-input {
  padding: var(--spacing-sm);
  border: 2px solid var(--color-gris);
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  transition: border-color 0.3s ease;
}

.filter-select:focus,
.search-input:focus {
  outline: none;
  border-color: var(--color-azul-andino);
}

.results-counter {
  text-align: center;
  margin-bottom: var(--spacing-lg);
  color: var(--color-gris);
  font-weight: 500;
}

.loading-text {
  color: var(--color-azul-andino);
  font-weight: 600;
  margin-top: var(--spacing-xs);
}

.error-text {
  color: #ef4444;
  font-weight: 600;
  margin-top: var(--spacing-xs);
  background: #fee;
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
}

.error-text code {
  background: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
}

/* Grid Pinterest */
.pinterest-grid {
  display: columns;
  column-count: auto;
  column-width: 320px;
  column-gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.news-card {
  background: var(--color-blanco);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  margin-bottom: var(--spacing-lg);
  break-inside: avoid;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

.news-card:hover {
  box-shadow: var(--shadow-medium);
  transform: translateY(-3px);
}

/* Estados */
.status-badge {
  position: absolute;
  top: var(--spacing-sm);
  left: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 10;
  color: var(--color-blanco);
}

.status-vigente {
  background-color: #22c55e;
}
.status-seguimiento {
  background-color: #f59e0b;
}
.status-terminado {
  background-color: #3b82f6;
}
.status-archivado {
  background-color: #6b7280;
}

.status-badge.large {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 0.9rem;
}

/* Imagen de la noticia */
.news-image {
  height: 200px;
  overflow: hidden;
}

.news-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.news-card:hover .news-img {
  transform: scale(1.05);
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--color-gris-claro), #e9ecef);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-gris);
  text-align: center;
  padding: var(--spacing-md);
}

.doc-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-sm);
}

.doc-preview {
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.3;
}

.image-placeholder.large {
  height: 400px;
}

.doc-icon.large {
  font-size: 6rem;
}

.doc-preview.large {
  font-size: 1.2rem;
}

/* Información de la noticia */
.news-info {
  padding: var(--spacing-md);
}

.news-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-oscuro);
  margin-bottom: var(--spacing-xs);
  line-height: 1.3;
}

.news-date {
  font-size: 0.85rem;
  color: var(--color-gris);
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
}

.news-description {
  font-size: 0.9rem;
  color: var(--color-gris);
  line-height: 1.4;
  margin-bottom: var(--spacing-sm);
}

.additional-info {
  margin-bottom: var(--spacing-sm);
}

.info-item {
  font-size: 0.8rem;
  color: var(--color-gris);
  margin-bottom: 2px;
}

.news-category {
  background-color: var(--color-verde-andino);
  color: var(--color-blanco);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  display: inline-block;
  text-transform: uppercase;
}

/* Botón Cargar Más */
.load-more-section {
  text-align: center;
  margin-top: var(--spacing-xl);
}

.load-more-btn {
  background-color: var(--color-azul-andino);
  color: var(--color-blanco);
  border: none;
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.load-more-btn:hover:not(:disabled) {
  background-color: #1565c0;
  transform: translateY(-2px);
}

.load-more-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Lightbox */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: var(--spacing-lg);
}

.lightbox-container {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: var(--color-blanco);
  border-radius: var(--border-radius);
  overflow: auto;
}

.lightbox-close {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background: rgba(0, 0, 0, 0.7);
  color: var(--color-blanco);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 1.2rem;
  z-index: 2001;
  transition: background-color 0.3s ease;
}

.lightbox-close:hover {
  background: rgba(0, 0, 0, 0.9);
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: var(--color-blanco);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  z-index: 2001;
  transition: all 0.3s ease;
}

.nav-arrow:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.9);
  transform: translateY(-50%) scale(1.1);
}

.nav-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-prev {
  left: var(--spacing-md);
}

.nav-next {
  right: var(--spacing-md);
}

.lightbox-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 600px;
}

.lightbox-image {
  position: relative;
  background: var(--color-gris-claro);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.lightbox-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.lightbox-info {
  padding: var(--spacing-xl);
  overflow-y: auto;
}

.lightbox-info h2 {
  color: var(--color-rojo-andino);
  font-size: 1.8rem;
  margin-bottom: var(--spacing-lg);
  line-height: 1.3;
}

.news-meta {
  display: grid;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-md);
  background: var(--color-gris-claro);
  border-radius: var(--border-radius);
}

.meta-item {
  font-size: 0.9rem;
  color: var(--color-gris);
}

.news-description-full {
  margin-bottom: var(--spacing-lg);
}

.news-description-full h4 {
  color: var(--color-verde-andino);
  margin-bottom: var(--spacing-sm);
}

.news-description-full p {
  line-height: 1.6;
  color: var(--color-gris);
}

.specific-info {
  margin-bottom: var(--spacing-lg);
}

.specific-info h4 {
  color: var(--color-azul-andino);
  margin-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--color-azul-andino);
  padding-bottom: var(--spacing-xs);
}

.specific-info p {
  margin-bottom: var(--spacing-xs);
  color: var(--color-gris);
}

.lightbox-counter {
  position: absolute;
  bottom: var(--spacing-md);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: var(--color-blanco);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: 20px;
  font-size: 0.9rem;
  z-index: 2001;
}

/* Responsive */
@media (max-width: 1024px) {
  .pinterest-grid {
    column-count: 2;
    column-width: auto;
  }

  .lightbox-content {
    grid-template-columns: 1fr;
  }

  .lightbox-image {
    min-height: 300px;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }

  .filters-container {
    grid-template-columns: 1fr;
  }

  .pinterest-grid {
    column-count: 1;
    column-width: auto;
  }

  .nav-arrow {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  .lightbox-container {
    max-width: 95vw;
    max-height: 95vh;
    margin: var(--spacing-sm);
  }

  .lightbox-info {
    padding: var(--spacing-lg);
  }
}

@media (max-width: 480px) {
  .lightbox-overlay {
    padding: var(--spacing-sm);
  }

  .lightbox-info {
    padding: var(--spacing-md);
  }

  .lightbox-info h2 {
    font-size: 1.5rem;
  }

  .nav-prev {
    left: var(--spacing-xs);
  }

  .nav-next {
    right: var(--spacing-xs);
  }
}

/* Animaciones de entrada para las tarjetas */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.news-card {
  animation: fadeInUp 0.5s ease-out;
}

/* Estados hover mejorados */
.news-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(30, 58, 138, 0.1), rgba(46, 139, 87, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.news-card:hover::before {
  opacity: 1;
}
</style>
