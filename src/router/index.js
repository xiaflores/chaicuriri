// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Importar las vistas (nombres correctos según los archivos que creamos)
import HomePage from '../views/HomePage.vue'
import HistoryPage from '../views/HistoryPage.vue'
import OrganigramaPage from '../views/OrganigramaPage.vue'
import NoticiasPage from '../views/NoticiasPage.vue'
import GalleryPage from '../views/GalleryPage.vue'
import DocumentsPage from '../views/DocumentsPage.vue'
import ContactPage from '../views/ContactPage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    meta: {
      title: 'Inicio - Comunidad Chaicuriri',
      description:
        'Bienvenidoooos a la página oficial de la comunidad originaria rural andina de Chaicuriri',
    },
  },
  {
    path: '/historia',
    name: 'HistoryPage',
    component: HistoryPage,
    meta: {
      title: 'Historia y Cultura - Comunidad Chaicuriri',
      description: 'Conoce la rica historia y tradiciones culturales de nuestra comunidad andina',
    },
  },
  {
    path: '/organigrama',
    name: 'OrganigramaPage',
    component: OrganigramaPage,
    meta: {
      title: 'Organigrama Comunal - Comunidad Chaicuriri',
      description: 'Estructura jerárquica y organigrama de la comunidad Chaicuriri',
    },
  },
  {
    path: '/comunicados',
    name: 'NoticiasPage',
    component: NoticiasPage,
    meta: {
      title: 'Archivo Comunal - Comunidad Chaicuriri',
      description: 'Documentación oficial digitalizada de la comunidad',
    },
  },
  {
    path: '/galeria',
    name: 'GalleryPage',
    component: GalleryPage,
    meta: {
      title: 'Galería Fotográfica - Comunidad Chaicuriri',
      description: 'Imágenes de nuestras celebraciones, eventos y paisajes',
    },
  },
  {
    path: '/documentos',
    name: 'DocumentsPage',
    component: DocumentsPage,
    meta: {
      title: 'Estatutos y Reglamentos - Comunidad Chaicuriri',
      description: 'Estatutos, reglamentos y documentos normativos de la comunidad',
    },
  },
  {
    path: '/contacto',
    name: 'ContactPage',
    component: ContactPage,
    meta: {
      title: 'Contacto - Comunidad Chaicuriri',
      description: 'Información de contacto y ubicación de la comunidad',
    },
  },
  {
    // Ruta 404 - página no encontrada
    path: '/:pathMatch(.*)*',
    name: 'NotFoundPage',
    component: () => import('../views/NotFoundPage.vue'),
    meta: {
      title: 'Página no encontrada - Comunidad Chaicuriri',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Scroll al top cuando se cambia de ruta
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// Guard global para cambiar el título de la página
router.beforeEach((to, from, next) => {
  // Cambiar el título del documento
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // Cambiar la meta descripción
  if (to.meta.description) {
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', to.meta.description)
    }
  }

  next()
})

export default router
