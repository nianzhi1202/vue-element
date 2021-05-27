import Vue from 'vue'
const vue = new Vue()

export default {

    /**
     * 批量修改状态值
     * @param {object} state vuex的状态数
     * @param {object} target 需要修改的目标对象
     * @param {object} data 修改的值，键值对，对应target需要修改的键值对
     */
    update(state, { target, data }) {
        for (const name in data) {
            Vue.set(target, name, data[name])
        }
    },

    updateKey(state, { keyName, data}) {
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
    login(state, { username, password }) {
        state.user.login({ username, password })
    },

    /**
     * 保存token
     * @param state
     * @param accessToken
     */
    setAccessToken(state, accessToken) {
        // accessToken会保存在cookies中，在里边null被保存为字符串的null，所以这里要判断一下
        accessToken = accessToken === 'null' ? undefined : accessToken
        accessToken = accessToken === 'undefined' ? undefined : accessToken
        state.accessToken = accessToken || undefined
        if (accessToken) {
            // let expire = state.checkedPwd ? -1 : '0';
            const expire = 3600
            vue.$cookies.set('accessToken', accessToken, expire)
        } else {
            vue.$cookies.remove('accessToken')
        }
    },

    handleUserInfo: (state, userInfo) => {
        state.userInfo = userInfo
        state.permission = userInfo.permissionList
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },

    logout() {
        // 不要再这里头做跳转，跳转的话会死循环
        this.commit('setAccessToken', undefined)
    },

    // 记住密码状态
    updateCheckedPwd(state, status) {
        state.checkedPwd = status
    },

    updateIndexPage(state, data) {
        this.state.indexPage = data || 1
    },

    updateCurrentRoute(state, data) {
        state.currentRoute = data
    }
}
