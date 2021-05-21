<template>
    <div class="driver-map-index h-div">
        <el-container class="h-div">
            <el-aside width="350px" class="driver-map-aside" >
                <search-store :search-driver="refSearchDriver"></search-store>

                <search-driver
                        ref="searchDriver"
                        :click-car="clickCar"
                        :click-driver="clickDriver"
                        :map="vMap"
                        @copyCode="addressCopy"
                        @getView="getView"
                        @changeCheckedAllStatus="changeCheckedAllStatus"
                        :clickDriverNode="clickDriverNode"
                        :clickCarNode="clickCarNode"
                ></search-driver>

            </el-aside>
            <el-main class="h-div map-main">
                <wt-baidu-map :ready="mapReady" :center="center" :showPanorama="false" :zoom="zoom"></wt-baidu-map>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import WtBaiduMap from '../../components/baiduMap/WtBaiduMap'
    // import Wired from "../order-issue/wired";
    // import Wireless from "../order-issue/wireless";
    // import OrderIssue from "../../models/OrderIssue";
    // import TrackPlayBack from "../driver/track_play_back";
    // import DriverView from "../driver/view";
    import SearchStore from './searchStore'
    import SearchDriver from './searchDriver'
    import Driver from '../../models/Driver'
    // eslint-disable-next-line no-unused-vars
    import DriverNew from '../../models/DriverNew'

    export default {
        name: 'index',
        components: {SearchDriver, SearchStore, WtBaiduMap},
        data() {
            const baseUrl = 'https://yikong-v2.oss-cn-shanghai.aliyuncs.com/map/status_car_icons/'
            return {
                isCheckedAll: false,
                model: Driver,
                zoom: 16,
                vMap: undefined,
                bMap: undefined,
                map: undefined,
                centerFlag: undefined,
                center: '',
                carListParams: {},
                storeList: [],
                refSearchDriver: undefined,
                carMarkerList: [],
                driverMarkerList: [],
                equipmentMsg: {},
                notPositionNum: 0,
                setTimeoutObj: null,
                driverStatus: [
                    {
                        name: '在线',
                        img: `${baseUrl}2_1000.png`
                    },
                    {
                        name: '离线',
                        img: `${baseUrl}1_2000.png`
                    },
                    {
                        name: '行驶',
                        img: `${baseUrl}1_1000.png`
                    },
                    {
                        name: '休眠',
                        img: `${baseUrl}1_1001.png`
                    },
                    {
                        name: '静止',
                        img: `${baseUrl}1_1002.png`
                    },
                    {
                        name: '未知',
                        img: `${baseUrl}1_3000.png`
                    }
                ]
            }
        },
        watch: {
            isCheckAll: function (val) {
                console.log(val)
                this.notPositionNum = 0
            }
        },
        mounted() {
            // 确保组件加载完毕
            this.$nextTick(() => {
                this.refSearchDriver = this.$refs.searchDriver
                console.log(11111111111)
                console.log(this.$refs.searchDriver)
                window.addEventListener('map-marker-click', this.mapMarkerClick)
            })
        },
        beforeDestroy() {
            window.removeEventListener('map-marker-click', this.mapMarkerClick)
        },
        methods: {
            changeCheckedAllStatus(val) {
                this.isCheckedAll = val
            },
            // 地图初始化
            mapReady({vMap, jMap, bMap}) {
                console.log('在她')
                this.bMap = jMap
                this.vMap = vMap
                this.map = bMap
                this.center = '北京市'
            },

            // 地图覆盖物居中
            setCenter(lng, lat) {
                if (this.centerFlag) {
                    clearTimeout(this.centerFlag)
                }

                this.centerFlag = setTimeout(() => {
                    this.center = { lng: lng, lat: lat }
                    this.centerFlag = undefined
                }, 200)
            },

            // 气泡框内容
            getMarkerOptions(driver, oldData) {
                console.log(driver)
                console.log(oldData)
                const data = driver.data
                return {
                    id: data.equipmentId,
                    labelOptions: {
                        text: `设备号:${data.equipmentId}`,
                        style: {
                            backgroundColor: 'rgba(1,1,1,.3)',
                            color: '#ffffff',
                            fontSize: '8px',
                            border: 'none',
                            minHeight: '10px',
                            height: 'auto',
                            padding: '0 5px',
                            minWidth: '10px',
                            width: 'auto',
                            marginTop: '20px'
                        }
                    },
                    content: driver.getContent(this.setButton(driver.data)),
                    icon: driver.getIcon(),
                    position: {lng: data.gpsLongitude, lat: data.gpsLatitude},
                    size: {
                        height: 32,
                        width: 32
                    },
                    autoOpen: !this.isCheckedAll
                }
            },

            // 添加覆盖物
            async clickDriver(data, checked) {
                console.log('ddddddddddddddddddddddddddddd')
                if (checked) {
                    let driver = null
                    const isEquipmentObjExistCode = this.equipmentMsg[data.code]
                    if (isEquipmentObjExistCode) {
                        driver = isEquipmentObjExistCode
                    } else {
                        console.log(111111111111111)
                        driver = await this.getCarPositionNew(data.code)
                        console.log(driver)
                        if (!driver.status || (!driver.res.gpsLongitude || !driver.res.gpsLatitude)) {
                            if (this.isCheckedAll) {
                                console.log(22222222222)
                                this.notPositionNum += 1
                                if (!this.setTimeoutObj) {
                                    this.setTimeoutObj = setTimeout(() => {
                                        this.notPositionNum = 0
                                        clearTimeout(this.setTimeoutObj)
                                        this.setTimeoutObj = null
                                    }, 3500)
                                }
                                return
                            }

                            this.$store.dispatch('showTip', {
                                text: driver.msg + `#${data.code}`,
                                type: 'error'
                            })
                        }
                        driver = driver.res
                    }
                    if (!driver.gpsLongitude || !driver.gpsLatitude) {
                        this.tip(`#${driver.equipmentId} 暂无定位信息`)
                        return
                    }
                    console.log(driver)
                    const driverRes = new DriverNew(driver)
                    console.log(driverRes)
                    this.vMap.addMarker(this.getMarkerOptions(driverRes, data))
                    if (this.isCheckedAll) {
                        this.getView()
                    } else {
                        console.log('走几次')
                        this.setCenter(driver.gpsLongitude, driver.gpsLatitude)
                    }
                } else {
                    this.vMap.removeMarker(data.code)
                }
            },

            // 获取实时位置信息
            getCarPositionNew(code) {
                return new Promise((resolve) => {
                    Driver.getCarPositionNew({code: code}, ({type, data}) => {
                        if (type === 'success') {
                            resolve({status: true, res: data.data})
                            this.updatEquipmentMsg(code, data.data)
                        }
                        resolve({status: false, msg: data.message})
                    })
                })
            },

            // 车辆树点击回调
            clickCar(data, checked, hasChildrenChecked, treeObj) {
                console.log(treeObj)
                // let checkedList = treeObj.getCheckedKeys()
                console.log(checked)
                const isRoot = Object.keys(data).includes('children')
                console.log(isRoot)
                // 根节点被选中
                // if(checked && isRoot){
                //     data.children.forEach(async (item)=>{
                //         console.log(item)
                //         //避免重复添加覆盖物 ** 需要将tree组件的render-after-expand属性设置为false
                //         if(checkedList.includes(item.id)){
                //             console.log('baohaole')
                //             return;
                //         }
                //         console.log('retutnreturnretun')
                //         this.clickDriver(item,checked)
                //     })
                // }

                // 根节点未选中子节点全未选中
                if (!checked && isRoot && !hasChildrenChecked) {
                    console.log('什么时候到这里')
                    this.$nextTick(() => {
                        for (const item of data.children) {
                            this.vMap.removeMarker(item.code)
                        }
                    })
                    return
                }

                // 子节点被选中
                if (checked && !isRoot) {
                    this.clickDriver(data, checked)
                    return
                }

                // 子节点未选中
                if (!checked && !isRoot) {
                    this.vMap.removeMarker(data.code)
                }
            },
            // 设备节点被点击事件
            clickDriverNode(data) {
                const code = data.code
                const obj = this.equipmentMsg[code]
                console.log(obj)
                if (obj) {
                    this.setCenter(obj.gpsLongitude, obj.gpsLatitude)
                    this.vMap.markerList[code] && this.vMap.openInfoWindow(this.vMap.markerList[code].infoWindow)
                    return
                }
                this.tip(`#${data.code} 暂无定位信息`)
            },

            // 车辆节点被点击事件
            clickCarNode(data) {
                console.log('点了车辆')
                const isClickRoot = Object.keys(data).includes('children')
                if (isClickRoot) {
                    const position = []
                    data.children.forEach((item) => {
                        const obj = this.equipmentMsg[item.code]
                        if (obj) {
                            position.push(new this.map.Point(obj.gpsLongitude, obj.gpsLatitude))
                            this.vMap.markerList[item.code] && this.vMap.openInfoWindow(this.vMap.markerList[item.code].infoWindow)
                        }
                    })
                    if (position.length) {
                        const {center, zoom} = this.bMap.getViewport(position)
                        this.bMap.centerAndZoom(center, zoom)
                        return
                    }
                    this.tip(`#${data.code_list} 暂无定位信息`)
                    return
                }
                if (!isClickRoot) {
                    this.clickDriverNode(data)
                }
            },

            getView() {
                const position = []
                this.bMap.getOverlays().forEach((item) => {
                    try {
                        position.push(item.getPosition())
                    } catch (e) {
                        console.log(e)
                    }
                })
                const {center, zoom} = this.bMap.getViewport(position)
                this.bMap.centerAndZoom(center, zoom)
            },

            updatEquipmentMsg(key, value) {
                if (key && value && !this.equipmentMsg.key && (value.gpsLongitude || value.gpsLatitude)) {
                    this.equipmentMsg[key] = value
                }
            },
            closeNotice() {
                this.notPositionNum = 0
            },
            tip(msg, type) {
                this.$store.dispatch('showTip', {
                    text: msg,
                    type: type || 'error',
                    duration: 2000
                })
            },

            setButton(driver) {
                // 定位地址
                const address = driver.address
                // 设备号
                const driverCode = driver.equipmentId
                // 车辆id
                // eslint-disable-next-line no-unused-vars
                const driverId = driver.driverId
                // 设备类型
                // eslint-disable-next-line no-unused-vars
                const driverType = driver.driverType === '有线' ? 'wired' : 'wireless'
                // 设备型号
                // eslint-disable-next-line no-unused-vars
                const driverModel = driver.driverModel

                return [
                    {
                        type: 'button',
                        list: [
                            {
                                label: '轨迹回放',
                                click: () => {
                                    this.locationReplay(driverCode, driver.driverType)
                                }
                            },
                            {
                                label: '指令下发',
                                permission: '客户端_V2_设备管理_设备列表_指令下发',
                                click: () => {
                                    // this.issueDriver(driverId, driverModel, driverType)
                                }
                            },
                            {
                                label: '设备详情',
                                click: () => {
                                    // this.driverDetail(driverCode, driverId)
                                }
                            },
                            {
                                label: '报警信息',
                                click: () => {
                                    this.warningMessage(driverCode)
                                }
                            },
                            {
                                label: '复制地址信息',
                                click: () => {
                                    this.addressCopy(address)
                                }
                            }
                        ]
                    }
                ]
            },

            addressCopy(content) {
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

            // 轨迹回放
            locationReplay(code, type) {
                window.open('/driver-map/track-play?code=' + code + '&type=' + type)
            },

            // 报警信息
            warningMessage(code) {
                const {href} = this.$router.resolve({
                    path: '/warningMessage/index',
                    query: {
                        code: code
                    }
                })
                window.open(href, '_blank')
            }

        }
    }
</script>

<style scoped>
    .driver-map-aside {
        padding: 5px;
    }
    .map-main{
        padding: 0;
        position: relative;
    }
    .driver-num{
        color: red;
        margin: 0 5px;
        font-weight: bold;
    }
    .driver-status-show{
        width: 385px;
        height: 31px;
        background-color: #fff;
        position: absolute;
        z-index: 9999999999;
        bottom: 10px;
        left: 20px;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
    }
    .driver-status-show div{
        width: 57px;
        height: 100%;
        padding-left: 25px;
        font-size:10px;
        font-weight:400;
        color:rgba(102,102,102,1);
        display: flex;
        align-items: center;
    }
</style>
