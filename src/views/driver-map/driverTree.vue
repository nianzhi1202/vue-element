<template>
    <div class="h-div container">
        <div class="driver-search">
            <el-input placeholder='设备号' v-model.trim="searchDriver.code" class="input-with-select" size="small">
                <el-button slot="append" icon="el-icon-search" @click="startSearch"></el-button>
            </el-input>
        </div>
        <div class="driver-status">
            <el-row type="flex" justify="space-around">
                <el-button-group class="car-panel">
                    <el-button
                        size="small"
                        @click="setSearchData('all_count')"
                        :type="searchDriver.running_status === 'all_count' ? 'primary': ''">
                        全部({{driverNum.all_count}})</el-button>
                    <el-button
                        size="small"
                        @click="setSearchData('online_count')"
                        :type="searchDriver.running_status === 'online_count' ? 'primary': ''">
                        在线({{driverNum.online_count}})</el-button>
                    <el-button
                        size="small"
                        @click="setSearchData('offline_count')"
                        :type="searchDriver.running_status === 'offline_count' ? 'primary': ''">
                        离线({{driverNum.offline_count}})</el-button>
                </el-button-group>
            </el-row>

            <el-row>
                <el-col :span="6" v-for="item in driverStatus" :key="item.src">
                    <div class="driver-status-img">
                        <div class="img-name" :style="{background:`url(${item.src}) no-repeat center left`}">
                            {{item.title}}
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="driver-tree" v-loading="loading">
            <el-tree
                v-show="!loading"
                :data="driverList"
                :props="props"
                :indent="10"
                :expand-on-click-node="false"
                default-expand-all
                node-key="id"
                show-checkbox
                @node-click="nodeClick"
                @check="checkClick"
                ref="tree"
                highlight-current>
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <template>
                        <span v-if="data.children">{{ node.label }}</span>
                        <span v-else class="status-img"
                              :style="{background: `url(${ getRunningStatus(data.code, 'img') }) no-repeat center left`}">
                              {{ node.label }}
                        </span>
                    </template>

                    <template>
                        <span v-if="node.label === '全选'">设备数<span class="no-data">(当前页)</span>：{{total}}</span>
                        <span v-else>
                            <span>
                                <span @click.stop="viewDriver(data.code, data.id)" title="查看设备信息">
                                    <el-icon class="el-icon-document" style="margin-right: 5px"></el-icon>
                                </span>
                                <span @click.stop="copyCode(data.code)" title="复制设备号">
                                    <el-icon class="el-icon-copy-document" style="margin-right: 10px"></el-icon>
                                </span>
                                <span>{{ getRunningStatus( data.code, 'text' ) }} </span>
                            </span>
                        </span>
                    </template>
                </span>
            </el-tree>
        </div>
        <div class="pagination">
            <el-pagination
                background
                small
                hide-on-single-page
                @current-change="currentChange"
                layout="pager"
                :page-count="pageCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import Driver from '../../models/Driver'
    import Request from '../../cores/request/request'

    const baseImgUrl = 'https://yikong-v2.oss-cn-shanghai.aliyuncs.com/map/status_icons/'
    export default {
        name: 'CarTree',
        data() {
            return {
                driverStatus: [
                    {
                        title: '在线',
                        src: `${baseImgUrl}online@2x.png`
                    },
                    {
                        title: '离线',
                        src: `${baseImgUrl}offline@2x.png`
                    },
                    {
                        title: '禁用',
                        src: `${baseImgUrl}forbid.png`
                    },
                    {
                        title: '未知',
                        src: `${baseImgUrl}unknown@2x.png`
                    }
                ],
                // 设备运行状态
                driverRunningStatus: {
                },
                driverList: [],
                total: 0,
                pageCount: 0,
                searchDriver: {
                    page: 1,
                    has_child: 1,
                    store_id: '',
                    running_status: 'all_count',
                    sort: ''
                },
                driverNum: {
                    all_count: 0,
                    online_count: 0,
                    offline_count: 0
                },
                interval: null,
                refreshTimer: 0,
                loading: false,
                checkedList: [],
                props: {
                    label: (data, node) => {
                        if (node.data.id === -1) {
                            return '全选'
                        }
                        if (!node.data.children) {
                            return `${node.data.code_list}(${node.data.type_view || '未知'})`
                        } else {
                            let license_plate = node.data.license_plate
                            let owner_name = node.data.owner_name
                            const vin_code = data.vin_code
                            if (license_plate) {
                                if (license_plate.length > 7) {
                                    license_plate = license_plate.substr(0, 7) + '...'
                                }
                                return `${vin_code} - ${license_plate}`
                            }
                            if (owner_name) {
                                if (owner_name.length > 5) {
                                    owner_name = owner_name.substr(0, 5) + '...'
                                }
                                return `${vin_code} - ${owner_name}`
                            }
                            return vin_code
                        }
                    }
                }
            }
        },
        props: {
            checkedLists: {
                type: Array,
                default: () => {
                    return []
                }
            },

            storeId: {
                type: String,
                default: ''
            },

            setChild: {
                type: [String, Number],
                default: 1
            },

            // 开启刷新设备状态
            refresh: {
                type: Boolean,
                default: true
            },

            // 刷新设备状态间隔
            refreshTime: {
                type: Number,
                default: 40
            }

        },
        created() {
            this.searchDriver.store_id = this.storeId
            this.searchDriver.has_child = this.setChild
            this.checkedList = this.checkedList.concat(this.checkedLists)
            this.getData()
            this.loadNum()

            this.$nextTick(() => {
                if (this.refresh) {
                    this.startRefresh()
                }
            })
        },
        methods: {

            // 设置选中状态
            setCheckedByDriverId() {
                this.$refs.tree.setCheckedKeys(this.checkedList)
            },

            // 将需要设置覆盖物的设备号发送给map组件
            sendDriverCodeForSetMarker(data) {
                console.log('點了')
                this.$emit('nodeClick', data)
            },

            // 将需要删除覆盖物的设备号发送给map组件
            sendDriverCodeForDelMarker(data) {
                this.$emit('delClick', data)
            },

            // 视野居中设备号
            sendDriverCodeForView(data) {
                this.$emit('centerClick', data)
            },

            startRefresh() {
                  this.interval = setInterval(() => {
                        this.refreshTimer += 1
                        if (this.refreshTimer === this.refreshTime) {
                            this.refreshTimer = 0
                            this.refreshDriverStatus()
                        }
                  }, 1000)
            },

            refreshDriverStatus() {
                const driverList = this.driverList
                if (driverList.length && driverList[0].children) {
                    this.getDriverRunningStatus(driverList[0].children)
                }
            },

            isChecked(data) {
                let res = true
                if (data.id === -1) {
                    data.children.forEach((item) => {
                        if (!this.checkedList.includes(item.id)) {
                            res = false
                        }
                    })
                }
                if (data.id !== -1 && !this.checkedList.includes(data.id)) {
                    res = false
                }
                return res
            },

            nodeClick(data) {
                let res = []
                if (this.isChecked(data)) {
                    if (data.id === -1) {
                        res = data.children.map((item) => {
                            return item.code
                        })
                    } else {
                        res.push(data.code)
                    }
                }
                if (res.length) {
                    this.sendDriverCodeForView(res)
                }
            },

            // 获取设备树 点击选取的的设备号 发送给父组件
            checkClick(data) {
                const codes = []
                if (this.isChecked(data)) {
                    if (data.id === -1) {
                        data.children.forEach((item) => {
                           const index = this.checkedList.indexOf(item.id)
                           this.checkedList.splice(index, 1)
                           codes.push(item.code)
                        })
                    } else {
                        const index = this.checkedList.indexOf(data.id)
                        this.checkedList.splice(index, 1)
                        codes.push(data.code)
                    }
                    this.sendDriverCodeForDelMarker(codes)
                    return
                }

                if (data.children) {
                    data.children.forEach((item) => {
                        if (!this.checkedList.includes(item.id)) {
                            codes.push(item.code)
                            this.checkedList.push(item.id)
                        }
                    })
                } else {
                    codes.push(data.code)
                    this.checkedList.push(data.id)
                }

                if (codes.length) {
                    this.sendDriverCodeForSetMarker(codes)
                }
            },

            // 根据设备状态 搜索设备
            setSearchData(data) {
                this.searchDriver.page = 1
                this.searchDriver.running_status = data
                this.getData()
            },

            // 复制
            copyCode(data) {
                this.textCopy(data)
            },

            // 查看设备信息

            // 复制
            textCopy(content) {
                const _content = content
                if (content && content.length > 20) {
                    content = content.substr(0, 20) + '...'
                }
                const save = function(e) {
                    e.clipboardData.setData('text/plain', _content)
                    e.preventDefault()
                }
                document.addEventListener('copy', save)
                document.execCommand('copy')
                document.removeEventListener('copy', save)
                this.$store.dispatch('showTip', {
                    text: `复制  ${content}  成功`,
                    type: 'success'
                })
            },

            // 根据设备号 搜索设备
            startSearch() {
                this.searchDriver.page = 1
                this.getData()
            },

            // 获取设备数据
            getData() {
                this.loading = true
                Driver.loadList(this.searchDriver, ({type, data}) => {
                    this.loading = false
                    if (type === 'success') {
                        this.driverList = [
                            {
                                id: -1,
                                label: '全选',
                                children: data.items
                            }
                        ]
                        this.setCheckedByDriverId()
                        this.pageCount = data.page.pageCount
                        if (data.items.length) {
                            this.getDriverRunningStatus(data.items)
                        }
                    }
                    console.log(data)
                })
            },

            // 批量获取设备当前状态 并保存到全局变量driverRunningStatus中
            getDriverRunningStatus(driverList) {
                let driverCodeList = []
                // 循环获取设备号
                driverCodeList = driverList.map((item) => {
                    return item.code
                })
                this.total = driverCodeList.length
                // 根据设备号获取设备运行状态
                Driver.loadCarStatus({codes: driverCodeList}, ({type, data}) => {
                    if (type === 'success') {
                        this.driverRunningStatus = Object.assign({}, data.data)
                    }
                })
            },

            // 分页
            currentChange(data) {
                this.searchDriver.page = data
                this.getData()
            },

            // 获取设备状态icon
            formatDriverStatusImg(status) {
                switch (status) {
                    case 'offline':
                        return `${baseImgUrl}offline@2x.png`
                    case 'online':
                        return `${baseImgUrl}online@2x.png`
                    case 'unknown':
                        return `${baseImgUrl}unknown@2x.png`
                    default:
                        return `${baseImgUrl}unknown@2x.png`
                }
            },

            // 设备数量统计
            loadNum() {
                Request.get('driverStatusList', {params: this.searchDriver}, ({type, data}) => {
                    if (type === 'success') {
                        this.driverNum.all_count = data.data.all_count
                        this.driverNum.offline_count = data.data.offline_count
                        this.driverNum.online_count = data.data.online_count
                    }
                })
            }
        },
        computed: {
            /**
             * @param data
             * @param type text返回状态文本 img返回状态的icon
             * @returns {function(...[*]=)}
             */
            // eslint-disable-next-line no-unused-vars
            getRunningStatus(data, type) {
                return function (data, type) {
                    const res = this.driverRunningStatus[data]
                    if (type === 'text') {
                        if (res) {
                            return `[${res.statusStr || '在线'}${res.statusTime ? ' ' : ''}]`
                        }
                        return '获取中'
                    } else {
                        if (res) {
                            return this.formatDriverStatusImg(res.statusView)
                        }
                        return this.formatDriverStatusImg('default')
                    }
                }
            }
        },
        destroyed() {
            if (this.interval) {
                clearInterval(this.interval)
            }
        }
    }
</script>

<style scoped>
    .driver-search{
        height: auto;
    }
    .container{
        padding: 3px 3px 50px 3px;
        box-sizing: border-box;
        position: relative;
    }
    .driver-status{
        height: 90px;
    }
    .driver-status-img{
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .driver-tree{
        height: calc(100% - 140px);
        overflow: auto;
    }
    .img-name{
        height: 30px;
        color: #606266;
        line-height: 30px;
        width: auto;
        padding-left: 20px;
        font-size: 12px;
        background-size: 15px 15px!important;
    }
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        padding-right: 8px;
    }
    .pagination{
        position: absolute;
        height: 50px;
        width: 100%;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
    }
    .status-img{
        padding-left: 18px;
        background-size: 12px 12px!important;
    }
    .car-panel{
        margin-top: 5px;
        width: 100%;
    }
    .car-panel button{
        width: 33.3%;
        font-size: 12px;
    }
</style>
