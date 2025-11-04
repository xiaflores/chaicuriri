<!-- src/views/ContactPage.vue -->
<template>
  <div class="contact-page">
    <div class="container">
      <!-- Grid principal de contenido -->
      <div class="content-grid">
        <!-- Información de contacto principal -->
        <section class="contact-info-section">
          <div class="info-card">
            <h2 class="section-title">Información de Contacto</h2>

            <div class="contact-items">
              <!-- Dirección -->
              <div class="contact-item">
                <div class="contact-icon location">
                  <i class="bx bx-map"></i>
                </div>
                <div class="contact-details">
                  <h4>Dirección</h4>
                  <p>{{ contactContent.direccion || 'Comunidad Chaicuriri, Potosí - Bolivia' }}</p>
                  <p v-if="contactContent.ubicacion?.referencia" class="reference">
                    {{ contactContent.ubicacion.referencia }}
                  </p>
                </div>
              </div>

              <!-- WhatsApp -->
              <div v-if="contactContent.whatsapp" class="contact-item">
                <div class="contact-icon whatsapp">
                  <i class="bx bxl-whatsapp"></i>
                </div>
                <div class="contact-details">
                  <h4>WhatsApp</h4>
                  <a
                    :href="`https://wa.me/${contactContent.whatsapp.replace(/\s/g, '')}`"
                    class="contact-link whatsapp-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="bx bxl-whatsapp"></i>
                    {{ contactContent.whatsapp }}
                  </a>
                </div>
              </div>

              <!-- Facebook -->
              <div v-if="contactContent.facebook" class="contact-item">
                <div class="contact-icon facebook">
                  <i class="bx bxl-facebook-circle"></i>
                </div>
                <div class="contact-details">
                  <h4>Facebook</h4>
                  <a
                    :href="contactContent.facebook"
                    class="contact-link facebook-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="bx bxl-facebook"></i>
                    Comunidad Chaicuriri
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Autoridades de Contacto -->
          <div
            v-if="contactContent.autoridades_contacto?.length"
            class="info-card authorities-card"
          >
            <h3 class="section-title small">
              <i class="bx bx-user-voice"></i>
              Autoridades de Contacto
            </h3>
            <div class="authorities-list">
              <div
                v-for="autoridad in contactContent.autoridades_contacto"
                :key="autoridad.cargo"
                class="authority-item"
              >
                <div class="authority-icon">
                  <i class="bx bx-user"></i>
                </div>
                <div class="authority-info">
                  <h5>{{ autoridad.cargo }}</h5>
                  <p v-if="autoridad.nombre" class="authority-name">{{ autoridad.nombre }}</p>
                  <a
                    v-if="autoridad.telefono"
                    :href="`tel:${autoridad.telefono}`"
                    class="authority-phone"
                  >
                    <i class="bx bx-phone"></i>
                    {{ autoridad.telefono }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Mapa y ubicación -->
        <section class="map-section">
          <div class="map-card">
            <h2 class="section-title">Nuestra Ubicación</h2>

            <div class="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3789.7429856353215!2d-66.63857772592156!3d-18.221730837393046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93fd283955fef643%3A0xd681dc81ee8e7f62!2sChaicuriri!5e0!3m2!1ses!2sbo!4v1762223198529!5m2!1ses!2sbo"
                width="100%"
                height="100%"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Mapa de ubicación de Chaicuriri"
              ></iframe>
            </div>

            <button class="map-button" @click="openMap">
              <i class="bx bx-map"></i>
              Ver en Google Maps
            </button>
          </div>
        </section>
      </div>

      <!-- Información sobre idiomas -->
      <div v-if="contactContent.idiomas" class="languages-section">
        <div class="languages-card">
          <h3 class="section-title small">Idiomas</h3>
          <div class="languages-content">
            <div class="languages-list">
              <strong>Idiomas oficiales:</strong>
              <div class="language-tags">
                <span
                  v-for="idioma in contactContent.idiomas.oficiales"
                  :key="idioma"
                  class="language-tag"
                >
                  {{ idioma }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Formulario de contacto -->
      <section class="form-section">
        <div class="form-card">
          <div class="form-header">
            <h2 class="section-title">Envíanos un Mensaje</h2>
            <p class="form-description">
              Completa el formulario y nos pondremos en contacto contigo lo antes posible
            </p>
          </div>

          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="nombre">
                  <i class="bx bx-user"></i>
                  Nombre Completo <span class="required">*</span>
                </label>
                <input
                  type="text"
                  id="nombre"
                  v-model="form.nombre"
                  required
                  class="form-input"
                  placeholder="Ingresa tu nombre completo"
                />
              </div>

              <div class="form-group">
                <label for="email">
                  <i class="bx bx-envelope"></i>
                  Correo Electrónico <span class="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  required
                  class="form-input"
                  placeholder="ejemplo@correo.com"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="telefono">
                  <i class="bx bx-phone"></i>
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  v-model="form.telefono"
                  class="form-input"
                  placeholder="+591 12345678"
                />
              </div>

              <div class="form-group">
                <label for="asunto">
                  <i class="bx bx-category"></i>
                  Asunto <span class="required">*</span>
                </label>
                <select id="asunto" v-model="form.asunto" required class="form-select">
                  <option value="" disabled>Seleccionar asunto</option>
                  <option value="consulta">Consulta General</option>
                  <option value="tramite">Trámite</option>
                  <option value="proyecto">Proyecto</option>
                  <option value="sugerencia">Sugerencia</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="mensaje">
                <i class="bx bx-message-detail"></i>
                Mensaje <span class="required">*</span>
              </label>
              <textarea
                id="mensaje"
                v-model="form.mensaje"
                rows="6"
                required
                class="form-textarea"
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
              <span class="char-counter">{{ form.mensaje.length }} caracteres</span>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                <i class="bx" :class="isSubmitting ? 'bx-loader-alt bx-spin' : 'bx-send'"></i>
                <span v-if="isSubmitting">Enviando...</span>
                <span v-else>Enviar Mensaje</span>
              </button>
              <button
                type="button"
                @click="resetForm"
                class="btn btn-secondary"
                :disabled="isSubmitting"
              >
                <i class="bx bx-reset"></i>
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { useContent } from '../composables/useContent'
import { ref, reactive } from 'vue'

export default {
  name: 'ContactPage',
  setup() {
    const { contactContent } = useContent()

    // Formulario reactivo
    const form = reactive({
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: '',
    })

    const isSubmitting = ref(false)

    // Funciones
    const openMap = () => {
      const lat = contactContent.value.ubicacion?.lat || -18.222327
      const lng = contactContent.value.ubicacion?.lng || -66.63552
      const url = `https://www.google.com/maps?q=${lat},${lng}`
      window.open(url, '_blank', 'noopener,noreferrer')
    }

    const submitForm = async () => {
      isSubmitting.value = true

      try {
        // Simular envío del formulario
        await new Promise((resolve) => setTimeout(resolve, 2000))

        alert('¡Mensaje enviado exitosamente!\n\nNos pondremos en contacto contigo pronto.')
        resetForm()
      } catch (error) {
        alert('Error al enviar el mensaje. Por favor intenta nuevamente.')
      } finally {
        isSubmitting.value = false
      }
    }

    const resetForm = () => {
      form.nombre = ''
      form.email = ''
      form.telefono = ''
      form.asunto = ''
      form.mensaje = ''
    }

    return {
      contactContent,
      form,
      isSubmitting,
      openMap,
      submitForm,
      resetForm,
    }
  },
}
</script>

<style scoped>
.contact-page {
  min-height: 80vh;
  padding: var(--spacing-xl) 0;
  background: linear-gradient(135deg, var(--color-gris-claro) 0%, #f8f9fa 100%);
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  animation: fadeInDown 0.6s ease-out;
}

.page-title {
  font-size: 3rem;
  color: var(--color-naranja-andino);
  margin-bottom: var(--spacing-sm);
  font-weight: 700;
}

.page-subtitle {
  font-size: 1.3rem;
  color: var(--color-gris);
  font-style: italic;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

/* Cards Base */
.info-card,
.map-card,
.form-card,
.languages-card {
  background: var(--color-blanco);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  border-left: 4px solid var(--color-verde-andino);
  transition: all 0.3s ease;
}

.info-card:hover,
.map-card:hover,
.form-card:hover,
.languages-card:hover {
  box-shadow: var(--shadow-medium);
  transform: translateY(-2px);
}

.section-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-azul-andino);
  font-size: 1.8rem;
  margin-bottom: var(--spacing-lg);
  font-weight: 600;
}

.section-title i {
  font-size: 2rem;
}

.section-title.small {
  font-size: 1.4rem;
  margin-bottom: var(--spacing-md);
}

.section-title.small i {
  font-size: 1.5rem;
}

/* Contact Info Section */
.contact-info-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.contact-items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--color-gris-claro);
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
}

