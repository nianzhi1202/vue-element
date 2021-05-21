<template>
    <div class="map-row">
        <baidu-map class="map"
                   @ready="_ready"
                   :map-click="false"
                   :scroll-wheel-zoom="true"
                   :center="center"
                   :zoom="zoom"
                   @zoomend="zoomEnd"
                   @mousemove="syncPolyline"
                   @click="paintPolyline"
                   @rightclick="newPolyline">

            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true"></bm-geolocation>

            <bm-local-search :keyword="searchDataKey" :auto-viewport="true" :panel="false" @markersset="searchOver"></bm-local-search>
            <bm-control class="map-button">
                <div class="button-list">
                    <div class="left">
                        <div style="display: flex">
                            <input type="text" v-model="searchData" placeholder="输入地名搜索">
                            <div class="search" @click="search">搜索</div>
                        </div>
                    </div>
                    <div class="right">
                        <el-row type="flex">
                            <el-col>
                                <div class="item">
<!--                                    <i class="iconfont icon-shandian"/>-->
                                    <el-button :type=" type === 'circle' ?  'primary' : '' " @click="changeType('circle')" >圆形</el-button>
                                </div>
                            </el-col>

                            <el-col>
                                <div class="item">
<!--                                    <i class="iconfont icon-shandian"/>-->
                                    <el-button :type=" type === 'line' ?  'primary' : '' " @click="changeType('line')">多边形</el-button>
                                </div>
                            </el-col>

                            <el-col>
                                <div class="item">
<!--                                    <i class="iconfont icon-shandian"/>-->
                                    <el-button :type=" type === 'regional' ?  'primary' : '' " @click="changeType('regional')" :disabled="ruleType === 'risk'" >行政区域</el-button>
                                </div>
                            </el-col>

                            <el-col>
                                <div class="item">
<!--                                    <i class="iconfont icon-shandian"/>-->
                                    <el-button @click="rePolyline">重绘</el-button>
                                </div>
                            </el-col>

                            <el-col>
                                <div class="item">
<!--                                    <i class="iconfont icon-shandian"/>-->
                                    <el-button @click="save">保存</el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </bm-control>
            <template v-if="type === 'line'">
                <bm-polygon stroke-color="red" :stroke-opacity="0.8" :fill-color="'red'" :stroke-weight="4" :path="path" v-for="(path,index) of polyline.paths" :editing="mapEdit" @lineupdate="updateLinePath" :key="index">
                </bm-polygon>
            </template>
            <template v-else>
                <bm-circle :center="dotLine.paths.center" :radius="dotLine.paths.radius" :fill-color="'red'" stroke-color="red" :stroke-opacity="0.8" :stroke-weight="4" @lineupdate="updateCirclePath" :editing="true" v-if="type !== 'line' && dotLine.paths.center"></bm-circle>
            </template>
        </baidu-map>
        <div v-show="type != 'line'" class="show-radius">
            当前半径<span style="color: red;font-weight: bold">{{countRadius}}</span>米
        </div>
    </div>

</template>

