<!-- src/App.vue -->
<template>
  <div id="app">
    <AppHeader @toggle-menu="toggleMobileMenu" />
    <AppNavigation :is-mobile-menu-open="isMobileMenuOpen" @close-menu="closeMobileMenu" />
    <main class="main-content">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/layout/AppHeader.vue'
import AppNavigation from './components/layout/AppNavigation.vue'
import AppFooter from './components/layout/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppNavigation,
    AppFooter,
  },
  data() {
    return {
      isMobileMenuOpen: false,
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false
    },
  },
}
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 0;
}
</style>
