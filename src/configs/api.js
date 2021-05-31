import config from './config'

let baseUrl = '生产'
if (config.env === 'dev') {
    baseUrl = 'http://localhost:8080/'
}

export default {
    login: {
        url: baseUrl + 'v1/site/login'
    },

    tableList: {
        url: baseUrl + 'v1/table/index'
    },

    // 图片上传
    upload: {
        // url: 'http://106.14.9.89:6066/v1/upload/file-url'
        url: baseUrl + 'v1/upload/file-url'
    },
    // 获取引导页
    navigationPageGet: {
        url: baseUrl + 'v1/car2/index'
    },
    // 设备状态接口（请求java）
    driverStatus: {
        url: baseUrl + 'v1/driver/status'
    },
    // 设备最新信息
    driverStatusNew: {
        url: baseUrl + 'v1/driver/driver-status-new'
    },
    storeList: {
        url: baseUrl + 'v1/store/list'
    },
    // 设备状态实时获取
    driverStatusRefresh: {
        url: baseUrl + 'v1/driver/refresh-status'
    },
    // 保单列表
    robberyBusiness: {
        url: baseUrl + 'v1/robbery-business/index'
    },
    // 保单详情
    robberyBusinessView: {
        url: baseUrl + 'v1/robbery-business/view'
    },
    // 车辆列表接口
    carList: {
        url: baseUrl + 'v1/car/index'
    },
    // 设备列表接口
    driverList: {
        url: baseUrl + 'v1/driver/index'
    },
    // 用户详情接口
    userViews: {
        url: baseUrl + 'v1/user/view'
    },
    // 获取数据词典
    dataDict: {
        url: 'http://vue.api.com/v1/data-dict/dict'
    },
    // 用户退出
    logout: {
        url: baseUrl + 'v1/user/logout'
    },
    // 修改密码
    editPwd: {
        url: baseUrl + 'v1/user/edit'
    }
}
