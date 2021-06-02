let env = process.env.NODE_ENV

export default {
    appName: '测试',

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
                type: 'error',
                data: {
                    message: 'data.message'
                },
                items: {
                    status: 200, // axios自带的标准状态码
                    'data.status': 200, // api返回状态码（除了不可控的如500,404,和yii2封装返回401，...），其它api统一返回200，不使用标准状态码区分
                    'data.success': false
                }
            },
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
            }
        ],

        // 访问出错的处理函数
        // 这个时默认处理，如果在get或者post时传递了errorCb（第四个参数），则默认使用自定义处理，否则执行它
        errorCallBack(response, status, store) {
            if (status === 401) {
                store.commit('logout')
            }
        },

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
