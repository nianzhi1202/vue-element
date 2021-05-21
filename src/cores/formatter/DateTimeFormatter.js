import BaseFormatter from './BaseFormatter'
import DateHelper from '../helpers/DateHelper'

/**
 * 日期时间格式化
 */
export default class DateTimeFormatter extends BaseFormatter {
    /**
     * @param {string} value
     * @param {{fromNow, template}} options
     */
    constructor(value, options = {fromNow: true, template: 'Y-m-d H:i:s'}) {
        super(value, options)
    }

    getValue() {
        if (!this.value) {
            return ''
        }

        let value = DateHelper.formatDateTime(this.value, this.options.template)

        if (this.options.fromNow) {
            value += ' ( ' + DateHelper.fromNow(this.value) + ' )'
        }
        return value
    }
}
