import Vue from 'vue'
import config from '../../configs/config'
import api from '../../configs/api'
import ObjectHelper from '../helpers/ObjectHelper'
import store from '../../store'

export default class Request {
    /**
     * 根据名称获取URL
     * @param name
     * @returns {{}|null}
     */
    static getUrlForName(name) {
        return ObjectHelper.getValue(api, name, null)
    }

    static dataParse(response, data) {
        const result = {}
        for (const name in data) {
            result[name] = ObjectHelper.getDataForPath(response, data[name])
        }
        return result
    }

    /**
     * 访问出错的默认处理逻辑 {未登录鉴权失败，}
     * @param {object} response
     * @param {number} status
     * @param {object} store
     */
    static defaultErrorCallback(response, status, store) {
        // 访问出错的默认处理逻辑
        config.api && typeof config.api.errorCallBack === 'function' && config.api.errorCallBack(response, status, store)
    }

    /**
     * 返回数据处理
     * @param {object} response
     * @param {object} urlItem
     * @param {function} successCb
     */
    static pathParse(response, urlItem, successCb) {
        if (config.api && config.api.defaultMaps) {
            if (typeof urlItem.maps !== 'object') {
                urlItem.maps = config.api.defaultMaps
            }
        }

        // 查询规则必须是个object才会进行处理
        if (typeof urlItem.maps === 'object') {
            for (const map of urlItem.maps) {
                let result = true
                for (const _path in map.items) {
                    // 根据配置好的字符串路径查找对象中的数据
                    const value = ObjectHelper.getDataForPath(response, _path)
                    const strict = ObjectHelper.getValue(map, 'strict', true)
                    // 如果查找到的数据和预定义的数据相等，则认为是命中条件的
                    result = result && ((strict && value === map.items[_path]) || (value == map.items[_path]))
                }
                // 如果单个类型配置中的条件全部命中，则调用成功回调
                if (result) {
                    let data = {}
                    if (map.data) {
                        data = this.dataParse(response, map.data)
                    }
                    // response是axios请求返回的原始信息，data和type是处理后的简洁数据
                    successCb({
                        type: map.type,
                        data: data
                    }, response)
                    return
                }
            }
        }
        successCb({
            type: undefined,
            data: {}
        }, response)
    }

    /**
     * 处理header信息
     * @param options
     * @returns {*}
     */
    static parseOptions(options) {
        options.params = options.params || {}
        options.headers = options.headers || {}
        const authConfig = config.api.auth
        if (authConfig && authConfig.autoAdd === true && store.state.accessToken && !options.headers.Authorization) {
            options.headers[authConfig.authName] = authConfig.authTemplate.replace('{token}', store.state.accessToken)
        }
        return options
    }

    /**
     * 以GET方式访问url
     * @param {string} urlName
     * @param {{params, headers}} options
     * @param {function} successCb
     * @param {function} errorCb 默认undefined
     */
    static get(urlName, options, successCb, errorCb = undefined) {
        const urlItem = this.getUrlForName(urlName) ? this.getUrlForName(urlName) : {url: urlName}

        Vue.axios.get(urlItem.url, this.parseOptions(options)).then((r) => {
            // 格式化返回结果
            this.pathParse(r, urlItem, successCb)
        }, (e) => {
            console.log(e)
            const r = e.response
            const status = r.status
            typeof errorCb === 'function' ? errorCb(r, status) : this.defaultErrorCallback(r, status, store)
        })
    }

    /**
     * 以POST方式访问url
     * @param {string} urlName
     * @param {{params, headers}} options
     * @param {function} successCb
     * @param {function} errorCb
     */
    static post(urlName, options, successCb, errorCb = undefined) {
        const urlItem = this.getUrlForName(urlName) ? this.getUrlForName(urlName) : {url: urlName}
        if (urlName !== 'login') {
            options = this.parseOptions(options)
        }

        // if (!this.allowCall(urlItem)) {
        //     let res = {status: 403, message: '无权访问'};
        //     typeof errorCb === 'function' ? errorCb(res, 403) : this.defaultErrorCallback(res, 403);
        //     return;
        // }

        Vue.axios.post(urlItem.url, options.params, {headers: options.headers}).then((r) => {
            this.pathParse(r, urlItem, successCb)
            console.log(r)
        }, e => {
            const r = e.response
            const status = r.status
            typeof errorCb === 'function' ? errorCb(r, status) : this.defaultErrorCallback(r, status, store)
        })
    }

    /**
     * 以PUT方式访问url
     * @param {string} urlName
     * @param {{params, headers}} options
     * @param {function} successCb
     * @param {function} errorCb
     */
    static put(urlName, options, successCb, errorCb) {
        const urlItem = this.getUrlForName(urlName) ? this.getUrlForName(urlName) : {url: urlName}
        if (urlName !== 'login') {
            options = this.parseOptions(options)
        }

        if (!this.allowCall(urlItem)) {
            const res = {
                status: 403,
                message: '无权访问'
            }
            typeof errorCb === 'function' ? errorCb(res, 403) : this.defaultErrorCallback(res, 403)
            return
        }

        Vue.axios.put(urlItem.url, options.params, {headers: options.headers}).then((r) => {
            this.pathParse(r, urlItem, successCb)
        }, e => {
            const r = e.response
            const status = r.status
            typeof errorCb === 'function' ? errorCb(r, status) : this.defaultErrorCallback(r, status, store)
        })
    }

    /**
     * 以DELETE方式访问url
     * @param {string} urlName
     * @param {{params, headers}} options
     * @param {function} successCb
     * @param {function} errorCb
     */
    static delete(urlName, options, successCb, errorCb) {
        const urlItem = this.getUrlForName(urlName) ? this.getUrlForName(urlName) : {url: urlName}

        if (!this.allowCall(urlItem)) {
            const res = {
                status: 403,
                message: '无权访问'
            }
            typeof errorCb === 'function' ? errorCb(res, 403) : this.defaultErrorCallback(res, 403)
            return
        }
        Vue.axios.delete(urlItem.url, this.parseOptions(options)).then((r) => {
            this.pathParse(r, urlItem, successCb)
        }, (e) => {
            const r = e.response
            const status = r.status
            typeof errorCb === 'function' ? errorCb(r, status) : this.defaultErrorCallback(r, status)
        })
    }

    /**
     * 以PATCH方式访问url
     * @param {string} urlName
     * @param {{params, headers}} options
     * @param {function} successCb
     * @param {function} errorCb
     */
    static patch(urlName, options, successCb, errorCb) {
        const urlItem = this.getUrlForName(urlName) ? this.getUrlForName(urlName) : {url: urlName}
        options = this.parseOptions(options)

        if (!this.allowCall(urlItem)) {
            const res = {
                status: 403,
                message: '无权访问'
            }
            typeof errorCb === 'function' ? errorCb(res, 403) : this.defaultErrorCallback(res, 403)
            return
        }

        Vue.axios.patch(urlItem.url, options.params, {headers: options.headers}).then((r) => {
            this.pathParse(r, urlItem, successCb)
        }, e => {
            const r = e.response
            const status = r.status
            typeof errorCb === 'function' ? errorCb(r, status) : this.defaultErrorCallback(r, status)
        })
    }
}
