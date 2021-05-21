<template>
    <div class="search-driver">
        <el-row :gutter="4" class="toggle-btn">
            <el-col :span="12">
                <el-button :type="type === 'car' ? 'primary' : ''" size="small" :loading="carLoading"
                           @click="toggle('car')">车辆
                </el-button>
            </el-col>
            <el-col :span="12">
                <el-button :type="type === 'driver' ? 'primary' : ''" :loading="driverLoading" size="small"
                           @click="toggle('driver')">设备
                </el-button>
            </el-col>
        </el-row>
        <div class="car-list" v-show="type === 'car'">
            <el-input v-model="searchCar.car_info" placeholder="车牌/车架/车主" size="small">
                <el-button slot="append" icon="el-icon-search" @click="loadCarListAll"></el-button>
            </el-input>
            <car-panel :click="clickStatus" :list="carNum" :id=" type==='car' ? 'height' : 'hide' "></car-panel>
            <div :style="{height:height+'px'}" v-loading="loadingCar">
                <el-scrollbar style="height: 100%">
                    <div class="show-msg">
                        <div class="online">在线</div>
                        <div class="offline">离线</div>
                        <div class="forbid">禁用</div>
                        <div class="unknow">未知</div>
                    </div>
                    <template>
                        <el-checkbox v-model="isCheckedAll" :disabled="start < 5 ? true : false" class="check-all"> 全选</el-checkbox>
                    </template>
                    <el-tree
                            style="transform: translateZ(0);"
                            ref="carTree"
                            :data="carList"
                            show-checkbox
                            node-key="id"
                            :render-content="renderContent"
                            empty-text="无车辆"
                            @check-change="checkCar"
                            :default-expand-all="true"
                            :check-on-click-node="false"
                            :expand-on-click-node="false"
                            :render-after-expand="false"
                            @node-click="nodeCarClick"
                            :props="props">
                    </el-tree>
                </el-scrollbar>
            </div>
            <pagination
                    layout="prev, pager, next"
                    :data="pageCarData"
                    :current-change="changeCarPage">
            </pagination>
        </div>
        <div v-show="type !== 'car'" class="driver-list">
            <el-input v-model="searchDriver.code" placeholder="设备号" size="small">
                <el-button slot="append" icon="el-icon-search" @click="loadDriverNum"></el-button>
            </el-input>
            <status-panel :click="clickStatus" :list="statusList"
                          :id=" type==='driver' ? 'height' : 'hide' "></status-panel>
            <div :style="{height:height+'px'}" v-loading="loadingDriver">
                <el-scrollbar style="height: 100%">
                    <div class="show-msg">
                        <div class="online">在线</div>
                        <div class="offline">离线</div>
                        <div class="forbid">禁用</div>
                        <div class="unknow">未知</div>
                    </div>
                    <template>
                        <el-checkbox v-model="isCheckedAll" :disabled="start < 5 ? true : false" class="check-all"> 全选</el-checkbox>
                    </template>
                    <el-tree
                            style="transform: translateZ(0);"
                            ref="driverTree"
                            class="yk-tree"
                            :data="driverList"
                            show-checkbox
                            node-key="id"
                            :render-content="renderDriverContent"
                            @check-change="checkDriver"
                            empty-text="无设备"
                            :check-on-click-node="false"
                            @node-click="nodeDriverClick"
                            :props="props">

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
                </el-scrollbar>
            </div>
            <pagination
                    layout="prev, pager, next"
                    :data="pageDriverData"
                    :current-change="changeDriverPage">
            </pagination>
        </div>
    </div>
</template>

