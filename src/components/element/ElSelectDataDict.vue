<template>
    <el-select class="sec" v-model="newValue" :placeholder="placeholder" size="small" filterable :clearable="clearable" >
        <el-option
                v-for="item in subareaArray"
                :key="item.value"
                :label="item.name"
                :value="item.value"
                :disabled="disabledName.indexOf(item.name) != -1">
        </el-option>
    </el-select>
</template>

<script>
    // eslint-disable-next-line no-unused-vars
    import DataDict from '../../../static/json/dataDict.json' // 数据词典Json
    // eslint-disable-next-line no-unused-vars
    import store from '../../store'
    import Request from '../../cores/request/request'
    export default {
        name: 'ElSelectDataDict',
        props: {
            groupName: { type: String }, // group_name
            value: { type: [String, Number] }, // 下拉框的默认值
            placeholder: { type: String, default: '请选择' },
            disabledName: { type: String, default: '' },
            clearable: { type: Boolean, default: true }
        },
        data() {
            return {
                options: {}, // 数据词典json
                newValue: '',
                subareaArray: []
            }
        },
        watch: {
            // 监听下拉框值的改变
            value: {
                handler: function (val) {
                    this.$nextTick(() => {
                        this.newValue = !val ? '' : String(val)
                    })
                },
                // watch 加了 immediate: true, 就是watch先执行，否则就是created 先执行
                immediate: false // 这里如果是true会导致有默认值的select，数据没回来前直接显示数字（watch会在mounted前执行）
            },
            groupName() {
                this.loadGroupName()
            },

            // value: function (newVal, oldVal) {
            //     this.$nextTick(()=>{
            //         this.newValue = (this.value == null) ? '' :String(this.value); // 强制转化为字符串类型用来匹配json文件的value
            //     })
            // },

            newValue: function () {
                this.$emit('input', this.newValue)
            }
        },

        methods: {
            loadGroupName() {
                for (let val of this.options.data) {
                    if (val.group_name == this.groupName) {
                        this.subareaArray = val.subarea
                    }
                }
            },
            async getData() {
                let dataDict = await this.dataDict()
                this.options = dataDict
                const that = this
                // eslint-disable-next-line no-unused-vars
                that.$watch('value', function(val, oldVal) { // 这里不要用箭头函数：https://cn.vuejs.org/v2/guide/instance.html#%E5%AE%9E%E4%BE%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90
                    that.newValue = !val ? '' : String(val)
                }, {deep: true, immediate: true})
                this.loadGroupName()
                store.commit('update',
                    {
                        target: store.state.dataDict,
                        data: dataDict
                    }
                )
                console.log(store.state.dataDict?.data?.length)
            },
            dataDict() {
                return new Promise((resolve) => {
                    // eslint-disable-next-line no-unused-vars
                    Request.get('dataDict', {}, ({type, data}, res) => {
                        let dataDict = Object.assign({}, res?.data?.data)
                        resolve(dataDict)
                    })
                })
            }
        },

        mounted() {
            if (store.state.dataDict?.data?.length == undefined) {
                this.getData()
            }
        }
    }
</script>

<style>
    .el-scrollbar{
        padding-bottom: 10px;
        margin-bottom: 5px;
    }

    .sec {
        width: 100% !important;
    }
</style>
