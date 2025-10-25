// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css' // 👈 Agregar esta línea

createApp(App).use(router).mount('#app')
