<!-- src/views/GalleryPage.vue -->
<template>
  <div class="gallery-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Galería Fotográfica</h1>
      </div>

      <!-- Filtros por categoría -->
      <div class="filters-section">
        <div class="filters-card">
          <h3>Filtrar por categoría:</h3>
          <div class="filter-buttons">
            <button
              @click="selectedCategory = ''"
              :class="{ active: selectedCategory === '' }"
              class="filter-btn"
            >
              Todas
            </button>
            <button
              @click="selectedCategory = 'celebraciones'"
              :class="{ active: selectedCategory === 'celebraciones' }"
              class="filter-btn"
            >
              Celebraciones
            </button>
            <button
              @click="selectedCategory = 'trabajos'"
              :class="{ active: selectedCategory === 'trabajos' }"
              class="filter-btn"
            >
              Trabajos Comunales
            </button>
            <button
              @click="selectedCategory = 'paisajes'"
              :class="{ active: selectedCategory === 'paisajes' }"
              class="filter-btn"
            >
              Paisajes
            </button>
          </div>
        </div>
      </div>

      <!-- Galería de imágenes -->
      <div class="gallery-section">
        <div class="gallery-grid">
          <div
            v-for="item in filteredGallery"
            :key="item.id"
            class="gallery-item"
            @click="openModal(item)"
          >
            <div class="image-container">
              <img
                :src="getImageUrl(item.imagen)"
                :alt="item.titulo || 'Imagen de la galería'"
                class="gallery-thumb"
                loading="lazy"
                @error="onImageError"
              />
              <div class="image-overlay">
                <div class="overlay-content"></div>
              </div>
            </div>
          </div>

          <div v-if="filteredGallery.length === 0" class="no-images">
            <div class="no-content">
              <h3>📸 No hay imágenes</h3>
              <p>No se encontraron imágenes en esta categoría.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal para vista detallada -->
      <div v-if="selectedImage" class="modal-overlay" @click="closeModal">
        <div
          class="modal-content"
          @click.stop
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
        >
          <!-- Navegación anterior/siguiente -->
          <button class="modal-nav prev" @click.stop="prevImage" aria-label="Anterior">‹</button>
          <button class="modal-nav next" @click.stop="nextImage" aria-label="Siguiente">›</button>
          <button class="modal-close" @click="closeModal">✕</button>

          <div class="modal-image">
            <img
              :src="getImageUrl(selectedImage.imagen)"
              :alt="selectedImage.titulo || 'Imagen detallada'"
              class="modal-img"
              @error="onImageError"
            />
          </div>

          <div class="modal-info">
            <div class="modal-header-row">
              <h2 class="modal-title">{{ selectedImage.titulo }}</h2>
              <div class="modal-actions">
                <button class="modal-share" @click="shareImage(selectedImage)">Compartir</button>
              </div>
            </div>
            <p class="modal-description">{{ selectedImage.descripcion }}</p>
            <div class="modal-meta">
              <span class="modal-category" :class="getCategoryClass(selectedImage.categoria)">
                {{ getCategoryName(selectedImage.categoria) }}
              </span>
              <span v-if="selectedImage.fecha" class="modal-date">
                {{ formatDate(selectedImage.fecha) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Estadísticas -->
      <!-- <div class="stats-section">
        <div class="stats-card">
          <h3>📊 Estadísticas de la Galería</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-number">{{ galleryContent.length }}</span>
              <span class="stat-label">Total de imágenes</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ getGalleryByCategory('celebraciones').length }}</span>
              <span class="stat-label">Celebraciones</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ getGalleryByCategory('trabajos').length }}</span>
              <span class="stat-label">Trabajos</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ getGalleryByCategory('paisajes').length }}</span>
              <span class="stat-label">Paisajes</span>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { useContent } from '../composables/useContent'
import { ref, computed, watch, onBeforeUnmount } from 'vue'

