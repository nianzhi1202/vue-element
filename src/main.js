import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './routers'
import store from './store'
import main from './configs/main'
import common from './cores/common/common'

Vue.use(VueAxios, axios)
Vue.use(VueCookies)
Vue.use(common)

Vue.config.productionTip = false

// 从cookie中读取token
store.commit('setAccessToken', VueCookies.get('accessToken'), true)

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
