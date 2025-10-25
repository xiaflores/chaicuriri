<!-- src/views/OrganizationPage.vue -->
<template>
  <div class="organization-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Organización Comunal</h1>
        <p class="page-subtitle">Conoce a nuestras autoridades y estructura organizativa</p>
      </div>

      <!-- Autoridades -->
      <section class="authorities-section">
        <h2 class="section-title">
          <!-- <span class="title-icon">👥</span> -->
          Autoridades Actuales
        </h2>

        <div class="authorities-grid">
          <div
            v-for="autoridad in organizationContent.autoridades"
            :key="autoridad.id"
            class="authority-card"
          >
            <div class="authority-photo">
              <div class="photo-placeholder"><i class="bx bx-user"></i></div>
            </div>
            <div class="authority-info">
              <h3 class="authority-name">{{ autoridad.nombre }}</h3>
              <p class="authority-role">{{ autoridad.cargo }}</p>
              <p class="authority-description">{{ autoridad.descripcion }}</p>
              <div v-if="autoridad.periodo" class="authority-period">
                <strong>Período:</strong> {{ autoridad.periodo }}
              </div>
              <div v-if="autoridad.telefono" class="authority-contact">
                <strong>Teléfono:</strong> {{ autoridad.telefono }}
              </div>
            </div>
          </div>

          <div v-if="!organizationContent.autoridades?.length" class="no-content">
            <p>Información de autoridades próximamente...</p>
          </div>
        </div>
      </section>

      <!-- Estructura organizativa -->
      <section class="structure-section">
        <div class="section-grid">
          <!-- <div class="structure-card">
            <h2 class="section-title">
              <span class="title-icon">🏛️</span>
              Estructura Organizativa
            </h2>

            <div class="structure-info">
              <div class="subcentral-info">
                <h3>Subcentral</h3>
                <p>{{ organizationContent.estructura?.subcentral || 'Chaicuriri' }}</p>
              </div>

              <div class="sectors-info">
                <h3>Sectores</h3>
                <div class="sectors-list">
                  <div
                    v-for="sector in organizationContent.estructura?.sectores"
                    :key="sector.nombre || sector"
                    class="sector-item"
                  >
                    <div class="sector-name">
                      {{ typeof sector === 'string' ? sector : sector.nombre }}
                    </div>
                    <div v-if="sector.familias" class="sector-families">
                      {{ sector.familias }} familias
                    </div>
                    <div v-if="sector.responsable" class="sector-responsible">
                      Responsable: {{ sector.responsable }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->

          <!-- Comités especializados -->
          <!-- <div class="committees-card" v-if="organizationContent.comites?.length">
            <h2 class="section-title">
              <span class="title-icon">🤝</span>
              Comités Especializados
            </h2>

            <div class="committees-list">
              <div
                v-for="comite in organizationContent.comites"
                :key="comite.nombre"
                class="committee-item"
              >
                <h4 class="committee-name">{{ comite.nombre }}</h4>
                <p class="committee-responsible">
                  <strong>Responsable:</strong> {{ comite.responsable }}
                </p>
                <p class="committee-function">{{ comite.funcion }}</p>
              </div>
            </div>
          </div> -->
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { useContent } from '../composables/useContent'

export default {
  name: 'OrganizationPage',
  setup() {
    const { organizationContent, loading, error } = useContent()

    return {
      organizationContent,
      loading,
      error,
    }
  },
}
</script>

<style scoped>
.organization-page {
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
  color: var(--color-verde-andino);
  margin-bottom: var(--spacing-sm);
  font-weight: 700;
}

.page-subtitle {
  font-size: 1.3rem;
  color: var(--color-gris);
  font-style: italic;
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

.authorities-section {
  margin-bottom: var(--spacing-xl);
}

.authorities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-lg);
}

.authority-card {
  background: var(--color-blanco);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  border-left: 4px solid var(--color-verde-andino);
  display: flex;
  gap: var(--spacing-md);
  transition: all 0.3s ease;
}

.authority-card:hover {
  box-shadow: var(--shadow-medium);
  transform: translateY(-2px);
}

.authority-photo {
  flex-shrink: 0;
}

.photo-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-verde-andino), var(--color-azul-andino));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: var(--color-blanco);
  border: 3px solid var(--color-amarillo-andino);
}

.authority-info {
  flex: 1;
}

.authority-name {
  color: var(--color-rojo-andino);
  font-size: 1.3rem;
  margin-bottom: var(--spacing-xs);
  font-weight: 700;
}

.authority-role {
  color: var(--color-verde-andino);
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
}

.authority-description {
  color: var(--color-gris);
  line-height: 1.6;
  margin-bottom: var(--spacing-sm);
}

.authority-period,
.authority-contact {
  font-size: 0.9rem;
  color: var(--color-gris);
  margin-bottom: var(--spacing-xs);
}

.structure-section {
  margin-bottom: var(--spacing-xl);
}

.section-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
}

.structure-card,
.committees-card {
  background: var(--color-blanco);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  border-left: 4px solid var(--color-azul-andino);
}

.structure-info h3 {
  color: var(--color-rojo-andino);
  margin-bottom: var(--spacing-sm);
}

.subcentral-info {
  margin-bottom: var(--spacing-lg);
}

.subcentral-info p {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-verde-andino);
}

.sectors-list {
  display: grid;
  gap: var(--spacing-sm);
}

.sector-item {
  background-color: var(--color-gris-claro);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius);
  border-left: 3px solid var(--color-amarillo-andino);
}

.sector-name {
  font-weight: 600;
  color: var(--color-oscuro);
  margin-bottom: var(--spacing-xs);
}

.sector-families,
.sector-responsible {
  font-size: 0.9rem;
  color: var(--color-gris);
}

.committees-list {
  display: grid;
  gap: var(--spacing-md);
}

.committee-item {
  background-color: var(--color-gris-claro);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  border-left: 3px solid var(--color-verde-andino);
}

.committee-name {
  color: var(--color-verde-andino);
  margin-bottom: var(--spacing-xs);
}

.committee-responsible {
  margin-bottom: var(--spacing-xs);
  font-size: 0.95rem;
}

.committee-function {
  color: var(--color-gris);
  font-size: 0.9rem;
  line-height: 1.4;
}

.institutional-contact {
  margin-bottom: var(--spacing-xl);
}

.contact-card {
  background: var(--color-blanco);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  border-left: 4px solid var(--color-naranja-andino);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.contact-item h4 {
  color: var(--color-rojo-andino);
  margin-bottom: var(--spacing-sm);
}

.contact-item ul {
  list-style: none;
  padding: 0;
}

.contact-item li {
  padding: var(--spacing-xs) 0;
  border-bottom: 1px solid var(--color-gris-claro);
  color: var(--color-gris);
}

.contact-item li:last-child {
  border-bottom: none;
}

.no-content {
  grid-column: 1 / -1;
  text-align: center;
  color: var(--color-gris);
  font-style: italic;
  padding: var(--spacing-xl);
  background: var(--color-blanco);
  border-radius: var(--border-radius);
}

/* Responsive */
@media (max-width: 1024px) {
  .section-grid {
    grid-template-columns: 1fr;
  }

  .authorities-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }

  .authority-card {
    flex-direction: column;
    text-align: center;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