<script>
    import StatusPanel from './statusPanel'
    import CarPanel from './carPanel'
    import Pagination from './pagination'
    import Car from '../../models/Car'
    import Driver from '../../models/Driver'
    import Request from '../../cores/request/request'

    export default {
        name: 'searchDriver',
        components: {Pagination, StatusPanel, CarPanel},
        props: ['clickDriver', 'clickCar', 'map', 'clickCarNode', 'clickDriverNode'],
        data() {
            return {
                driverStatusObj: {},
                start: 5,
                isCheckedAll: false,
                WTMap: null,
                baseImgUrl: 'https://yikong-v2.oss-cn-shanghai.aliyuncs.com/map/status_icons/',
                loadingCar: true,
                loadingDriver: true,
                reloadScroll: true,
                height: 300,
                pageCarData: {total: 0, page: 1},
                pageDriverData: {total: 0, page: 1},
                statusList: {
                    all_count: 0,
                    online_count: 0,
                    offline_count: 0
                },
                driverLoading: false,
                carLoading: false,

                carNum: {
                    car_all: 0,
                    car_next: 0,
                    car_prod: 0
                },
                searchCar: {},
                searchDriver: {sort: ''},
                type: 'car',
                props: {
                    label: (data, node) => {
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
                },
                carList: [],
                driverList: [],
                carStatusList: {}
            }
        },

        watch: {
            // 确保原生地图对象被加载
            map: function (val) {
                if (val) {
                    this.WTMap = val
                }
            },
            // 全选
            isCheckedAll: function (val) {
                if (!val) {
                    this.$emit('changeCheckedAllStatus', val)
                    this.$nextTick(() => {
                        this.$refs.carTree.setCheckedKeys([])
                        this.$refs.driverTree.setCheckedKeys([])
                    })
                } else {
                    this.start = 4
                    setTimeout(() => {
                        this.start = 5
                    }, 1500)
                    this.$emit('changeCheckedAllStatus', val)
                    // this.tip('正在定位中，请稍后', 'success', 4000)
                    if (this.type === 'car') {
                        this.checkedAllByInit(this.carList, 'carTree')
                        return
                    }
                    if (this.type === 'driver') {
                        this.checkedAllByInit(this.driverList, 'driverTree')
                    }
                }
            },

            // 监听清空搜索框时 重置搜索条件
            'searchDriver.code': function (val) {
                if (!val) {
                    this.searchDriver.running_status = 'all_count'
                }
            },

            // 监听清空搜索框时 重置搜索条件
            'searchCar.car_info': function (val) {
                if (!val) {
                    this.searchCar.branch = 'car_all'
                }
            }
        },
        created() {
            this.loadDriverStatusList()
            this.loadDriverList()
            this.loadCarList()
            this.loadCarNum()
            // 确保所有dom加载完毕
            this.$nextTick(() => {
                this.height = document.body.clientHeight - document.getElementById('height').offsetTop - 70
            })
        },
        methods: {
            // 复制设备号
            copyCode(content) {
                if (content.indexOf('-') !== -1) {
                    content = content.split('-')[0]
                }
                this.$emit('copyCode', content)
            },

            // 查看设备详情
            viewDetail(code, id) {
                this.$emit('driverView', code, id)
            },
            // 自定义树节点样式
            renderContent(h, {node, data}) {
                let status_view
                // eslint-disable-next-line no-unused-vars
                let status_code
                let status_img
                const isRoot = Object.keys(node.data).includes('children')
                if (!isRoot) {
                    const driver = new Driver(node.data)
                    // status_code = driver.data.statusView
                    // status_view = driver.data.carStatus || ''

                    status_view = '[未知]'
                    status_img = this.formatEqu('unknown')

                    if (this.driverStatusObj[node.data.code_list]) {
                        status_view = this.driverStatusObj[node.data.code_list].statusDesc
                        status_img = this.formatEqu(this.driverStatusObj[node.data.code_list].statusView)
                    }
                    return (
                        <div class="el-tree-node__label"
                    style="display:flex;justify-content: space-between;padding-right:3px;width:100%">
                        <div style="align-items: center;display:flex">
                        <div style={{
                        background: 'url(' + status_img + ') no-repeat center center',
                            width: '10px',
                            height: '10px',
                            display: 'inline-block'
                    }} class="yk-car-driver-status-bg"></div>
                        <div style="margin-left:5px">{node.label}</div>
                        <div style={{display: 'inline-block', marginLeft: '5px'}} on-click={() => {
                        this.copyCode(data.code)
                    }} title="复制设备号">
                        <svg t="1573786631014" className="icon  svg-hover" viewBox="0 0 1024 1024"
                    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2026"
                    xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="15">
                        <defs>
                        <style
                    type="text/css"></style>
                        </defs>
                        <path
                    d="M672 832 224 832c-52.928 0-96-43.072-96-96L128 160c0-52.928 43.072-96 96-96l448 0c52.928 0 96 43.072 96 96l0 576C768 788.928 724.928 832 672 832zM224 128C206.368 128 192 142.368 192 160l0 576c0 17.664 14.368 32 32 32l448 0c17.664 0 32-14.336 32-32L704 160c0-17.632-14.336-32-32-32L224 128z"
                    p-id="2027" fill="#1296db"></path>
                        <path
                    d="M800 960 320 960c-17.664 0-32-14.304-32-32s14.336-32 32-32l480 0c17.664 0 32-14.336 32-32L832 256c0-17.664 14.304-32 32-32s32 14.336 32 32l0 608C896 916.928 852.928 960 800 960z"
                    p-id="2028" fill="#1296db"></path>
                        <path
                    d="M544 320 288 320c-17.664 0-32-14.336-32-32s14.336-32 32-32l256 0c17.696 0 32 14.336 32 32S561.696 320 544 320z"
                    p-id="2029" fill="#1296db"></path>
                        <path
                    d="M608 480 288.032 480c-17.664 0-32-14.336-32-32s14.336-32 32-32L608 416c17.696 0 32 14.336 32 32S625.696 480 608 480z"
                    p-id="2030" fill="#1296db"></path>
                        <path
                    d="M608 640 288 640c-17.664 0-32-14.304-32-32s14.336-32 32-32l320 0c17.696 0 32 14.304 32 32S625.696 640 608 640z"
                    p-id="2031" fill="#1296db"></path>
                        </svg>
                        </div>
                        <div style={{display: 'inline-block', marginLeft: '5px'}} on-click={() => {
                        this.viewDetail(data.code_list, driver.data.id)
                    }} title="查看设备信息">
                        <svg t="1574400937784" className="icon  svg-hover" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="1152" width="15" height="15"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                        <defs>
                        <style type="text/css"></style>
                        </defs>
                        <path
                    d="M859.8 823.4C937.5 728 932 587.2 843 498.3c-47.5-47.5-109.6-71.2-171.8-71.2-62.2 0-124.4 23.7-171.8 71.2-94.9 94.9-94.9 248.8 0 343.7 47.4 47.4 109.6 71.2 171.8 71.2 54.4 0 108.7-18.1 153.3-54.4l99.9 99.9 35.4-35.4-100-99.9zM821 791.8l-12.6 15.5-15.6 12.7c-17.3 14.1-36.8 25-57.8 32.4-20.5 7.2-42 10.8-63.8 10.8-51.6 0-100-20.1-136.5-56.5-36.5-36.5-56.5-84.9-56.5-136.5 0-51.6 20.1-100 56.5-136.5 36.5-36.5 84.9-56.5 136.5-56.5 51.6 0 100 20.1 136.5 56.5 34 34 54 79.2 56.3 127.1 2.2 47.7-13 94.2-43 131z"
                    fill="#3a98dc" p-id="1153"></path>
                        <path d="M432 910H172V114h680v288h50V64H122v896h310z" fill="#3a98dc"
                    p-id="1154"></path>
                        <path d="M262 281h500v50H262zM262 441.1h130v50H262zM262 601.2h130v50H262z"
                    fill="#3a98dc" p-id="1155"></path>
                        </svg>
                        </div>
                        </div>
                        <div
                    style="color:#00000;display:flex;align-items: center;justify-content: flex-end;">{status_view}</div>
                        </div>
                )
                } else {
                    const carStatus = node.data.running_status === 0 ? '在线' : '离线'
                    const bg = node.data.running_status === 0 ? `${this.baseImgUrl}online@2x.png` : `${this.baseImgUrl}offline@2x.png`
                    return (
                        <div class="el-tree-node__label"
                    style="display:flex;align-items:center;justify-content: space-between;width:100%;padding-right:3px">
                        <div style="display:flex;align-items:center">
                        <div style={{
                        background: 'url(' + bg + ') no-repeat center center',
                            width: '10px',
                            height: '10px',
                            display: 'inline-block'
                    }} class="yk-car-driver-status-bg"></div>
                        <div style="margin-left:5px">{node.label}</div>
                        <div style={{display: 'inline-block', marginLeft: '5px'}} on-click={() => {
                        this.copyCode(node.data.vin_code)
                    }} class="show-svg">
                        <svg t="1573786631014" class="icon  svg-hover" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2026"
                    xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="15">
                        <defs>
                        <style type="text/css"></style>
                        </defs>
                        <path
                    d="M672 832 224 832c-52.928 0-96-43.072-96-96L128 160c0-52.928 43.072-96 96-96l448 0c52.928 0 96 43.072 96 96l0 576C768 788.928 724.928 832 672 832zM224 128C206.368 128 192 142.368 192 160l0 576c0 17.664 14.368 32 32 32l448 0c17.664 0 32-14.336 32-32L704 160c0-17.632-14.336-32-32-32L224 128z"
                    p-id="2027" fill="#1296db"></path>
                        <path
                    d="M800 960 320 960c-17.664 0-32-14.304-32-32s14.336-32 32-32l480 0c17.664 0 32-14.336 32-32L832 256c0-17.664 14.304-32 32-32s32 14.336 32 32l0 608C896 916.928 852.928 960 800 960z"
                    p-id="2028" fill="#1296db"></path>
                        <path
                    d="M544 320 288 320c-17.664 0-32-14.336-32-32s14.336-32 32-32l256 0c17.696 0 32 14.336 32 32S561.696 320 544 320z"
                    p-id="2029" fill="#1296db"></path>
                        <path
                    d="M608 480 288.032 480c-17.664 0-32-14.336-32-32s14.336-32 32-32L608 416c17.696 0 32 14.336 32 32S625.696 480 608 480z"
                    p-id="2030" fill="#1296db"></path>
                        <path
                    d="M608 640 288 640c-17.664 0-32-14.304-32-32s14.336-32 32-32l320 0c17.696 0 32 14.304 32 32S625.696 640 608 640z"
                    p-id="2031" fill="#1296db"></path>
                        </svg>
                        </div>
                        </div>
                        <div
                    style="color:#606266;display:flex;align-items:center">{carStatus}</div>
                        </div>
                )
                }
            },

            // 设备状态icon
            formatEqu(status) {
                if (!status) {
                    return `${this.baseImgUrl}unknown@2x.png`
                }
                switch (status) {
                    case 'offline':
                        return `${this.baseImgUrl}offline@2x.png`
                    case 'online':
                        return `${this.baseImgUrl}online@2x.png`
                    case 'unknown':
                        return `${this.baseImgUrl}unknown@2x.png`
                    default:
                        return `${this.baseImgUrl}unknown@2x.png`
                }
            },

            // 自定义设备树列表
            renderDriverContent(h, {node, data}) {
                console.log(node)
                // eslint-disable-next-line no-unused-vars
                let status_bg
                let status_code
                // let statusRefresh;
                const driver = new Driver(data)
                // let copyContent = data.code
                status_code = driver.data.statusView
                status_bg = this.formatEqu(status_code)
                // eslint-disable-next-line no-undef
                statusRefresh = driver.data.carStatus || ''
                return (
                    `<div class="el-tree-node__label"
                style="display:flex;align-items:center;justify-content: space-between;width:100%;padding-right:3px">
                    <div style="align-items: center;display:flex">
                    <div style={{
                    background: 'url(' + status_bg + ') no-repeat center center',
                        width: '10px',
                        height: '10px',
                        display: 'inline-block'
                }} class="yk-car-driver-status-bg"></div>
                    <div style="margin-left:5px">{node.label}</div>
                    <div style="margin-left:5px;color:blue " on-click={() => {
                    this.copyCode(copyContent)
                }} class="show-svg">
                    <svg t="1573786631014" class="icon svg-hover" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="2026"
                xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="15">
                    <defs>
                    <style type="text/css"></style>
                    </defs>
                    <path
                d="M672 832 224 832c-52.928 0-96-43.072-96-96L128 160c0-52.928 43.072-96 96-96l448 0c52.928 0 96 43.072 96 96l0 576C768 788.928 724.928 832 672 832zM224 128C206.368 128 192 142.368 192 160l0 576c0 17.664 14.368 32 32 32l448 0c17.664 0 32-14.336 32-32L704 160c0-17.632-14.336-32-32-32L224 128z"
                p-id="2027" fill="#1296db"></path>
                    <path
                d="M800 960 320 960c-17.664 0-32-14.304-32-32s14.336-32 32-32l480 0c17.664 0 32-14.336 32-32L832 256c0-17.664 14.304-32 32-32s32 14.336 32 32l0 608C896 916.928 852.928 960 800 960z"
                p-id="2028" fill="#1296db"></path>
                    <path
                d="M544 320 288 320c-17.664 0-32-14.336-32-32s14.336-32 32-32l256 0c17.696 0 32 14.336 32 32S561.696 320 544 320z"
                p-id="2029" fill="#1296db"></path>
                    <path
                d="M608 480 288.032 480c-17.664 0-32-14.336-32-32s14.336-32 32-32L608 416c17.696 0 32 14.336 32 32S625.696 480 608 480z"
                p-id="2030" fill="#1296db"></path>
                    <path
                d="M608 640 288 640c-17.664 0-32-14.304-32-32s14.336-32 32-32l320 0c17.696 0 32 14.304 32 32S625.696 640 608 640z"
                p-id="2031" fill="#1296db"></path>
                    </svg>
                    </div>

                    <div style={{display: 'inline-block', marginLeft: '5px'}} on-click={() => {
                    this.viewDetail(data.code_list, driver.data.id)
                }} title="查看设备信息" class="show-svg">
                    <svg t="1574400937784" class="icon svg-hover" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="1152" width="14" height="14"
                xmlns:xlink="http://www.w3.org/1999/xlink">
                    <defs>
                    <style type="text/css"></style>
                    </defs>
                    <path
                d="M859.8 823.4C937.5 728 932 587.2 843 498.3c-47.5-47.5-109.6-71.2-171.8-71.2-62.2 0-124.4 23.7-171.8 71.2-94.9 94.9-94.9 248.8 0 343.7 47.4 47.4 109.6 71.2 171.8 71.2 54.4 0 108.7-18.1 153.3-54.4l99.9 99.9 35.4-35.4-100-99.9zM821 791.8l-12.6 15.5-15.6 12.7c-17.3 14.1-36.8 25-57.8 32.4-20.5 7.2-42 10.8-63.8 10.8-51.6 0-100-20.1-136.5-56.5-36.5-36.5-56.5-84.9-56.5-136.5 0-51.6 20.1-100 56.5-136.5 36.5-36.5 84.9-56.5 136.5-56.5 51.6 0 100 20.1 136.5 56.5 34 34 54 79.2 56.3 127.1 2.2 47.7-13 94.2-43 131z"
                fill="#3a98dc" p-id="1153"></path>
                    <path d="M432 910H172V114h680v288h50V64H122v896h310z" fill="#3a98dc"
                p-id="1154"></path>
                    <path d="M262 281h500v50H262zM262 441.1h130v50H262zM262 601.2h130v50H262z"
                fill="#3a98dc" p-id="1155"></path>
                    </svg>
                    </div>
                    </div>
                    <span style="color:#00000;display:flex;align-items:center">{statusRefresh}</span>
                    </div>`
            )
            },

            // 删除所有覆盖物
            removeAllMarker() {
                try {
                    this.WTMap.removeAllMarker()
                } catch (e) {

                }
            },

            // 手动全选
            checkedAllByInit(data, refObj) {
                const list = data.map(({id}) => {
                    return id
                })
                this.$refs[refObj].setCheckedKeys(list)
            },
            // 翻页
            changeDriverPage(page) {
                this.loadingDriver = true
                this.isCheckedAll = false
                this.searchDriver.page = page
                this.loadDriverList()
                this.removeAllMarker()
                if (this.$refs.driverTree) {
                    this.$refs.driverTree.setCheckedKeys([])
                }
            },

            changeCarPage(page) {
                this.loadingCar = true
                this.isCheckedAll = false
                this.searchCar.page = page
                this.loadCarList()
                this.removeAllMarker()
                if (this.$refs.carTree) {
                    this.$refs.carTree.setCheckedKeys([])
                }
            },

            tip(text, type, duration) {
                this.$store.dispatch('showNotice', {
                    text: text,
                    type: type,
                    duration: duration
                })
            },

            clickStatus(status) {
                this.isCheckedAll = false
                this.pageCarData = {total: 0, page: 1}
                this.pageDriverData = {total: 0, page: 1}
                if (this.type === 'car') {
                    this.searchCar.page = 1
                    this.loadingCar = true
                    this.searchCar.branch = status
                    this.loadCarList()
                } else {
                    this.searchDriver.page = 1
                    this.loadingDriver = true
                    this.searchDriver.running_status = status
                    this.loadDriverList()
                }
            },

            // 切换数据
            toggle(type) {
                this.isCheckedAll = false
                if (this.type === type) {
                    return false
                }
                this.type = type
                this.setLoading(type)
                if (type === 'car') {
                    this.searchCar.branch = 'car_all'
                    this.loadingCar = true
                    this.loadCarListAll()
                } else {
                    this.searchDriver.running_status = 'all_count'
                    this.loadingDriver = true
                    this.loadDriverNum()
                }
            },

            setLoading(type) {
                if (type == 'car') {
                    this.driverLoading = true
                } else {
                    this.carLoading = true
                }
                setTimeout(() => {
                    this.driverLoading = false
                    this.carLoading = false
                }, 500)
            },

            checkDriver(data, checked, hasChildrenChecked) {
                this.clickDriver(data, checked, hasChildrenChecked)
            },

            nodeDriverClick(data, node, self) {
                // 被选中的节点 才能触发clickDriverNode方法
                const keys = this.$refs.driverTree.getCheckedKeys()
                const key = this.$refs.driverTree.getCurrentKey()
                if (keys.includes(key)) {
                    this.clickDriverNode(data, node, self)
                }
            },

            nodeCarClick(data, node, self) {
                const keys = this.$refs.carTree.getCheckedKeys()
                const key = this.$refs.carTree.getCurrentKey()
                console.log(key)
                console.log(keys)
                if (keys.includes(key)) {
                    this.clickCarNode(data, node, self)
                }
            },

            checkCar(data, checked, hasChildrenChecked) {
                console.log('选中了')
                this.clickCar(data, checked, hasChildrenChecked, this.$refs.carTree)
            },
            // 设备数量
            loadDriverNum() {
                this.loadDriverStatusList()
                this.loadDriverList()
            },

            // 获取车辆信息
            loadCarListAll() {
                this.loadCarList()
                this.loadCarNum()
            },

            // 获取车辆数量
            loadCarNum() {
                Request.get('carNum', {params: this.searchCar}, ({type, data}) => {
                    if (type === 'success') {
                        this.carNum.car_all = data.data.car_all
                        this.carNum.car_next = data.data.car_next
                        this.carNum.car_prod = data.data.car_prod
                    }
                })
            },

            // 设备数量统计
            loadDriverStatusList() {
                Request.get('driverStatusList', {params: this.searchDriver}, ({type, data}) => {
                    if (type === 'success') {
                        this.statusList.all_count = data.data.all_count
                        this.statusList.offline_count = data.data.offline_count
                        this.statusList.online_count = data.data.online_count
                    }
                })
            },

            // 更新状态
            // async carExpand(that, node) {
            //     let equList = that.children
            //     //获取设备号列表
            //     let codes = equList.map(({code}) => {
            //         return code
            //     })
            //     //同步获取设备最新状态信息
            //     let carStatus = await this.getEquStatus(codes)
            //     if (!carStatus) {
            //         return;
            //     }
            //     //组合设备状态信息
            //     let resD = equList.map((item) => {
            //         let code = carStatus[item.code].statusDesc
            //         let img = carStatus[item.code].statusView
            //         return Object.assign(item, {'carStatus': code, 'statusView': img})
            //     })
            //     if (resD) {
            //         let start = this.$refs.carTree.getCheckedKeys()
            //         this.$refs.carTree.updateKeyChildren(node.key, resD)
            //         this.$refs.carTree.setCheckedKeys(start)
            //     }
            // },

            // 车辆的列表
            loadCarList() {
                Car.loadList(this.searchCar, ({type, data}) => {
                    this.loadingCar = false
                    if (type === 'success') {
                        this.carList = data.items
                        this.pageCarData.total = data.page.totalCount
                        // 获取设备状态并保存
                        this.getDriverStatusAndSet(this.carList)
                    }
                })
            },

            // 获取设备状态并保存
            getDriverStatusAndSet(carList) {
                // 从车辆列表中获取设备列表
                const driverList = this.getDriverListFromCarList(carList)
                // 获取设备最新状态并保存
                this.getDriverStatus(driverList)
            },

            // 从车辆列表中获取设备号列表
            getDriverListFromCarList(carList) {
                const driverList = []
                carList.map((item) => {
                    if (item.children && item.children.length) {
                        item.children.map((_item) => {
                            if (_item.code) {
                                driverList.push(_item.code)
                            }
                        })
                    }
                })
                return driverList
            },

            // 批量获取设备最新状态
            getDriverStatus(codes) {
                Driver.loadCarStatus({codes: codes}, ({type, data}) => {
                    if (type === 'success') {
                        this.driverStatusObj = Object.assign({}, data.data)
                    }
                })
            },

            // 设备列表接口
            getDriverList() {
                return new Promise((resolve) => {
                    Driver.loadList(this.searchDriver, ({type, data}) => {
                        this.loadingDriver = false
                        if (type === 'success') {
                            // 先展示非实时数据
                            this.driverList = data.items
                            this.pageDriverData.total = data.page.totalCount
                            resolve(data.items)
                        }
                        resolve([])
                    })
                })
            },

            // 加载设备列表
            async loadDriverList() {
                // 同步获取设备列表
                const driverList = await this.getDriverList()
                // 设备列表获取失败则退出
                if (driverList.length === 0) {
                    return
                }
                // 获取设备号列表
                const codes = driverList.map(({code}) => {
                    return code
                })
                // 同步获取设备实时状态信息
                const carStatus = await this.getEquStatus(codes)
                // 获取不到则退出
                if (!carStatus) {
                    return
                }
                // 获取到实时信息 组合设备状态信息 重新赋值driverList
                this.driverList = driverList.map((item) => {
                    const code = carStatus[item.code].statusDesc
                    const img = carStatus[item.code].statusView
                    return Object.assign({}, item, {carStatus: code, statusView: img})
                })
            },

            // 获取设备实时状态信息
            getEquStatus(codes) {
                return new Promise((resolve) => {
                    Driver.loadCarStatus({codes: codes}, ({type, data}) => {
                        if (type === 'success') {
                            resolve(data.data)
                        }
                        resolve(false)
                    })
                })
            }

        }
    }
</script>

<style scoped>
    .toggle-btn button {
        width: 100%;
    }

    .toggle-btn {
        padding: 5px 0;
    }

    .car-list .el-tree, .driver-list .el-tree {
        box-sizing: border-box;
        padding-right: 10px;
    }

    .car-list .el-pagination, .driver-list .el-pagination {
        left: 0;
        bottom: 5px;
        padding-bottom: 0 !important;
        border: 1px solid rgba(1, 1, 1, .01);
    }

    .el-tree-node {
        width: 100%;
    }

    .show-msg{
        padding: 0 20px;
        box-sizing: border-box;
        width: 100%;
        height: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .show-msg div{
        width: 25%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 20px;
        box-sizing: border-box;
        font-size: 12px;
        color: #606266;
    }
    .online{
        background: url("https://yikong-v2.oss-cn-shanghai.aliyuncs.com/map/status_icons/online@2x.png") no-repeat center left;
        -webkit-background-size: 15px 15px;
        background-size: 15px 15px;
    }
    .offline{
        background: url("https://yikong-v2.oss-cn-shanghai.aliyuncs.com/map/status_icons/offline@2x.png") no-repeat center left;
        -webkit-background-size: 15px 15px;
        background-size: 15px 15px;
    }
    .forbid{
        background: url("https://yikong-v2.oss-cn-shanghai.aliyuncs.com/map/status_icons/forbid.png") no-repeat center left;
        -webkit-background-size: 15px 15px;
        background-size: 15px 15px;
    }
    .unknow{
        background: url("https://yikong-v2.oss-cn-shanghai.aliyuncs.com/map/status_icons/unknown@2x.png") no-repeat center left;
        -webkit-background-size: 15px 15px;
        background-size: 15px 15px;
    }
    .check-all /deep/ .el-checkbox__label{
        font-size: 12px!important;
    }
</style>
