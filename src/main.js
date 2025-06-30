import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '../style/main.css'
import router from './router'
import i18n from './i18n'

const app = createApp(App)
const pinia = createPinia()

// Install plugins in correct order
app.use(pinia)
app.use(router)
app.use(i18n)

// Set initial document language
document.documentElement.lang = i18n.global.locale.value

app.mount('#app')
