import Vue from 'vue'
import permission from './permission'

// 权限指令
Vue.directive('permission-and', {
    update: (dom, update) => {
        update.def.bind(dom, update)
    },
    bind: (dom, binding) => {
        if (!permission.hasPermissionAnd(binding.value)) {
            dom.classList.add('wt-hide')
        } else {
            dom.classList.remove('wt-hide')
        }
    }
})

Vue.directive('permission-or', {
    update: (dom, update) => {
        update.def.bind(dom, update)
    },
    bind: (dom, binding) => {
        if (!permission.hasPermissionOr(binding.value)) {
            dom.classList.add('wt-hide')
        } else {
            dom.classList.remove('wt-hide')
        }
    }
})

Vue.directive('permission', {
    update: (dom, update) => {
        update.def.bind(dom, update)
    },
    bind: (dom, binding) => {
        // 没有权限则删除不显示
        if (!permission.hasPermission(binding.value)) {
            dom.parentNode && dom.parentNode.removeChild(dom)
        }
    },
    inserted: function (dom, binding) {
        // 没有权限则删除不显示
        if (!permission.hasPermission(binding.value)) {
            dom.parentNode && dom.parentNode.removeChild(dom)
        }
    }
})

/**
 * 反权限
 */
Vue.directive('permission-not', {
    update: (dom, update) => {
        update.def.bind(dom, update)
    },
    bind: (dom, binding) => {
        if (binding.value !== undefined && permission.hasPermission(binding.value)) {
            dom.classList.add('wt-hide')
        } else {
            dom.classList.remove('wt-hide')
        }
    }
})
