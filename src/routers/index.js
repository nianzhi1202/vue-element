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
    if (store.state.accessToken) { // 已登录
        if (to.path == '/site/login') {
            next({path: '/'})
        }
        // 登录后刷新页面时 重新获取权限和用户信息
        if (store.state.permission.length == 0) {
            await viewsUser()
        }
        // 没有权限则跳转到404页面
        if (!Permission.hasPermission(to.meta.permission)) {
            next({path: '/error/not-allow'})
        }
        next()
    } else { // 未登录
        if (to.path !== '/site/login') {
            store.commit('logout')
            next({path: '/site/login'})
        }
    }
})

function viewsUser() {
    return new Promise((resolve) => {
        User.viewsUser({type: 2}, ({type, data}) => {
            if (type === 'success') {
                store.commit('handleUserInfo', data.data)
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