<script>
    import RegionalView from '../../views/rule/regionalView'

    export default {
        data () {
            return {
                isRegion: false,
                type: 'line',
                allowLineAdd: true,
                searchData: null,
                searchDataKey: null,
                map: null,
                Bmap: null,
                zoom: 15,
                editing: true,
                mapEdit: true,
                center: '',
                polyline: { paths: [] },
                dotLine: { paths: {} }
            }
        },
        props: {

            ruleType: {
                type: String,
                default: 'risk'
            },

            forbiddenEdit: {
                type: Boolean,
                default: false
            },

            // 地图初始化完成的回调
            ready: {
                type: Function
            },

            // 多边形围栏数据
            points: {
                type: Array,
                default: () => {
                    return []
                }
            },

            // 圆形围栏数据
            dotPoint: {
                type: Object,
                default: () => {
                    return {}
                }
            }

        },

        watch: {
            dotPoint: {
                handler: function (val) {
                    if ((this.dotLine.paths && this.dotLine.paths.center) || !val.center) {
                        return
                    }
                    this.type = 'circle'
                    this.dotLine.paths = val
                    // 进入页面弹出编辑框
                    this.save()
                    // 获取圆形围栏最佳视野
                    setTimeout(() => {
                        this.map.getOverlays().forEach((item) => {
                            try {
                                if (item.getPath().length && item.getRadius()) {
                                    let s = this.map.getViewport(item.getPath())
                                    this.map.centerAndZoom(s.center, s.zoom)
                                }
                            } catch (e) {}
                        })
                    }, 100)
                },
                deep: true
            },
            points: {
                handler: function (val) {
                    if (this.polyline.paths.length || !val.length) {
                        return
                    }
                    if (this.forbiddenEdit) {
                        this.mapEdit = false
                    }
                    this.editing = false
                    let {center, zoom} = this.map.getViewport(val)
                    this.center = center
                    this.zoom = zoom

                    this.polyline.paths = [val]

                    this.isRegion = this.forbiddenEdit
                    // 进入页面弹出编辑框
                    this.save()
                },
                deep: true
            }
        },

        created() {
            this.isRegion = this.forbiddenEdit
        },

        methods: {

            search() {
                if (!this.searchData) {
                    return
                }
                this.searchDataKey = this.searchData
            },

            searchOver(e) {
                // 搜索中心点icon显示问题
                let icon = new this.Bmap.Icon('https://yikong-v2.oss-cn-shanghai.aliyuncs.com/map/locationRes.png', new this.Bmap.Size(43, 43))
                try {
                    e[0].marker.setIcon(icon)
                } catch (e) {

                }
            },

            // 地图实例化完成回调
            _ready({map, BMap}) {
                this.center = '北京'
                this.map = map
                this.Bmap = BMap
                let params = {
                    vMap: this,
                    jMap: map,
                    bMap: BMap
                }
                typeof this.ready === 'function' ? this.ready(params) : ''
            },

            // 圆形围栏数据
            updateCirclePath (e) {
                if (this.type === 'line') {
                    return
                }
                this.dotLine.paths.center = e.target.getCenter()
                this.dotLine.paths.radius = e.target.getRadius()
            },

            // 多边形围栏编辑事件
            updateLinePath({type, target}) {
                if (this.type !== 'line') {
                    return
                }
                this.polyline.paths[0] = target.getPath()
            },

            // 开关编辑
            toggle () {
                this.editing = !this.editing
            },

            // 画围栏线条
            paintPolyline (e) {
                if (!this.editing) {
                    return
                }
                if (this.type === 'line') {
                    const {paths} = this.polyline
                    !paths.length && paths.push([])
                    paths[paths.length - 1].push(e.point)
                    return
                }
                this.$set(this.dotLine.paths, 'center', {lng: e.point.lng, lat: e.point.lat})
                this.$set(this.dotLine.paths, 'radius', this.setRadius())
            },

            // 获取缩放等级
            zoomEnd(e) {
                this.zoom = e.target.getZoom()
            },

            // 画多边形围栏
            syncPolyline (e) {
                if (!this.editing) {
                    return
                }
                const {paths} = this.polyline
                if (!paths.length) {
                    return
                }
                const path = paths[paths.length - 1]
                if (!path.length) {
                    return
                }
                if (path.length === 1) {
                    path.push(e.point)
                }
                this.$set(path, path.length - 1, e.point)
            },

            // 画围栏结束
            newPolyline (e) {
                if (!this.editing) {
                    return
                }
                const {paths} = this.polyline
                if (!paths.length) {
                    paths.push([])
                }
                const path = paths[paths.length - 1]
                path.pop()
                if (path.length) {
                    paths.push([])
                }
                this.editing = false
                // 保存之前自动闭合围栏
                this.polyline.paths[0].push(this.polyline.paths[0][0])
            },

            // 改变围栏类型
            changeType(type) {
              this.rePolyline()
              if (type === 'regional') {
                  if (this.ruleType === 'risk') {
                      this.$store.dispatch('showTip', {text: '不支持的操作', type: 'error'})
                      return
                  }
                  this.$store.dispatch('showModal', {
                      title: '添加行政区域围栏',
                      size: '700px',
                      view: RegionalView,
                      onClose: () => {
                          this.type = 'line'
                          this.mapEdit = false
                          this.editing = false
                          this.$bus.$on('save', (res) => {
                              this.polyline.paths = [res.fence]
                              let {center, zoom} = this.map.getViewport(res.fence)
                              this.center = center
                              this.zoom = zoom
                              this.isRegion = true
                              // 清除本次监听
                              this.$bus.$off('save')
                          })
                      }
                  })
              } else {
                  type === 'line' ? this.type = type : this.type = 'circle'
              }
            },

            // 保存围栏数据
            save() {
                if (this.isRegion) {
                    this.$emit('lineFenceData', {
                        status: true,
                        res: this.polyline.paths[0],
                        type: this.type,
                        isRegion: this.isRegion
                    })
                    return
                }

                let res
                let status = true
                // 多边形围栏
                if (this.type === 'line') {
                    if (!this.polyline.paths[0]) {
                        status = false
                    }
                    // 多边形围栏自动补齐后少于3个坐标点或者3个坐标点但是起始坐标相同
                    else if (this.polyline.paths[0].length < 3 || (this.polyline.paths[0].length === 3 && this.isEqual(this.polyline.paths[0][0], this.polyline.paths[0][2]))) {
                        this.rePolyline()
                        status = false
                    } else {
                        res = this.polyline.paths[0]
                        this.isEqual(res[0], res[res.length - 1]) ? '' : res.push(res[0])
                    }
                }
                // 圆形围栏
                if (this.type !== 'line') {
                    if (!this.dotLine.paths.center || !this.dotLine.paths.radius || this.dotLine.paths.radius == 0) {
                        status = false
                    }
                    res = this.dotLine.paths
                }

                this.$emit('lineFenceData', {status: status, res: res, type: this.type, isRegion: this.isRegion})
            },

            // 重新画围栏
            rePolyline() {
                this.mapEdit = true
                this.editing = true
                this.isRegion = false
                if (this.type === 'line') {
                    this.map.clearOverlays(this.polyline.paths[0])
                    this.polyline.paths = []
                    return
                }
                if (this.dotLine.paths.center) {
                    this.dotLine.paths = {}
                }
            },

            // 经纬度坐标是否相同
            isEqual(a, b) {
                return JSON.stringify(a) === JSON.stringify(b)
            },

            // 根据地图缩放等级确定首次渲染圆形围栏的半径
            setRadius() {
                let zoom = this.zoom - 6
                let radiusList = [300000, 20000, 10000, 60000, 35000, 15000, 7800, 3700, 1600, 1000, 470, 200, 120, 60]

                if (zoom <= 0) {
                    return radiusList[0]
                }
                if (zoom > radiusList.length - 1) {
                    return radiusList[radiusList.length - 1]
                }
                return radiusList[zoom]
            }
        },
        computed: {
            countRadius() {
              if (this.dotLine.paths.radius) {
                 return Number(this.dotLine.paths.radius).toFixed(2)
              }
              return 0
            }
        },
        beforeDestroy() {
            this.$store.dispatch('hideModal')
        }
    }
