import BaseModel from '../cores/model/BaseModel'
import Request from '../cores/request/request'
// import WtfDate from "../cores/helpers/WtfDate";

export default class Driver extends BaseModel {
    constructor(data = {}) {
        super(data)
        this.format = {
            code: {
                label: '设备号'
            },
            type: {
                label: '设备类型'
            },
            simcard_view: {
                label: '物联网卡号'
            },
            car_vin_code: {
                label: '车架号'
            },
            vin_code: {
                label: '车架号'
            },
            car_install_city: {
                label: '车辆所属城市'
            },
            car_license_plate: {
                label: '车牌号'
            },
            car_model: {
                label: '车型名称'
            },
            car_owner_name: {
                label: '车主姓名'
            },
            color: {
              label: '车辆颜色'
            },
            car_type: {
              label: '车辆类型'
            },
            period_type_view: {
                label: '服务年期'
            },
            period_start_time: {
                label: '服务开始时间'
            },
            period_end_time: {
                label: '服务结束时间'
            },
            period_time: {
                label: '服务期限'
            },
            setup_status: {
                label: '安装状态'
            },
            install_time: {
                label: '安装时间'
            },
            install_user: {
                label: '安装人'
            },
            install_place: {
              label: '安装位置'
            },
            install_channel: {
                label: '安装渠道'
            },
            status_view: {
                label: '维护状态'
            },
            store_view: {
                label: '所属门店'
            },
            delivery_time: {
                label: '到店日期'
            },
            running_status_view: {
                label: '运行状态'
            },
            uninstall_day_num: {
                label: '积压天数'
            },
            use_status_view: {
                label: '设备使用状态'
            },
            service_status: {
              label: '使用状态'
            },
            day_num: {
                label: '可用天数'
            },
            tags2: {
                label: '设备标签'
            },
            client_remark: {
              label: '备注'
            },
            model: {
                label: '设备型号'
            },
            direction: {
                label: '设备方向'
            },
            position_type: {
                label: '定位类型'
            },
            running_status: {
                label: '运行状态'
            },
            status_time: {
              label: '状态时间'
            },
            speed: {
                label: '速度（单位km/h）'
            },
            signal_time: {
                label: '信号时间'
            },
            address: {
                label: '地址信息'
            },
            longitude: {
                label: '经度'
            },
            latitude: {
               label: '纬度'
            },
            driver_info: {
                label: '设备信息'
            },
            car_info: {
                label: '车辆信息'
            },
            period_info: {
                label: '服务信息'
            },
            install_info: {
                label: '安装信息'
            },
            more_info: {
                label: '其他信息'
            },
            status_info: {
                label: '状态信息'
            },
            driver_tag: {
                label: '设备标签'
            }

        }
        this.updateData({
            driver_info: {
                code: {
                    icon: 'wt-icon-shebei',
                    label: this.getLabel('code'),
                    value: this.getValue('code')
                },
                type: {
                    icon: 'wt-icon-wuxian-copy',
                    label: '设备类型',
                    value: this.getValue('type')
                }
            },
            car_info: {
                vin_code: {
                    icon: 'wt-icon-cheliangguanli1',
                    label: this.getLabel('vin_code'),
                    value: this.getValue('vin_code')
                },

                license_plate_insure_name: {
                    icon: 'wt-icon-yonghu',
                    label: '车主/车牌号',
                    value: this.getValue('car_owner_name') + ' / ' + this.getValue('car_license_plate')
                }

            },
            period_info: {
                period_type_view: {
                    icon: 'wt-icon-cheliangguanli1',
                    label: '服务年期',
                    value: this.getValue('period_type_view')
                },
                period_start_time: {
                    icon: 'wt-icon-rili',
                    label: '服务开始时间',
                    value: this.getValue('period_start_time')
                },
                period_end_time: {
                    icon: 'wt-icon-rili',
                    label: '服务结束时间',
                    value: this.getValue('period_end_time')
                }
            },
            install_info: {
                setup_status_view: {
                    icon: 'wt-icon-zhuangtai',
                    label: '安装状态',
                    value: this.getValue('setup_status')
                },
                install_time: {
                    icon: 'wt-icon-rili',
                    label: '安装时间',
                    value: this.getValue('install_time')
                }
            },
            more_info: {
                store_view: {
                    icon: 'wt-icon-mendian',
                    label: '门店',
                    value: this.getValue('store_view')
                },
                delivery_time: {
                    icon: 'wt-icon-rili',
                    label: '到店日期',
                    value: this.getValue('delivery_time')
                }
            },
            status_info: {
                running_status_view: {
                    icon: 'wt-icon-zhuangtai',
                    label: '运行状态',
                    value: this.getValue('running_status_view')
                },
                duration: {
                    icon: 'wt-icon-naozhong-o',
                    label: '持续时长',
                    value: this.data.status_time != null ? '' : ''
                },
                signal_time: {
                    icon: 'wt-icon-rili',
                    label: '定位时间',
                    value: this.data.signal_time
                }
            },
            driver_tag: {
                value: {
                    id: this.getValue('id'),
                    value: this.getValue('tags2')
                }
            },
            href_info: {
                id: this.getValue('id'),
                setup_status: this.getValue('setup_status')
            }
        })
    }

    static DriverList(params, fn) {
        Request.get('driverList', {params: params}, ({type, data}, res) => {
                let result = []
                if (type === 'success') {
                    result = this.instanceList(res.data.data.items)
                }
                typeof fn === 'function' ? fn({type, result}, data.page) : ''
        })
    }

