const CarIndex = () => import('@/views/car/index')
const RobberyBusiness = () => import('@/views/robberyBusiness/index')
const ErrorNotFound = () => import('@/views/error/notFound')
const Index = () => import('@/views/index/index')
const Echarts = () => import('@/views/echarts/index')
const Map = () => import('@/views/map/index')

export default [
    {
        path: '/echarts/index',
        name: 'echarts使用',
        component: Echarts,
        meta: {
            breadcrumb: [
                {
                    name: 'echarts使用',
                    url: '/echarts/index'
                }
            ]
        }
    },
    {
        path: '/map/index',
        name: 'map使用',
        component: Map,
        meta: {
            breadcrumb: [
                {
                    name: 'map使用',
                    url: '/map/index'
                }
            ]
        }
    },
    {
        path: '/car/index',
        name: 'table列表',
        component: CarIndex,
        meta: {
            breadcrumb: [
                {
                    name: 'table列表',
                    url: '/car/index'
                }
            ]
        }
    },
    {
        path: '/robberyBusiness/index',
        name: '保单列表',
        component: RobberyBusiness,
        meta: {
            breadcrumb: [
                {
                    name: '保单列表',
                    url: '/robberyBusiness/index'
                }
            ]
        }
    },
    {
        path: '/',
        name: '首页',
        component: Index,
        meta: {}
    },
    // {
    //     path: '/error/not-allow',
    //     name: 'notAllow',
    //     label: '未授权访问',
    //     meta: {
    //         login: false,
    //     },
    //     component: ErrorNotAllow,
    // },
    {
        path: '*',
        name: '/error/not-found',
        label: '未找到页面',
        meta: {
            login: false
        },
        component: ErrorNotFound
    }
]
