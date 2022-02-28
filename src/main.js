import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'nes.css/css/nes.min.css'

createApp(App).use(createPinia()).mount('#app')