    static UnusedIndex(params, fn) {
        Request.get('unUsedList', {params: params}, ({type, data}, res) => {
            let result = []
            if (type === 'success') {
                result = this.instanceList(res.data.data.items)
            }
            typeof fn === 'function' ? fn({type, result}, data.page) : ''
        })
    }

    /**
     * 设备详情
     */
    static getView(params, fn) {
        Request.get('driverView', {params: params}, ({type, data}, res) => {
            console.log(res)
            fn({type, data})
        })
    }

    /**
     * 批量获取设备信息
     */
    static getData(params, fn) {
        Request.post('driverData', {params: params}, ({type, data}, res) => {
            console.log(res)
            fn({type, data})
        })
    }

    static UnInstallList(params, fn) {
        Request.get('unInstallList', {params: params}, ({type, data}, res) => {
            let result = []
            if (type === 'success') {
                result = this.instanceList(res.data.data.items)
            }
            typeof fn === 'function' ? fn({type, result}, data.page) : ''
        })
    }

    static RenewList(params, fn) {
        const options = {
            params: params
        }
        Request.get('renewList', options, ({type, data}, res) => {
            let result = []
            if (type === 'success') {
                result = this.instanceList(res.data.data.items)
            }
            typeof fn === 'function' ? fn({type, result}, data.page) : ''
        })
    }

    static DriverShift(params, fn) {
        Request.post('driver_shift', {params: params}, ({type, data}, res) => {
            console.log(res)

            typeof fn === 'function' ? fn({type, data}) : ''
        })
    }

    static DriverShiftV2(params, fn) {
        Request.post('driver_shift_v2', {params: params}, ({type, data}, res) => {
            console.log(res)

            typeof fn === 'function' ? fn({type, data}) : ''
        })
    }

    static DriverChange(params, fn) {
        Request.post('driver_change', {params: params}, ({type, data}, res) => {
            console.log(res)

            typeof fn === 'function' ? fn({type, data}) : ''
        })
    }

    static DriverUpdateTags(params, fn) {
        Request.post('driver_update_tags', {params: params}, ({type, data}, res) => {
            console.log(res)

            typeof fn === 'function' ? fn({type, data}) : ''
        })
    }

   static BindCar(params, fn) {
       Request.post('bind_car', {params: params}, ({type, data}, res) => {
            console.log(data)
            typeof fn === 'function' ? fn({type, res}) : ''
        })
    }

    // 获取中文地址
    static loadAddress(params, fn) {
        Request.get('loadAddress', {params: params}, ({type, data}) => {
            typeof fn === 'function' ? fn({type, data}) : ''
        })
    }

    getIcon() {
        return 'https://yikong-v2.oss-cn-shanghai.aliyuncs.com/map/status_car_icons/' + this.data.type + '_' + this.data.running_status + '.png'
    }

    getContent(button) {
        const list = [
             'code', 'model', 'type', 'direction', 'position_type', 'running_status', 'speed', 'signal_time', 'address'
        ]
        const content = {}
        let value = ''
        for (const index in list) {
            value = this.getValue(list[index])
            if (value === null || value === undefined || value === 'null' || value === 'undefined' || value === '') {
                value = '无'
            }

            content[this.getLabel(list[index])] = value
        }

        content.button = button
        console.log(content)
        return content
    }

    /**
     * 定位监控接口 设备列表
     * @param params
     * @param fn
     */
    static loadList(params, fn) {
        Request.get('driverList', { params: params}, ({ type, data }, res) => {
            console.log(res)
            fn({type, data})
        })
    }

    /**
     * 设备状态实时获取
     * @param params
     * @param fn
     */
    static loadCarStatus(params, fn) {
        Request.post('driverStatusRefresh', {params: params}, ({type, data}, res) => {
            console.log(res)
            typeof fn === 'function' ? fn({type, data}) : ''
        })
    }

    static InstallDriver(params, fn) {
        Request.get('installDriver', {params: params}, ({type, data}, res) => {
            let result = []
            if (type === 'success') {
                result = this.instanceList(res.data.data.items)
            }
            typeof fn === 'function' ? fn({type, result}, data.page) : ''
        })
    }

    /**
     * 删除标签
     * @param params
     * @param fn
     * @constructor
     */
    static RemoveTags(params, fn) {
        Request.get('removeTags', {params: params}, ({type, data}, res) => {
            console.log(res, data)
            typeof fn === 'function' ? fn({type}) : ''
        })
    }

    /**
     * 获取车辆信息
     * @param params
     * @param fn
     */
    static getCarPosition(params, fn) {
        Request.post('driverStatus', {params: params}, ({type, data}) => {
            typeof fn === 'function' ? fn({type, data}) : ''
        })
    }

    static getCarPositionNew(params, fn) {
        Request.get('driverStatusNew', {params: params}, ({type, data}) => {
            typeof fn === 'function' ? fn({type, data}) : ''
        })
    }

    /**
     * 获取车辆安装设备的图片
     * @param params
     * @param fn
     */
    static driverImg(params, fn) {
        Request.get('driverImg', {params: params}, ({type, data}) => {
            fn({type, data})
        })
    }

    static driverBatchStatus(params, fn) {
        Request.post('driverBatchStatus', {params: params}, ({type, data}) => {
            typeof fn === 'function' ? fn({type, data}) : ''
        })
    }
}
