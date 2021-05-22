import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './routers'
import store from './store'
import config from './configs/config'
import common from './cores/common/common' // 测试全局modal
import './configs/import'

Vue.use(VueAxios, axios)
Vue.use(VueCookies)
Vue.use(common)

Vue.config.productionTip = config.debug

// 从cookie中读取token
store.commit('setAccessToken', VueCookies.get('accessToken'), true)

Vue.config.errorHandler = (error, vm) => {
    if (config.env === 'dev') {
        console.log(error)
    }
}

Promise.all([
    import('./plugins/element.js')
]).then(() => {
    new Vue({
        store,
        router,
        render: h => h(App)
    }).$mount('#app')
})

export default router
// new Vue({
//   render: h => h(App),
//   router,
//   store
// }).$mount('#app')
