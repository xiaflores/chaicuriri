<!-- src/views/ContactPage.vue -->
<template>
  <div class="contact-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Contacto</h1>
        <p class="page-subtitle">Información de contacto y ubicación de nuestra comunidad</p>
      </div>

      <div class="content-grid">
        <!-- Información de contacto principal -->
        <section class="contact-info-section">
          <div class="contact-card">
            <h2 class="section-title">
              <!-- <span class="title-icon">📞</span> -->
              Información de Contacto
            </h2>

            <div class="contact-items">
              <div class="contact-item">
                <div class="contact-icon"><i class="bx bx-map"></i></div>
                <div class="contact-details">
                  <h4>Dirección</h4>
                  <p>{{ contactContent.direccion || 'Comunidad Chaicuriri, Oruro - Bolivia' }}</p>
                  <p v-if="contactContent.ubicacion?.referencia" class="reference">
                    {{ contactContent.ubicacion.referencia }}
                  </p>
                </div>
              </div>

              <div v-if="contactContent.whatsapp" class="contact-item">
                <div class="contact-icon"><i class="bx bxl-whatsapp"></i></div>
                <div class="contact-details">
                  <h4>WhatsApp</h4>
                  <a
                    :href="`https://wa.me/${contactContent.whatsapp}`"
                    class="whatsapp-link"
                    target="_blank"
                  >
                    {{ contactContent.whatsapp }}
                  </a>
                </div>
              </div>

              <div v-if="contactContent.facebook" class="contact-item">
                <div class="contact-icon"><i class="bx bxl-facebook-circle"></i></div>
                <div class="contact-details">
                  <h4>Facebook</h4>
                  <a :href="contactContent.facebook" class="facebook-link" target="_blank">
                    Página Oficial de Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Mapa y ubicación -->
      <section class="map-section">
        <div class="map-card">
          <h2 class="section-title">
            <!-- <span class="title-icon">🗺️</span> -->
            Ubicación
          </h2>

          <div class="map-container">
            <div class="map-placeholder">
              <div class="map-icon"><i class="bx bx-map-alt"></i></div>
              <h3>Mapa de Ubicación</h3>
              <p>Comunidad Chaicuriri</p>
              <p v-if="contactContent.ubicacion?.lat && contactContent.ubicacion?.lng">
                Coordenadas: {{ contactContent.ubicacion.lat }}, {{ contactContent.ubicacion.lng }}
              </p>
              <button class="map-button" @click="openMap">Ver en Google Maps</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Formulario de contacto -->
      <section class="form-section">
        <div class="form-card">
          <h2 class="section-title">Envíanos un Mensaje</h2>

          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="nombre">Nombre Completo *</label>
                <input type="text" id="nombre" v-model="form.nombre" required class="form-input" />
              </div>

              <div class="form-group">
                <label for="email">Correo Electrónico *</label>
                <input type="email" id="email" v-model="form.email" required class="form-input" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="telefono">Teléfono</label>
                <input type="tel" id="telefono" v-model="form.telefono" class="form-input" />
              </div>

              <div class="form-group">
                <label for="asunto">Asunto *</label>
                <select id="asunto" v-model="form.asunto" required class="form-select">
                  <option value="">Seleccionar asunto</option>
                  <option value="consulta">Consulta General</option>
                  <option value="tramite">Trámite</option>
                  <option value="proyecto">Proyecto</option>
                  <option value="sugerencia">Sugerencia</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="mensaje">Mensaje *</label>
              <textarea
                id="mensaje"
                v-model="form.mensaje"
                rows="5"
                required
                class="form-textarea"
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                <span v-if="isSubmitting">Enviando...</span>
                <span v-else>Enviar Mensaje</span>
              </button>
              <button type="button" @click="resetForm" class="btn btn-secondary">Limpiar</button>
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
      const lat = contactContent.value.ubicacion?.lat || -17.983
      const lng = contactContent.value.ubicacion?.lng || -67.1329
      const url = `https://www.google.com/maps?q=${lat},${lng}`
      window.open(url, '_blank')
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
  background-color: var(--color-gris-claro);
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
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

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
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