export default {
  name: 'GalleryPage',
  setup() {
    const { galleryContent, formatDate, getGalleryByCategory } = useContent()

    // Estado reactivo
    const selectedCategory = ref('')
    const selectedImage = ref(null)

    // Galería filtrada
    const filteredGallery = computed(() => {
      if (!selectedCategory.value) {
        return galleryContent.value || []
      }
      return getGalleryByCategory(selectedCategory.value)
    })
    const getImageUrl = (imagen) => {
      if (!imagen) return '/images/gallery/placeholder.jpg' // añade un placeholder opcional
      if (imagen.startsWith('/')) return imagen
      if (imagen.startsWith('http')) return imagen
      return `/images/gallery/${imagen}`
    }

    // Fallback si la imagen no carga
    const onImageError = (ev) => {
      ev.target.src = '/images/gallery/placeholder.jpg'
    }

    // Funciones auxiliares
    const getCategoryName = (category) => {
      const names = {
        celebraciones: 'Celebraciones',
        trabajos: 'Trabajos Comunales',
        paisajes: 'Paisajes',
      }
      return names[category] || category
    }

    const getCategoryClass = (category) => {
      const classes = {
        celebraciones: 'category-celebrations',
        trabajos: 'category-work',
        paisajes: 'category-landscapes',
      }
      return classes[category] || 'category-default'
    }

    // const openModal = (item) => {
    //   selectedImage.value = item
    // }

    // const closeModal = () => {
    //   selectedImage.value = null
    // }
    // Navegación entre imágenes
    const getCurrentIndex = () => {
      const list = filteredGallery.value || []
      if (!selectedImage.value) return -1
      return list.findIndex((i) => i.id === selectedImage.value.id)
    }

    const prevImage = () => {
      const list = filteredGallery.value || []
      if (!list.length) return
      const idx = getCurrentIndex()
      if (idx === -1) return
      const newIdx = idx > 0 ? idx - 1 : list.length - 1 // wrap
      selectedImage.value = list[newIdx]
    }

    const nextImage = () => {
      const list = filteredGallery.value || []
      if (!list.length) return
      const idx = getCurrentIndex()
      if (idx === -1) return
      const newIdx = idx < list.length - 1 ? idx + 1 : 0 // wrap
      selectedImage.value = list[newIdx]
    }

    // Swipe touch handling
    const touchStartX = ref(0)
    const touchDeltaX = ref(0)
    const SWIPE_THRESHOLD = 60

    const onTouchStart = (e) => {
      touchStartX.value = e.touches[0].clientX
      touchDeltaX.value = 0
    }
    const onTouchMove = (e) => {
      touchDeltaX.value = e.touches[0].clientX - touchStartX.value
    }
    const onTouchEnd = () => {
      const dx = touchDeltaX.value
      if (Math.abs(dx) > SWIPE_THRESHOLD) {
        if (dx < 0) nextImage()
        else prevImage()
      }
      touchStartX.value = 0
      touchDeltaX.value = 0
    }

    // Teclas de navegación y escape
    const onKeyDown = (e) => {
      if (!selectedImage.value) return
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'Escape') closeModal()
    }

    // Añadir/remover listener según modal abierto
    watch(
      () => selectedImage.value,
      (val) => {
        if (val) window.addEventListener('keydown', onKeyDown)
        else window.removeEventListener('keydown', onKeyDown)
      },
    )
    onBeforeUnmount(() => {
      window.removeEventListener('keydown', onKeyDown)
    })

    const openModal = (item) => {
      selectedImage.value = item
    }

    const closeModal = () => {
      selectedImage.value = null
    }
    // Función compartir (Web Share API + fallback copia al portapapeles)
    const shareImage = async (item) => {
      if (!item) return
      const imagePath = item.imagen || ''
      const url = imagePath.startsWith('http') ? imagePath : `${location.origin}${imagePath}`
      const title = item.titulo || 'Imagen'
      const text = item.descripcion || ''

      if (navigator.share) {
        try {
          await navigator.share({ title, text, url })
          return
        } catch {
          // usuario canceló o no se completó, caer al fallback
        }
      }

      // Fallback: copiar enlace al portapapeles
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(url)
        } else {
          const ta = document.createElement('textarea')
          ta.value = url
          document.body.appendChild(ta)
          ta.select()
          document.execCommand('copy')
          document.body.removeChild(ta)
        }
        alert('Enlace copiado al portapapeles')
      } catch {
        alert('No se pudo compartir ni copiar el enlace')
      }
    }

    return {
      galleryContent,
      selectedCategory,
      selectedImage,
      filteredGallery,
      formatDate,
      getGalleryByCategory,
      getCategoryName,
      getCategoryClass,
      openModal,
      closeModal,
      shareImage,
      getImageUrl,
      onImageError,
      // new exports
      prevImage,
      nextImage,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    }
  },
}
</script>

<style scoped>
.gallery-page {
  min-height: 80vh;
  padding: var(--spacing-xl) 0;
  background-color: var(--color-gris-claro);
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-sm);
}

.page-title {
  font-size: 3rem;
  color: var(--color-verde-andino);
  margin-bottom: var(--spacing-sm);
  font-weight: 700;
}

.page-subtitle {
  font-size: 1.3rem;
  color: var(--color-gris);
  font-style: italic;
}

.filters-section {
  margin-bottom: var(--spacing-md);
}

.filters-card {
  background: var(--color-blanco);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  text-align: center;
}

.filters-card h3 {
  color: var(--color-oscuro);
  margin-bottom: var(--spacing-md);
}

