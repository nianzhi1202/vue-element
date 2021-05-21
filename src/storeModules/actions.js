// import Vue from 'vue';
// let vue = new Vue();
export default {
    /**
     * 全局消息提醒
     * @param store
     * @param {string} text 需要提醒的内容
     * @param {number} duration 提醒时长
     * @param {string} type 提醒的风格，默认是info，可能的值有：success/warning/info/error
     */
    showTip(store, { text, type, duration }) {
        type = type || 'info'
        duration = duration || 2000

        store.commit('update', {
            target: store.state.tip,
            data: {
                text: text,
                type: type,
                duration: duration,
                id: Math.random()
            }
        })
    },

    /**
     * 展示模态框
     * @param store
     * @param {string} title 标题
     * @param {Component} view 内容，component实例
     * @param {string} size 大小
     * @param {function} onClose 关闭模态框回调
     * @param {$ObjMap} options，其他选项，在view组件中可以通过this.$store.state.modal.options获取
     * @param top
     * @param show
     */
    // show
    // 把加载modal和显示modal分开（解决弹出modal时由于加载组件造成的闪动），先加载后显示，加载是通过监听id，显示是通过这个show
    // 闪动是由于数据未返回，modal中的列表就不会渲染导致，如果是form表单是不存在闪动的，所以modal中显示列表需要传递show：false
    // 一般modal中的数据加载完成后调用：this.$store.commit("update", {target:this.$store.state.modal,data:{show:true}});
    showModal(store, { title, view, size, options, onClose, top, show = true}) {
        title = title || ''
        size = size || '600px'
        options = options || {}
        top = top || '80px'

        store.commit('update', {
            target: store.state.modal,
            data: { onClose: undefined }
        })
        store.dispatch('hideModal')

        store.commit('update', {
            target: store.state.modal,
            data: {
                title: title,
                view: view,
                size: size,
                onClose: onClose,
                options: options,
                top: top,
                show: show,
                id: Math.random()
            }
        })
    },

    /**
     * 隐藏模态框
     * 手动调用该方法关闭模态框将不响应onClose方法
     * @param store
     * @param type
     */
    hideModal(store, type = false) {
       typeof store.state.modal.onClose === 'function' ? store.state.modal.onClose(type) : ''

        store.commit('update', {
            target: store.state.modal,
            data: {
                title: '',
                view: undefined,
                size: '600px',
                id: undefined,
                onClose: undefined,
                options: {}
            }
        })
    },

    /**
     * 显示通知信息
     * @param {object} store
     * @param {string} title 标题
     * @param {string} text 内容
     * @param {number} duration 时长
     * @param {string} type 类型
     * @param {function} onClose 关闭回调
     */
    showNotice(store, { title, text, duration, type, onClose }) {
        duration = duration || 15000
        type = type || 'info'
        title = title || '通知'
        setTimeout(() => {
            store.commit('update', {
                target: store.state.notice,
                data: {
                    id: Math.random(),
                    title: title,
                    message: text,
                    duration: duration,
                    type: type,
                    onClose: onClose
                }
            })
        }, 100)
    },

    /**
     * 显示对话框
     * @param {object} store
     * @param {string} title 标题
     * @param {string} text 内容
     * @param {string} type 类型
     * @param {function} onClose 关闭回调
     * @param {function} cancel 取消按钮文本
     * @param {function} confirm 确认按钮文本
     */
    showMessageBox(store, { title, text, type, onClose, cancel, confirm }) {
        type = type || 'info'
        title = title || '确认操作'

        cancel = cancel === undefined ? '取消' : cancel
        confirm = confirm === undefined ? '确认' : confirm
        onClose = typeof onClose === 'function' ? onClose : () => {}

        store.commit('update', {
            target: store.state.messageBox,
            data: {
                id: Math.random(),
                title: title,
                message: text,
                type: type,
                callback: onClose,
                showCancelButton: cancel !== '',
                showConfirmButton: confirm !== '',
                cancelButtonText: cancel,
                confirmButtonText: confirm
            }
        })
    },

    /**
     * 显示loading遮罩
     * @param {object} store
     * @param {string} text 提示内容
     * @param {function} run loading时需要执行的代码
     */
    showLoading(store, { text, run }) {
        text = text || '正在加载'
        store.commit('update', {
            target: store.state.loading,
            data: {
                show: true,
                text: text,
                run: run
            }
        })
    },

    /**
     * 关闭loading遮罩
     * @param {object} store
     */
    hideLoading(store) {
        store.commit('update', {
            target: store.state.loading,
            data: {
                show: false,
                text: '',
                handle: undefined
            }
        })
    }
}
