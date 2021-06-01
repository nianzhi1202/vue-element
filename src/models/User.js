import BaseModel from '../cores/model/BaseModel'
import Request from '../cores/request/request'
import store from '../store'

class User extends BaseModel {
    constructor(data = {}) {
        super(data)
        this.format = {
            store_id: {
                label: '门店'
            },
            is_customer_admin: {
                label: '是否为管理员'
            },
            title: {
                label: '职位'
            },
            store_id_view: {
                label: '门店'
            },
            auth_item_name: {
              label: '角色'
            },
            username: {
                label: '账号'
            },
            password: {
                label: '密码'
            },
            name: {
                label: '用户名称'
            },
            phone: {
                label: '手机号'
            },
            remark: {
                label: '备注'
            },
            wechat: {
                label: '微信'
            },
            email: {
                label: '邮箱'
            },
            registered_residence: {
                label: '户籍地'
            },
            status: {
                label: '账号状态'
            },
            type: {
                label: '账号类型'
            },
            store_num: {
                label: '可管理门店数',
                value: () => {
                    var arr = []
                    if (this.data.store_num) {
                        for (const v in this.data.store_num) {
                            arr.push(this.data.store_num[v])
                        }
                    }
                    return arr
                }
            },
            oldPassword: {
                label: '旧密码'
            },
            newPassword: {
                label: '新密码'
            },
            rePassword: {
                label: '确认密码'
            },
            create_time: {
               label: '注册时间'
            }

        }

        this.rules = [
            {attribute: 'username', validate: 'String'},
            {attribute: 'username', validate: 'Required'},
            {attribute: 'password', validate: 'String', options: { min: 6, max: 16 }},
            {attribute: 'newPassword', validate: 'String', options: { min: 6, max: 16 }},
            {attribute: 'rePassword', validate: 'String', options: { min: 6, max: 16 }},
            {attribute: 'password', validate: 'Required'}
        ]
    }

    /**
     * 是否登录
     * @returns {null}
     */
    static isLogin() {
        return store.state.accessToken
    }

    /**
     * 登录
     * @param {object} params 参数
     * @param {function} fn 回调
     */
    static login(params, fn) {
        Request.post('login', { params: params }, ({type, data}, res) => {
            if (type !== 'success') {
                typeof fn === 'function' ? fn({type, data}, res) : ''
            } else {
                store.commit('setAccessToken', res.data.data.token)
                store.commit('setUserInfo', res.data.data.userInfo)
                store.commit('setPermission', res.data.data.userInfo.permissionList)
                typeof fn === 'function' ? fn({type, data}, res) : ''
            }
        })
    }

    /**
     *用户详情接口
     */
     static viewsUser(params, fn) {
        Request.get('userViews', {params: params}, ({type, data}, res) => {
            if (type === 'success') {
                console.log(res)
                // store.state.user.updateCustomerStore(res.data.data);
            }
            typeof fn === 'function' ? fn({type, data}) : ''
        })
    }

    /**
     * api退出登录
     * @param params
     * @param fn
     */
    static logout(fn) {
        Request.post('logout', {}, ({type}, res) => {
            if (type == 'success') {
                store.commit('setAccessToken', null)
                store.commit('setUserInfo', [])
                typeof fn === 'function' ? fn({type}, res) : ''
            }
        })
    }

    getUserInfo() {
        let userInfo = store.state.userInfo || localStorage.getItem('userInfo')
        if (!(userInfo instanceof Object)) {
            return JSON.parse(this.userInfo)
        }
        return userInfo
    }
}

export default User