.filter-buttons {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.filter-btn {
  padding: var(--spacing-xs) var(--spacing-sm);
  border: 2px solid var(--color-gris);
  background: var(--color-blanco);
  color: var(--color-oscuro);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.filter-btn:hover {
  border-color: var(--color-verde-andino);
  color: var(--color-verde-andino);
}

.filter-btn.active {
  background: var(--color-verde-andino);
  border-color: var(--color-verde-andino);
  color: var(--color-blanco);
}

.gallery-section {
  margin-bottom: var(--spacing-xl);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.gallery-item {
  background: var(--color-blanco);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-light);
  transition: all 0.3s ease;
  cursor: pointer;
}

.gallery-item:hover {
  box-shadow: var(--shadow-medium);
  transform: translateY(-5px);
}
.gallery-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}
.gallery-item:hover .gallery-thumb {
  transform: scale(1.03);
}

.modal-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  background: #f5f6f8;
  display: block;
}
.modal-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.45);
  color: var(--color-blanco);
  border: none;
  width: 46px;
  height: 64px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1002;
  transition: background 0.18s ease;
}
.modal-nav:hover {
  background: rgba(0, 0, 0, 0.6);
}
.modal-nav.prev {
  left: 12px;
}
.modal-nav.next {
  right: 12px;
}
s .image-container {
  position: relative;
  height: 250px;
  overflow: hidden;
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
}

.placeholder-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-sm);
}

.placeholder-text {
  font-weight: 600;
  text-align: center;
  padding: 0 var(--spacing-sm);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .image-overlay {
  opacity: 1;
}

.overlay-content {
  text-align: center;
  color: var(--color-blanco);
  padding: var(--spacing-md);
}

.image-title {
  font-size: 1.2rem;
  margin-bottom: var(--spacing-xs);
}

.image-category {
  opacity: 0.8;
  margin-bottom: var(--spacing-xs);
}

.image-date {
  font-size: 0.9rem;
  opacity: 0.7;
}

.item-info {
  padding: var(--spacing-md);
}

.item-info h4 {
  color: var(--color-oscuro);
  margin-bottom: var(--spacing-xs);
  font-size: 1.1rem;
}

.item-description {
  color: var(--color-gris);
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: var(--spacing-sm);
}

.item-category {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-blanco);
}

.category-celebrations {
  background-color: var(--color-rojo-andino);
}
.category-work {
  background-color: var(--color-azul-andino);
}
.category-landscapes {
  background-color: var(--color-verde-andino);
}
.category-default {
  background-color: var(--color-gris);
}

.no-images {
  grid-column: 1 / -1;
}

.no-content {
  text-align: center;
  padding: var(--spacing-xl);
  background: var(--color-blanco);
  border-radius: var(--border-radius);
  color: var(--color-gris);
}

/* Modal */
.modal-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.modal-title {
  margin: 0;
  font-size: 1.4rem;
  color: var(--color-oscuro);
  font-weight: 700;
}
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
  max-width: 800px;
  max-height: 90vh;
  overflow: auto;
  position: relative;
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

.modal-image {
  height: 400px;
}

.modal-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--color-gris-claro), #e9ecef);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-gris);
}

.modal-icon {
  font-size: 6rem;
  margin-bottom: var(--spacing-md);
}

.modal-info {
  padding: var(--spacing-xs);
}

.modal-info h2 {
  color: var(--color-oscuro);
  margin-bottom: var(--spacing-sm);
}

.modal-description {
  color: var(--color-gris);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.modal-meta {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.modal-category {
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-blanco);
}

.modal-date {
  color: var(--color-gris);
  font-size: 0.9rem;
}

.modal-actions {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: flex-end;
  margin-bottom: var(--spacing-sm);
}

.modal-share {
  background: var(--color-verde-andino);
  color: var(--color-blanco);
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.2s ease;
}

.modal-share:hover {
  opacity: 0.9;
}

.stats-section {
  margin-bottom: var(--spacing-xl);
}

.stats-card {
  background: var(--color-blanco);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  border-left: 4px solid var(--color-amarillo-andino);
}

.stats-card h3 {
  color: var(--color-verde-andino);
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--spacing-md);
}

.stat-item {
  text-align: center;
  background-color: var(--color-gris-claro);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-rojo-andino);
}

.stat-label {
  display: block;
  font-size: 0.9rem;
  color: var(--color-gris);
  margin-top: var(--spacing-xs);
}

/* Responsive */
@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }

  .filter-buttons {
    flex-direction: column;
    align-items: center;
  }

  .filter-btn {
    width: 200px;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    margin: var(--spacing-sm);
    max-height: 95vh;
  }

  .modal-info {
    padding: var(--spacing-lg);
  }

  .modal-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  .modal-header-row {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }
  .modal-title {
    font-size: 1.1rem;
  }
  .modal-nav {
    width: 40px;
    height: 56px;
    font-size: 1.6rem;
  }
  .modal-nav.prev {
    left: 8px;
  }
  .modal-nav.next {
    right: 8px;
  }
}
</style>
