import BaseFormatter from './BaseFormatter'

export default class NumberFormatter extends BaseFormatter {
    constructor(value, options = {toFixed: 2, unit: ''}) {
        super(value, options)
    }

    getValue() {
        let value = parseFloat(this.value)
        value = isNaN(value) ? 0.00 : value
        return value.toFixed(this.options.toFixed) + this.options.unit
    }
}
