/* eslint-disable */
import Mock from 'mockjs'

/**
 * 列表
 */
Mock.mock('http://localhost:8080/v1/table/index?page=1&pageSize=20', {
    'success': true,
    'status': 200,
    'message': '成功',
    'data': {
        'items': [
            {
                'id': '222821',
                'goods_name': '有个蛋',
                'goods_name_icon': 'goods_name_icon',
                'goods_name_multiple': 'goods_name_multiple',
                'phone': '电话',
                'name': '名称',
                'name_or_1': 'name_or_1',
                'name_or_2': 'name_or_2',
                'phone_or_1': 'phone_or_1',
                'phone_or_2': '',

                'car_owner_id': '201966',
                'customer_id': 390,
                'store_id': 13860,
                'license_plate': '贵FDF579',
                'vin_code': 'LSVXZ65N9G2046174',
                'owner_name': '宋成芸 大众途观',
                'owner_phone': '',
                'home_address': null,
                'home_position': null,
                'company_address': null,
                'company_position': null,
                'owner_certificate_type': null,
                'id_card': '',
                'owner_type': 1,
                'type': null,
                'color': '',
                'running_status': 0,
                'frame_type': null,
                'engine_number': null,
                'manufacturer_name': null,
                'vehicle_level': null,
                'fuel_type': null,
                'production_year': null,
                'sell_name': null,
                'brand': null,
                'car_model': '',
                'grade': '99.200000000000003',
                'score': '99.299999999999997',
                'risk_grade': null,
                'risk_remark': '设备在60天内存在离线情况，最大离线时长1天。',
                'car_tags': null,
                'bank_number': null,
                'install_city': null,
                'tags': null,
                'remark': '',
                'ext_info': null,
                'deleted': 0,
                'create_id': 55067,
                'create_time': '2020-05-22 11:44:19',
                'update_id': null,
                'update_time': '2020-06-03 12:49:42',
                'admin_id': null,
                'admin_time': null,
                'status': 0,
                'install_time': '2020-06-03 12:49:43',
                'install_status': 2,
                'price': null,
                'register_time': null,
                'gender': null,
                'is_clearing': 0,
                'batch_driver_status': '正常',
                'car_category': 1,
                'customer_view': '中资国信（广州）融资租赁有限公司',
                'car_vin_code': 'cheji',
                'owner_id_card': '',
                'store_view': '深圳市中都汽车租赁有限公司',
                'type_view': '',
                'frame_type_view': '',
                'vehicle_level_view': '',
                'fuel_type_view': '',
                'store_id_view': '深圳市中都汽车租赁有限公司',
                'owner_type_view': '个人',
                'owner_certificate_type_view': '',
                'risk_grade_view': '正常',
                'install_status_view': '已安装',
                'code_list': 'LSVXZ65N9G2046174-贵FDF579',
                'risk_status': '',
                'children': [
                    {
                        'id': '26024383',
                        'name': null,
                        'code': '863014534291403',
                        'code_rev': '304192435410368',
                        'type': 1,
                        'model': 'M6',
                        'source': null,
                        'sn': null,
                        'imei': '863014534291403',
                        'chip_number': null,
                        'use_status': 1,
                        'usage_status': 2,
                        'setup_status': 2,
                        'status': 1,
                        'running_status': 2000,
                        'car_id': '222821',
                        'install_place': '正驾保险盒',
                        'install_time': '2020-06-03 12:49:42',
                        'install_channel': '工单',
                        'install_user': '贵州-安鹏林-18198235915',
                        'use_time': null,
                        'simcard_id': '2901786',
                        'customer_id': 390,
                        'store_id': '13860',
                        'service_id': '2847994',
                        'order_id': '103482',
                        'install_data': null,
                        'product_id': null,
                        'remark': null,
                        'client_remark': null,
                        'receiver_id': null,
                        'position_type': '00',
                        'speed': '0.00',
                        'direction': '北偏东9度',
                        'signal_time': '2020-09-09 14:15:13',
                        'status_time': '2020-09-09 11:37:41',
                        'position_time': '2020-09-09 11:38:11',
                        'longitude': '105.28529831689235000',
                        'latitude': '27.30869171702066800',
                        'last_position': null,
                        'move_status': 1,
                        'tags': null,
                        'tags2': null,
                        'work_mode': null,
                        'work_order': null,
                        'voltage': '12.654V',
                        'deleted': 0,
                        'create_id': 51146,
                        'create_time': '2020-03-16 15:10:26',
                        'update_id': null,
                        'update_time': '2020-10-23 03:41:49',
                        'admin_id': null,
                        'admin_time': null,
                        'elect': null,
                        'delivery_time': null,
                        'platform': 1,
                        'activation_time': null,
                        'line_img': 'http://uzh-res.oss-cn-beijing.aliyuncs.com/avatar/5ed72b9a4cc22.jpeg',
                        'install_place_img': 'http://uzh-res.oss-cn-beijing.aliyuncs.com/avatar/5ed72b9d6aafa.jpeg',
                        'period_type': 3,
                        'period_start_time': '2020-06-03',
                        'period_end_time': '2023-06-03',
                        'is_clearing': 0,
                        'ext_data': null,
                        'driver_code': '`863014534291403',
                        'status_time_view': '251天',
                        'car_license_plate': '贵FDF579',
                        'vin_code': '',
                        'car_vin_code': 'LSVXZ65N9G2046174',
                        'car_install_city': null,
                        'car_brand': null,
                        'color': '',
                        'car_model': '',
                        'car_type_view': '',
                        'car_owner_name': '宋成芸 大众途观',
                        'car_owner_phone': '',
                        'position_type_view': 'GPS',
                        'type_view': '有线',
                        'status_view': '正常',
                        'use_status_view': '启用',
                        'running_status_view': '离线',
                        'setup_status_view': '已安装',
                        'simcard_view': '1440078296251',
                        'simcard_code': '`1440078296251',
                        'store_view': '深圳市中都汽车租赁有限公司',
                        'address': '贵州省毕节市七星关区环城北路毕节一小内,毕节清华国中东南140米',
                        'period_type_view': '三年期',
                        'code_list': '863014534291403',
                        'tag': null,
                        'tag2': '',
                        'day_num': '746天',
                        'service_status': '即将到期',
                        'uninstall_day_num': ''
                    },
                    {
                        'id': '2607564',
                        'name': null,
                        'code': '14471513807',
                        'code_rev': '70831517441',
                        'type': 2,
                        'model': 'Q3S',
                        'source': null,
                        'sn': null,
                        'imei': '14471513807',
                        'chip_number': null,
                        'use_status': 1,
                        'usage_status': 2,
                        'setup_status': 2,
                        'status': 1,
                        'running_status': 1001,
                        'car_id': '222821',
                        'install_place': '正驾后门C柱饰板里面',
                        'install_time': '2020-06-03 12:49:43',
                        'install_channel': '工单',
                        'install_user': '贵州-安鹏林-18198235915',
                        'use_time': null,
                        'simcard_id': '2850235',
                        'customer_id': 390,
                        'store_id': '13860',
                        'service_id': '2847995',
                        'order_id': '103482',
                        'install_data': null,
                        'product_id': null,
                        'remark': null,
                        'client_remark': null,
                        'receiver_id': null,
                        'position_type': '02',
                        'speed': '0.00',
                        'direction': '北偏东12度',
                        'signal_time': '2020-09-08 16:19:35',
                        'status_time': '2020-09-08 16:19:35',
                        'position_time': '2020-09-08 16:19:27',
                        'longitude': '105.70640810000000000',
                        'latitude': '27.50775610000000000',
                        'last_position': null,
                        'move_status': 1,
                        'tags': null,
                        'tags2': null,
                        'work_mode': '01',
                        'work_order': null,
                        'voltage': '3.0881V',
                        'deleted': 0,
                        'create_id': 51146,
                        'create_time': '2020-03-23 09:54:53',
                        'update_id': null,
                        'update_time': '2020-10-23 03:29:03',
                        'admin_id': null,
                        'admin_time': null,
                        'elect': '91.67',
                        'delivery_time': null,
                        'platform': 1,
                        'activation_time': null,
                        'line_img': '',
                        'install_place_img': 'http://uzh-res.oss-cn-beijing.aliyuncs.com/avatar/5ed72ba18ae2e.jpeg',
                        'period_type': 3,
                        'period_start_time': '2020-06-03',
                        'period_end_time': '2023-06-03',
                        'is_clearing': 0,
                        'ext_data': null,
                        'driver_code': '`14471513807',
                        'status_time_view': '252天',
                        'car_license_plate': '贵FDF579',
                        'vin_code': '',
                        'car_vin_code': 'LSVXZ65N9G2046174',
                        'car_install_city': null,
                        'car_brand': null,
                        'color': '',
                        'car_model': '',
                        'car_type_view': '',
                        'car_owner_name': '宋成芸 大众途观',
                        'car_owner_phone': '',
                        'position_type_view': 'WIFI',
                        'type_view': '无线',
                        'status_view': '正常',
                        'use_status_view': '启用',
                        'running_status_view': '休眠',
                        'setup_status_view': '已安装',
                        'simcard_view': '1440084584700',
                        'simcard_code': '`1440084584700',
                        'store_view': '深圳市中都汽车租赁有限公司',
                        'address': '贵州省毕节市大方县白岩脚东北648米',
                        'period_type_view': '三年期',
                        'code_list': '14471513807',
                        'tag': null,
                        'tag2': '',
                        'day_num': '746天',
                        'service_status': '即将到期',
                        'uninstall_day_num': ''
                    }
                ],
                'driver_code': [
                    {
                        'code': '<span>863014534291403 ( 有线</span> )',
                        'status': '离线'
                    },
                    {
                        'code': '<span>14471513807 ( 无线 <span class=\'no-data\'> / </span> 闹钟模式</span> )',
                        'status': '休眠'
                    },
                    {
                        'code': '<span>863014534291403 ( 有线</span> )',
                        'status': '离线'
                    },
                    {
                        'code': '<span>14471513807 ( 无线 <span class=\'no-data\'> / </span> 闹钟模式</span> )',
                        'status': '休眠'
                    }
                ],
                'driver_count': 2,
                'bank_number_export': ''
            }
        ],
        '_links': {
            'self': {
                'href': 'http://106.14.9.89:6066/v1/car/index?page=1&pageSize=20&store_id=&is_clearing=0'
            },
            'first': {
                'href': 'http://106.14.9.89:6066/v1/car/index?page=1&pageSize=20&store_id=&is_clearing=0'
            },
            'last': {
                'href': 'http://106.14.9.89:6066/v1/car/index?page=39&pageSize=20&store_id=&is_clearing=0'
            },
            'next': {
                'href': 'http://106.14.9.89:6066/v1/car/index?page=2&pageSize=20&store_id=&is_clearing=0'
            }
        },
        '_meta': {
            'totalCount': 771,
            'pageCount': 39,
            'currentPage': 1,
            'perPage': 20
        }
    }
})

