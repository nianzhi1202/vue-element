import permission from '../directive/permission/permission'

const routerList = [
    {
        url: '/echarts/index',
        icon: 'wt-icon-fasong',
        name: 'Echarts',
        children: []
    },
    {
        url: '/map/index',
        icon: 'wt-icon-dingwei',
        name: '百度地图',
        children: []
    },
    {
        url: '/driver-map/index',
        icon: 'wt-icon-dingwei',
        name: '定位监控',
        children: []
    },
    {
        url: '',
        icon: 'wt-icon-lou',
        name: '列表',
        children: [
            {
                url: '/car/index',
                icon: 'wt-icon-cheliangguanli',
                name: 'table列表',
                children: []
            },
            {
                url: '/car/create',
                icon: 'wt-icon-cheliangguanli1',
                name: '列表12',
                children: []
            }
        ]
    },
    {
        url: '',
        icon: 'wt-icon-shebei',
        name: '文件上传',
        children: [
            {
                url: '/images/index',
                icon: 'wt-icon-equipment',
                name: '图片上传与预览',
                children: []
            },
            {
                url: '/driver/unused_index',
                icon: 'wt-icon-kucun',
                name: '文件上传',
                children: []
            }
        ]
    },
    {
        url: '',
        icon: 'wt-icon-caidan',
        name: '商品管理',
        children: [
            {
                url: '/goods/create',
                icon: 'wt-icon-xinzenggongdan',
                name: '新增商品',
                children: []
            },
            {
                url: '/goods/form',
                icon: 'wt-icon-xinzenggongdan',
                name: '无权新增',
                children: []
            }
        ]
    }
]

/**
 * 根据权限过滤菜单
 * @type {*[]}
 */
const menu = routerList.filter(router => {
    return permission.hasPermission(router.permission)
})

export default menu
