import Vue from 'vue'
import VueRouter from 'vue-router'
import TopLeftContentLayout from '../views/layout/TopLeftContent'
import TopLeftContent from './topLeftContent'
import ContentLayout from '../views/layout/Content'
import Content from './content'
import TopContent from './topContent'
import store from '../store'
import Permission from '../directive/permission/permission'
import User from '../models/User'

const TopContentLayout = () => import('@/views/layout/TopContent')

Vue.use(VueRouter)
// 去除多次点击路由重复
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/top-content',
            label: '无左侧的布局',
            children: TopContent,
            component: TopContentLayout
        },
        {
            path: '/content',
            label: '内容布局',
            children: Content,
            component: ContentLayout
        },
        {
            path: '/',
            label: '通用布局',
            children: TopLeftContent,
            component: TopLeftContentLayout
        }

    ]
})

router.beforeEach(async (to, from, next) => {
    // 登录后刷新页面时 重新获取权限和用户信息，刷新accessToken重新赋值不会丢失，但是isRefresh丢失（利用这点判断浏览器在刷新）
    if (store.state.accessToken && store.state.isRefresh === false) {
        await viewsUser()
    }

    // 已登录
    if (Vue.$cookies.get('accessToken') && to.path === '/site/login') {
        next({path: '/'})
    }

    // 已登录-没有权限则跳转到404页面
    if (Vue.$cookies.get('accessToken') && !Permission.hasPermission(to.meta.permission)) {
        next({path: '/error/not-allow'})
    }

    // 未登录状态
    if (to.path !== '/site/login' && Vue.$cookies.get('accessToken') === null) {
        User.logout()
        next({path: '/site/login'})
    }

    // 手动刷新accessToken存活时间（避免用户一直访问，但由于没刷新，还是被退出）
    store.commit('setAccessToken', store.state.accessToken)
    next()
})

function viewsUser() {
    return new Promise((resolve) => {
        User.viewsUser({type: 2}, ({type, data}) => {
            if (type === 'success') {
                store.commit('setIsRefresh', true)
                store.commit('setUserInfo', data.data)
                store.commit('setPermission', data.data.permissionList)
                resolve(true)
            } else {
                User.logout()
                resolve(false)
            }
        }, () => {
            User.logout()
            resolve(false)
        })
    })
}

export default router
