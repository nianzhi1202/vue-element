import BaseModel from '../cores/model/BaseModel'
import Request from '../cores/request/request'

export default class Goods extends BaseModel {
    constructor(data = {}) {
        super(data)
        this.format = {
        }
    }

    static PermissionTest(params, fn) {
        Request.get('goodsPermission', {params: params}, ({type, data}, res) => {
            if (type === 'success') {
                console.log(res)
            }
            typeof fn === 'function' ? fn({res}) : ''
        })
    }
}
