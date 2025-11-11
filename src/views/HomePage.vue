<!-- src/views/Home.vue - Versión dinámica -->
<template>
  <div class="home">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="container">
        <div class="loading-content">
          <div class="spinner"><i class="bx bx-loader"></i></div>
          <p>Cargando contenido de la comunidad...</p>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <div class="container">
        <div class="error-content">
          <h2>Error al cargar contenido</h2>
          <p>{{ error }}</p>
          <button @click="loadContent" class="retry-btn">Reintentar</button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else>
      <!-- Banner Principal -->
      <section class="hero-banner">
        <div class="banner-overlay">
          <div class="container">
            <div class="hero-content">
              <h1 class="hero-title">{{ homeContent.banner?.titulo || 'Chaicuriri' }}</h1>

              <div class="hero-actions">
                <router-link to="/historia" class="btn btn-primary">
                  Conoce Nuestra Historia
                </router-link>
                <router-link to="/galeria" class="btn btn-secondary"> Ver Galería </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Mensaje de Bienvenida -->
      <section class="welcome-section section">
        <div class="container">
          <div class="welcome-content">
            <div class="authority-card">
              <div class="authority-photo">
                <img
                  v-if="homeContent.mensaje_bienvenida?.foto"
                  :src="homeContent.mensaje_bienvenida.foto"
                  :alt="homeContent.mensaje_bienvenida?.autoridad || 'Autoridad Comunal'"
                  class="photo-image"
                  @error="handleImageError"
                />
                <div v-else class="photo-placeholder">👤</div>
              </div>
              <div class="authority-info">
                <h3 class="authority-name">
                  {{ homeContent.mensaje_bienvenida?.autoridad || 'Autoridad Comunal' }}
                </h3>
                <p class="authority-role">
                  {{ homeContent.mensaje_bienvenida?.cargo || 'Representante' }}
                </p>
                <p class="message-date" v-if="homeContent.mensaje_bienvenida?.fecha_mensaje">
                  {{ formatDate(homeContent.mensaje_bienvenida.fecha_mensaje) }}
                </p>
              </div>
            </div>
            <div class="welcome-message">
              <p class="message-text">
                {{
                  homeContent.mensaje_bienvenida?.mensaje || 'Mensaje de bienvenida por defecto...'
                }}
              </p>
              <div class="message-signature">
                <p>
                  <strong>{{
                    homeContent.mensaje_bienvenida?.autoridad || 'Autoridad Comunal'
                  }}</strong>
                </p>
                <p class="signature-role">
                  {{ homeContent.mensaje_bienvenida?.cargo || 'Representante' }} - Chaicuriri
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Sección de Destacados -->
      <section class="highlights-section">
        <div class="container">
          <h2 class="section-title">Nuestra Comunidad</h2>
          <div class="highlights-grid">
            <!-- Card Historia -->
            <div class="highlight-card">
              <div class="card-icon"><i class="bx bxs-book"></i></div>
              <h3>Historia y Tradición</h3>
              <p>
                Preservamos nuestras tradiciones ancestrales y la rica historia de nuestra comunidad
                andina.
              </p>
              <router-link to="/historia" class="card-link">Conocer más</router-link>
            </div>

            <!-- Card Organización -->
            <div class="highlight-card">
              <div class="card-icon"><i class="bx bx-group"></i></div>
              <h3>Organización Comunal</h3>
              <p>Una estructura organizativa que fortalece nuestra identidad y cohesión social.</p>
              <router-link to="/organizacion" class="card-link">Ver organización</router-link>
            </div>

            <!-- Card Cultura -->
            <div class="highlight-card">
              <div class="card-icon"><i class="bx bx-church"></i></div>
              <h3>Expresiones Culturales</h3>
              <p>Danzas, música y celebraciones que mantienen viva nuestra identidad cultural.</p>
              <router-link to="/galeria" class="card-link">Ver galería</router-link>
            </div>

            <!-- Card Territorio -->
            <div class="highlight-card">
              <div class="card-icon"><i class="bx bx-landscape"></i></div>
              <h3>Territorio</h3>
              <p>Nuestras tierras andinas, hogar de tradiciones y paisajes únicos.</p>
              <router-link to="/contacto" class="card-link">Ubicación</router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Widgets Informativos -->
      <section class="widgets-section">
        <div class="container">
          <div class="widgets-grid">
            <!-- Widget Noticias -->
            <div class="widget news-widget">
              <div class="widget-header">
                <h3>Noticias Recientes</h3>
                <router-link to="/comunicados" class="widget-link">Ver todas</router-link>
              </div>
              <div class="widget-content">
                <div class="news-item" v-for="noticia in recentNews" :key="noticia.id">
                  <div class="news-date">{{ formatShortDate(noticia.fecha) }}</div>
                  <h4 class="news-title">{{ noticia.titulo }}</h4>
                  <span class="news-category">{{ noticia.categoria }}</span>
                </div>
                <div v-if="recentNews.length === 0" class="no-content">
                  <p>No hay noticias recientes disponibles.</p>
                </div>
              </div>
            </div>

            <!-- Widget Eventos -->
            <div class="widget events-widget">
              <div class="widget-header">
                <h3>Próximos Eventos</h3>
              </div>
              <!-- <div class="widget-content">
                <div class="event-item">
                  <div class="event-date">
                    <span class="day">10</span>
                    <span class="month">NOV</span>
                  </div>
                  <div class="event-info">
                    <h4>Aniversario del municipio de Caripuyo</h4>
                    <p>
                      Actividades programadas en conmemoración del aniversario LXXXVII del municipio
                      de Caripuyo.
                    </p>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useContent } from '../composables/useContent'

