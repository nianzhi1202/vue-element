import moment from 'moment/moment'
import 'moment/locale/zh-cn'

export default class DateHelper {
    /**
     * 将时间格式化成距离当前的时间
     * @param {string} dateTime
     * @returns {string}
     */
    static fromNow(dateTime) {
        const date = moment(dateTime)
        return date.fromNow()
    }

    /**
     * 格式化日期时间
     * @param {string} dateTime
     * @param {string} format
     */
    static formatDateTime(dateTime, format) {
        let date = null
        if (dateTime) {
            date = moment(dateTime)
        } else {
            date = moment()
        }
        const year = date.year()
        let month = date.month() + 1
        let day = date.date()
        let hour = date.hour()
        let minute = date.minute()
        let second = date.second()

        month = month <= 9 ? '0' + month : month
        day = day <= 9 ? '0' + day : day
        hour = hour <= 9 ? '0' + hour : hour
        minute = minute <= 9 ? '0' + minute : minute
        second = second <= 9 ? '0' + second : second
        return format.replace('Y', year)
            .replace('m', month)
            .replace('d', day)
            .replace('H', hour)
            .replace('i', minute)
            .replace('s', second)
    }

    /**
     * 格式化秒数
     * @param {int} second
     * @param {string} format 格式化
     * @returns {string}
     */
    static formatSecond(second, format = 'H:i:s') {
        second = parseInt(second)
        let hours, mins, seconds, days

        seconds = this.addZero(parseInt(second % 60))
        mins = this.addZero(parseInt(second % 3600 / 60))
        hours = this.addZero(parseInt(second / 3600))
        days = parseInt(second / 86400)

        format = format.replace('d', days)
        format = format.replace('H', hours)
        format = format.replace('i', mins)
        format = format.replace('s', seconds)

        return format
    }

    // 补零
    static addZero(str) {
        return new RegExp(/^\d$/g).test(str) ? `0${str}` : str
    }

    /**
     * 原生js方式 格式化时间戳
     * Parse the time to string
     * @param {(Object|string|number)} time
     * @param {string} cFormat
     * @returns {string | null}
     */
    static parseTime(time, cFormat) {
        if (arguments.length === 0 || !time) {
            return null
        }
        const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
        let date
        if (typeof time === 'object') {
            date = time
        } else {
            if ((typeof time === 'string')) {
                if ((/^[0-9]+$/.test(time))) {
                    // support "1548221490638"
                    time = parseInt(time)
                } else {
                    // support safari
                    // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                    time = time.replace(new RegExp(/-/gm), '/')
                }
            }

            if ((typeof time === 'number') && (time.toString().length === 10)) {
                time = time * 1000
            }
            date = new Date(time)
        }
        const formatObj = {
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            i: date.getMinutes(),
            s: date.getSeconds(),
            a: date.getDay()
        }
        const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
            const value = formatObj[key]
            // Note: getDay() returns 0 on Sunday
            if (key === 'a') {
                return ['日', '一', '二', '三', '四', '五', '六'][value]
            }
            return value.toString().padStart(2, '0')
        })
        return time_str
    }

    /**
     * 原生方式 将时间格式化成距离当前的时间
     * @param {number} time
     * @param {string} option
     * @returns {string}
     */
    static formatTime(time, option) {
        if (('' + time).length === 10) {
            time = parseInt(time) * 1000
        } else {
            time = +time
        }
        const d = new Date(time)
        const now = Date.now()

        const diff = (now - d) / 1000

        if (diff < 30) {
            return '刚刚'
        } else if (diff < 3600) {
            // less 1 hour
            return Math.ceil(diff / 60) + '分钟前'
        } else if (diff < 3600 * 24) {
            return Math.ceil(diff / 3600) + '小时前'
        } else if (diff < 3600 * 24 * 2) {
            return '1天前'
        }
        if (option) {
            return this.parseTime(time, option)
        } else {
            return (
                d.getMonth() +
                1 +
                '月' +
                d.getDate() +
                '日' +
                d.getHours() +
                '时' +
                d.getMinutes() +
                '分'
            )
        }
    }
}
