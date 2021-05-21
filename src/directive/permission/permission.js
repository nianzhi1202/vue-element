import store from '../../store'

export default class Permission {
    /**
     * 判断权限列表中是否有这个权限
     * @param name
     * @returns {boolean}
     */
    static hasPermission(name) {
        if (name == undefined) {
            return true
        } else {
            let permission = store.state.permission
            return permission.indexOf(name) !== -1
        }
    }

    static hasPermissionAnd(list) {
        let result = true
        let permission = store.state.permission
        for (let index in list) {
            result = result && permission.indexOf(list[index]) !== -1
            if (!result) {
                break
            }
        }
        return result
    }

    static hasPermissionOr(list) {
        let result = true
        let permission = store.state.permission
        for (let index in list) {
            result = permission.indexOf(list[index]) !== -1
            if (result) {
                break
            }
        }
        return result
    }

    /**
     * 权限判断
     * @param condition
     * @param permission
     * @returns {*}
     */
    static checkPermission({ condition, permission }) {
        let forbidden = {
            state: false,
            condition: undefined,
            permission: undefined
        }
        if (typeof permission === 'string') {
            if (!Permission.hasPermission(permission)) {
                forbidden = {
                    state: true,
                    condition: 'permission',
                    permission: permission
                }
            }
        }
        if (condition === 'permissionAnd' && typeof permission === 'object') {
            if (!Permission.hasPermissionAnd(permission)) {
                forbidden = {
                    state: true,
                    condition: 'permissionAnd',
                    permission: permission
                }
            }
        }
        if (condition === 'permissionOr' && typeof permission === 'object') {
            if (!Permission.hasPermissionOr(permission)) {
                forbidden = {
                    state: true,
                    condition: 'permissionOr',
                    permission: permission
                }
            }
        }
        store.commit('update', {
            target: store.state.forbidden,
            data: forbidden
        })
        return permission
    }

    /**
     * 刷新权限
     * @returns {undefined|Promise<any>|*|void}
     */
    static refreshPermission() {
        return Permission.checkPermission(store.state.forbidden)
    }
}
