<!-- src/views/GalleryPage.vue -->
<template>
  <div class="gallery-page">
    <div class="container">
      <!-- Filtros -->
      <div class="filters-section">
        <div class="filters-card">
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

      <!-- Galería Masonry -->
      <div class="gallery-section">
        <div class="masonry-grid" role="list">
          <div v-for="item in paginatedGallery" :key="item.id" class="masonry-item" role="listitem">
            <div
              class="masonry-card"
              @click="openModal(item)"
              role="button"
              tabindex="0"
              @keyup.enter="openModal(item)"
            >
              <img
                :src="getImageUrl(item.imagen)"
                :alt="item.titulo || 'Imagen de la galería'"
                class="masonry-img"
                loading="lazy"
                @error="onImageError"
              />
              <div class="masonry-caption">
                <div class="caption-left">
                  <h4 class="caption-title">{{ item.titulo }}</h4>
                  <span class="caption-date" v-if="item.fecha">{{ formatDate(item.fecha) }}</span>
                </div>
                <div class="caption-actions">
                  <button class="icon-btn" @click.stop="shareImage(item)" aria-label="Compartir">
                    <i class="bx bx-share"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="paginatedGallery.length === 0" class="no-images">
          <div class="no-content">
            <h3>No hay imágenes</h3>
            <p>No se encontraron imágenes en esta categoría.</p>
          </div>
        </div>

        <div class="load-more-wrap" v-if="hasMore">
          <button class="btn btn-primary" @click="loadMore">Cargar más</button>
        </div>
      </div>
      <!-- ...existing code... -->
    </div>
  </div>

  <!-- Modal: imagen full-viewport con barra inferior para texto y compartir -->
  <div v-if="selectedImage" class="modal-overlay" @click="closeModal">
    <div
      class="modal-content"
      @click.stop
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <button class="modal-close" @click="closeModal" aria-label="Cerrar">✕</button>
      <button class="modal-nav prev" @click.stop="prevImage" aria-label="Anterior">‹</button>
      <button class="modal-nav next" @click.stop="nextImage" aria-label="Siguiente">›</button>

      <div class="modal-image">
        <img
          :src="getImageUrl(selectedImage.imagen)"
          :alt="selectedImage.titulo || 'Imagen detallada'"
          class="modal-img"
          @error="onImageError"
        />
        <!-- barra inferior sobre la imagen -->
        <div class="modal-bottom-bar">
          <div class="modal-bottom-left">
            <h2 class="modal-title">{{ selectedImage.titulo }}</h2>
            <p class="modal-description" v-if="selectedImage.descripcion">
              {{ selectedImage.descripcion }}
            </p>
          </div>
          <div class="modal-bottom-right">
            <div class="modal-meta">
              <span class="modal-category" :class="getCategoryClass(selectedImage.categoria)">
                {{ getCategoryName(selectedImage.categoria) }}
              </span>
              <span v-if="selectedImage.fecha" class="modal-date">
                {{ formatDate(selectedImage.fecha) }}
              </span>
            </div>
            <div class="modal-actions">
              <button class="modal-share" @click="shareImage(selectedImage)">Compartir</button>
            </div>
          </div>
        </div>
      </div>
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

    const selectedCategory = ref('')
    const selectedImage = ref(null)

    // paginación
    const pageSize = ref(12)
    const currentPage = ref(1)
    const allGallery = computed(() => {
      const list =
        (selectedCategory.value
          ? getGalleryByCategory(selectedCategory.value)
          : galleryContent.value) || []
      return list
    })
    const paginatedGallery = computed(() => {
      const end = currentPage.value * pageSize.value
      return allGallery.value.slice(0, end)
    })
    const hasMore = computed(() => allGallery.value.length > paginatedGallery.value.length)
    const loadMore = () => {
      currentPage.value += 1
    }

    // imagen utils
    const getImageUrl = (imagen) => {
      if (!imagen) return '/images/gallery/placeholder.jpg'
      if (imagen.startsWith('/')) return imagen
      if (imagen.startsWith('http')) return imagen
      return `/images/gallery/${imagen}`
    }
    const onImageError = (ev) => {
      ev.target.src = '/images/gallery/placeholder.jpg'
    }

    // categorías
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

    // navegación modal
    const filteredList = () => allGallery.value || []
    const getCurrentIndex = () => {
      const list = filteredList()
      if (!selectedImage.value) return -1
      return list.findIndex((i) => i.id === selectedImage.value.id)
    }
    const prevImage = () => {
      const list = filteredList()
      if (!list.length) return
      const idx = getCurrentIndex()
      if (idx === -1) return
      const newIdx = idx > 0 ? idx - 1 : list.length - 1
      selectedImage.value = list[newIdx]
    }
    const nextImage = () => {
      const list = filteredList()
      if (!list.length) return
      const idx = getCurrentIndex()
      if (idx === -1) return
      const newIdx = idx < list.length - 1 ? idx + 1 : 0
      selectedImage.value = list[newIdx]
    }

    // touch swipe
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

    // keyboard
    const onKeyDown = (e) => {
      if (!selectedImage.value) return
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'Escape') closeModal()
    }
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

    // compartir
    const shareImage = async (item) => {
      if (!item) return
      const imagePath = getImageUrl(item.imagen)
      const url = imagePath.startsWith('http') ? imagePath : `${location.origin}${imagePath}`
      const title = item.titulo || 'Imagen'
      const text = item.descripcion || ''
      if (navigator.share) {
        try {
          await navigator.share({ title, text, url })
          return
        } catch {}
      }
      try {
        if (navigator.clipboard && navigator.clipboard.writeText)
          await navigator.clipboard.writeText(url)
        else {
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
      paginatedGallery,
      formatDate,
      getGalleryByCategory,
      getCategoryName,
      getCategoryClass,
      openModal,
      closeModal,
      shareImage,
      getImageUrl,
      onImageError,
      prevImage,
      nextImage,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      hasMore,
      loadMore,
    }
  },
}
</script>

