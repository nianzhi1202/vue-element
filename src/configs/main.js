// 引入 element
import '../plugins/wt.icon.font.css'

// 引入iconfont
import '../plugins/element.js'

// 引入自定义指令-权限
import '../directive/permission/index'

// 引入Mock
import '../../mock/mock'

// 引入百度地图
import '../plugins/baiduMap.js'

let env = process.env.NODE_ENV

export default {
    appName: '易控2.0',

    // 调试模式
    debug: false,

    // 运行环境
    env: env === 'production' ? 'prod' : 'dev',

    // ui配置
    ui: {
        plugin: 'element'
    },

    // 图标配置
    icon: {
        // 默认大小
        defaultSize: '12px',
        // 默认左右两边间距
        defaultWeight: '5px',
        // 默认颜色
        defaultColor: '#99999'
    },

    // 接口配置
    api: {
        // 默认解析配置
        defaultMaps: [
            {
                type: 'success',
                data: {
                    message: 'data.message',
                    data: 'data.data',
                    item: 'data.data.item',
                    items: 'data.data.items',
                    page: 'data.data._meta'
                },
                items: {
                    status: 200,
                    'data.status': 200
                }
            },
            {
                type: 'error',
                data: {
                    message: 'data.message'
                },
                items: {
                    status: 200,
                    'data.success': false
                }
            }
        ],

        // 授权信息
        auth: {
            // 是否自动在header中添加授权校验信息
            autoAdd: true,
            // 授权header键名
            authName: 'Authorization',
            // 授权值模板，{token}表示具体的token值，将从store.state.user.getAccessToken()获取
            authTemplate: 'Bearer {token}'
        }
    }

}
