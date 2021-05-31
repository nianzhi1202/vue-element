<template>
    <el-select @change="selectChanged" class="sec" v-model="newValue" :placeholder="placeholder" size="small" filterable
               :clearable="clearable" :disabled="disabled" :multiple="multiple"
               :collapse-tags="multiple ? true : false">
        <el-option
            v-for="item in subareaArray"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="disabledName.indexOf(item.label) != -1">
        </el-option>
    </el-select>
</template>

<script>
    import DataDict from '../../../static/json/dataDict.json' // 数据词典Json
    export default {
        name: 'YkSelect',
        props: {
            groupName: {type: String}, // group_name
            value: {type: [String, Number, Array]}, // 下拉框的默认值
            placeholder: {
                type: String,
                default: '请选择'
            },
            disabledName: {
                type: String,
                default: ''
            },
            clearable: {
                type: Boolean,
                default: true
            },
            disabled: {
                type: Boolean,
                default: false
            },
            multiple: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                options: DataDict, // 数据词典json
                newValue: '',
                subareaArray: []
            }
        },
        watch: {
            // 监听下拉框值的改变
            value: {
                handler: function (val) {
                    this.$nextTick(() => {
                        this.newValue = !val ? '' : (this.multiple ? val : String(val))
                    })
                },
                immediate: true
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
                // 获取数据填充下拉框
                for (let val of this.options.data) {
                    if (val.group_name == this.groupName) {
                        this.subareaArray = val.subarea
                    }
                }
            },
            selectChanged(val) {
                this.$emit('selectChanged', val)
            }
        },
        mounted() {
            this.loadGroupName()
        }
    }
</script>

<style>
    .el-scrollbar {
        padding-bottom: 10px;
        margin-bottom: 5px;
    }

    .sec {
        width: 100% !important;
    }
</style>