</script>

<style scoped>
    /*@import "http://at.alicdn.com/t/font_1725046_ybpddh1utp.css";*/
    .map-row{
        position: relative;
        height: 100%;
        width: 100%;
    }
    .show-radius{
        min-width : 50px;
        width: auto;
        padding: 0 10px;
        height: 40px;
        font-size: 15px;
        position: absolute;
        left: 20px;
        bottom: 20px;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        background-color: #fff;
        color: rgba(0,0,0,.8);
        box-shadow: 0 10px 10px 0 rgba(0,0,0,.5);
    }
    .show-radius span{
        margin: 0 10px;
        font-size: 15px;
    }
    .map{
        height: 100%;
        width: 100%;
    }
    .map-button{
        width: 100%;
    }
    .button-list{
        height: 100px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
    }
    .tip{
        position: absolute;
        top: 50%;
        left: 50%;
        transform:translate(-50%, -50%);
        height: 100%;
        width: 400px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    .button-list .left{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 30px;
        box-sizing: border-box;
        width: 50%;
        height: 100%;
    }
    .left>div{
        box-shadow: 0 5px 5px 0 rgba(0,0,0,.3);
    }
    input{
        width: 300px;
        height: 40px;
        font-size: 15px;
        padding-left: 15px;
        box-sizing: border-box;
        border: none;
    }
    .search{
        line-height: 40px;
        text-align: center;
        height: 40px;
        width: 80px;
        font-size: 15px;
        color: #ffffff;
        background: #409EFF;
        cursor: pointer;
    }
    .button-list .right{
        display: flex;
        align-items: center;
        /*justify-content: flex-end;*/
        padding-right: 100px;
        box-sizing: border-box;
        width: auto;
        height: 100%;
    }
    .base{
        line-height: 45px;
        text-align: center;
        /*margin-right: 10px;*/
        height: 45px;
        width: 100px;
        font-size: 15px;
        color: #ffffff;
        background: #409EFF;
        border: none;
        cursor: pointer;
        /*box-shadow: 0 10px 10px 0 rgba(0,0,0,.5);*/
    }

    .click{
        animation: click 1s;
    }

    @keyframes click {
        from {
            transform: translateY(1px);
        }
        to{
            transform: translateY(0);
        }
    }

    .item{
        position: relative;
    }
    .item i{
        height: 20px;
        width: 20px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: yellow;
        position: absolute;
        left: 70%;
        top: -20px;
        color: #000000;
    }
</style>