export default {
  name: 'HomePage',
  setup() {
    const { loading, error, homeContent, recentNews, formatDate, formatShortDate, loadAllContent } =
      useContent()

    // Cargar contenido al montar para que recentNews se rellene en la primera visita
    onMounted(() => {
      loadAllContent()
    })

    return {
      loading,
      error,
      homeContent,
      recentNews,
      formatDate,
      formatShortDate,
      loadAllContent,
    }
  },
}
</script>

<style scoped>
/* Loading and Error States */
.loading-state,
.error-state {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-gris-claro);
}

.loading-content,
.error-content {
  text-align: center;
  padding: var(--spacing-xl);
}

.spinner {
  font-size: 4rem;
  animation: spin 2s linear infinite;
  margin-bottom: var(--spacing-md);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.retry-btn {
  background-color: var(--color-verde-andino);
  color: var(--color-blanco);
  border: none;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius);
  cursor: pointer;
  margin-top: var(--spacing-md);
}

.retry-btn:hover {
  background-color: #256b47;
}

/* Hero Banner */
.hero-banner {
  height: 80vh;
  min-height: 600px;
  background: linear-gradient(
    135deg,
    var(--color-azul-andino) 0%,
    var(--color-verde-andino) 50%,
    var(--color-amarillo-andino) 100%
  );
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.hero-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M0,0 Q25,50 50,0 T100,0 L100,100 Q75,50 50,100 T0,100 Z" fill="rgba(255,255,255,0.1)"/></svg>');
  background-size: 200px 200px;
  animation: float 20s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

.banner-overlay {
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-content {
  text-align: center;
  color: var(--color-blanco);
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: var(--spacing-xl);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: slideInDown 1s ease-out;
}

.hero-subtitle {
  font-size: 1.8rem;
  margin-bottom: var(--spacing-md);
  opacity: 0.9;
  animation: slideInUp 1s ease-out 0.3s both;
}

/* Community Statistics */
.community-stats {
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  animation: fadeIn 1s ease-out 0.6s both;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-width: 120px;
  transition: all 0.3s ease;
}

.stat-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 2rem;
  margin-bottom: var(--spacing-xs);
}

.stat-value {
  font-weight: 600;
  font-size: 1.1rem;
  text-align: center;
}

.hero-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  animation: fadeIn 1s ease-out 0.9s both;
}

.btn {
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-primary {
  background-color: var(--color-rojo-andino);
  color: var(--color-blanco);
}

.btn-primary:hover {
  background-color: #a11729;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(196, 30, 58, 0.3);
}

.btn-secondary {
  background-color: transparent;
  color: var(--color-blanco);
  border: 2px solid var(--color-blanco);
}

.btn-secondary:hover {
  background-color: var(--color-blanco);
  color: var(--color-azul-andino);
}

/* Welcome Section */
.welcome-section {
  background-color: var(--color-gris-claro);
}

.welcome-content {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: var(--spacing-xl);
  align-items: start;
}

.authority-card {
  background: var(--color-blanco);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-medium);
  text-align: center;
  position: sticky;
  top: 100px;
  border-left: 4px solid var(--color-amarillo-andino);
}

.authority-photo {
  margin-bottom: var(--spacing-md);
}
.photo-image {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto;
  display: block;
  border: 4px solid var(--color-amarillo-andino);
  box-shadow: var(--shadow-light);
  transition: transform 0.3s ease;
}

.photo-image:hover {
  transform: scale(1.05);
}

.photo-placeholder {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-verde-andino), var(--color-azul-andino));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: var(--color-blanco);
  margin: 0 auto;
  border: 4px solid var(--color-amarillo-andino);
  box-shadow: var(--shadow-light);
}

.authority-name {
  color: var(--color-rojo-andino);
  margin-bottom: var(--spacing-xs);
  font-size: 1.3rem;
}

.authority-role {
  color: var(--color-verde-andino);
  font-weight: 600;
  font-size: 1.1rem;
}

.message-date {
  color: var(--color-gris);
  font-size: 0.9rem;
  font-style: italic;
  margin-top: var(--spacing-xs);
}

.welcome-message {
  background: var(--color-blanco);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-medium);
  border-left: 4px solid var(--color-amarillo-andino);
}

