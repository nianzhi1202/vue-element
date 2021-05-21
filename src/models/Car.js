import BaseModel from '../cores/model/BaseModel'
import Request from '../cores/request/request'

export default class Car extends BaseModel {
    constructor(data = {}) {
        super(data)
        this.format = {
            id: {
                label: 'ID'
            },
            goods_name: {
                label: '名称'
            },
            goods_name_tag: {
                label: '名称',
                value: () => {
                    return {
                        goods_name_tag: {
                            tag: this.getValue('phone')
                        }
                    }
                }
            },
            goods_name_icon: {
                label: '名称带图标'
            },
            goods_name_multiple: {
                label: '多个名称'
            },
            name: {
                label: '姓名'
            },
            phone: {
                label: '电话'
            },
            name_or_phone: {
                label: '字段分隔'
            },
            name_or: {
                label: '字段1/字段2',
                value: () => {
                    let str = ''
                    str += !this.data.name_or_1 ? '-' : this.data.name_or_1
                    str += ' %/ '
                    str += !this.data.name_or_2 ? '-' : this.data.name_or_2
                    return str
                }
            },
            phone_or: {
                label: '字段3/字段4',
                value: () => {
                    let str = ''
                    str += !this.data.phone_or_1 ? '-' : this.data.phone_or_1
                    str += ' %/ '
                    str += !this.data.phone_or_2 ? '-' : this.data.phone_or_2
                    return str
                }
            },
            driver_code: {
                multiply: true,
                label: '可能多个popover',
                value: () => {
                    if (this.data.driver_code) {
                        let arr = []
                        for (let v of this.data.driver_code) {
                            arr.push({
                                icon: {
                                    name: 'wt-icon-dingwei',
                                    color: this.formatColor(v.status)
                                },
                                label: v.status,
                                value: v.code
                            })
                        }
                        return arr
                    }
                    return []
                }
            },
            user_link: {
                label: '跳转',
                value: () => {
                    return {
                        user_link: {
                            icon: 'wt-icon-yonghu',
                            label: this.getLabel('name'),
                            value: this.getValue('name'),
                            next_url: 'https://www.baidu.com'
                        }
                    }
                }
            },
            user_modal: {
                label: '点击弹出modal',
                value: () => {
                    return {
                        user_modal: {
                            icon: 'wt-icon-yonghu',
                            label: this.getLabel('name'),
                            value: this.getValue('name'),
                            next_url: 'modal'
                        }
                    }
                }
            }
        }

        this.updateModelData({
            // 带图标-多排 且 一排多个
            name_or_phone: {
                name_or: {
                    icon: 'wt-icon-yonghu',
                    label: this.getLabel('name_or'),
                    value: this.getValue('name_or')
                },
                phone_or: {
                    icon: 'wt-icon-shouji',
                    label: this.getLabel('phone_or'),
                    value: this.getValue('phone_or')
                }
            },
            // 带图标-多个数据-多排
            goods_name_multiple: {
                name: {
                    icon: 'wt-icon-yonghu',
                    label: this.getLabel('name'),
                    value: this.getValue('name')
                },
                phone: {
                    icon: 'wt-icon-shouji',
                    label: this.getLabel('phone'),
                    value: this.getValue('phone')
                }
            },
            // 带图标-一个数据
            goods_name_icon: {
                goods_name: {
                    icon: 'wt-icon-mendianguanli',
                    label: this.getLabel('goods_name_icon'),
                    value: this.getValue('goods_name_icon')
                }
            },
            // 不带图标-一个数据
            goods_name: {
                goods_name: {
                    label: this.getLabel('goods_name'),
                    value: this.getValue('goods_name')
                }
            }
        })
    }

    formatColor(data) {
        switch (data) {
            case '在线':
                return '#54C292'
            case '离线':
                return '#FF4951'
            case '静止':
                return '#54C292'
            case '休眠':
                return '#54C292'
            case '行驶':
                return '#54C292'
            default:
                return '#FF4951'
        }
    }

    static CarIndex(params, fn) {
        Request.get('tableList', {params: params}, ({type, data}, res) => {
            let result = []
            if (type === 'success') {
                result = this.instanceList(data.items)
            }
            console.log(result)
            typeof fn === 'function' ? fn({result}, data.page) : ''
        })
    }

    static carSubmitForm(params, fn) {
        Request.post('carCreate', {params: params}, ({type, data}, res) => {
            console.log(res)
            fn({type, data})
        })
    }

    static driverSubmitForm(params, fn) {
        Request.get('carDriverData', {params: params}, ({type, data}, res) => {
            typeof fn === 'function' ? fn({type, data}, res) : ''
        })
    }

