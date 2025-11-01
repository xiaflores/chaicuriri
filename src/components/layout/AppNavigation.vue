<!-- src/components/layout/AppNavigation.vue -->
<template>
  <nav class="navigation" :class="{ 'mobile-open': isMobileMenuOpen }">
    <div class="container">
      <ul class="nav-list">
        <!-- Inicio - Alineado a la izquierda -->
        <li class="nav-item nav-home">
          <router-link to="/" class="nav-link" @click="closeMobileMenu">
            <!-- <span class="nav-icon">🏠</span> -->
            <span>Inicio</span>
          </router-link>
        </li>

        <!-- Grupo derecho - Todos los demás elementos -->
        <div class="nav-group-right">
          <!-- Dropdown Comunidad -->
          <li
            class="nav-item dropdown"
            @mouseenter="showDropdown = true"
            @mouseleave="showDropdown = false"
            @click="toggleDropdownMobile"
          >
            <div class="nav-link dropdown-trigger">
              <!-- <span class="nav-icon">🏛️</span> -->
              <span>Comunidad</span>
              <span class="dropdown-arrow" :class="{ rotate: showDropdown }">▼</span>
            </div>
            <ul class="dropdown-menu" :class="{ show: showDropdown }">
              <li>
                <router-link to="/historia" class="dropdown-link" @click="closeMobileMenu">
                  <!-- <span class="dropdown-icon">📚</span> -->
                  Historia y Cultura
                </router-link>
              </li>
              <li>
                <router-link to="/organigrama" class="dropdown-link" @click="closeMobileMenu">
                  <!-- <span class="dropdown-icon">📊</span> -->
                  Organigrama
                </router-link>
              </li>
              <li>
                <router-link to="/documentos" class="dropdown-link" @click="closeMobileMenu">
                  <!-- <span class="dropdown-icon">📋</span> -->
                  Estatutos y Reglamentos
                </router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <router-link to="/comunicados" class="nav-link" @click="closeMobileMenu">
              <!-- <span class="nav-icon">📰</span> -->
              <span>Noticias y Comunicados</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/galeria" class="nav-link" @click="closeMobileMenu">
              <!-- <span class="nav-icon">📸</span> -->
              <span>Galería</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/contacto" class="nav-link" @click="closeMobileMenu">
              <!-- <span class="nav-icon">📧</span> -->
              <span>Contacto</span>
            </router-link>
          </li>
        </div>
      </ul>
    </div>

    <!-- Overlay para cerrar menú en móvil -->
    <div class="mobile-overlay" v-if="isMobileMenuOpen" @click="closeMobileMenu"></div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavigation',
  props: {
    isMobileMenuOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showDropdown: false,
    }
  },
  emits: ['close-menu'],
  methods: {
    closeMobileMenu() {
      this.showDropdown = false
      this.$emit('close-menu')
    },
    toggleDropdownMobile() {
      // Solo para móviles - toggle del dropdown
      if (window.innerWidth <= 768) {
        this.showDropdown = !this.showDropdown
      }
    },
  },
}
</script>

<style scoped>
.navigation {
  background-color: var(--color-oscuro);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed; /* Cambiado de relative a fixed */
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 90;
}

/* LAYOUT PRINCIPAL: Inicio izquierda, resto derecha */
.nav-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}

.nav-home {
  flex-shrink: 0;
}

.nav-group-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  list-style: none;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md) var(--spacing-sm);
  color: var(--color-blanco);
  text-decoration: none;
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
  font-weight: 500;
  white-space: nowrap;
}

.nav-link:hover {
  background-color: var(--color-verde-andino);
  transform: translateY(-2px);
}

.nav-link.router-link-active {
  color: var(--color-blanco);
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background-color: var(--color-amarillo-andino);
  border-radius: 50%;
}

.nav-icon {
  font-size: 1.1rem;
}

/* Dropdown Styles */
.dropdown {
  position: relative;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  cursor: pointer;
}

.dropdown-arrow {
  font-size: 0.7rem;
  transition: transform 0.3s ease;
  margin-left: auto;
}

.dropdown-arrow.rotate {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: var(--color-blanco);
  min-width: 220px;
  box-shadow: var(--shadow-medium);
  border-radius: var(--border-radius);
  border: 1px solid var(--color-gris-claro);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1000;
  list-style: none;
  margin: 0;
  padding: var(--spacing-xs) 0;
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-oscuro);
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 0;
  font-weight: 500;
}

.dropdown-link:hover {
  background-color: var(--color-verde-andino);
  color: var(--color-blanco);
  /* transform: translateX(5px); */
}

.dropdown-link.router-link-active {
  background-color: var(--color-rojo-andino);
  color: var(--color-blanco);
}

.dropdown-link.router-link-active::after {
  display: none; /* No mostrar el punto en dropdown */
}

.dropdown-icon {
  font-size: 1rem;
  width: 20px;
  text-align: center;
}

/* Hover effect for desktop */
@media (min-width: 769px) {
  .dropdown:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .dropdown:hover .dropdown-arrow {
    transform: rotate(180deg);
  }
}

/* Tablet ajustes */
@media (max-width: 1024px) and (min-width: 769px) {
  .nav-group-right {
    gap: var(--spacing-xs);
  }

  .nav-link {
    padding: var(--spacing-sm) var(--spacing-xs);
    font-size: 0.9rem;
  }

  .nav-icon {
    font-size: 1rem;
  }

  .dropdown-menu {
    min-width: 200px;
  }
}

/* Responsive - Mobile */
@media (max-width: 768px) {
  .navigation {
    position: fixed;
    top: 0;
    left: -100%;
    width: 280px;
    height: 100vh;
    background-color: var(--color-oscuro);
    transition: left 0.3s ease;
    overflow-y: auto;
    padding-top: 80px; /* Espacio para el header */
  }

  .navigation.mobile-open {
    left: 0;
  }

  .nav-list {
    flex-direction: column;
    align-items: stretch;
    padding: var(--spacing-lg) var(--spacing-md);
    gap: var(--spacing-xs);
    justify-content: flex-start;
  }

  .nav-group-right {
    flex-direction: column;
    width: 100%;
    gap: var(--spacing-xs);
  }

  .nav-link {
    padding: var(--spacing-md);
    justify-content: flex-start;
    border-radius: var(--border-radius);
    margin-bottom: var(--spacing-xs);
  }

  .nav-link:hover {
    transform: translateX(10px);
    background-color: var(--color-verde-andino);
  }

  .mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }

  /* Mobile Dropdown */
  .dropdown-menu {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    box-shadow: none;
    border: none;
    background-color: rgba(255, 255, 255, 0.1);
    margin: var(--spacing-xs) 0;
    border-radius: var(--border-radius);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .dropdown-menu.show {
    max-height: 300px;
  }

  .dropdown-link {
    color: var(--color-blanco);
    padding: var(--spacing-sm) var(--spacing-lg);
  }

  .dropdown-link:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateX(0);
    padding-left: calc(var(--spacing-lg) + 10px);
  }

  .dropdown-trigger {
    width: 100%;
    justify-content: space-between;
  }

  .dropdown {
    width: 100%;
  }
}
</style>