.message-text {
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: var(--spacing-lg);
  text-align: justify;
  color: var(--color-oscuro);
}

.message-signature {
  text-align: right;
  border-top: 1px solid var(--color-gris-claro);
  padding-top: var(--spacing-md);
}

.signature-role {
  color: var(--color-gris);
  font-style: italic;
}

/* Highlights Section */
.highlights-section {
  padding: var(--spacing-xl) 0;
}

.section-title {
  text-align: center;
  font-size: 3rem;
  color: var(--color-oscuro);
  margin-bottom: var(--spacing-xl);
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 4px;
  background: linear-gradient(to right, var(--color-rojo-andino), var(--color-amarillo-andino));
  border-radius: 2px;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

.highlight-card {
  background: var(--color-blanco);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
}

.highlight-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(to right, var(--color-rojo-andino), var(--color-amarillo-andino));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.highlight-card:hover::before {
  transform: scaleX(1);
}

.highlight-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-medium);
  border-color: var(--color-amarillo-andino);
}

.card-icon {
  font-size: 3.5rem;
  margin-bottom: var(--spacing-md);
  display: block;
}

.highlight-card h3 {
  color: var(--color-rojo-andino);
  margin-bottom: var(--spacing-sm);
  font-size: 1.4rem;
}

.highlight-card p {
  color: var(--color-gris);
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

.card-link {
  color: var(--color-verde-andino);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius);
}

.card-link:hover {
  color: var(--color-azul-andino);
  background-color: var(--color-gris-claro);
}

/* Widgets Section */
.widgets-section {
  background-color: var(--color-gris-claro);
  padding: var(--spacing-xl) 0;
}

.widgets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-lg);
}

.widget {
  background: var(--color-blanco);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  overflow: hidden;
  transition: all 0.3s ease;
}

.widget:hover {
  box-shadow: var(--shadow-medium);
  transform: translateY(-2px);
}

.widget-header {
  padding: var(--spacing-md);
  background: linear-gradient(135deg, var(--color-oscuro), #34495e);
  color: var(--color-blanco);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.widget-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.widget-link {
  color: var(--color-amarillo-andino);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.widget-link:hover {
  color: var(--color-naranja-andino);
}

.widget-content {
  padding: var(--spacing-md);
  max-height: 300px;
  overflow-y: auto;
}

.news-item {
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--color-gris-claro);
  transition: all 0.3s ease;
}

.news-item:last-child {
  border-bottom: none;
}

.news-item:hover {
  background-color: var(--color-gris-claro);
  padding-left: var(--spacing-xs);
  border-radius: var(--border-radius);
}

.news-date {
  font-size: 0.85rem;
  color: var(--color-gris);
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
}

.news-title {
  font-size: 1rem;
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--color-oscuro);
  line-height: 1.4;
}

.news-category {
  background-color: var(--color-verde-andino);
  color: var(--color-blanco);
  padding: 3px 10px;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 500;
}

.event-item {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--color-gris-claro);
  transition: all 0.3s ease;
}

.event-item:last-child {
  border-bottom: none;
}

.event-item:hover {
  background-color: var(--color-gris-claro);
  padding-left: var(--spacing-xs);
  border-radius: var(--border-radius);
}

.event-date {
  background: linear-gradient(135deg, var(--color-rojo-andino), var(--color-naranja-andino));
  color: var(--color-blanco);
  padding: var(--spacing-xs);
  border-radius: var(--border-radius);
  text-align: center;
  min-width: 60px;
  box-shadow: var(--shadow-light);
}

.day {
  display: block;
  font-size: 1.4rem;
  font-weight: bold;
  line-height: 1;
}

.month {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.event-info h4 {
  margin: 0 0 4px 0;
  font-size: 1rem;
  color: var(--color-oscuro);
  font-weight: 600;
}

.event-info p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-gris);
  line-height: 1.3;
}

.no-content {
  text-align: center;
  color: var(--color-gris);
  font-style: italic;
  padding: var(--spacing-md);
}

/* Animations */
@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .community-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
  }

  .stat-item {
    min-width: 100px;
  }
}

@media (max-width: 768px) {
  .hero-banner {
    height: 70vh;
    min-height: 500px;
  }

  .hero-title {
    font-size: 2.8rem;
  }

  .hero-subtitle {
    font-size: 1.4rem;
  }

  .community-stats {
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }

  .stat-item {
    min-width: 90px;
    padding: var(--spacing-sm);
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .welcome-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .authority-card {
    position: static;
  }

  .highlights-grid {
    grid-template-columns: 1fr;
  }

  .widgets-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .community-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-icon {
    font-size: 1.5rem;
  }

  .stat-value {
    font-size: 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .message-text {
    font-size: 1.1rem;
  }

  .authority-name {
    font-size: 1.2rem;
  }

  .photo-placeholder {
    width: 120px;
    height: 120px;
    font-size: 3rem;
  }
}
</style>
