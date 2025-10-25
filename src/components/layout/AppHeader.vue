<!-- src/components/layout/Header.vue -->
<template>
  <header class="header">
    <!-- Franja decorativa wiphala -->
    <div class="container">
      <div class="header-content">
        <!-- Logo y título -->
        <div class="header-brand">
          <div class="logo">
            <div class="logo-placeholder">
              <img
                src="/images/community/chaicuriri.jpg"
                alt="Chaicuriri"
                srcset=""
                class="logo-img"
              />
            </div>
          </div>
          <div class="brand-text">
            <p class="community-subtitle">Comunidad</p>
            <h1 class="community-name">Chaicuriri</h1>
          </div>
        </div>

        <!-- Botón de menú móvil -->
        <button class="mobile-menu-btn" @click="$emit('toggle-menu')" aria-label="Abrir menú">
          <span class="hamburger"></span>
          <span class="hamburger"></span>
          <span class="hamburger"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  emits: ['toggle-menu'],
}
</script>

<style scoped>
.logo-placeholder {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  /* border: 1px solid var(--color-amarillo-andino); */
  display: flex;
  align-items: center;
  justify-content: center;

  /*background: linear-gradient(135deg, var(--color-verde-andino), var(--color-azul-andino));*/
}

@media (max-width: 768px) {
  .logo-placeholder {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 480px) {
  .logo-placeholder {
    width: 50px;
    height: 50px;
  }
}
.container {
  display: none;
}
.header {
  background: linear-gradient(135deg, var(--color-azul-andino) 0%, var(--color-verde-andino) 100%);
  color: var(--color-blanco);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow-medium);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) 0;
  gap: var(--spacing-md);
}

.header-brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex: 1;
}

.logo-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid var(--color-gris-claro);
  object-fit: cover;
}

.brand-text h1 {
  font-size: 2rem;
  margin: 0;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.community-subtitle {
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.9;
  font-style: italic;
}

.header-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  text-align: right;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: 0.9rem;
}

.icon {
  font-size: 1rem;
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.hamburger {
  width: 25px;
  height: 3px;
  background-color: var(--color-blanco);
  margin: 2px 0;
  transition: 0.3s;
  border-radius: 2px;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    padding: var(--spacing-sm) 0;
  }

  .brand-text h1 {
    font-size: 1.5rem;
  }

  .community-subtitle {
    font-size: 0.8rem;
  }

  .header-info {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .logo-img {
    width: 60px;
    height: 60px;
  }
  .container {
    display: block;
  }
}

@media (max-width: 480px) {
  .header-brand {
    gap: var(--spacing-sm);
  }

  .brand-text h1 {
    font-size: 1.3rem;
  }

  .logo-img {
    width: 45px;
    height: 45px;
  }
}
</style>
