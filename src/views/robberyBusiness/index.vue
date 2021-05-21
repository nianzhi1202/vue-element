<template>
    <div class="robberyBusiness-index h-div">
        <div class="table h-div" ref="tableRow">

            <el-table-list
                    :max-hight="maxHeight"
                    :total="page.totalCount"
                    @change-page="changePage"
                    @change-size="changeSize"
                    :loading="tableLoading"
                    :row-data="rowData">

                <template slot="search">
                    <div class="search">
                        <el-row>
                            <el-col :span="20">
                                <el-table-search :model="searchModel" :form-data="searchModel.searchAttribute" @searchData="searchData"></el-table-search>
                            </el-col>
                            <el-col :span="4" class="search-btn-container">
                                <el-button type="primary" class="yk-search-btn" size="small" @click="search">搜索</el-button>
                                <el-button type="primary" class="yk-search-btn" size="small" >导出</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </template>
                <template slot="operation">
                    <el-row class="button">
                        <el-button size="small" @click="createModel" style="float: right;" plain >新增</el-button>
                    </el-row>
                </template>
                <template slot="columns">
                    <el-table-column
                        prop="store_list"
                        :label="model.getAttributeLabel( 'store_list' )"
                        min-width="300">
<!--                        <template slot-scope="scope">-->
<!--                            <YkList  :data="scope.row.store_list"> </YkList>-->
<!--                        </template>-->
                    </el-table-column>
                    <el-table-column
                        prop="car_list"
                        :label="model.getAttributeLabel( 'car_list' )"
                        min-width="230">
<!--                        <template slot-scope="scope">-->
<!--                            <YkList  :data="scope.row.car_list"> </YkList>-->
<!--                        </template>-->
                    </el-table-column>
                    <el-table-column
                        prop="driver_list"
                        :label="model.getAttributeLabel( 'driver_list' )"
                        min-width="200">
<!--                        <template slot-scope="scope">-->
<!--                            <YkList  :data="scope.row.driver_list"> </YkList>-->
<!--                        </template>-->
                    </el-table-column>

                    <el-table-column
                            prop="file_path"
                            :label="model.getAttributeLabel( 'file_path' )"
                            min-width="200">
                        <template slot-scope="scope">
                            <a
                                    target="_blank"
                                    :href="scope.row.file_path"
                                    v-if="scope.row.file_path &&  scope.row.status_view  !== '已取消'"
                                    class="router-link-active"
                            >

                                {{scope.row.file_path.substr(scope.row.file_path.lastIndexOf('/')).replace('/','')}}
                            </a>
                        </template>
                    </el-table-column>
                    <el-table-column
                          prop="beneficiary"
                          :label="model.getAttributeLabel( 'beneficiary' )"
                          min-width="200">
                    </el-table-column>

                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="70"
                            prop="id">
                        <template slot-scope="scope">
                            <a href="javascript:void(-1)"  @click="handleClick(scope.row.id)" class="router-link-active">
                                <wt-icon name="wt-icon-chakan-o" title="证明函详情"></wt-icon>
                            </a>
                            <a href="javascript:void(-1)" v-if="arr.indexOf(scope.row.status_view) != 0" @click="updateModel(scope.row.id)" class="router-link-active">
                                <wt-icon name="wt-icon-xiugai" title="编辑"></wt-icon>
                            </a>
                        </template>
                    </el-table-column>
                </template>

            </el-table-list>

        </div>
    </div>
</template>

<script>
    import ElTableList from '../../components/element/ElTableList'
    import model from '../../models/RobberyBusiness'
    import RobberyBusinessSearch from '../../models/search/RobberyBusinessSearch'
    import WtIcon from '../../components/WtIcon'

    import RobberyView from './view'
    import Create from './create'
    import Update from './update'
    import ElSelectDataDict from '../../components/element/ElSelectDataDict'

    import ElTableSearch from '../../components/element/ElTableSearch'

    export default {
        name: 'index',
        // eslint-disable-next-line vue/no-unused-components
        components: {ElTableSearch, ElSelectDataDict, ElTableList, WtIcon},
        data() {
            return {
                maxHeight: 'px',
                size: '10px',
                model: model,
                searchModel: new RobberyBusinessSearch(),
                tableLoading: false,
                rowData: [],
                commonColumns: [
                    'status_view'
                ],
                arr: ['草稿', '待审核', '审核中', '已生效'],
                title: {
                    location: '定位'
                },
                page: {
                    totalCount: ''
                },
                searchForm: {
                    pageSize: 20,
                    page: 1
                }

            }
        },

        mounted() {
            this.initIndex()
            // 设置表格组件的最大高度
            this.$nextTick(() => {
                const height = this.$refs.tableRow.clientHeight
                if (height) {
                    this.maxHeight = (height - 140).toString()
                }
            })
        },

        methods: {
            searchData(data) {
              for (const i in data) {
                  this.searchForm[i] = data[i]
              }
            },
            initIndex() {
                this.tableLoading = true
                model.robberyBusinessIndex(this.searchForm, ({result}, page) => {
                    this.tableLoading = false
                    if (result.length) {
                        this.rowData = result
                        this.page.totalCount = page.totalCount
                    }
                })
            },
            // 查看详情
            handleClick(id) {
                const title = this.rowData.getById(id).data.store_list.policy_num.value ? '证明函查看：' + this.rowData.getById(id).data.store_list.policy_num.value : '证明函查看'
                this.$store.dispatch('showModal', {
                    title: title,
                    size: '800px',
                    view: RobberyView,
                    options: {
                        id: id
                    },
                    onClose: {}
                })
            },

            // 新增接口
            createModel() {
                this.$store.dispatch('showModal', {
                    title: '证明函新增',
                    size: '900px',
                    view: Create,
                    options: {},
                    onClose: () => {
                        this.initIndex()
                    }
                })
            },

            updateModel(id) {
                const title = this.rowData.getById(id).data.store_list.policy_num.value ? '证明函修改：' + this.rowData.getById(id).data.store_list.policy_num.value : '证明函修改'
                this.$store.dispatch('showModal', {
                    title: title,
                    size: '900px',
                    view: Update,
                    options: {
                        id: id
                    },
                    onClose: () => {
                        this.initIndex()
                    }
                })
            },

            search() {
                this.initIndex()
            },
            changePage({page}) {
                this.searchForm.page = page
                this.initIndex()
            },
            changeSize({size}) {
                this.searchForm.pageSize = size
                this.searchForm.page = 1
                this.initIndex()
            }

        }

    }
</script>

<style scoped>
</style>
