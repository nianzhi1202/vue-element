import BaseModel from '../cores/model/BaseModel'
import Request from '../cores/request/request'

 export default class Goods extends BaseModel {
    constructor(data = {}) {
        super(data)
        this.format = {
        }
    }

    static Permission401(params, fn) {
        Request.get('goodsPermission', {params: params}, ({type, data}, res) => {
            if (type === 'success') {
                console.log(res)
            }
            typeof fn === 'function' ? fn({res}) : ''
        })
    }

    static Permission403(params, fn) {
        Request.get('goodsPermission1', {params: params}, ({type, data}, res) => {
            typeof fn === 'function' ? fn({type, data}, res) : ''
        })
    }
}
