<!-- src/components/layout/Footer.vue -->
<template>
  <footer class="footer">
    <!-- Franja decorativa wiphala -->
    <div class="wiphala-stripe"></div>

    <div class="container">
      <div class="footer-content">
        <!-- Sección de información -->
        <div class="footer-section">
          <h4 class="footer-description">Comunidad</h4>
          <h3 class="footer-title">Chaicuriri</h3>
          <div class="social-links">
            <a
              href="https://www.facebook.com/chaicuriri/"
              class="social-link facebook"
              title="Facebook"
            >
              <span class="social-icon"><i class="bx bxl-facebook"></i></span>
            </a>
            <a href="#" class="social-link whatsapp" title="WhatsApp">
              <span class="social-icon"><i class="bx bxl-whatsapp"></i></span>
            </a>
          </div>
        </div>

        <!-- Sección de enlaces rápidos -->
        <div class="footer-section">
          <h4 class="footer-subtitle">Enlaces Rápidos</h4>
          <ul class="footer-links">
            <li><router-link to="/" class="footer-link">Inicio</router-link></li>
            <li>
              <router-link to="/historia" class="footer-link">Historia y Cultura</router-link>
            </li>
            <li><router-link to="/organigrama" class="footer-link">Organigrama</router-link></li>
            <li><router-link to="/noticias" class="footer-link">Noticias</router-link></li>
          </ul>
        </div>

        <!-- Sección de contacto -->
        <div class="footer-section">
          <h4 class="footer-subtitle">Contacto</h4>
          <div class="contact-info">
            <div class="contact-item">
              <span
                >Comunidad Chaicuriri<br />
                Caripuyo - Potosi - Bolivia</span
              >
            </div>
            <div class="contact-item">
              <span>+591 71189551</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="footer-bottom">
        <div class="copyright">
          <p>&copy; {{ currentYear }} Comunidad Chaicuriri.</p>
        </div>
        <div class="credits">
          <p class="credits-text">Desarrollado para nuestra comunidad</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
  },
}
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, var(--color-oscuro) 0%, #1a252f 100%);
  color: var(--color-blanco);
  margin-top: auto;
}

.wiphala-stripe {
  height: 4px;
  background: linear-gradient(
    to right,
    var(--color-rojo-andino) 0%,
    var(--color-rojo-andino) 20%,
    var(--color-naranja-andino) 20%,
    var(--color-naranja-andino) 40%,
    var(--color-amarillo-andino) 40%,
    var(--color-amarillo-andino) 60%,
    var(--color-verde-andino) 60%,
    var(--color-verde-andino) 80%,
    var(--color-azul-andino) 80%,
    var(--color-azul-andino) 100%
  );
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1fr;
  gap: var(--spacing-xl);
  padding: var(--spacing-sm) 0;
}

.footer-section h3.footer-title {
  color: var(--color-amarillo-andino);
  font-size: 1.8rem;
  margin-bottom: var(--spacing-xs);
  font-weight: 700;
}

.footer-section h4.footer-subtitle {
  color: var(--color-verde-andino);
  font-size: 1.2rem;
  margin-bottom: var(--spacing-sx);
  font-weight: 600;
}

.footer-description {
  line-height: 1.6;
  opacity: 0.9;
}

.social-links {
  display: flex;
  gap: var(--spacing-sm);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: var(--color-verde-andino);
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background-color: var(--color-amarillo-andino);
  transform: translateY(-2px);
}

.social-link.facebook:hover {
  background-color: #1877f2;
}

.social-link.whatsapp:hover {
  background-color: #25d366;
}

.social-icon {
  font-size: 1.2rem;
  color: var(--color-blanco);
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: var(--spacing-xs);
}

.footer-link {
  color: var(--color-blanco);
  text-decoration: none;
  opacity: 0.8;
  transition: all 0.3s ease;
  display: inline-block;
}

.footer-link:hover {
  opacity: 1;
  color: var(--color-amarillo-andino);
  transform: translateX(5px);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.contact-icon {
  font-size: 1.7rem;
}

.footer-divider {
  padding: var(--spacing-md) 0;
}

.pattern-line {
  height: 2px;
  background: repeating-linear-gradient(
    90deg,
    var(--color-rojo-andino) 0px,
    var(--color-rojo-andino) 10px,
    var(--color-naranja-andino) 10px,
    var(--color-naranja-andino) 20px,
    var(--color-amarillo-andino) 20px,
    var(--color-amarillo-andino) 30px,
    var(--color-verde-andino) 30px,
    var(--color-verde-andino) 40px,
    var(--color-azul-andino) 40px,
    var(--color-azul-andino) 50px
  );
  border-radius: 1px;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.copyright p {
  margin: 0;
  opacity: 0.8;
  font-size: 0.9rem;
}

.credits-text {
  font-size: 0.85rem;
  opacity: 0.7;
  font-style: italic;
}

/* Responsive */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-lg);
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
    text-align: center;
  }

  .footer-bottom {
    flex-direction: column;
    gap: var(--spacing-sm);
    text-align: center;
  }

  .contact-item {
    justify-content: center;
  }

  .social-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-content {
    padding: var(--spacing-lg) 0;
  }

  .footer-section h3.footer-title {
    font-size: 1.5rem;
  }

  .footer-section h4.footer-subtitle {
    font-size: 1.1rem;
  }
}
</style>
