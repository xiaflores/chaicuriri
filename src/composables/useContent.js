// src/composables/useContent.js
import { ref, computed } from 'vue'

console.log('🔍 Composable useContent cargado')

// Estado global reactivo para cada sección
const homeData = ref(null)
const historyData = ref(null)
const organizationData = ref(null)
const newsData = ref(null)
const galleryData = ref(null)
const documentsData = ref(null)
const contactData = ref(null)

const loading = ref(false)
const error = ref(null)
const organigramaContent = ref([])

// Función genérica para cargar archivos JSON
async function loadJSONFile(filename, dataRef) {
  try {
    console.log(`🔍 Cargando ${filename}...`)
    const response = await fetch(`/data/${filename}`)
    console.log(`🔍 Response ${filename}:`, response.status, response.ok)

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    const data = await response.json()
    console.log(`🔍 Datos de ${filename} cargados:`, data)
    dataRef.value = data
    return data
  } catch (err) {
    console.error(`❌ Error cargando ${filename}:`, err)
    throw err
  }
}

// Función para cargar todos los archivos
async function loadAllContent() {
  if (
    homeData.value &&
    historyData.value &&
    organizationData.value &&
    newsData.value &&
    galleryData.value &&
    documentsData.value &&
    contactData.value
  ) {
    console.log('✅ Todo el contenido ya está cargado')
    return
  }

  loading.value = true
  error.value = null
  console.log('🔍 Iniciando carga de todos los archivos JSON...')

  try {
    // Cargar archivos en paralelo para mejor rendimiento
    await Promise.all([
      loadJSONFile('home.json', homeData),
      loadJSONFile('history.json', historyData),
      loadJSONFile('organization.json', organizationData),
      loadJSONFile('noticias.json', newsData),
      loadJSONFile('gallery.json', galleryData),
      loadJSONFile('documents.json', documentsData),
      loadJSONFile('contact.json', contactData),
    ])

    console.log('✅ Todos los archivos JSON cargados exitosamente')
  } catch (err) {
    console.error('❌ Error cargando contenido:', err)
    error.value = `Error al cargar contenido: ${err.message}`

    // Cargar datos de respaldo
    console.log('🔄 Cargando datos de respaldo...')
    loadDefaultContent()
  } finally {
    loading.value = false
    console.log('🔍 Carga finalizada')
  }
}

// Función para cargar una sección específica
async function loadSection(section) {
  const sectionMap = {
    home: { file: 'home.json', ref: homeData },
    history: { file: 'history.json', ref: historyData },
    organization: { file: 'organization.json', ref: organizationData },
    news: { file: 'noticias.json', ref: newsData },
    gallery: { file: 'gallery.json', ref: galleryData },
    documents: { file: 'documents.json', ref: documentsData },
    contact: { file: 'contact.json', ref: contactData },
  }

  const sectionConfig = sectionMap[section]
  if (!sectionConfig) {
    throw new Error(`Sección desconocida: ${section}`)
  }

  if (sectionConfig.ref.value) {
    console.log(`✅ Sección ${section} ya está cargada`)
    return sectionConfig.ref.value
  }

  try {
    return await loadJSONFile(sectionConfig.file, sectionConfig.ref)
  } catch (err) {
    console.error(`❌ Error cargando sección ${section}:`, err)
    // Cargar datos de respaldo para esta sección
    loadDefaultSection(section)
    return sectionConfig.ref.value
  }
}

// Datos de respaldo por defecto
function loadDefaultContent() {
  console.log('🔍 Cargando datos de respaldo completos')

  homeData.value = {
    banner: {
      titulo: 'Bienvenidos a Chaicuriri',
      subtitulo: 'Comunidad Originaria Rural Andina',
    },
    mensaje_bienvenida: {
      autoridad: 'Juan Carlos Mamani Quispe',
      cargo: 'Alcalde Comunal',
      mensaje: 'Bienvenidos a nuestra comunidad...',
    },
    estadisticas: {
      poblacion: '380 habitantes',
      familias: '95 familias',
      extension: '2,450 hectáreas',
      altitud: '3,800 msnm',
    },
  }

  historyData.value = {
    titulo: 'Historia y Cultura de Chaicuriri',
    resena_historica: 'Chaicuriri es una comunidad originaria...',
    simbolos_culturales: [],
    fiestas: [],
    danzas: [],
  }

  organizationData.value = {
    autoridades: [
      {
        id: 1,
        nombre: 'Juan Carlos Mamani Quispe',
        cargo: 'Alcalde Comunal',
        descripcion: 'Representa a la comunidad',
      },
    ],
    estructura: {
      subcentral: 'Chaicuriri',
      sectores: ['Sector Norte', 'Sector Centro', 'Sector Sur'],
    },
  }

  newsData.value = [
    {
      id: 1,
      titulo: 'Información de ejemplo',
      fecha: '2024-12-10',
      categoria: 'Información',
      estado: 'vigente',
      contenido: 'Datos de ejemplo mientras se cargan los archivos...',
    },
  ]

  galleryData.value = [
    {
      id: 1,
      titulo: 'Imagen de ejemplo',
      categoria: 'general',
      descripcion: 'Imagen de ejemplo',
    },
  ]

  documentsData.value = [
    {
      id: 1,
      titulo: 'Documento de ejemplo',
      tipo: 'PDF',
      fecha: '2024-12-10',
      descripcion: 'Documento de ejemplo',
    },
  ]

  contactData.value = {
    direccion: 'Comunidad Chaicuriri, Oruro - Bolivia',
    telefono: '+591 XXX XXXXX',
    email: 'chaicuriri@gmail.com',
  }
}