.title-icon {
  font-size: 2rem;
}

.contact-card,
.schedule-card,
.services-card,
.map-card,
.form-card {
  background: var(--color-blanco);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  border-left: 4px solid var(--color-verde-andino);
}

.contact-items {
  display: grid;
  gap: var(--spacing-lg);
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--color-gris-claro);
  border-radius: var(--border-radius);
}

.contact-icon {
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-verde-andino);
  color: var(--color-blanco);
  border-radius: 50%;
  flex-shrink: 0;
}

.contact-details h4 {
  color: var(--color-oscuro);
  margin-bottom: var(--spacing-xs);
  font-size: 1.1rem;
}

.contact-details p {
  color: var(--color-gris);
  margin-bottom: var(--spacing-xs);
}

.reference {
  font-style: italic;
  font-size: 0.9rem;
}

.email-link,
.whatsapp-link,
.facebook-link {
  color: var(--color-azul-andino);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.email-link:hover,
.whatsapp-link:hover,
.facebook-link:hover {
  color: var(--color-verde-andino);
}

.schedule-items {
  display: grid;
  gap: var(--spacing-md);
}

.schedule-item {
  background-color: var(--color-gris-claro);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  border-left: 3px solid var(--color-amarillo-andino);
}

.schedule-item h4 {
  color: var(--color-rojo-andino);
  margin-bottom: var(--spacing-xs);
}

.schedule-item p {
  color: var(--color-gris);
  font-weight: 500;
}

.services-section {
  margin-bottom: var(--spacing-xl);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.service-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  background-color: var(--color-gris-claro);
  border-radius: var(--border-radius);
  font-weight: 500;
}

.service-icon {
  color: var(--color-verde-andino);
  font-size: 1.2rem;
}

.map-section {
  margin-bottom: var(--spacing-xl);
}

.map-container {
  height: 300px;
  border-radius: var(--border-radius);
  overflow: hidden;
  background-color: var(--color-gris-claro);
}

.map-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-gris);
  text-align: center;
}

.map-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-md);
}

.map-placeholder h3 {
  color: var(--color-oscuro);
  margin-bottom: var(--spacing-sm);
}

.map-placeholder p {
  margin-bottom: var(--spacing-xs);
}

.map-button {
  background-color: var(--color-azul-andino);
  color: var(--color-blanco);
  border: none;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius);
  cursor: pointer;
  margin-top: var(--spacing-md);
  transition: background-color 0.3s ease;
}

.map-button:hover {
  background-color: #1565c0;
}

.form-section {
  margin-bottom: var(--spacing-xl);
}

.contact-form {
  display: grid;
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
}

.form-input,
.form-select,
.form-textarea {
  padding: var(--spacing-sm);
  border: 2px solid var(--color-gris);
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--color-verde-andino);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: flex-end;
  margin-top: var(--spacing-md);
}

.btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: var(--color-verde-andino);
  color: var(--color-blanco);
}

.btn-primary:hover:not(:disabled) {
  background-color: #256b47;
}

.btn-secondary {
  background-color: transparent;
  color: var(--color-gris);
  border: 2px solid var(--color-gris);
}

.btn-secondary:hover {
  background-color: var(--color-gris);
  color: var(--color-blanco);
}

.additional-info {
  margin-bottom: var(--spacing-xl);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.info-card {
  background: var(--color-blanco);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  text-align: center;
  border-left: 4px solid var(--color-amarillo-andino);
}

.info-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
}

.info-card h3 {
  color: var(--color-rojo-andino);
  margin-bottom: var(--spacing-sm);
}

.info-card p {
  color: var(--color-gris);
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    justify-content: stretch;
  }

  .btn {
    flex: 1;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .contact-item {
    flex-direction: column;
    text-align: center;
  }

  .contact-icon {
    align-self: center;
  }

  .form-actions {
    flex-direction: column;
  }
}
</style>
