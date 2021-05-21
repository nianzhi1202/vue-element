import Vue from 'vue'
import VueRouter from 'vue-router'
import TopLeftContentLayout from '../views/layout/TopLeftContent'
import TopLeftContent from './topLeftContent'
import ContentLayout from '../views/layout/Content'
import Content from './content'
import TopContent from './topContent'
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
export default router
