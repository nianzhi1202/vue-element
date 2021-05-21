import {modal, bodyModal} from './modal'

let _this
export default {

    install(Vue) {
        _this = this
        Vue.prototype.dataModal = modal
        Vue.prototype.showModal = this.showModal
    },

    /**
     * 展示模态框
     * @param store
     * @param {string} title 标题
     * @param {Component} view 内容，component实例
     * @param {string} size 大小
     * @param {function} onClose 关闭模态框回调
     * @param {$ObjMap} options，其他选项，在view组件中可以通过this.$store.state.modal.options获取
     */
    showModal({title, view, size, options, onClose, top}) {
        console.log('我是插件中的方法')
        title = title || ''
        size = size || '600px'
        options = options || {}
        top = top || '80px'
        _this.hideModal(false, false)
        setTimeout(function () {
            Object.assign(modal, {
                title: title,
                view: view,
                size: size,
                onClose: onClose,
                options: options,
                top: top,
                id: Math.random()
            })
        }, 100)
    },

    /**
     * 隐藏模态框
     * 手动调用该方法关闭模态框将不响应onClose方法
     * @param type
     * @param close 显示modal时需清除上一次modal信息，传false
     */
    hideModal(type = false, close = true) {
        typeof modal.onClose === 'function' && close ? modal.onClose(type) : ''
        Object.assign(modal, {
            title: '',
            view: undefined,
            size: '600px',
            id: undefined,
            onClose: undefined,
            options: {}
        })
    }
}