<style scoped>
/* Masonry / Pinterest */
.masonry-grid {
  column-count: 3;
  column-gap: 16px;
  width: 100%;
}
@media (max-width: 1024px) {
  .masonry-grid {
    column-count: 3;
    column-gap: 14px;
  }
}
@media (max-width: 600px) {
  .masonry-grid {
    column-count: 1;
    column-gap: 12px;
  }
}

.masonry-item {
  break-inside: avoid;
  -webkit-column-break-inside: avoid;
  display: inline-block;
  width: 100%;
  margin-bottom: 16px;
}
.masonry-card {
  position: relative;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  background: var(--color-blanco, #fff);
  box-shadow: 0 6px 18px rgba(14, 21, 47, 0.08);
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;
  cursor: pointer;
  display: block;
}
.masonry-card:hover,
.masonry-card:focus {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 14px 34px rgba(14, 21, 47, 0.12);
  outline: none;
}
.masonry-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  -webkit-user-drag: none;
  user-select: none;
  transition: transform 0.35s ease;
}
.masonry-card img {
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.masonry-card:hover .masonry-img {
  transform: scale(1.03);
}
.masonry-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.45) 100%);
  color: #fff;
  backdrop-filter: blur(2px);
}
.caption-title {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.caption-date {
  font-size: 0.8rem;
  opacity: 0.9;
  display: block;
}
.icon-btn {
  background: rgba(255, 255, 255, 0.12);
  border: none;
  color: #fff;
  padding: 6px 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.15s ease;
}
.icon-btn:hover {
  background: rgba(255, 255, 255, 0.18);
}
.caption-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: flex-start;
}
.caption-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}
.masonry-card:focus {
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.18);
}
.masonry-card .icon-btn {
  pointer-events: auto;
}

/* Page layout */
.gallery-page {
  min-height: 80vh;
  padding: var(--spacing-xl) 0;
  background-color: var(--color-gris-claro);
}
.page-title {
  text-align: center;

  color: var(--color-verde-andino);
  font-weight: 700;
}
.filters-card {
  background: var(--color-blanco);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  text-align: center;
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
  transition: all 0.3s;
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

/* Modal: full viewport image */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.modal-content {
  position: relative;
  width: 100vw;
  height: 100vh;
  max-width: none;
  max-height: none;
  background: transparent;
  border-radius: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Imagen ocupa toda la ventana (con contain para no recortar) */
.modal-image {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
}
.modal-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

/* Barra inferior moderna sobre la imagen */
.modal-bottom-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.28) 40%,
    rgba(0, 0, 0, 0) 100%
  );
  backdrop-filter: blur(6px);
  color: #fff;
}
.modal-bottom-left {
  max-width: 70%;
  overflow: hidden;
}
.modal-title {
  margin: 0 0 6px 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.modal-description {
  margin: 0;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.3;
  max-height: 3.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* meta + acciones a la derecha */
.modal-bottom-right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.modal-meta {
  display: flex;
  gap: 12px;
  align-items: center;
}
.modal-category {
  padding: 6px 12px;
  border-radius: 14px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
}
.modal-date {
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.9rem;
}

.modal-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}
.modal-share {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  transition: background 0.18s ease;
}
.modal-share:hover {
  background: rgba(255, 255, 255, 0.18);
}

/* Close and nav buttons overlay */
.modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  border: none;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1200;
  font-size: 1.1rem;
}
.modal-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  border: none;
  width: 46px;
  height: 64px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
}
.modal-nav.prev {
  left: 18px;
}
.modal-nav.next {
  right: 18px;
}
.modal-nav:hover,
.modal-close:hover {
  background: rgba(0, 0, 0, 0.6);
}

/* Responsive adjustments */
@media (max-width: 900px) {
  .modal-bottom-left {
    max-width: 60%;
  }
  .modal-title {
    font-size: 1rem;
  }
  .modal-description {
    font-size: 0.9rem;
  }
}
@media (max-width: 480px) {
  .masonry-grid {
    column-count: 1;
  }
  .modal-bottom-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 12px;
  }
  .modal-bottom-left {
    max-width: 100%;
  }
  .modal-bottom-right {
    width: 100%;
    justify-content: space-between;
  }
  .modal-nav.prev {
    left: 8px;
  }
  .modal-nav.next {
    right: 8px;
  }
}
</style>
