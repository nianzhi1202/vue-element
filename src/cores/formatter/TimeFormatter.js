import BaseFormatter from './BaseFormatter'
import DateHelper from '../helpers/DateHelper'

export default class TimeFormatter extends BaseFormatter {
    constructor(value, options = {type: 'second', template: 'd天H小时i分钟'}) {
        super(value, options)
    }

    getValue() {
        let value = parseInt(this.value)
        value = isNaN(value) ? 0 : value
        switch (this.options.type) {
            case 'second':
                break
            case 'minute':
                value *= 60
                break
        }

        return DateHelper.formatSecond(value, this.options.template)
    }
}
