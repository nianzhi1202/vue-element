const login = () => import('@/views/site/login')

export default [
    {
        path: '/site/login',
        name: '登录',
        component: login
    }
]
