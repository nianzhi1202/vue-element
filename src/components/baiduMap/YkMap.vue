<template>
    <div class="h-div">
        <wt-baidu-map :ready="mapReady" :center="center" :showPanorama="false">
        </wt-baidu-map>
        <div class="time" v-if="isRefresh">
            <span class="time-color">{{time}}</span><span>秒后刷新</span>
        </div>
        <div class="driver-status-show">
            <div
                v-for="(item,index) in driverStatus"
                :style="{background:`url(${item.img}) no-repeat center left`}"
                :key="index">
                {{item.name}}
            </div>
        </div>
    </div>
</template>

<script>

    import WtBaiduMap from '../../components/baiduMap/WtBaiduMap'
    import Driver from '../../models/Driver'
    import DriverNew from '../../models/DriverNew'
    import Request from '../../cores/request/request'

    export default {
        name: 'YkMap',
        components: {
            WtBaiduMap
        },
        props: {

            // 设备列表
            codeList: {
                type: Array,
                default: () => {
                    return []
                }
            },

            // 删除覆盖物列表
            delList: {
                type: Array,
                default: () => {
                    return []
                }
            },

            // 设置覆盖物居中的列表
            centerList: {
                type: Array,
                default: () => {
                    return []
                }
            },

            // 居中后默认打开气泡框
            autoOpenInfoWindow: {
                type: Boolean,
                default: true
            },

            // 刷新时间间隔
            refreshTime: {
                type: Number,
                default: 30
            },

            // 是否开启刷新
            isRefresh: {
                type: Boolean,
                default: true
            },

            // 是否支持右键删除覆盖物
            removeAble: {
                type: Boolean,
                default: false
            }
        },
        data() {
            let baseUrl = 'https://yikong-v2.oss-cn-shanghai.aliyuncs.com/map/status_car_icons/'
            return {
                interval: null,
                bMap: null,
                vMap: null,
                map: null,
                center: '北京',
                time: 1,
                position: [],
                driverLocationMsg: {}, // 设备定位信息
                labelStyle: {
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
                },
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
            position: function (val) {
                if (val && val.length) {
                    this.vMap.getViewport(val)
                }
            },
            codeList: function (val) {
                this.nodeClick(val)
            },
            delList: function (val) {
                if (val.length) {
                    this.delMarker(val)
                }
            },
            centerList: function (val) {
                if (val.length) {
                    this.centerMarker(val)
                }
            }
        },

        methods: {

            delMarker(list) {
                list.forEach((item) => {
                    this.vMap.removeMarker(item)
                })
            },

            addOperationLog(params) {
                // eslint-disable-next-line no-unused-vars
                Request.post('operationLogCreate', {params: params}, ({type, data}) => {
                    if (type === 'success') {

                    }
                })
            },

            centerMarker(list) {
                list.forEach((item) => {
                    if (this.isLocation(item)) {
                        this.isReSetLocation(item, this.driverLocationMsg[item])
                        let position = this.driverLocationMsg[item]
                        this.confirmLocationAndSet({lng: position.gpsLongitude, lat: position.gpsLatitude}, true)
                        // 打开气泡框
                        if (this.autoOpenInfoWindow) {
                            let marker = this.vMap.markerList[item]
                            if (marker) {
                                let infoWindow = marker.infoWindow
                                infoWindow ? this.vMap.openInfoWindow(infoWindow) : ''
                            }
                        }
                    }
                })
            },

            isLocation(code) {
                return this.driverLocationMsg[code]
            },

            mapReady({vMap, jMap, bMap}) {
                this.bMap = jMap
                this.vMap = vMap
                this.map = bMap
                this.center = '北京市'
                if (!this.isRefresh) {
                    return
                }
                this.interval = setInterval(() => {
                    if (this.time == 1) {
                        this.time = this.refreshTime
                        // 刷新视野内的设备状态
                        this.refreshDriverStatus()
                    }
                    this.time = this.time - 1
                }, 1000)
            },

            refreshDriverStatus() {
                // 获取视野内的设备
                let driverList = this.getMapViewDriver()
                // 通过接口获取定位信息
                if (driverList.length) {
                    this.reGetDriverLocation(driverList)
                }
            },

            getMapViewDriver() {
                let res = []
                // 获取地图视野
                let currentViewPort = this.bMap.getBounds()
                // 获取所有覆盖物
                let markerList = this.vMap.markerList
                // 获取当前视野内的覆盖物
                Object.keys(markerList).forEach((item) => {
                    item = markerList[item]
                    if (item) {
                        let point = new this.map.Point(item.position.lng, item.position.lat)
                        if (currentViewPort.containsPoint(point)) {
                            res.push(item.id)
                        }
                    }
                })
                return res
            },

            // 重新获取视野内的设备定位信息
            reGetDriverLocation(driverList) {
                this.position = []
                driverList.forEach((code) => {
                    Driver.getCarPositionNew({code: code}, ({type, data}) => {
                        if (type === 'success' && data.data) {
                            let driver = new DriverNew(data.data)
                            // 判断有线设备是否切换为
                            if (driver.getValue('driverType') === '有线' && this.driverLocationMsg[code].locationType === 'GPS定位' && this.driverLocationMsg[code].is_switch !== undefined && (driver.getValue('locationType') === '基站定位' || (driver.getValue('locationType') === 'GPS定位' && driver.getValue('locateTime') < this.driverLocationMsg[code].locateTime))) {
                                return true
                            }
                            // 判断是否需要重新绘制覆盖物 通过判断经纬度是否相同和设备运行状态判定
                            if (this.isReSetLocation(code, data.data, false)) {
                                this.driverLocationMsg[code] = data.data
                                this.vMap.removeMarker(code, () => {
                                    this.setMarker(driver, driverList.length === 1)
                                    this.confirmLocationAndSet({lng: driver.data.gpsLongitude, lat: driver.data.gpsLatitude})
                                })
                            } else {
                                // 定位信息没变 但需要更新气泡框信息
                                // 根据最新设备信息更新气泡框内容
                                this.vMap.updateInfoWindowAllContent(code, driver.getContent())

                                if (!this.vMap.infoWindowInstance || !this.vMap.infoWindowInstance.id === code) {
                                    this.vMap.closeInfoWindowById(code)
                                }
                            }
                        } else {
                            this.$store.dispatch('showTip', {
                                text: `${data.message} #${code}`,
                                type: 'error'
                            })
                        }
                    })
                })
            },

            // 是否重新设置覆盖物
            // 如果经纬度相同则不设置
            // isCenter 如果isCenter存在则会设置居中
            isReSetLocation(code, driver, isCenter = true) {
                let oldLocation = this.driverLocationMsg[code]
                if (oldLocation) {
                    let oldPoint = new this.map.Point(oldLocation.gpsLongitude, oldLocation.gpsLatitude)
                    let newPoint = new this.map.Point(driver.gpsLongitude, driver.gpsLatitude)
                    // 避免设备运行状态改变但经纬度没变的情况 导致覆盖物icon未改变
                    // 所以当设备运行状态改变 也需要重新绘制覆盖物
                    if (oldPoint.equals(newPoint) && oldLocation.running_status === driver.running_status) {
                        if (isCenter) {
                            this.confirmLocationAndSet({lng: driver.gpsLongitude, lat: driver.gpsLatitude})
                        }
                        return false
                    }
                }
                return true
            },

            // 获取设备最后一条gps定位
            getGps(code, singleDriver) {
                Driver.getCarPositionNew({code: code, locationType: 'GPS'}, ({type, data}) => {
                        if (type === 'success' && data.data) {
                            data.data.is_switch = true
                            let driver = new DriverNew(data.data)
                            this.driverLocationMsg[code] = data.data
                            this.vMap.removeMarker(code, () => {
                                this.setMarker(driver, true)
                                this.confirmLocationAndSet({lng: driver.data.gpsLongitude, lat: driver.data.gpsLatitude}, singleDriver)
                            })
                        } else {
                            this.$store.dispatch('showTip', {
                                text: `未找到该设备状态，请输入正确设备号！ #${code}`,
                                type: 'error'
                            })
                        }
                })
            },

            // 获取设备最新定位信息
            getDriverLocation(driverList, singleDriver, change = false) {
                driverList.forEach((code) => {
                    if (!this.driverLocationMsg[code] || change) {
                        Driver.getCarPositionNew({code: code}, ({type, data}) => {
                            if (type === 'success' && data.data) {
                                this.driverLocationMsg[code] = data.data
                                let driver = new DriverNew(data.data)
                                this.confirmLocationAndSet({lng: driver.data.gpsLongitude, lat: driver.data.gpsLatitude}, singleDriver)
                                this.setMarker(driver, singleDriver)
                            } else {
                                this.$store.dispatch('showTip', {
                                    text: `${data.message} #${code}`,
                                    type: 'error'
                                })
                            }
                        })
                    } else {
                        let driver = new DriverNew(this.driverLocationMsg[code])
                        this.setMarker(driver)
                        this.confirmLocationAndSet({lng: driver.data.gpsLongitude, lat: driver.data.gpsLatitude})
                    }
                })
            },

            // 判断经纬度是否合法 并设置视野
            // {lng: driver.data.gpsLongitude,lat:driver.data.gpsLatitude}
            confirmLocationAndSet(point, singleDriver) {
                if (!point.lng || !point.lat) {
                    return
                }
                if (singleDriver) {
                    this.position = [point]
                    return
                }
                this.position.push(point)
            },

            setMarker(driver, autoOpen = false) {
                if (!driver.data.gpsLongitude || !driver.data.gpsLatitude) {
                    this.$store.dispatch('showTip', {
                        text: `暂无定位信息 #${driver.data.equipmentId}`,
                        type: 'error'
                    })
                    return
                }
                this.vMap.addMarker(this.getMarkerOptions(driver, autoOpen))
            },

            getMarkerOptions(driver, autoOpen) {
                let data = driver.data
                return {
                    id: data.equipmentId,
                    labelOptions: {
                        text: `设备号:${data.equipmentId}`,
                        style: this.labelStyle
                    },
                    content: driver.getContent(this.setButton(driver.data)),
                    icon: driver.getIcon(),
                    position: {lng: data.gpsLongitude, lat: data.gpsLatitude},
                    size: {
                        height: 32,
                        width: 32
                    },
                    rightClick: (marker) => {
                        if (this.removeAble) {
                            this.vMap.removeMarker(marker.id)
                            this.position = []
                        }
                    },
                    autoOpen: autoOpen
                }
            },

            /**
             * 设备树点击回调
             * @param data 设备号组成的数组
             */
            nodeClick(data) {
                console.log(data)
                let exitMarkerCode = Object.keys(this.vMap.markerList)
                // 获取未设置覆盖物的设备号
                // 也有可能覆盖物列表中存在设备号 但是marker对象为undefined 所以要进行剔除
                let hasNotSetMarkerList = data.filter((item) => {
                    return !exitMarkerCode.includes(item) || !this.vMap.markerList[item]
                })

                this.getDriverLocation(hasNotSetMarkerList, data.length === 1)

                // 已存在的覆盖物设置视野
                let position = []
                let markerList = []
                console.log(data)
                data.forEach((item) => {
                    console.log(item)
                    if (exitMarkerCode.includes(item)) {
                        let marker = this.vMap.getMarker(item)
                        console.log(marker)
                        if (marker && marker.position) {
                            position.push(marker.position)
                            markerList.push(marker)
                        }
                    }
                })

                if (position.length) {
                    console.log(position)
                    this.vMap.getViewport(position)
                }

                // 传入单个设备号时 自动打开气泡框
                // 重新打开气泡框
                if (markerList.length === 1 && data.length === 1) {
                    this.vMap.openInfoWindow(markerList[0].infoWindow)
                }
            },

            setButton(driver) {
                // 设备号
                let driverCode = driver.equipmentId
                // 车辆id
                let driverId = driver.driverId
                // 设备类型
                let driverType = driver.driverType === '有线' ? 'wired' : 'wireless'
                // 设备型号
                let driverModel = driver.driverModel

                return [
                    {
                        type: 'button',
                        list: [
                            {
                                label: '轨迹回放',
                                condition: true,
                                click: () => {
                                    this.locationReplay(driverCode, driver.driverType)
                                }
                            },
                            {
                                label: '指令下发',
                                condition: true,
                                permission: '客户端_V2_设备管理_设备列表_指令下发',
                                click: () => {
                                    this.issueDriver(driverId, driverModel, driverType)
                                }
                            },
                            {
                                label: '设备详情',
                                condition: true,
                                click: () => {
                                    this.driverDetail(driverCode, driverId)
                                }
                            },
                            {
                                label: '报警信息',
                                condition: true,
                                click: () => {
                                    this.warningMessage(driverCode)
                                }
                            },
                            {
                                label: 'OBD信息',
                                condition: driverModel === 'B5',
                                click: () => {
                                    this.getObd(driverCode, driverId)
                                }
                            },
                            {
                                label: '复制地址信息',
                                condition: true,
                                click: (self, infoWindow) => {
                                    let address = ''
                                    // 地址信息应由气泡框实时定位获取
                                    let content = Array.from(infoWindow.content).reverse()
                                    content.some((item) => {
                                        if (item.label === '地址') {
                                            address = item.value
                                            return true
                                        }
                                    })
                                    this.addressCopy(address)
                                }
                            }
                        ]
                    }
                ]
            },

            addressCopy(content) {
                let _content = content
                if (content && content.length > 20) {
                    content = content.substr(0, 20) + '...'
                }
                let save = function(e) {
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

        },
        destroyed() {
            if (this.interval) {
                clearInterval(this.interval)
            }
        }
    }
</script>

<style scoped>
    .no-padding{
        padding: 0!important;
        position: relative;
    }
    .time{
        position: absolute;
        top: 15px;
        right: 100px;
        height: 30px;
        min-width: 65px;
        width: auto;
        padding: 10px;
        box-sizing: border-box;
        text-align: center;
        line-height: 10px;
        background-color: #ffffff;
        box-shadow: 5px 5px 5px rgba(0,0,0,.5);
    }
    .time>span:last-child{
        font-size: 12px;
        color: #666666;
        font-weight: bold;
    }
    .time-color{
        color: red;
        margin-right: 5px;
        display: inline-block;
        min-width: 15px;
        font-size: 12px;
        font-weight: bold;
        width: auto;
        height: 100%;
    }

    .driver-status-show{
        width: 385px;
        height: 31px;
        background-color: #fff;
        position: absolute;
        z-index: 99;
        bottom: 10px;
        left: 20px;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        box-shadow: 5px 5px 5px rgba(0,0,0,.5);
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
        background-size: 22px 22px!important;
    }

</style>