.contact-item:hover {
  background-color: #e9ecef;
  transform: translateX(5px);
}

.contact-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  flex-shrink: 0;
  font-size: 1.5rem;
  color: var(--color-blanco);
}

.contact-icon.location {
  background: var(--color-rojo-andino);
}

.contact-icon.whatsapp {
  background: #25d366;
}

.contact-icon.facebook {
  background: #1877f2;
}

.contact-details h4 {
  color: var(--color-oscuro);
  margin-bottom: var(--spacing-xs);
  font-size: 1.1rem;
  font-weight: 600;
}

.contact-details p {
  color: var(--color-gris);
  margin-bottom: var(--spacing-xs);
  line-height: 1.5;
}

.reference {
  font-style: italic;
  font-size: 0.9rem;
}

.contact-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--color-azul-andino);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius);
}

.contact-link:hover {
  background-color: rgba(46, 139, 87, 0.1);
  color: var(--color-verde-andino);
}

.whatsapp-link:hover {
  background-color: rgba(37, 211, 102, 0.1);
  color: #25d366;
}

.facebook-link:hover {
  background-color: rgba(24, 119, 242, 0.1);
  color: #1877f2;
}

/* Authorities Card */
.authorities-card {
  border-left-color: var(--color-amarillo-andino);
}

