import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

let vueApp = createApp(App)
vueApp.config.globalProperties.$http = axios

vueApp.use(store).use(router).mount('#app')