    /**
     * 车辆修改
     */
    static carUpdate(id, params, fn) {
        const url = Request.getUrlForName('carUpdate').url + '?id=' + id
        Request.post(url, {params: params}, ({type, data}, res) => {
            console.log(res)
            fn({type, data})
        })
    }

    /**
     * 获取定位监控的车辆信息
     * @param params
     * @param fn
     */
    static loadList(params, fn) {
        Request.get('carList', {params: params}, ({type, data}, res) => {
            console.log(res)
            fn({type, data})
        })
    }

    /**
     * 车辆详情
     * @param params
     * @param fn
     */
    static carView(params, fn) {
        Request.get('carView', {params: params}, ({type, data}, res) => {
            console.log(res)
            data = data.data
            fn({type, data})
        })
    }

    /**
     * 车辆出行时间
     * @param params
     * @param fn
     */
    static carTripTime(params, fn) {
        Request.get('tripTime', {params: params}, ({type, data}, res) => {
            console.log(res)

            fn({type, data})
        })
    }

    /**
     * 风险记录
     */
    static carRiskRecords(params, fn) {
        Request.get('riskRecords', {params: params}, ({type, data}, res) => {
            fn({type, data})
            console.log(res)
        })
    }

    static carMonitor(params, fn) {
        Request.get('monitor', {params: params}, ({type, data}, res) => {
            fn({type, data})
            console.log(res)
        })
    }

    /**
     * 车辆详情
     */
    static getView(params, fn) {
        Request.get('carView', {params: params}, ({type, data}, res) => {
            console.log(res)
            if (type === 'success') {
                data.model = new this(data.data)
            }
            fn({type, data})
        })
    }

    /**
     * 车主详情
     */
    static getOwnerView(params, fn) {
        Request.get('carOwnerView', {params: params}, ({type, data}, res) => {
            fn({type, data})
            console.log(res)
        })
    }

    /**
     * 获取车辆图片信息
     */
    static getCarImg(params, fn) {
        Request.get('carImg', {params: params}, ({type, data}, res) => {
            fn({type, data})
            console.log(res)
        })
    }

    /**
     * 车辆轨迹分布
     */
    static getCarTrack(params, fn) {
        Request.get('carTrack', {params: params}, ({type, data}, res) => {
            fn({type, data})
            console.log(res)
        })
    }

    /**
     * 停车分布/离线分布/常驻点
     */
    static getCarPoint(params, fn) {
        Request.get('carPoint', {params: params}, ({type, data}, res) => {
            fn({type, data})
            console.log(res)
        })
    }

    /**
     * 车辆评分
     */
    static VehicleScoring(params, fn) {
        Request.get('vehicleScoring', {params: params}, ({type, message}, res) => {
            let result = []
            console.log(message)
            if (type === 'success') {
                result = res.data.data
            }
            typeof fn === 'function' ? fn({result}) : ''
        })
    }

    /**
     * 删除车辆
     * @param params
     * @param fn
     */
    static carDelete(params, fn) {
        Request.delete('carDelete', {params: params}, ({type, data}, res) => {
            fn({type, data})
            console.log(res)
        })
    }

    /**
     * 车辆结清
     * @param params
     * @param fn
     */
    static carSettle(params, fn) {
        Request.post('carSettle', {params: params}, ({type, data}, res) => {
            fn({type, data})
            console.log(res)
        })
    }

    /**
     * 车辆标签
     * @param params
     * @param fn
     */
    static carTagList(params, fn) {
        Request.post('carTagsView', {params: params}, ({type, data}) => {
            fn({type, data})
        })
    }

    /**
     * 设置车辆标签
     * @param params
     * @param fn
     */
    static carAddTag(params, fn) {
        Request.post('carTags', {params: params}, ({type, data}) => {
            fn({type, data})
        })
    }

    /**
     * 车辆转移门店
     * @param params
     * @param fn
     */
    static carTransfer(params, fn) {
        Request.post('carTransfer', {params: params}, ({type, data}) => {
            fn({type, data})
        })
    }

    /**
     * 根据车架号查询车辆信息
     * @param params
     * @param fn
     */
    static searchByVin(params, fn) {
        Request.get('carSearchByVin', {params: params}, ({type, data}) => {
            fn({type, data})
        })
    }

    static carViolateTags(options, fn) {
        Request.post('carViolateTags', options, ({type, data}, res) => {
            typeof fn === 'function' ? fn({type, data}, res) : ''
        })
    }
}
