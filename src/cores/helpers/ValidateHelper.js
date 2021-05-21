export default {
    /**
     * @param {string} str
     * @returns {Boolean}
     */
    isString(str) {
        if (typeof str === 'string' || str instanceof String) {
            return true
        }
        return false
    },

    /**
     * @param {Array} arg
     * @returns {Boolean}
     */
    isArray(arg) {
        if (typeof Array.isArray === 'undefined') {
            return Object.prototype.toString.call(arg) === '[object Array]'
        }
        return Array.isArray(arg)
    }

}
