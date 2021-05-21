import Vue from 'vue'
import WtInfoWIndowText from './WtInfoWIndowText'
import WtInfoWIndowButton from './WtInfoWIndowButton'

export class InfoWindow {
    constructor({id, position, content, width, wtBaiduMap}) {
        /**
         * 展示内容
         * @type {array|object}
         */
        this.content = content

        /**
         * 气泡位置
         * @type {{lng, lat}}
         */
        this.position = position

        /**
         * 气泡宽度
         * @type {string}
         */
        this.width = width || '350px'

        /**
         * @type {WtBaiduMap}
         */
        this.wtBaiduMap = wtBaiduMap

        this.id = id || Math.random()
    }

    /**
     * 更新值
     * @param label
     * @param value
     */
    updateContent(label, value) {
        if (this.content instanceof Array) {
            for (let content of this.content) {
                if (content.label === label) {
                    content.value = value
                    break
                }
            }
        } else {
            this.content[label] = value
        }
        this.open()
    }

    /**
     * 获取内容
     * @returns {*}
     */
    getContent() {
        if (this.content instanceof Array) {
            return this.getContentByArray()
        }
        if (this.content instanceof String) {
            return this.getContentByString()
        }
        return this.getContentByObject()
    }

    getContentByString() {
        let children = [this.content.toString()]
        return Vue.component('wt-baidu-map-info-window-container', {
            render: (createElement) => {
                return createElement(
                    'div',
                    children
                )
            }
        })
    }

    getContentItemForButton(list) {
        return this.wtBaiduMap.$createElement(WtInfoWIndowButton, {
            props: {
                list: list,
                infoWindow: this
            }
        })
    }

    getContentItemForText(item) {
        return this.wtBaiduMap.$createElement(WtInfoWIndowText, {
            props: {
                label: item.label,
                value: item.value,
                infoWindow: this
            }
        })
    }

    getContentByArray() {
        let children = []
        for (let item of this.content) {
            switch (item.type) {
                case 'button':
                    children.push(this.getContentItemForButton(item.list))
                    break
                default:
                    children.push(this.getContentItemForText(item))
            }
        }

        return Vue.component('wt-baidu-map-info-window-container', {
            render: (createElement) => {
                return createElement(
                    'div',
                    children
                )
            }
        })
    }

    getContentByObject() {
        let children = []
        for (let key in this.content) {
            let value = this.content[key]
            children.push(this.getContentItemForText({label: key + '', value: value + ''}))
        }
        return Vue.component('wt-baidu-map-info-window-container', {
            render: (createElement) => {
                return createElement(
                    'div',
                    children
                )
            }
        })
    }

    open() {
        this.wtBaiduMap.openInfoWindow(this)
    }

    close() {
        this.wtBaiduMap.closeInfoWindow()
    }
}
