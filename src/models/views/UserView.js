import User from '../User'
export default class UserView extends User {
    constructor(data = {}) {
        super(data)

        this.view = [
            {
                attribute: 'name'
            },
            {
                attribute: 'store_id_view'
            },
            {
                attribute: 'phone'
            },
            {
                attribute: 'registered_residence'
            },
            {
                attribute: 'title'
            },
            {
                attribute: 'auth_names'
            },
            {
                attribute: 'username'
            },
            {
                attribute: 'create_time'
            }

        ]
        this.format = {
            name: {
                label: '用户名称'
            },
            store_id_view: {
                label: '门店名称'
            },
            phone: {
                label: '联系电话'
            },
            registered_residence: {
                label: '户籍地'
            },
            title: {
                label: '职位'
            },
            auth_names: {
                label: '角色'
            },
            username: {
                label: '账号'
            },
            create_time: {
                label: '注册时间'
            }
        }
    }
}