/**
 * 登录
 */
Mock.mock('http://localhost:8080/v1/site/login', {
    'success': true,
    'status': 200,
    'message': '登录成功',
    'data': {
        'token': 'SZTkt_uuU9LAbm2bsOQeu5EWu3oGwvo-',
        'userInfo': {
            'id': '55067',
            'parent_id': 1,
            'customer_id': '390',
            'store_id': '13860',
            'is_customer_admin': 1,
            'username': 'test',
            'name': 'test',
            'customer_logo': '',
            'short_name': 'test',
            'customer_id_view': '中资国信（广州）融资租赁有限公司',
            'store_id_view': '深圳市中都汽车租赁有限公司',
            'permissionList': [
                '客户_中都客户管理员',
                '客户端V2_门店管理员(无指令下发)'
            ],
            'auth_names': '客户_中都客户管理员, 客户端V2_门店管理员(无指令下发)',
            'status_view': '启用',
            'store_num': [
                '深圳市中都汽车租赁有限公司',
                '深圳易起信息科技有限公司',
                '汪阔'
            ],
            'stores': '深圳市中都汽车租赁有限公司, 深圳易起信息科技有限公司, 汪阔'
        },
        'defaultRouteV2': '/',
        'selfCarCount': 0
    }
})

/**
 * 用户详情 - 刷新页面时会重新获取用户信息
 */
