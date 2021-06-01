import Vue from 'vue'
import router from '../routers'

const vue = new Vue()

export default {

    /**
     * 批量修改状态值
     * @param {object} state vuex的状态数
     * @param {object} target 需要修改的目标对象
     * @param {object} data 修改的值，键值对，对应target需要修改的键值对
     */
    update(state, {target, data}) {
        for (const name in data) {
            Vue.set(target, name, data[name])
        }
    },

    updateKey(state, {keyName, data}) {
        state[keyName] = data
    },

    push(state, {target, data}) {
        for (const index in data) {
            target.push(data[index])
        }
    },
    /**
     * 登录
     * @param state
     * @param username
     * @param password
     */
    login(state, {username, password}) {
        state.user.login({
            username,
            password
        })
    },

    /**
     * 保存token
     * @param state
     * @param accessToken
     */
    setAccessToken(state, accessToken) {
        // accessToken会保存在cookies中，在里边null被保存为字符串的null，所以这里要判断一下
        accessToken = accessToken === 'null' ? null : accessToken
        accessToken = accessToken === 'undefined' ? null : accessToken
        state.accessToken = accessToken || null
        if (accessToken) {
            // let expire = state.checkedPwd ? -1 : '0';
            const expire = 3600 // 主要应该依赖后端api返回401来判断是否退出登录
            vue.$cookies.set('accessToken', accessToken, expire)
        } else {
            vue.$cookies.remove('accessToken')
        }
    },

    /**
     * 保存用户信息
     * @param state
     * @param userInfo
     */
    setUserInfo: (state, userInfo) => {
        state.userInfo = userInfo
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },

    /**
     * 保存权限信息
     * @param state
     * @param permissionList
     */
    setPermission: (state, permissionList) => {
        state.permission = permissionList
    },

    /**
     * 前端退出登录 - 接口返回401时调用
     * @param state
     */
    logout: (state) => {
        state.accessToken = null
        state.userInfo = []
        vue.$cookies.remove('accessToken')
        router.push('/site/login')
    },

    updateIndexPage(state, data) {
        this.state.indexPage = data || 1
    }

}
