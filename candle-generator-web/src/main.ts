import { createApp } from 'vue'
import VueApecHarts from 'vue3-apexcharts'
import App from './App.vue'
import store from './store'

createApp(App).use(store).use(VueApecHarts).mount('#app')