.authorities-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.authority-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  background-color: var(--color-gris-claro);
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
}

.authority-item:hover {
  background-color: #e9ecef;
}

.authority-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-azul-andino);
  color: var(--color-blanco);
  border-radius: 50%;
  font-size: 1.2rem;
}

.authority-info {
  flex: 1;
}

.authority-info h5 {
  color: var(--color-oscuro);
  margin-bottom: 2px;
  font-size: 0.95rem;
}

.authority-name {
  color: var(--color-gris);
  font-size: 0.85rem;
  margin-bottom: 2px;
}

.authority-phone {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--color-verde-andino);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
}

.authority-phone:hover {
  color: var(--color-azul-andino);
}

/* Map Section */
.map-section {
  display: flex;
  flex-direction: column;
}

.map-container {
  width: 100%;
  height: 400px;
  border-radius: var(--border-radius);
  overflow: hidden;
  margin-bottom: var(--spacing-md);
  box-shadow: var(--shadow-light);
}

.map-container iframe {
  display: block;
}

.map-button {
  width: 100%;
  background: linear-gradient(135deg, var(--color-azul-andino), #1565c0);
  color: var(--color-blanco);
  border: none;
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.map-button:hover {
  background: linear-gradient(135deg, #1565c0, var(--color-azul-andino));
  transform: translateY(-2px);
  box-shadow: var(--shadow-medium);
}

.map-button i {
  font-size: 1.2rem;
}

.coordinates-info {
  margin-top: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--color-gris-claro);
  border-radius: var(--border-radius);
  text-align: center;
}

.coordinates {
  color: var(--color-gris);
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.coordinates i {
  font-size: 1.5rem;
  color: var(--color-rojo-andino);
}

/* Languages Section */
.languages-section {
  margin-bottom: var(--spacing-xl);
}

.languages-card {
  border-left-color: var(--color-naranja-andino);
}

.languages-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.languages-list strong {
  color: var(--color-oscuro);
  display: block;
  margin-bottom: var(--spacing-sm);
}

.language-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.language-tag {
  background: linear-gradient(135deg, var(--color-verde-andino), var(--color-azul-andino));
  color: var(--color-blanco);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.languages-note {
  color: var(--color-gris);
  font-size: 0.9rem;
  font-style: italic;
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm);
  background: #fff3cd;
  border-left: 3px solid var(--color-amarillo-andino);
  border-radius: var(--border-radius);
}

.languages-note i {
  font-size: 1.2rem;
  color: var(--color-amarillo-andino);
  flex-shrink: 0;
}

/* Form Section */
.form-section {
  margin-bottom: var(--spacing-xl);
}

.form-header {
  margin-bottom: var(--spacing-lg);
}

.form-description {
  color: var(--color-gris);
  font-size: 1rem;
  margin-top: var(--spacing-sm);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.form-group label {
  color: var(--color-oscuro);
  font-weight: 600;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.form-group label i {
  color: var(--color-verde-andino);
}

.required {
  color: var(--color-rojo-andino);
}

.form-input,
.form-select,
.form-textarea {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--color-gris);
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--color-verde-andino);
  box-shadow: 0 0 0 3px rgba(46, 139, 87, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 150px;
  line-height: 1.5;
}

.char-counter {
  font-size: 0.8rem;
  color: var(--color-gris);
  text-align: right;
}

.form-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: flex-end;
  margin-top: var(--spacing-md);
}

.btn {
  padding: var(--spacing-md) var(--spacing-xl);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.btn i {
  font-size: 1.2rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-verde-andino), #256b47);
  color: var(--color-blanco);
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #256b47, var(--color-verde-andino));
  transform: translateY(-2px);
  box-shadow: var(--shadow-medium);
}

.btn-secondary {
  background-color: transparent;
  color: var(--color-gris);
  border: 2px solid var(--color-gris);
}

.btn-secondary:hover:not(:disabled) {
  background-color: var(--color-gris);
  color: var(--color-blanco);
  border-color: var(--color-gris);
}

/* Animaciones */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bx-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .map-container {
    height: 350px;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }

  .page-subtitle {
    font-size: 1.1rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .contact-icon {
    width: 45px;
    height: 45px;
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .contact-page {
    padding: var(--spacing-lg) 0;
  }

  .page-title {
    font-size: 2rem;
  }

  .info-card,
  .map-card,
  .form-card,
  .languages-card {
    padding: var(--spacing-lg);
  }

  .contact-item {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }

  .map-container {
    height: 300px;
  }

  .language-tags {
    justify-content: center;
  }
}
</style>
