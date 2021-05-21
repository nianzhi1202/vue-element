import BaseModel from '../cores/model/BaseModel'
import Request from '../cores/request/request'

export default class Store extends BaseModel {
    constructor(data = {}) {
        super(data)
        this.format = {
            name: {
                label: '名称'
            },
            contacts: {
                label: '门店联系人'
            },
            phone: {
                label: '联系方式'
            },
            address: {
                label: '门店地址'
            },
            customer_id: {
                label: '客户名称'
            },
            parent_id: {
                label: '上级门店'
            },
            parent_id_view: {
                label: '上级门店'
            },
            store_add_detail: {
                label: '详细地址'
            },
            remark: {
                label: '备注'
            },
            install_num: {
                label: '已安装设备'
            },
            no_install_num: {
                label: '未安装设备'
            },
            driver_num: {
                label: '设备数量(已安装/未安装)',
                value: () => {
                    return `<span>${this.data.install_num}<span class="no-data"> / </span>${this.data.no_install_num}</span>`
                }
            },
            link_ratio: {

                label: '设备在线率'
            },
            user_num: {
                label: '用户数量'
            },
            basis_info: {
                label: '基础信息'
            },
            create_time: {
              label: '注册时间'
            }
        }

        this.rules = [
            { attribute: 'name', validate: 'Required' },
            { attribute: 'contacts', validate: 'Required' },
            { attribute: 'phone', validate: 'Required' },
            { attribute: 'address', validate: 'String' },
            { attribute: 'remark', validate: 'String', options: { max: 255 } }
        ]
        this.updateData({
            basis_info: {
                name: {
                    icon: 'wt-icon-equipment',
                    label: '名称',
                    value: this.getValue('name')
                },
                contacts: {
                    icon: 'wt-icon-yonghu',
                    label: '联系人/联系电话',
                    value: this.getValue('contacts') + ' / ' + this.getValue('phone')
                }
            }
        })
    }

    static create(params, fn) {
        Request.post('storeCreate', { params: params}, ({type, data}, res) => {
            console.log(res)
            typeof fn === 'function' ? fn({type, data}) : ''
        })
    }

    static update(id, params, fn) {
        const url = Request.getUrlForName('storeUpdate').url + id
        Request.post(url, { params: params}, ({type, data}, res) => {
            console.log(res)
            typeof fn === 'function' ? fn({type, data}) : ''
        })
    }

    static loadList(params, fn) {
        Request.get('storeList', { params: params }, ({ type, data }, res) => {
            console.log(res)
            fn({type, data})
        })
    }

    // 三级门店树接口
    static loadTree(params, fn) {
        Request.get('storeTree', { params: params }, ({ type, data }, res) => {
            console.log(res)
            fn({type, data})
        })
    }

    /**
     *门店详情接口
     */
    static viewsUser(params, fn) {
        Request.get('storeView', {params: params}, ({type, data}, res) => {
            console.log(res)

            typeof fn === 'function' ? fn({type, data}) : ''
        })
    }

    static storeIndex(params, fn) {
        Request.get('storeIndex', {params: params}, ({type, data}, res) => {
            console.log(res)
            let result = []
            if (type === 'success') {
                result = this.instanceList(data.items)
            }
            typeof fn === 'function' ? fn({result}, data.page) : ''
        })
    }

    static loadChildrenList(params, fn) {
        Request.get('storeTreeList', {params: params}, ({type, data}) => {
            if (type === 'success') {
                data.models = this.instanceList(data.items)
            }
            typeof fn === 'function' ? fn({type, data}) : ''
        })
    }
}
