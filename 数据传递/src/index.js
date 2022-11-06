import Vue from 'vue/dist/vue.esm'
import App from './App.vue'
import { eventExtend } from './extents'
eventExtend(Vue)
Vue.config.productionTip = false
new Vue({
    render: (h) => h(App)
}).$mount('#app')
