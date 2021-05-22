<template>
    <div class="car-index h-div">
        <div class="table h-div" ref="tableRow">
            <el-table-list
                :max-hight="maxHeight"
                :total="page.totalCount"
                @change-page="changePage"
                @change-size="changeSize"
                @change-select="selectRow"
                :page="searchForm.page"
                :row-data="rowData"
                :loading="tableLoading">

                <template slot="search">
                    <div class="search">
                        <el-row>
                            <el-col :span="20">
                                <el-table-search :model="model" :form-data="model.searchAttribute"
                                                 @searchData="searchData"></el-table-search>
                            </el-col>
                            <el-col :span="4" class="search-btn-container">
                                <el-button type="primary" class="yk-search-btn" size="small" @click="search">搜索
                                </el-button>
                                <el-button type="primary" size="small" class="button button-tag">导出</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </template>

                <template slot="operation">
                    <el-row class="button" style="text-align: right;">
                        <el-button size="small" v-permission="'客户端_V2_系统设置_用户管理_新增'" @click="changeStore"
                                   class="button-tag">批量操作0
                        </el-button>
                        <el-button size="small" class="button-tag">批量操作1</el-button>
                        <el-button size="small" class="button button-tag">批量操作2</el-button>
                    </el-row>
                </template>

                <template slot="columns">
                    <el-table-column prop="goods_name" :label="Car.getAttributeLabel( 'goods_name' )" min-width="100">
                        <template slot-scope="scope">
                            <TableCol :data="scope.row.goods_name"></TableCol>
                        </template>
                    </el-table-column>
                    <el-table-column prop="goods_name_tag" :label="Car.getAttributeLabel( 'goods_name_tag' )"
                                     min-width="100">
                        <template slot-scope="scope">
                            <TableCol :data="scope.row.goods_name_tag"></TableCol>
                        </template>
                    </el-table-column>
                    <el-table-column prop="goods_name_icon" :label="Car.getAttributeLabel( 'goods_name_icon' )"
                                     min-width="200">
                        <template slot-scope="scope">
                            <TableCol :data="scope.row.goods_name_icon"></TableCol>
                        </template>
                    </el-table-column>
                    <el-table-column prop="goods_name_multiple" :label="Car.getAttributeLabel( 'goods_name_multiple' )"
                                     min-width="200">
                        <template slot-scope="scope">
                            <TableCol :data="scope.row.goods_name_multiple"></TableCol>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name_or_phone" :label="Car.getAttributeLabel( 'name_or_phone' )"
                                     min-width="200">
                        <template slot-scope="scope">
                            <TableCol :data="scope.row.name_or_phone"></TableCol>
                        </template>
                    </el-table-column>

                    <el-table-column prop="driver_code" :label="Car.getAttributeLabel( 'driver_code' )" min-width="260">
                        <template slot-scope="scope">
                            <TableCol :type="'popover'" :data="scope.row.driver_code"></TableCol>
                        </template>
                    </el-table-column>

                    <el-table-column prop="user_modal" :label="Car.getAttributeLabel( 'user_modal' )"
                                     min-width="200">
                        <template slot-scope="scope">
                            <TableCol @modalStore="showStore" modalName="modalStore"
                                      :data="scope.row.user_modal"></TableCol>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="user_link"
                        align="center"
                        min-width="100"
                        :label="Car.getAttributeLabel( 'user_link' )">
                        <template slot-scope="scope">
                            <TableCol :data="scope.row.user_link"></TableCol>
                        </template>
                    </el-table-column>

                    <el-table-column
                        fixed="right"
                        label="操作"
                        prop="id"
                        min-width="150">
                        <template slot-scope="scope">
                            <span @click="goPath('/car/views',scope.row.id)" v-permission="'客户端_V2_资产管理_车辆管理_详细'"
                                  class="point">
                                <wt-icon color="#409eff" name="wt-icon-chakan-o" :size="iconSize"
                                         :title="title.views"> </wt-icon>
                            </span>
                            <span @click="goPath('/car/update', scope.row.id)"
                                  class="point">
                                <wt-icon name="wt-icon-xiugai" color="#409eff" :size="iconSize"
                                         :title="title.update"> </wt-icon>
                            </span>
                            <span @click="driverLocation(scope.row.id)"
                                  class="point">
                                <wt-icon name="wt-icon-dingwei" color="#409eff" :size="iconSize"
                                         :title="title.location"> </wt-icon>
                            </span>
                            <span @click="goPath('/car/score', scope.row.id)"
                                  class="point">
                                <wt-icon name="wt-icon-zhuzhuangtu-o" color="#409eff" :size="iconSize"
                                         :title="title.score"> </wt-icon>
                            </span>
                            <span @click="ruleSetting(scope.row)" class="point">
                                <wt-icon name="wt-icon-shezhi" color="#409eff" :size="iconSize"
                                         :title="title.warning"> </wt-icon>
                            </span>
                        </template>
                    </el-table-column>

                </template>
            </el-table-list>
        </div>
    </div>
</template>

