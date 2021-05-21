<template>
    <div class="user-index h-div">
        <div class="table h-div" ref="tableRow">

            <yk-table
                    :total="page.totalCount"
                    @change-page="changePage"
                    @change-size="changeSize"
                    :loading="tableLoading"
                    :max-hight="maxHeight"
                    :row-data="rowData">
                <template slot="search">
                    <div class="search">
                        <el-row>
                            <el-col :span="20">
                                <wt-table-select :model="modelSearch" :form-data="modelSearch.searchAttribute" @searchData="searchData"></wt-table-select>
                            </el-col>
                            <el-col :span="4" class="search-btn-container">
                                <el-button type="primary" size="small" @click="search">搜索</el-button>
                                <el-button type="primary" size="small" @click="exportModel">导出</el-button>
                            </el-col>
                        </el-row>

                    </div>
                </template>
                <template slot="operation">
                    <el-row class="button" style="text-align: right;">
                        <el-button size="small" @click="createModel" v-wt-permission="'客户端_V2_系统设置_用户管理_新增'">新增</el-button>
                    </el-row>
                </template>

                <template slot="columns">

                    <el-table-column
                            v-for="name of commonColumns"
                            :prop="name"
                            :label="model.getAttributeLabel( name )"
                            min-width="100">
                        <template slot-scope="scope">
                            <span v-if="scope.row[name]">
                                {{scope.row[name]}}
                            </span>
                            <span v-else class="no-data">
                                无数据
                            </span>
                        </template>

                    </el-table-column>
                    <el-table-column
                            prop="store_num"
                            label="可管理门店"
                            min-width="300">
                        <template slot-scope="scope">
                            <YKWarningList :warnData="scope.row.store_num"
                                           type="user"
                                           :title="titleData"
                                           v-if="scope.row.store_num.length"></YKWarningList>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="70"
                            prop="id"
                    >
                        <template slot-scope="scope">

                            <a href="javascript:void(-1)"  @click="modelViews(scope.row.id)" class="router-link-active" v-wt-permission="'客户端_V2_系统设置_用户管理_详细'">
                                <wt-icon name="wt-icon-chakan-o"  :size="iconSize" :title="title.views"> </wt-icon>
                            </a>
                            <a href="javascript:void(-1)"  @click="modelUpdate(scope.row)" class="router-link-active" v-wt-permission="'客户端_V2_系统设置_用户管理_修改'">
                                <wt-icon name="wt-icon-xiugai"  :size="iconSize" :title="title.update"> </wt-icon>
                            </a>

                        </template>
                    </el-table-column>
                </template>

            </yk-table>

        </div>
    </div>
</template>

<script>
    import create from './create'
    import views from './views'
    import YkTable from '../../components/element/YkTable'
    import model from '../../models/User'
    import modelSearch from '../../models/search/UserIndexSearch'
    import WtIcon from '../../components/WtIcon'
    import ExcelExport from '../../models/ExcelExport'
    import UserUpdate from './update'
    import YKWarningList from '../../components/element/YKWarningList'
    import YkList from '../../components/element/YkList'
    import CycleExport from '../../models/CycleExport'
    import WtTableSelect from '../../components/element/WtTableSelect'

    export default {
        name: 'index',
        components: {WtTableSelect, YkList, YKWarningList, YkTable, WtIcon},
        data() {
            return {
                titleData: '可管理门店',
                maxHeight: 'px',
                tableLoading: false,
                model: model,
                modelSearch: new modelSearch(),
                rowData: [],
                iconSize: '12px',
                title: {
                    views: '详情',
                    update: '修改'
                },
                page: {
                    totalCount: ''
                },
                commonColumns: [
                    'username',
                    'name',
                    'phone',
                    'store_id',
                    'title',
                    'status'
                ],
                searchForm: {
                    pageSize: 20,
                    page: 1
                }

            }
        },

        mounted() {
            // 调取页面
            this.init()

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
            init() {
                this.tableLoading = true
                model.userIndex(this.searchForm, ({result}, page) => {
                    this.tableLoading = false
                    if (result.length) {
                        this.rowData = result
                        this.page.totalCount = page.totalCount
                    }
                })
            },

            // 数据导出
            exportModel() {
                // ExcelExport.Export('user',this.searchForm,({type,result})=>{
                //     if(type === 'success'){
                //         window.open(result.data.data.url);
                //     }
                //     else {
                //         this.$store.dispatch("showTip", {
                //             text: "导出失败",
                //             type: "error",
                //             duration: 2000
                //         });
                //     }
                // });

                const data = Object.assign(this.searchForm, { exportName: '用户管理', exportType: 'user' })
                this.$store.dispatch('showTip', {
                    text: '导出中'
                })
                CycleExport.Export('export-php', data, ({type, result}) => {
                    if (type !== 'success') {
                        this.$store.dispatch('showTip', {
                            text: CycleExport.waitText
                        })
                    }
                })
            },
            // 添加
            createModel() {
                this.$store.dispatch('showModal', {
                    title: '用户新增',
                    size: '800px',
                    view: create,
                    options: {},
                    onClose: () => {
                        this.init()
                    }
                })
            },
            // 修改
            modelUpdate(row) {
                const name = row.username
                this.$store.dispatch('showModal', {
                    title: '账号修改：' + name,
                    size: '800px',
                    view: UserUpdate,
                    options: {
                        id: row.id
                    },
                    onClose: () => {
                        this.init()
                    }
                })
            },
            // 搜索
            search() {
                this.searchForm.page = 1
                this.init()
            },

            // 详情
            modelViews(id) {
                this.$store.dispatch('showModal', {
                    title: '用户详情',
                    size: '800px',
                    view: views,
                    options: {
                        id: id
                    },
                    onClose: () => {
                        return true
                    }
                })
            },
            // 分页
           changePage({page}) {
                this.searchForm.page = page
                this.init()
            },
            changeSize({size}) {
                this.searchForm.pageSize = size
                this.searchForm.page = 1
                this.init()
            }

        },
        destroyed() {
            this.$store.dispatch('hideModal')
        }

    }
</script>

<style scoped>

</style>
