<template>

    <div class="h-div yk-table">
        <div style="overflow: hidden;">
            <div class="table-search" v-if="hasSlot('search')">
                <slot name="search"></slot>
            </div>
            <div class="table-operation" v-if="showOperation">
                <el-row>
                    <el-col :span="12" style="font-size:18px;font-weight:500;color:rgba(38,38,38,1);line-height:32px;" v-if="leftColumn">
                        {{ title }}
                    </el-col>
                    <el-col :span="12">
                        <slot name="operation"></slot>
                    </el-col>
                </el-row>
            </div>
        </div>

        <div class="table-box h-div" :data-has-search="hasSearch ? 'true' : 'false'">
            <div class="table-box-scroll h-div">
                <el-table
                        ref="tableRef"
                        header-row-class-name="header-class"
                        v-loading="loading"
                        :size="sizeValue"
                        :border="border === undefined || border === true"
                        :stripe="stripe === undefined || stripe === true"
                        :data="tableData"
                        @selection-change="handleSelectionChange"
                        @row-click="rowClick"
                        :max-height="maxHight"
                        :height="maxHight"
                        style="width: 100%;">
                    <el-table-column
                            v-if="leftColumn"
                            fixed="left"
                            type="selection"
                            width="55"
                            prop="id"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            v-if="leftColumn"
                            fixed="left"
                            type="index"
                            width="50"
                            align="center">
                    </el-table-column>
                    <slot name="columns" class="button"></slot>
                </el-table>
            </div>
        </div>
        <div class="page-box" v-if="!pageBox">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page || 1"
                    :page-sizes="pageSizeList || [20, 40, 100]"
                    :page-size="20"
                    :layout="pageTemplate || 'total, sizes, prev, pager, next, jumper'"
                    :total="total || 0">
            </el-pagination>
        </div>
        <div class="page-box" v-if="pageBox">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="page || 1"
                    :page-size="20"
                    layout="prev, pager, next, jumper"
                    :total="total || 0">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'ElTableList',
        props: {
            rowData: null, // 表格数据，可以是 Models 实例，也可以是 数组
            size: null, // 表格尺寸，参考element table size部分
            border: { // 是否需要边框 默认 true
                type: Boolean,
                default: true
            },
            stripe: { // 是否需要斑马纹 默认 true
                type: Boolean,
                default: true
            },
            pageTemplate: null, // 分页组件布局
            page: null, // 当前页码，默认 1
            total: null, // 总条数，默认 0
            pageSizeList: null, // 可配置的单页显示总数，默认 [ 20, 40, 100 ],
            loading: {
                type: Boolean,
                default: false
            },
            pageBox: null,
            leftColumn: {
                type: Boolean,
                default: true
            },
            maxHight: {
                type: String,
                default: '100%'
            },
            showOperation: {
                type: Boolean,
                default: true
            },
            otherFields: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        methods: {
            /**
             * 判断对应插槽是否有值
             * @param {string} slotName
             */
            hasSlot(slotName) {
                return this.$slots[slotName] !== undefined
            },
            handleSizeChange(size) {
                this.$emit('change-size', {size: size})
            },
            handleCurrentChange(page) {
                this.$emit('change-page', {page: page})
                // 翻页滚动条归零
                this.$refs.tableRef.bodyWrapper.scrollTop = 0
                this.$refs.tableRef.bodyWrapper.scrollLeft = 0
            },
            handleSelectionChange(val) {
                this.$emit('change-select', {val: val})
            },
            rowClick(val) {
                this.$emit('row-click', {val: val})
            }
        },
        data() {
            return {
                // 是否有搜索，如果有的话，需要调整一下padding-top
                hasSearch: this.hasSlot('search'),
                title: this.$route.name
            }
        },
        computed: {

            sizeValue() {
                return this.size || 'small'
            },
            tableData() {
                if (!this.rowData) {
                    return
                }
                // 如果传入的是数组，则直接返回不做处理

                if (this.rowData instanceof Array) {
                    return this.rowData
                }

                // 如果不是数组，即视为 Models 的实例

                // 预定义，最终返回的数据变量
                let result = []

                // 从插槽中读取需要显示的属性名
                let attrs = []
                for (let node of this.$slots.columns) {
                    attrs.push(node.componentOptions.propsData.prop)
                }

                // 遍历模型列表，将需要显示的属性以getValue的形式获取数据
                for (let model of this.rowData.list) {
                    let item = {}
                    for (let index in attrs) {
                        item[attrs[index]] = model.getValue(attrs[index])
                    }
                    for (let attribute of this.otherFields) {
                        item[attribute] = model.getValue(attribute)
                    }
                    result.push(item)
                }

                return result
            }
        }
    }
</script>

<style scoped>

    .table-search {
        height: 32px;
    }
    .table-operation{
        height: 32px;
        margin: 10px 0;
    }

    .table-box-scroll {
        overflow: auto;
    }

    .table-box {
        overflow: hidden;
        box-sizing: border-box;
        height: calc(100% - 126px);
    }
    .page-box{
        float: right;
        margin-top: 10px;
        max-width: 100%;
        box-sizing: border-box;
    }
    .el-table /deep/ th .cell{
        color:rgba(0,0,0,0.85) !important;
    }
    .el-table /deep/ td .cell{
        color:rgba(0,0,0,0.85) !important;
    }
    /deep/.el-table th, .el-table tr{
        background: rgba(0,0,0,0.07)!important;
    }
</style>
