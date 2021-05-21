<template>
    <baidu-map
            ref="baiduMap"
            class="wt-baidu-map"
            :center="centerData"
            :zoom="zoom"
            :scroll-wheel-zoom="wheelZoom"
            :map-type="mapType"
            @ready="_ready"
            :map-click="false"
    >
        <!--热力图-->
<!--        <bml-heatmap-->
<!--                :data="heatMapPoints"-->
<!--                :max="heatMapConfig.max"-->
<!--                :radius="heatMapConfig.radius">-->
<!--        </bml-heatmap>-->

        <!--比例尺-->
        <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="{width: 90, height: 50}" style="margin-bottom: 100px;"></bm-scale>

        <!--气泡框-->
        <bm-info-window :position="infoWindowPosition" :show="showInfoWindow">
            <div class="wt-info-window">
                <component v-bind:is="infoWindowContent"></component>
            </div>
        </bm-info-window>

        <!--缩放-->
<!--        <bm-navigation v-if="showNavigation" anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>-->

        <!--海量点-->
        <bm-point-collection
                :points="shapePoints"
                :color="shapeConfig.color"
                :size="shapeConfig.size"
                :shape="shapeConfig.shape"
                @click="clickShapePoint"
        ></bm-point-collection>

        <!--交通流量-->
        <bm-traffic v-if="showTraffic"></bm-traffic>

        <!--全景-->
        <bm-panorama v-if="showPanorama" :offset="{width: 5, height: 50}" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-panorama>

        <!--覆盖物-->
        <template v-for="(marker, index) of markerList">
            <template v-if="marker">
                <bm-marker
                        :key="index"
                        :top="true"
                        :ref="'marker-' + marker.id"
                        class="wt-image-marker"
                        :position="marker.position"
                        @click="marker.click(marker)"
                        @rightclick="marker.rightClick(marker)"
                        :icon="marker.getIcon()"
                >
                </bm-marker>

                <bm-label
                        :key="index+'aaa'"
                        :ref="'marker-label-' + marker.id"
                        v-if="typeof marker.label === 'object'"
                        :content="marker.label.text"
                        :position="marker.label.position"
                        :label-style="marker.label.style"
                >
                </bm-label>
            </template>
        </template>

        <!--控制面板-->
        <bm-control :offset="{width: 5, height: 0}" v-if="showBtn">
            <div class="wt-map-btn">
                <template v-for="(item, index) in btn">
                    <wt-action-btn :key="index" v-if="hideBtn.indexOf(item.title) === -1" :item="item"></wt-action-btn>
                </template>
            </div>
        </bm-control>

        <!--自定义操作按钮-->
        <bm-control :offset="{width: 5, height: 60}">
            <div class="wt-map-btn">
                <template v-for="(item, index) in otherBtn">
                    <wt-action-btn :key="index" :item="item"></wt-action-btn>
                </template>
            </div>
        </bm-control>

        <!--多边形围栏-->
        <bm-polygon
                :path="polygonPoints"
                :stroke-color="fenceConfig.color"
                :stroke-opacity="fenceConfig.opacity"
                :stroke-weight="fenceConfig.weight"
                :editing="fenceEdit"
                @lineupdate="updatePolygonPath"
        />

        <!--圆形围栏-->
        <bm-circle
                v-if="circlePoints.center && circlePoints.radius"
                :center="circlePoints.center"
                :radius="circlePoints.radius"
                :stroke-color="fenceConfig.color"
                :stroke-opacity="fenceConfig.opacity"
                :stroke-weight="fenceConfig.weight"
                @lineupdate="updateCirclePath"
                :editing="fenceEdit"/>

        <bm-polyline
                :path="polylinePoints"
                :stroke-color="polylineConfig.color"
                :stroke-opacity="polylineConfig.opacity"
                :stroke-weight="polylineConfig.weight"
                @lineupdate="updatePolylinePath"/>

        <wt-lushu
                @stop="lushuStop"
                :path="lushuPoints"
                :icon="lushuIcon"
                :speed="lushuSpeed"
                :play="lushuPlay"
                @run="lushuRun"
                :rotation="true"
        >
        </wt-lushu>
    </baidu-map>
</template>

