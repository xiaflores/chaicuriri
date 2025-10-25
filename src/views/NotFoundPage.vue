<!-- src/views/NotFound.vue -->
<template>
  <div class="not-found">
    <div class="container">
      <div class="error-content">
        <div class="error-visual">
          <div class="error-number">404</div>
          <div class="error-icon"><i class="bx bxs-error"></i></div>
        </div>

        <div class="error-message">
          <h1 class="error-title">¡Ups! Página no encontrada</h1>
          <p class="error-description">
            La página que buscas no existe o se ha movido. Como los senderos de nuestros
            antepasados, algunos caminos pueden perderse con el tiempo.
          </p>

          <div class="error-actions">
            <router-link to="/" class="btn btn-primary">
              <i class="bx bx-home-alt-2"></i> Volver al Inicio
            </router-link>
            <button @click="goBack" class="btn btn-secondary">← Página Anterior</button>
          </div>

          <div class="helpful-links">
            <h3>¿Buscas algo específico?</h3>
            <div class="links-grid">
              <router-link to="/historia" class="help-link">
                <!-- <span class="link-icon">📚</span> -->
                Historia y Cultura
              </router-link>
              <router-link to="/organizacion" class="help-link">
                <!-- <span class="link-icon">👥</span> -->
                Organización
              </router-link>
              <router-link to="/noticias" class="help-link">
                <!-- <span class="link-icon">📰</span> -->
                Noticias
              </router-link>
              <router-link to="/galeria" class="help-link">
                <!-- <span class="link-icon">📸</span> -->
                Galería
              </router-link>
              <router-link to="/documentos" class="help-link">
                <!-- <span class="link-icon">📄</span> -->
                Documentos
              </router-link>
              <router-link to="/contacto" class="help-link">
                <!-- <span class="link-icon">📧</span> -->
                Contacto
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    goBack() {
      // Verificar si hay historial para regresar
      if (window.history.length > 1) {
        this.$router.go(-1)
      } else {
        this.$router.push('/')
      }
    },
  },
  mounted() {
    // Opcional: registrar error 404 para análisis
    console.log('404 Error - Página no encontrada:', this.$route.fullPath)
  },
}
</script>

<style scoped>
.not-found {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-gris-claro) 0%, var(--color-blanco) 100%);
  padding: var(--spacing-xl) 0;
}

.error-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--spacing-xl);
  align-items: center;
  max-width: 900px;
}

.error-visual {
  text-align: center;
  position: relative;
}

.error-number {
  font-size: 8rem;
  font-weight: 900;
  color: var(--color-rojo-andino);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  line-height: 1;
  margin-bottom: var(--spacing-md);
  background: linear-gradient(135deg, var(--color-rojo-andino), var(--color-naranja-andino));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.error-icon {
  font-size: 4rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.error-message {
  text-align: left;
}

.error-title {
  font-size: 2.5rem;
  color: var(--color-oscuro);
  margin-bottom: var(--spacing-md);
  font-weight: 700;
}

.error-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--color-gris);
  margin-bottom: var(--spacing-xl);
  text-align: justify;
}

.error-actions {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.btn {
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.btn-primary {
  background-color: var(--color-verde-andino);
  color: var(--color-blanco);
}

.btn-primary:hover {
  background-color: #256b47;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(46, 139, 87, 0.3);
}

.btn-secondary {
  background-color: transparent;
  color: var(--color-oscuro);
  border: 2px solid var(--color-gris);
}

.btn-secondary:hover {
  background-color: var(--color-gris);
  color: var(--color-blanco);
  border-color: var(--color-gris);
}

.helpful-links {
  border-top: 1px solid var(--color-gris-claro);
  padding-top: var(--spacing-lg);
}

.helpful-links h3 {
  color: var(--color-oscuro);
  margin-bottom: var(--spacing-md);
  font-size: 1.2rem;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--spacing-sm);
}

.help-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-blanco);
  border-radius: var(--border-radius);
  text-decoration: none;
  color: var(--color-oscuro);
  transition: all 0.3s ease;
  box-shadow: var(--shadow-light);
  border: 1px solid transparent;
}

.help-link:hover {
  background-color: var(--color-amarillo-andino);
  color: var(--color-oscuro);
  transform: translateY(-2px);
  box-shadow: var(--shadow-medium);
  border-color: var(--color-naranja-andino);
}

.link-icon {
  font-size: 1.2rem;
}

/* Decorative elements */
.error-visual::before {
  content: '';
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    var(--color-amarillo-andino) 10px,
    var(--color-amarillo-andino) 11px
  );
  opacity: 0.1;
  border-radius: var(--border-radius);
  z-index: -1;
}

/* Responsive */
@media (max-width: 768px) {
  .error-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: var(--spacing-lg);
  }

  .error-message {
    text-align: center;
  }

  .error-number {
    font-size: 6rem;
  }

  .error-title {
    font-size: 2rem;
  }

  .error-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 200px;
    justify-content: center;
  }

  .links-grid {
    grid-template-columns: 1fr;
  }

  .error-description {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .error-number {
    font-size: 4rem;
  }

  .error-title {
    font-size: 1.5rem;
  }

  .error-description {
    font-size: 1rem;
  }

  .error-actions {
    gap: var(--spacing-sm);
  }

  .btn {
    padding: var(--spacing-sm) var(--spacing-md);
    width: 100%;
  }
}

/* Animación de entrada */
.error-content {
  animation: slideIn 0.6s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
