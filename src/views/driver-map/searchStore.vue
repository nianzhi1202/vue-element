<template>
    <div class="search-store">

        <el-input v-model="form.name" placeholder="请输入门店名搜索" size="small">
            <el-button slot="append" icon="el-icon-search" @click="loadList"></el-button>
        </el-input>

        <div class="store-list" v-loading="loading">
            <el-scrollbar style="height: 100%">
                <template>
                    <el-checkbox v-model="includeChildren" class="check-all">包含子门店</el-checkbox>
                </template>
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
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{
                                (node.label.substr(0,12) ===  node.label ?  node.label : node.label.substr(0,12) + '...') + `( 设备数: ${data.driverCount} )`
                                }}
                        </span>
                    </span>
                </el-tree>
            </el-scrollbar>
        </div>

    </div>
</template>

<script>
    import Store from '../../models/Store'

    export default {
        name: 'searchStore',
        props: ['searchDriver'],
        data() {
            return {
                includeChildren: true,
                loading: true,
                list: [],
                form: {
                    name: ''
                },
                props: {
                    label: 'name',
                    isLeaf: 'leaf'
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
                }, 100)
            },
            checkStore(data) {
                console.log(data)
                this.searchDriver.searchCar.store_id = data.id
                this.searchDriver.searchDriver.store_id = data.id
                this.searchDriver.isCheckedAll = false

                this.searchDriver.searchCar.branch = 'car_all'
                this.searchDriver.searchCar.has_child = this.includeChildren ? '1' : '0'
                this.searchDriver.searchCar.page = 1

                this.searchDriver.searchDriver.running_status = 'all_count'
                this.searchDriver.searchDriver.has_child = this.includeChildren ? '1' : '0'
                this.searchDriver.searchDriver.page = 1

                if (this.searchDriver.type === 'car') {
                    this.load(this.searchDriver.loadCarListAll)
                } else {
                    this.load(this.searchDriver.loadDriverNum)
                }
            },
            loadList() {
                Store.loadList(this.form, ({ type, data }) => {
                    console.log(type)
                    this.loading = false
                    this.list = data.data
                })
            }
        }
    }
</script>

<style scoped>
    .store-list {
        height: 140px;
        /*overflow: auto;*/
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
