import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(MotionPlugin)

app.mount('#app')

import 'bootstrap/dist/js/bootstrap.js'
