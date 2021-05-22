import permission from '../directive/permission/permission'

const routerList = [
    {
        url: '/echarts/index',
        icon: 'wt-icon-fasong',
        name: 'Echarts',
        // permission: '客户端_V2_驾驶舱',
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
        name: 'table列表',
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
                name: '列表',
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
        name: '工单管理',
        children: [
            {
                url: '/order-v2/create',
                icon: 'wt-icon-xinzenggongdan',
                name: '新增工单',
                children: []
            },
            {
                url: '/order/quickCreate',
                icon: 'wt-icon-kuaijiexiadan',
                name: '快捷下单',
                children: []
            },
            {
                url: '/order/index',
                icon: 'wt-icon-gongdanguanli',
                name: '工单列表',
                children: []
            },
            {
                url: '/order/config/index',
                icon: 'wt-icon-shezhi',
                name: '常用联系人',
                children: []
            }
        ]
    },
    {
        url: '',
        icon: 'wt-icon-jinggao',
        name: '报警管理',
        children: [
            {
                url: '/warningMessage/list',
                icon: 'wt-icon-baojing',
                name: '报警汇总',
                children: []
            },
            {
                url: '/warningMessage/index',
                icon: 'wt-icon-baojingmingxichaxun',
                name: '报警明细',
                children: []
            }
        ]
    },
    {
        url: '',
        icon: 'wt-icon-zhexiantu',
        name: '增值服务',
        children: [
            {
                url: '/robbery-business-anji/index',
                icon: 'wt-icon-zhengmingshenqing1',
                name: '证明函',
                children: []
            },
            {
                url: '/robberyBusiness/index',
                icon: 'wt-icon-zhengmingshenqing1',
                name: '证明函',
                children: []
            },
            {
                url: '/mortgage/index',
                icon: 'wt-icon-chaichandiya',
                name: '办理抵押',
                children: []
            },
            {
                url: '/mortgage-v2/index',
                icon: 'wt-icon-chaichandiya',
                name: '办理抵押',
                children: []
            },
            {
                url: '/visit/index',
                icon: 'wt-icon-jiafang',
                name: '家访业务',
                children: []
            }
        ]
    },
    {
        url: '',
        icon: 'wt-icon-zhuzhuangtu',
        name: '报表中心',
        children: [
            {
                url: '/report/mileage',
                icon: 'wt-icon-licheng',
                name: '里程汇总',
                children: []
            },
            {
                url: '/report/mileage_detail',
                icon: 'wt-icon-lichengmingxi_F',
                name: '里程明细',
                children: []
            },
            {
                url: '/report/park',
                icon: 'wt-icon-tingche1',
                name: '历史停车',
                children: []
            },
            {
                url: '/report/real_park',
                icon: 'wt-icon-tingche',
                name: '实时停车',
                children: []
            },
            {
                url: '/report/offline',
                icon: 'wt-icon-lishilixian',
                name: '历史离线',
                children: []
            },
            {
                url: '/report/real_offline',
                icon: 'wt-icon-shishilixian',
                name: '实时离线',
                children: []
            },
            {
                url: '/report/stop',
                icon: 'wt-icon-tingchedian',
                name: '常停点',
                children: []
            },
            {
                url: '/report/install_driver',
                icon: 'wt-icon--anzhuangtongjibiao-xuanzhong',
                name: '安装统计',
                children: []
            },
            {
                url: '/report/interregional_alarm',
                icon: 'wt-icon-jinggao',
                name: '跨区报警',
                children: []
            },
            {
                url: '/report/address_alarm',
                icon: 'wt-icon-bingzhuangtu',
                name: '地址异常',
                children: []
            },
            {
                url: '/report/risk',
                icon: 'wt-icon-baojing',
                name: '黑区报警',
                children: []
            },
            {
                url: '/output-data-chery/index',
                icon: 'wt-icon-jilu',
                name: '奇瑞数据导出',
                children: []
            },
            {
                url: '/wireless-risk-point/index',
                icon: 'wt-icon-rizhi',
                name: '无线设备风险记录',
                children: []
            },
            {
                url: '/report/install-mileage',
                icon: 'wt-icon-rizhi',
                name: '运营里程报表',
                children: []
            },
            {
                url: '/export_report_task/index',
                icon: 'wt-icon-jilu',
                name: '导出任务',
                children: []
            }
        ]
    },
    {
        url: '',
        icon: 'wt-icon-shezhi',
        name: '系统设置',
        children: [
            {
                url: '/store/index',
                icon: 'wt-icon-mendianguanli',
                name: '门店管理',
                children: []
            },
            {
                url: '/user/index',
                icon: 'wt-icon-yonghuguanli',
                name: '用户管理',
                children: []
            },
            {
                url: '/rule/index',
                icon: 'wt-icon-shezhi',
                name: '报警规则',
                children: []
            },
            {
                url: '/robbery-business-anji/driver-check',
                icon: 'wt-icon-shebei',
                name: '安吉设备检测',
                children: []
            }
        ]
    },
    {
        url: '',
        icon: 'wt-icon-jilu',
        name: '系统日志',
        children: [
            {
                url: '/driver-order-issue-records/index',
                icon: 'wt-icon-rizhi',
                name: '指令日志',
                children: []
            }
        ]
    },
    {
        url: '',
        icon: 'wt-icon-jilu',
        name: '拖车管理',
        children: [
            {
                url: '/trailer/trailerUser',
                icon: 'wt-icon-yonghuguanli',
                name: '拖车账号',
                children: []
            },
            {
                url: '/trailer/trailerTask',
                icon: 'wt-icon-jilu',
                name: '拖车任务',
                children: []
            }
        ]
    },
    {
        url: '',
        icon: 'wt-icon-fasong',
        name: '逾期管理',
        children: [
            {
                url: '/car_violate/index',
                icon: 'wt-icon-rizhi',
                name: '逾期总览',
                children: []
            }
        ]
    },
    {
        url: '',
        icon: 'wt-icon-shebei',
        name: '资方管理',
        children: [
            {
                url: '/management/index',
                icon: 'wt-icon-rizhi',
                name: '我分享的设备',
                children: []
            },
            {
                url: '/management/index-v2',
                icon: 'wt-icon-rizhi',
                name: '分享致我的设备',
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