function loadDefaultSection(section) {
  console.log(`🔍 Cargando datos de respaldo para sección: ${section}`)
  // Cargar solo la sección específica
  loadDefaultContent()
}

// Composable principal
export function useContent() {
  console.log('🔍 useContent() hook ejecutado')

  // Computed properties para acceso fácil a cada sección
  const homeContent = computed(() => {
    console.log('🔍 homeContent computed, homeData.value:', homeData.value)
    return homeData.value || {}
  })

  const historyContent = computed(() => historyData.value || {})
  const organizationContent = computed(() => organizationData.value || {})
  const newsContent = computed(() => newsData.value || [])
  const galleryContent = computed(() => galleryData.value || [])
  const documentsContent = computed(() => documentsData.value || [])
  const contactContent = computed(() => contactData.value || {})

  // Funciones auxiliares para noticias
  const getNewsById = (id) => {
    return newsContent.value.find((noticia) => noticia.id === id) || null
  }

  const getRecentNews = (limit = 3) => {
    const recent = newsContent.value
      .filter((noticia) => noticia.estado === 'vigente')
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      .slice(0, limit)

    console.log('🔍 getRecentNews resultado:', recent)
    return recent
  }

  const getNewsByCategory = (categoria) => {
    return newsContent.value.filter((noticia) => noticia.categoria === categoria)
  }

  const getNewsByStatus = (status) => {
    return newsContent.value.filter((news) => news.estado === status)
  }

  // Funciones auxiliares para galería
  const getGalleryByCategory = (categoria) => {
    if (!categoria) return galleryContent.value
    return galleryContent.value.filter((item) => item.categoria === categoria)
  }

  // Funciones auxiliares para organización
  const getAuthorityByRole = (cargo) => {
    return (
      organizationContent.value.autoridades?.find((autoridad) =>
        autoridad.cargo.toLowerCase().includes(cargo.toLowerCase()),
      ) || null
    )
  }

  // Funciones auxiliares para documentos
  const getDocumentsByCategory = (categoria) => {
    return documentsContent.value.filter((doc) => doc.categoria === categoria)
  }

  const searchDocuments = (query) => {
    if (!query) return documentsContent.value
    const term = query.toLowerCase()
    return documentsContent.value.filter(
      (doc) =>
        doc.titulo.toLowerCase().includes(term) ||
        (doc.descripcion && doc.descripcion.toLowerCase().includes(term)),
    )
  }

  // Funciones de formato
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
      return date.toLocaleDateString('es-ES', options)
    } catch (error) {
      return dateString
    }
  }

  const formatShortDate = (dateString) => {
    try {
      const date = new Date(dateString)
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }
      return date.toLocaleDateString('es-ES', options)
    } catch (error) {
      return dateString
    }
  }

  // Función de búsqueda global
  const searchContent = (query) => {
    if (!query) return []

    const results = []
    const searchTerm = query.toLowerCase()

    // Buscar en noticias
    newsContent.value.forEach((noticia) => {
      if (
        noticia.titulo.toLowerCase().includes(searchTerm) ||
        noticia.contenido.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          type: 'noticia',
          title: noticia.titulo,
          content: noticia.contenido.substring(0, 150) + '...',
          route: `/noticias#${noticia.id}`,
          date: noticia.fecha,
        })
      }
    })

    // Buscar en documentos
    documentsContent.value.forEach((doc) => {
      if (doc.titulo.toLowerCase().includes(searchTerm)) {
        results.push({
          type: 'documento',
          title: doc.titulo,
          content: `Documento ${doc.tipo}`,
          route: `/documentos#${doc.id}`,
          date: doc.fecha,
        })
      }
    })

    // Buscar en galería
    galleryContent.value.forEach((item) => {
      if (
        item.titulo.toLowerCase().includes(searchTerm) ||
        item.descripcion.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          type: 'galeria',
          title: item.titulo,
          content: item.descripcion,
          route: `/galeria#${item.id}`,
        })
      }
    })

    return results.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
  }

  // Inicializar contenido si no está cargado
  if (!homeData.value && !loading.value) {
    console.log('🔍 Iniciando carga automática de contenido...')
    loadAllContent()
  }

  return {
    // Estado
    loading,
    error,

    // Datos brutos
    homeData,
    historyData,
    organizationData,
    newsData,
    galleryData,
    documentsData,
    contactData,

    // Acciones de carga
    loadAllContent,
    loadSection,

    // Contenido por secciones (computed)
    homeContent,
    historyContent,
    organizationContent,
    organigramaContent,
    newsContent,
    galleryContent,
    documentsContent,
    contactContent,

    // Funciones auxiliares - Noticias
    getNewsById,
    getRecentNews,
    getNewsByCategory,
    getNewsByStatus,

    // Funciones auxiliares - Galería
    getGalleryByCategory,

    // Funciones auxiliares - Organización
    getAuthorityByRole,

    // Funciones auxiliares - Documentos
    getDocumentsByCategory,
    searchDocuments,

    // Funciones de formato
    formatDate,
    formatShortDate,

    // Búsqueda global
    searchContent,
  }
}