Mock.mock('http://localhost:8080/v1/user/view?type=2', {
    'success': true,
    'status': 200,
    'message': '成功',
    'data': {
        'id': '51240',
        'parent_id': 1,
        'customer_id': '152',
        'store_id': '10479',
        'is_customer_admin': 1,
        'username': 'test',
        'name': '技术部使用',
        'phone': '19911111112',
        'remark': '1212',
        'status': 1,
        'deleted': 0,
        'title': '管理者',
        'qq': '33654455555',
        'wechat': 'jdjdn 技术监督局多久计算机技术就是亟待42342342342343243434234',
        'email': '',
        'registered_residence': 'VB宝宝',
        'role': null,
        'type': 1,
        'mark': null,
        'remain_search_nums': 0,
        'app_setting': null,
        'app_key': null,
        'app_secret': null,
        'create_id': 1,
        'create_time': '2018-10-26 17:05:03',
        'update_id': 51240,
        'update_time': '2021-03-12 10:13:03',
        'admin_id': null,
        'admin_time': null,
        'customer_logo': 'http://tianyibao.oss-cn-beijing.aliyuncs.com/customer/5e0494824ce73.jpe',
        'short_name': '易控测试',
        'customer_id_view': '易控各种用途测试',
        'store_id_view': '易控各种用途测试',
        'permissionList': [
            '客户_中都客户管理员',
            '客户端V2_门店管理员(无指令下发)'
        ]
    }
})

/**
 * 图片上传 - 模拟直接返回
 */
Mock.mock('http://localhost:8080/v1/upload/file-url', {
    'success': true,
    'status': 200,
    'message': '成功',
    'data': {
        'item': 'http://tianyibao.oss-cn-beijing.aliyuncs.com/order/60a8a3dc223aa.jpg'
    }
})

/**
 * 退出登录
 */
Mock.mock('http://localhost:8080/v1/user/logout', {
    'success': true,
    'status': 200,
    'message': '成功'
})

/**
 * 演示403
 */
Mock.mock('http://localhost:8080/v1/user/403', {
    'success': false,
    'status': 200,
    'message': '无权访问'
})
