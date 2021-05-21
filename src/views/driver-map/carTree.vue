<template>
    <div class="h-div container">
        <div class="driver-search">
            <el-input placeholder='车牌/车架/车主' v-model.trim="searchCar.car_info" class="input-with-select" size="small">
                <el-button slot="append" icon="el-icon-search" @click="startSearch"></el-button>
            </el-input>
        </div>
        <div class="driver-status">
            <el-row type="flex" justify="space-around">
                <el-button-group class="car-panel">
                    <el-button
                        size="small"
                        @click="setSearchData('car_all')"
                        :type="searchCar.branch === 'car_all' ? 'primary': ''">
                        全部({{carNum.car_all}})
                    </el-button>
                    <el-button
                        size="small"
                        @click="setSearchData('car_prod')"
                        :type="searchCar.branch === 'car_prod' ? 'primary': ''">
                        80分上({{carNum.car_prod}})
                    </el-button>
                    <el-button
                        size="small"
                        @click="setSearchData('car_next')"
                        :type="searchCar.branch === 'car_next' ? 'primary': ''">
                        80分下({{carNum.car_next}})
                    </el-button>
                </el-button-group>
            </el-row>

            <el-row type="flex" justify="space-around">
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
                :data="carList"
                :props="props"
                :indent="10"
                :expand-on-click-node="false"
                default-expand-all
                node-key="id"
                ref="tree"
                show-checkbox
                @node-click="nodeClick"
                @check="checkClick"
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
                            <template v-if="data.children">
                                <span @click.stop="copyCode(data.vin_code)" title="复制车架号">
                                    <el-icon class="el-icon-copy-document" style="margin-right: 10px"></el-icon>
                                </span>
                                <span :style="{ color: data.running_status == 0 ? '' : 'red' }">
                                    {{ data.running_status == 0 ? '在线':'离线' }}
                                </span>
                            </template>

                            <span v-else>
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
    import Car from '../../models/Car'
    import Driver from '../../models/Driver'
    import Request from '../../cores/request/request'

    const baseImgUrl = 'https://yikong-v2.oss-cn-shanghai.aliyuncs.com/map/status_icons/'
    export default {
        name: 'CarTree',
        data() {
            return {
                input3: '',
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
                driverRunningStatus: {},
                carList: [],
                total: 0,
                pageCount: 0,
                searchCar: {
                    page: 1,
                    car_info: '',
                    has_child: 1,
                    store_id: '',
                    branch: 'car_all'
                },
                carNum: {
                    car_all: 0,
                    car_next: 0,
                    car_prod: 0
                },
                loading: false,
                interval: null,
                refreshTimer: 0,
                checkedList: [], // 所有选中的，用于设置视野
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
                            if (owner_name) {
                                if (owner_name.length > 5) {
                                    owner_name = owner_name.substr(0, 5) + '...'
                                }
                                return `${vin_code} - ${owner_name}`
                            }
                            if (license_plate) {
                                if (license_plate.length > 7) {
                                    license_plate = license_plate.substr(0, 7) + '...'
                                }
                                return `${vin_code} - ${license_plate}`
                            }
                            return vin_code
                        }
                    }
                }
            }
        },
        props: {
            // 以选中的项
            checkedLists: {
                type: Array,
                default: () => {
                    return []
                }
            },
            // 门店id
            storeId: {
                type: String,
                default: ''
            },
            // 是否包含子门店
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
            this.searchCar.store_id = this.storeId
            this.searchCar.has_child = this.setChild
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

            // 查看是否已经处于选中状态
            isChecked(data) {
                if (!data.children) {
                    return this.checkedList.includes(data.id)
                }

                let isChecked = true
                if (data.id !== -1) {
                    data.children.forEach((item) => {
                        if (!this.checkedList.includes(item.id)) {
                            isChecked = false
                        }
                    })
                }

                if (data.id === -1) {
                    data.children.forEach((item) => {
                        item.children.forEach((_item) => {
                            if (!this.checkedList.includes(_item.id)) {
                                isChecked = false
                            }
                        })
                    })
                }

                return isChecked
            },

            nodeClick(data) {
                console.log(data)
                const keys = this.$refs.tree.getCheckedKeys()// 被选中的所有的key
                const key = this.$refs.tree.getCurrentKey()// 当前点击节点的key
                // 点击的当前节点被选中，或者点击全选且全部选中
                if (keys.includes(key) || (key === -1 && keys.length === 20)) {
                    // 处理数据
                    // 获取选中的设备的设备号，
                    const driverList = this.getDriverCodes(data)
                    console.log(driverList)
                    this.sendDriverCodeForView(driverList)
                }
            },

            // 复选框被点击时的回调
            checkClick(data) {
                console.log(data)
                if (this.isChecked(data)) {
                    const delList = []
                    if (data.id === -1) {
                        data.children.forEach((item) => {
                            if (item.children.length === 0) {
                                const index = this.checkedList.indexOf(item.id)
                                this.checkedList.splice(index, 1)
                            }
                            item.children.forEach((_item) => {
                                const index = this.checkedList.indexOf(_item.id)
                                this.checkedList.splice(index, 1)
                                delList.push(_item.code)
                            })
                        })
                    }

                    if (data.children && data.id !== -1) {
                        if (data.children.length === 0) {
                            const index = this.checkedList.indexOf(data.id)
                            this.checkedList.splice(index, 1)
                        }
                        data.children.forEach((item) => {
                            const index = this.checkedList.indexOf(item.id)
                            this.checkedList.splice(index, 1)
                            delList.push(item.code)
                        })
                    }

                    if (!data.children) {
                        const index = this.checkedList.indexOf(data.id)
                        this.checkedList.splice(index, 1)
                        delList.push(data.code)
                    }

                    if (delList.length) {
                        this.sendDriverCodeForDelMarker(delList)
                    }
                    return
                }

                const driverList = []

                if (data.id === -1) {
                    data.children.forEach((item) => {
                        if (item.children.length === 0 && !this.checkedList.includes(item.id)) {
                            this.checkedList.push(item.id)
                        }
                        item.children.forEach((_item) => {
                            if (_item.code && !this.isChecked(_item) && !this.checkedList.includes(_item.id)) {
                                this.checkedList.push(_item.id)
                                driverList.push(_item.code)
                            }
                        })
                    })
                }

                // 如果点击的是车辆
                if (Object.keys(data).includes('children')) {
                    if (data.children.length === 0 && !this.checkedList.includes(data.id)) {
                        this.checkedList.push(data.id)
                    }
                    data.children.forEach((item) => {
                        if (item.code && !this.isChecked(item) && !this.checkedList.includes(item.id)) {
                            this.checkedList.push(item.id)
                            driverList.push(item.code)
                        }
                    })
                } else {
                    if (!this.checkedList.includes(data.id)) {
                        this.checkedList.push(data.id)
                        driverList.push(data.code)
                    }
                }

                this.sendDriverCodeForSetMarker(driverList)
            },

            // 根据车辆评分获取车辆数据
            setSearchData(data) {
                this.searchCar.page = 1
                this.searchCar.branch = data
                this.getData()
            },

            copyCode(data) {
                this.textCopy(data)
            },

            textCopy(content) {
                const _content = content
                if (content && content.length > 20) {
                    content = content.substr(0, 20) + '...'
                }
                const save = function (e) {
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

            // 搜索车辆
            startSearch() {
                this.searchCar.page = 1
                this.getData()
            },

            // 获取车辆设备号
            getDriverCodes(data) {
                const driverList = []
                // 点击的是全选
                if (data.id == -1 && data.children) {
                    data.children.forEach((item) => {
                        if (item.children && item.children.length) {
                            item.children.forEach((_item) => {
                                if (_item.code && this.checkedList.includes(_item.id)) {
                                    driverList.push(_item.code)
                                }
                            })
                        }
                    })
                    return driverList
                }
                // 去获取父节点
                if (data.children && data.children.length) {
                    data.children.forEach((item) => {
                        if (item.code && this.checkedList.includes(item.id)) {
                            driverList.push(item.code)
                        }
                    })
                }
                if (!data.children && data.code && this.checkedList.includes(data.id)) {
                    driverList.push(data.code)
                }
                return driverList
            },

            // 获取车辆数据
            getData() {
                this.loading = true
                Car.loadList(this.searchCar, ({type, data}) => {
                    this.loading = false
                    if (type === 'success') {
                        this.pageCount = data.page.pageCount
                        // 获取设备运行状态
                        this.getDriverRunningStatus(data.items)

                        this.setCheckedByDriverId()
                    }
                })
            },

            // 获取设备状态
            getDriverRunningStatus(carList) {
                const driverCodeList = []
                // 循环获取设备号
                carList.forEach((item) => {
                    // 更改car和driver的id， tree使用id作为key 避免与设备id相同
                    item.id.indexOf('c') === -1 ? item.id += 'c' : ''
                    if (item.children && item.children.length) {
                        const driverList = item.children
                        driverList.forEach((_item) => {
                            if (_item.id.indexOf('d') === -1) {
                                _item.id += 'd'
                            }
                            if (_item.code) {
                                driverCodeList.push(_item.code)
                            }
                        })
                    }
                })

                this.carList = [
                    {
                        id: -1,
                        label: '全选',
                        children: carList
                    }
                ]

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
                this.searchCar.page = data
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

            // 获取车辆数
            loadNum() {
                Request.get('carNum', {params: this.searchCar}, ({type, data}) => {
                    if (type === 'success') {
                        this.carNum.car_all = data.data.car_all
                        this.carNum.car_next = data.data.car_next
                        this.carNum.car_prod = data.data.car_prod
                    }
                })
            },

            // 刷新设备状态
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
                const carList = this.carList
                if (carList.length && carList[0].children) {
                    this.getDriverRunningStatus(carList[0].children)
                }
            }
        },
        computed: {
            // 获取设备运行状态
            /**
             *
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
    .driver-search {
        height: auto;
    }

    .container {
        padding: 3px 3px 50px 3px;
        box-sizing: border-box;
        position: relative;
    }

    .driver-status {
        height: 90px;
    }

    .driver-status-img {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .driver-tree {
        height: calc(100% - 140px);
        overflow: auto;
    }

    .img-name {
        height: 30px;
        color: #606266;
        line-height: 30px;
        width: auto;
        padding-left: 20px;
        font-size: 12px;
        background-size: 15px 15px !important;
    }

    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        padding-right: 8px;
    }

    .pagination {
        position: absolute;
        height: 50px;
        width: 100%;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
    }

    .status-img {
        padding-left: 18px;
        background-size: 12px 12px !important;
    }

    .car-panel {
        margin-top: 5px;
        width: 100%;
    }

    .car-panel button {
        width: 33.3%;
        font-size: 12px;
    }
</style>
