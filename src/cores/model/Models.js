export default class Models {
    constructor(list = []) {
        /**
         * 原始model列表
         * 不建议直接操作该数据
         * 需要修改该数据使用实例方法，比如push，splice，pop等
         * @type [{ BaseModel }]
         */
        this.list = list

        /**
         * 索引列表，键名为对应model的Id
         * @type {{}}
         */
        this.index = {}

        // 根据传入的列表生成索引列表
        this.generateIndex()
    }

    /**
     * 生成索引列表
     */
    generateIndex() {
        let list = {}

        for (let model of this.list) {
            list[model.getId()] = model
        }
        this.index = list
    }

    /**
     * 列表长度
     * @returns {number}
     */
    length() {
        return this.list.length
    }

    /**
     * 翻转列表
     * 由于原列表内容没有发生改变，所以不需要重新生成索引列表
     * @returns {BaseModel[]}
     */
    reverse() {
        this.list = this.list.reverse()
        return this.list
    }

    /**
     * 根据Id获取列表元素
     * @param id
     * @returns {*}
     */
    getById(id) {
        return this.index[id]
    }

    /**
     * 根据属性值获取模型
     * 当list过大时该方法会消耗大量时间用于for循环，如非必要，请优先使用getById方法
     * @param {string} name
     * @param {*} value
     * @param {boolean} hasOne 是否只返回一个元素
     * @return {null|BaseModel|Object}
     */
    getByAttribute(name, value, hasOne = true) {
        let result

        if (hasOne) {
            for (let model of this.list) {
                if (model.data[name] === value) {
                    result = model
                    break
                }
            }
        } else {
            result = []
            for (let model of this.list) {
                if (model.data[name] === value) {
                    result.push(model)
                }
            }
        }
        return result
    }

    /**
     * 同js数组原生splice方法
     * @param {number} index
     * @param {number} howMany
     * @param {array} items
     * @returns {BaseModel[]}
     */
    splice(index, howMany, items = []) {
        this.list.splice(index, howMany, ...items)
        this.generateIndex()
        return this.list
    }

    /**
     * 向数组的末尾添加一个或更多元素，并返回新的长度
     * @param {BaseModel|array} model
     */
    push(model) {
        if (model instanceof Array) {
            this.list.push(...model)
        } else {
            this.list.push(model)
        }
        this.generateIndex()
        return this.length()
    }

    /**
     * 向数组的开头添加一个或更多元素，并返回新的长度
     * @param {BaseModel|array} model
     */
    unshift(model) {
        if (model instanceof Array) {
            this.list.unshift(...model)
        } else {
            this.list.unshift(model)
        }
        this.generateIndex()
        return this.length()
    }

    /**
     * 删除并返回数组的最后一个元素
     * @returns {BaseModel}
     */
    pop() {
        let model = this.list.pop()
        this.generateIndex()
        return model
    }

    /**
     * 删除并返回数组的第一个元素
     * @returns {BaseModel}
     */
    shift() {
        let model = this.list.shift()
        this.generateIndex()
        return model
    }
}
