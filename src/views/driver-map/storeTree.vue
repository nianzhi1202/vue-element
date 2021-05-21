<template>
    <div class="h-div search-store">

        <el-input v-model="form.name" placeholder="请输入门店名搜索" size="small">
            <el-button slot="append" icon="el-icon-search" @click="loadList"></el-button>
        </el-input>

        <template>
            <el-checkbox v-model="includeChildren" class="check-all" @change="change">包含子门店</el-checkbox>
        </template>
        <div class="store-list" v-loading="loading">
            <el-tree
                ref="storeTree"
                style="transform: translateZ(0);"
                :props="props"
                :data="list"
                node-key="id"
                :highlight-current="true"
                :expand-on-click-node="false"
                empty-text="无门店"
                @node-click="checkStore"
                :default-expand-all="true">
                <span class="custom-tree-node" slot-scope="{ node }">
                    <span>{{node.label}}</span>
                </span>
            </el-tree>
        </div>
    </div>
</template>

<script>
    import Store from '../../models/Store'

    export default {
        name: 'searchStore',
        props: {
            treeObj: {
                type: Object,
                default: () => {
                    return {}
                }
            },

            searchType: {
                type: String,
                default: 'searchCar'
            }

        },
        data() {
            return {
                includeChildren: true,
                loading: true,
                list: [],
                form: {
                    name: ''
                },
                props: {
                    isLeaf: 'leaf',
                    label: (data) => {
                        const baseTest = `( 设备数: ${data.driverCount} )`
                        if (data.name.substr(0, 12) === data.name) {
                            return data.name + baseTest
                        }
                        return data.name.substr(0, 12) + '...' + baseTest
                    }
                },
                loadFlag: undefined
            }
        },
        created() {
            this.loadList()
        },
        methods: {
            load(fn) {
                if (this.loadFlag) {
                    clearTimeout(this.loadFlag)
                }

                this.loadFlag = setTimeout(() => {
                    fn()
                    this.treeObj.loadNum()
                }, 100)
            },
            checkStore(data) {
                if (!this.treeObj) {
                    return
                }

                this.treeObj[this.searchType].store_id = data.id
                this.treeObj[this.searchType].has_child = this.includeChildren ? '1' : '0'
                this.treeObj[this.searchType].page = 1
                this.searchType === 'searchCar' ? this.treeObj.searchCar.branch = 'car_all' : this.treeObj.searchDriver.running_status = 'all_count'
                this.load(this.treeObj.getData)
            },
            // 门店状态改变后测重新获取设备车辆信息
            change(data) {
                if (!this.treeObj) {
                    return
                }
                this.treeObj[this.searchType].has_child = data ? '1' : '0'
                this.load(this.treeObj.getData)
            },
            loadList() {
                // eslint-disable-next-line no-unused-vars
                Store.loadList(this.form, ({ type, data }) => {
                    this.loading = false
                    this.list = data.data
                })
            }
        }
    }
</script>

<style scoped>

    .search-store{
        overflow-y: hidden;
        padding: 3px;
    }

    .store-list{
        height: calc(100% - 60px);
        overflow: auto;
    }
    .store-list .el-tree{
        padding-right: 10px;
    }
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        padding-right: 8px;
    }
    .check-all /deep/ .el-checkbox__label{
        font-size: 12px!important;
    }
</style>
