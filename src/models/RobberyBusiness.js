import BaseModel from '../cores/model/BaseModel'
import Request from '../cores/request/request'

export default class RobberyBusiness extends BaseModel {
    constructor(data = {}) {
        super(data)

        this.format = {
            insure_name: {
                label: '车主'
            },
            insure_type: {
                label: '车主类型'
            },
            certificate_type: {
                label: '证件类型'
            },
            id_card: {
                label: '证件号'
            },
            phone: {
                label: '手机号'
            },
            district: {
                label: '联系地址'
            },
            address: {
                label: '详细地址'
            },
            vin_code: {
                label: '车架号'
            },
            license_plate: {
                label: '车牌号'
            },
            register_time: {
                label: '车辆登记日期'
            },
            car_model: {
                label: '车辆型号'
            },
            engine_number: {
                label: '发动机号'
            },
            price: {
                label: '新车价格'
            },
            gps_model: {
                label: 'GPS设备号'
            },
            install_time: {
                label: 'GPS安装日期'
            },
            start_time: {
                label: '开始时间',
                value: () => {
                    if (!this.data.end_time && this.data.start_time) {
                        return ''
                    }
                    return this.data.start_time
                }
            },
            term_date: {
                label: '服务期限'
            },
            beneficiary: {
                label: '第一受益人'
            },
            bamages: {
                label: '赔偿金额'
            },
            application_num: {
                label: '申请编号'
            },
            store_id: {
                label: '门店'
            },
            status: {
                label: '状态',
                value: () => {
                    return this.data.status
                }
            },
            status_view: {
              label: '状态',
                value: () => {
                    return this.data.status_view
                }
            },
            remark: {
                label: '备注信息'
            },
            file_path: {
                label: '附件'
            },
            policy_num: {
                label: '编号'
            },
            insure_number: {
                label: '保单号'
            },
            is_see_detail: {
                label: '是否查看详情'
            },
            safe_price: {
                label: '保障服务费'
            },
            end_time: {
                label: '终保日期'
            },
            store_list: {
                label: '编号/门店名称'
            },
            car_list: {
                label: '车辆信息'
            },
            driver_list: {
                label: '设备信息'
            },
            term_list: {
                label: '期限'

            },
            store_view: {
                label: '门店'
            },
            beneficiary_list: {
                label: '受益人/赔偿金额'
            },
            file_name: {
              label: '附件名称'
            },
            file_list: {
                label: '附件'
            },

            create_time: {
                label: '新增时间'
            }

        }
        this.updateData({
            store_list: {
                policy_num: {
                    icon: 'wt-icon-equipment',
                    label: this.getLabel('policy_num'),
                    value: this.getValue('policy_num')
                },
                store_id: {
                    icon: 'wt-icon-mendianguanli',
                    url: {query: this.getValue('store_id'), type: 'modal', name: 'store'},
                    label: this.getLabel('store_id'),
                    value: this.getValue('store_view')
                }

            },
            car_list: {
                vin_code_car_model: {
                    icon: 'wt-icon-cheliangguanli1',
                    label: '车架号/车型',
                    value: this.getValue('vin_code') + ' / ' + this.getValue('car_model')
                },

                license_plate_insure_name: {
                    icon: 'wt-icon-yonghu',
                    label: '车牌号/车主',
                    value: this.getValue('license_plate') + ' / ' + this.getValue('insure_name')
                }

            },
            driver_list: {
                gps_model: {
                    icon: 'wt-icon-shebei',
                    label: this.getLabel('gps_model'),
                    value: this.getValue('gps_model')
                },
                install_time: {
                    icon: 'wt-icon-rili',
                    label: this.getLabel('install_time'),
                    value: this.getValue('install_time')
                }
            },
            term_list: {
                term_date: {
                    label: this.getLabel('term_date'),
                    value: this.getValue('term_date_view')
                },
                expires: {
                    // value:this.getValue('start_time')+' 到 '+this.getValue('end_time'),
                    value: (() => {
                        const sTime = this.getValue('start_time')
                        const eTime = this.getValue('end_time')
                        if (!sTime || !eTime) {
                            return '无数据'
                        }
                        return `${sTime} 到 ${eTime}`
                    })()
                }

            },
            beneficiary_list: {
                beneficiary: {
                    icon: 'wt-icon-yonghu',
                    label: this.getLabel('beneficiary'),
                    value: this.getValue('beneficiary')
                },
                bamages: {
                    icon: 'wt-icon-qian',
                    label: this.getLabel('bamages'),
                    value: this.getValue('bamages')
                }

            }

        })
    }

    static robberyBusinessIndex(params, fn) {
        Request.get('robberyBusiness', {params: params}, ({type, data}, res) => {
            console.log(res)
            let result = []
            if (type === 'success') {
                result = this.instanceList(data.items)
            }
            typeof fn === 'function' ? fn({result}, data.page) : ''
        })
    }

    static getView(params, fn) {
        Request.get('robberyBusinessView', {params: params}, ({type, data}, res) => {
            console.log(res)
            fn({type, data})
        })
    }

    /**
     * 证明函新增
     * @param params
     * @param fn
     */
    static create(params, fn) {
        Request.post('robberyCreate', {params: params}, ({type, data}, res) => {
            console.log(res)
            fn({type, data})
        })
    }

    static draftCreate(params, fn) {
        Request.post('robberyDraftCreate', {params: params}, ({type, data}, res) => {
            console.log(res)
            fn({type, data})
        })
    }

    /**
    * 证明函修改
    * @param id
    * @param params
    * @param fn
    */
    static update(id, params, fn) {
        const url = Request.getUrlForName('robberyUpdate').url + id
        Request.post(url, {params: params}, ({type, data}, res) => {
            console.log(res)
            fn({type, data})
        })
    }

    /**
     * 证明函修改
     * @param id
     * @param params
     * @param fn
     */
    static draftUpdate(id, params, fn) {
        const url = Request.getUrlForName('robberyDraftUpdate').url + id
        Request.post(url, {params: params}, ({type, data}, res) => {
            console.log(res)
            fn({type, data})
        })
    }

    /**
     * 获取验证规则
     */
    static getRule(params, fn) {
        Request.get('robberyRule', {params: params}, ({type, data}, res) => {
            console.log(res)

            fn({type, data})
        })
    }
}