<script>

    import WtIcon from '../../components/WtIcon'
    import Car from '../../models/Car'
    import ElTableSearch from '../../components/element/ElTableSearch'
    import ElTableList from '../../components/element/ElTableList'
    import CarIndexSearch from '../../models/search/CarIndexSearch'
    import carChangeStore from './carChangeStore'
    import TableCol from '../../components/element/TableCol'

    export default {
        name: 'index',
        components: {ElTableSearch, ElTableList, TableCol, WtIcon},
        data() {
            return {
                model: new CarIndexSearch(),
                selectRowList: null,
                selectCarList: null,
                maxHeight: 'px',
                commonColumns: [],
                iconSize: '12px',
                Car: Car,
                title: {
                    views: '查看',
                    update: '修改',
                    location: '定位',
                    score: '评分卡',
                    warning: '报警设置'
                },
                tableLoading: false,
                rowData: [],
                page: {
                    totalCount: ''
                },
                searchForm: {
                    start_install_time: this.$route.query.start_install_time || undefined,
                    end_install_time: this.$route.query.end_install_time || undefined,
                    risk_grade: this.$route.query.risk_grade,
                    page: 1,
                    pageSize: 20
                }
            }
        },

        created() {

        },

        watch: {
            // 监听路由参数变化
            $route: 'getParams'
        },

        mounted() {
            // 设置表格组件的最大高度
            this.$nextTick(() => {
                this.getParams()
                this.searchForm.page = this.$store.state.indexPage
                this.searchForm.has_child = this.$route.query.has_child || this.searchForm.has_child
                this.initIndex()

                const height = this.$refs.tableRow.clientHeight
                if (height) {
                    this.maxHeight = (height - 140).toString()
                }
            })
        },
        computed: {},
        methods: {

            showStore() {
                this.$store.dispatch('showModal', {
                    title: '弹出modal',
                    size: '800px',
                    view: carChangeStore,
                    options: {
                        carIds: '参数',
                        row: this.selectCarList
                    },
                    onClose: () => {
                        this.initIndex()
                    }
                })
            },

            searchData(data) {
                console.log(data)
                for (const i in data) {
                    this.searchForm[i] = data[i]
                }
            },

            // 转移门店
            changeStore() {
                if (!this.selectRowList || !this.selectRowList.length) {
                    this.tip('请选择车辆', 'error')
                    return
                }
                this.$store.dispatch('showModal', {
                    title: '车辆门店转移',
                    size: '800px',
                    view: carChangeStore,
                    options: {
                        carIds: this.selectRowList,
                        row: this.selectCarList
                    },
                    onClose: () => {
                        this.initIndex()
                    }
                })
            },

            goPath(path, id) {
                window.open(path + '?id=' + id)
                // this.$router.push({
                //     path: path,
                //     query: id
                // })
            },

            isChild(data) {
                this.searchForm.has_child = data ? 1 : 0
            },

            formatTagType(type) {
                if (type === '高危') {
                    return 'danger'
                }
                if (type === '可疑') {
                    return 'warning'
                }
                if (type === '正常') {
                    return 'primary'
                }
                return 'info'
            },

            formatColor(data) {
                switch (data) {
                    case '在线':
                        return '#54C292'
                    case '离线':
                        return '#FF4951'
                    case '静止':
                        return '#54C292'
                    case '休眠':
                        return '#54C292'
                    case '行驶':
                        return '#54C292'
                    default:
                        return '#FF4951'
                }
            },

            tip(msg, type) {
                this.$store.dispatch('showTip', {
                    text: msg,
                    type: type,
                    duration: 2000
                })
            },
            ruleSetting(row) {
                this.$router.push({
                    path: '/rule/driverRule',
                    query: {
                        carId: row.id,
                        type: 3,
                        storeId: this.rowData.index[row.id].data.store_id,
                        detail: row.car_info_view.vin_code_type.vin_code
                    }
                })
            },
            getParams() {
                // 接收路由带过来的参数（首页的快捷跳转）
                this.searchForm.start_install_time = this.$route.query.start_install_time
                this.searchForm.end_install_time = this.$route.query.end_install_time
                this.searchForm.risk_grade = this.$route.query.risk_grade
                this.searchForm.grade = this.$route.query.grade // 驾驶舱车辆评分占比跳转

                for (const i of this.model.searchAttribute) {
                    switch (i.name) {
                        case 'store_id':
                            i.value = this.$route.query.store_id || i.value
                            this.searchForm.store_id = this.$route.query.store_id || ''
                            break
                        case 'is_clearing':
                            i.value = this.$route.query.is_clearing || i.value
                            this.searchForm.is_clearing = this.$route.query.is_clearing || 0
                            break
                    }
                }
            },
            getSearch() {
                return new Promise((resolve) => {
                    for (const i of this.model.searchAttribute) {
                        switch (i.name) {
                            case 'store_id':
                                i.value = this.$route.query.store_id || i.value
                                break
                            case 'has_child':
                                i.value = this.$route.query.has_child || i.value
                                break
                        }
                        resolve(true)
                    }
                })
            },
            async initIndex() {
                this.tableLoading = true
                await this.getSearch()
                Car.CarIndex(this.searchForm, ({result}, page) => {
                    this.tableLoading = false
                    if (result.length) {
                        this.rowData = result
                        this.page.totalCount = page.totalCount
                    }
                })
            },
            //
            driverLocation(id) {
                this.$store.dispatch('showModal', {
                    title: '车辆定位',
                    size: '800px',
                    view: Location,
                    options: {
                        id: id,
                        type: 'carId'
                    },
                    onClose: () => {
                        return true
                    }
                })
            },
            search() {
                this.searchForm.page = 1
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
            },
            selectRow(row) {
                this.selectRowList = row.val.map((item) => {
                    return item.id
                })
                this.selectCarList = row
            }

        },
        destroyed() {
            this.$store.dispatch('hideModal')
            // 将当前的页码保存
            this.$store.commit('updateIndexPage', this.searchForm.page)
        }
    }
</script>

<style scoped>
    .point {
        cursor: pointer;
    }
</style>
