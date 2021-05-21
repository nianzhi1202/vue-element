<!--

-->
<template>
    <span>
        <el-select v-model="newValue" class="sec" placeholder="客户" :disabled="disabledType" size="small" :filter-method="storeFilter" filterable :multiple="multipleSelection" clearable >
            <el-option
                    v-for="item in storeArray_"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :loading="loading"
                    loading-text="加载中"
                    no-data-text="无匹配数据">
            </el-option>
<!--            <div v-if="storeArray.length > 10"  class="search-keyword">-->
<!--                <span>仅展示10条结果，请完善搜索关键字</span>-->
<!--            </div>-->
        </el-select>
    </span>
</template>

<script>
    import Store from '../../models/Store'
    export default {
        name: 'YkRemoteLinkageSelect',
        props: {
            multipleSelection: { type: Boolean, default: false}, // 是否支持多选(默认不支持)
            value: { type: String }, // 下拉框的默认值
            selectType: { type: Number, default: 1 } // 编辑页面
        },
        data() {
            return {
                newValue: this.value, // 下拉框内选中的值
                storeArray: [], // 下拉框内的所有选项数组
                storeArray_: [], // 渲染到下拉框内一部分数据（10条）
                form: { name: '' }, // 门店的搜索
                loading: false, // 搜索时的loading
                disabledType: false // 是否禁用
            }
        },
        created() {
            // 编辑页面门店下拉
            if (this.selectType == 2) {
                this.disabledType = true
            }
        },
        watch: {
            // 监听下拉框值的改变
            value(val, oldVal) {
                this.$nextTick(() => {
                    this.newValue = String(this.value) // 强制转化为字符串类型用来匹配json文件的value
                })
            },
            newValue: function () {
                this.$emit('input', this.newValue)
            }
        },
        mounted() {
            // 获取数据填充到下拉框内
            this.loadList()
        },
        methods: {
            // 获取门店列表
            loadList() {
                Store.loadList(this.form, ({ type, data }) => {
                    if (type == 'success') {
                        var arr = data.data
                        var res = []
                        this.storeArray = this.handleArray(arr, res)
                        this.storeFilter() // 过滤数据
                    }
                })
            },
            // 处理接口返回的数据
            handleArray (arr, res) {
                for (var i = 0; i < arr.length; i++) {
                    if (Array.isArray(arr[i].children) && arr[i].children.length > 0) {
                        res.push({ label: arr[i].name, value: arr[i].id })
                        this.handleArray(arr[i].children, res)
                    } else {
                        res.push({ label: arr[i].name, value: arr[i].id })
                    }
                }
                return res
            },
            // 搜索并过滤数据
            storeFilter(query = '') {
                let arr = this.storeArray.filter((item) => {
                    return item.label.includes(query)
                })
                if (this.selectType == 1) {
                    if (arr.length > 10) {
                        this.storeArray_ = arr.slice(0, 10)
                    } else {
                        this.storeArray_ = arr
                    }
                } else { // 编辑页面
                    this.storeArray_ = arr
                }
            }
        }
    }
</script>
<style scoped>
    .search-keyword {
        margin-left: 10px;
        color: #00CCFF;
    }
</style>
