/**
 * 数据格式化基类
 */
export default class BaseFormatter {
    constructor(value, options = {}) {
        this.value = value
        this.options = options
    }

    getValue() {
        return this.value
    }
}
