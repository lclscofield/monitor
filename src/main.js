import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import message from 'ant-design-vue/lib/message' // 全局提示
import 'ant-design-vue/lib/message/style/css'

let vueApp = createApp(App)
vueApp.config.globalProperties.$http = axios
vueApp.config.globalProperties.$message = message

vueApp.use(store).use(router).mount('#app')
