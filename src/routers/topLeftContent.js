const CarIndex = () => import('@/views/car/index')
const RobberyBusiness = () => import('@/views/robberyBusiness/index')
const ErrorNotFound = () => import('@/views/error/notFound')
const Index = () => import('@/views/index/index')
const Echarts = () => import('@/views/echarts/index')
const Map = () => import('@/views/map/index')
const Images = () => import('@/views/images/index')
const GoodsCreate = () => import('@/views/goods/create')
const ErrorNotAllow = () => import('@/views/error/notAllow')

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
        name: '列表',
        component: CarIndex,
        meta: {
            permission: '客户_中都客户管理员',
            breadcrumb: [
                {
                    name: '列表',
                    url: '/car/index'
                },
                {
                    name: 'table列表',
                    url: '/car/index'
                }
            ]
        }
    },
    {
        path: '/images/index',
        name: '文件上传',
        component: Images,
        meta: {
            breadcrumb: [
                {
                    name: '文件上传',
                    url: ''
                },
                {
                    name: '文件上传与预览',
                    url: ''
                }
            ]
        }
    },
    {
        path: 'goods/create',
        name: '新增商品',
        component: GoodsCreate,
        meta: {
            permission: '客户_中都客户管理员',
            breadcrumb: [
                {
                    name: '商品管理',
                    url: 'goods/index'
                },
                {
                    name: '新增商品',
                    url: 'goods/create'
                }
            ]
        }
    },
    {
        path: '/goods/form',
        name: '商品管理',
        component: GoodsCreate,
        meta: {
            permission: '客户_中都客户管理员_无权',
            breadcrumb: [
                {
                    name: '新增商品',
                    url: '/goods/create'
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
    {
        path: '/error/not-allow',
        name: '未授权访问',
        component: ErrorNotAllow,
        meta: {}
    },
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
