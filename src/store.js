import Vue from 'vue'
import Vuex from 'vuex'
import state from './storeModules/state'
import mutations from './storeModules/mutations'
import actions from './storeModules/actions'
import getters from './storeModules/getters'

// 引用store
Vue.use(Vuex)

// 调试模式，禁止外部修改状态树,测试环境 true,生产环境 false
const debug = true

/**
 * 将vuex打包成外部文件的形式，避免单一文件代码量过多造成的维护问题
 * 这里只是简单的将四个核心字段外包出去，没有使用vuex的module概念
 * 因为开发具体业务场景的时候我们发现如果使用vuex的module，很多数据之间会交叉混用，需要频繁在不同的子状态数来回切换
 * 这样造成的结果是module和module之间耦合在一起了，并且该框架引入了model的概念，大多数方法会在各自的业务model中完成
 */
export default new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
    strict: debug
})