<script>
    import props from './Props'
    import data from './Data'
    import {BmlHeatmap} from 'vue-baidu-map'
    // eslint-disable-next-line no-unused-vars
    import {InfoWindow} from './InfoWindow'
    import {Marker} from './Marker'
    import {Label} from './Label'
    import WtActionBtn from './WtActionBtn'
    import WtLushu from './WtLushu'

    export default {
        name: 'WtBaiduMap',
        components: {WtActionBtn, BmlHeatmap, WtLushu},
        data: data,
        props: props,
        methods: {
            // 地图初始化完成的回调函数
            _ready({map, BMap}) {
                this.jMap = map
                this.bMap = BMap

                let params = {
                    vMap: this,
                    jMap: map,
                    bMap: BMap
                }
                typeof this.ready === 'function' ? this.ready(params) : ''

                this.centerData = this.center
            },

            // 海量点点击
            // eslint-disable-next-line no-unused-vars
            clickShapePoint(e, point) {
                typeof this.shapeOnClick === 'function' ? this.shapeOnClick(e) : ''
            },

            /**
             * 打开气泡框
             * @param {InfoWindow} infoWindow
             */
            openInfoWindow(infoWindow) {
                this.infoWindowInstance = infoWindow
                this.infoWindowPosition = infoWindow.position
                this.infoWindowContent = infoWindow.getContent()
                this.showInfoWindow = false
                this.$nextTick(() => {
                    this.showInfoWindow = true
                })
            },

            /**
             * 关闭气泡框
             */
            closeInfoWindow() {
                this.showInfoWindow = false
                this.infoWindowPosition = {}
                this.infoWindowContent = ''
            },

            /**
             * 添加覆盖物
             * @param {string} id 覆盖物ID，在覆盖物列表中必须是唯一的
             * @param {{lat, lng}} position 经纬度
             * @param {{width, height}} size 图标大小
             * @param {object} labelOptions 中文标签选项
             * @param {string} icon 图标地址
             * @param {object} content 气泡框内容
             * @param {function} onClick 点击图标的回调函数
             * @param {boolean} autoOpen 自动打开气泡框，默认false
             * @param {boolean} autoCenter 是否自动居中，默认false
             */
            addMarker({id, position, labelOptions, size, icon, content, onClick, autoOpen, autoCenter, rightClick}) {
                let infoWindow
                let label
                autoCenter = autoCenter === true
                if (typeof content === 'object') {
                    infoWindow = new InfoWindow({
                        id: id,
                        position: position,
                        content: content,
                        wtBaiduMap: this
                    })
                }
                if (typeof labelOptions === 'object') {
                    label = new Label({
                        position: position,
                        text: labelOptions.text,
                        style: labelOptions.style,
                        wtBaiduMap: this
                    })
                }
                let marker = new Marker({
                    id: id,
                    position: position,
                    infoWindow: infoWindow,
                    label: label,
                    wtBaiduMap: this,
                    size: size,
                    onClick: onClick,
                    open: autoOpen === true,
                    icon: icon,
                    rightClick: rightClick
                })

                let data = {}
                data[id] = marker
                this.markerList = Object.assign({}, this.markerList, data)
                console.log(this.markerList)
                if (autoCenter) {
                    clearTimeout(this.setCenterFlag)
                    this.setCenterFlag = setTimeout(() => {
                        this.centerData = position
                    }, 100)
                }
            },

            /**
             * 删除所有覆盖物
             * 慎用
             */
            removeMarkerAll() {
                if (this.markerList) {
                    for (let index in this.markerList) {
                        if (this.markerList[index] != undefined) {
                            this.removeMarker(this.markerList[index].id)
                        }
                    }
                }
            },

            /**
             * 百度原生删除所有覆盖物方法
             */
            removeAllMarker() {
                this.$nextTick(() => {
                    this.jMap.clearOverlays()
                })
            },

            /**
             * 删除覆盖物
             * @param {string} id 覆盖物ID
             */
            removeMarker(id, fn = '') {
                let marker = this.getMarker(id)
                if (marker) {
                    this.closeInfoWindow()
                    this.markerList[id] = undefined
                    this.$nextTick(() => {
                        let ref = this.$refs['marker-' + id]
                        let refLabel = this.$refs['marker-label-' + id]
                        if (typeof ref === 'object' && ref.length) {
                            ref[0].unload()
                        }
                        if (typeof refLabel === 'object' && refLabel.length) {
                            refLabel[0].unload()
                        }
                        typeof fn === 'function' ? fn() : ''
                    })
                }
            },

            /**
             * 获取覆盖物
             * @param id
             * @returns {*}
             */
            getMarker(id) {
                return this.markerList[id]
            },

            /**
             * 修改覆盖物附属气泡框的内容
             * @param id
             * @param key
             * @param value
             */
            updateInfoWindowContent(id, key, value) {
                let marker = this.getMarker(id)
                if (marker) {
                    marker.infoWindow.updateContent(key, value)
                }
            },

            updateInfoWindowAllContent(id, obj) {
                let marker = this.getMarker(id)
                if (marker) {
                    Object.keys(obj).forEach((item) => {
                        marker.infoWindow.updateContent(item, obj[item])
                    })
                }
            },

            closeInfoWindowById(id) {
                let marker = this.getMarker(id)
                if (marker) {
                    marker.infoWindow.close()
                }
            },

            /**
             * 编辑多边形围栏
             * @param e
             */
            updatePolygonPath (e) {
                if (typeof this.polygonPoints == 'object' && typeof this.fenceConfig.onChange === 'function') {
                    this.fenceConfig.onChange(e, 'polygon', this.polygonPoints)
                }
            },

            /**
             * 编辑圆形围栏
             * @param e
             */
            updateCirclePath (e) {
                if (typeof this.circlePoints == 'object' && typeof this.fenceConfig.onChange === 'function') {
                    this.fenceConfig.onChange(e, 'polygon', this.circlePoints)
                }
            },

            /**
             * 获取视野
             */
            getViewport(option) {
                let list = []
                for (let item of option) {
                    list.push(new this.bMap.Point(item.lng, item.lat))
                }

                this.jMap.setViewport(list)
            },

            /**
             * 编辑折线图
             * @param e
             */
            updatePolylinePath (e) {
                if (typeof this.polylinePoints == 'object' && typeof this.fenceConfig.onChange === 'function') {
                    this.fenceConfig.onChange(e, 'polygon', this.polylinePoints)
                }
            }
        },
        mounted() {
            // this.centerData = this.center;
        },
        watch: {
            center() {
                this.centerData = this.center
            }
        }
    }
</script>

<style scoped>
    .wt-baidu-map {
        height: 100%;
    }

    .wt-map-btn {
        margin-left: -4px;
    }

    .wt-info-window{
        width: 350px;
    }
    .wt-other-action {
        position: fixed;
        left: 50%;
        transform: translate(-50%, 0);
    }

    @media (max-width: 768px) {
        .wt-other-action {
            bottom: 15px;
        }
    }
    @media (min-width: 768px) {
        .wt-other-action {
            top: 15px;
        }
    }
</style>
