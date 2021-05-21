<template>
    <div class="h-div">
        <wt-baidu-map :ready="mapReady" :center="center" :showPanorama="false">
        </wt-baidu-map>
        <div class="time" v-if="isRefresh">
            <span class="time-color">{{time}}</span><span>秒后刷新</span>
        </div>
    </div>
</template>

<script>

    import WtBaiduMap from '../../components/baiduMap/WtBaiduMap'

    export default {
        name: 'index',
        components: {
            WtBaiduMap
        },
        props: {
            // 刷新时间间隔
            refreshTime: {
                type: Number,
                default: 30
            },

            // 是否开启刷新
            isRefresh: {
                type: Boolean,
                default: true
            }

        },
        data() {
            return {
                interval: null,
                bMap: null,
                vMap: null,
                map: null,
                center: '上海市',
                time: 1
            }
        },
        created() {
        },

        mounted() {
        },

        methods: {
            mapReady({vMap, jMap, bMap}) {
                this.bMap = jMap
                this.vMap = vMap
                this.map = bMap
                this.center = '上海市宝山区智园二期'
                if (!this.isRefresh) {
                    return
                }
                this.vMap.addMarker(this.getMarkerOptions(true))
                this.interval = setInterval(() => {
                    if (this.time == 1) {
                        this.time = this.refreshTime
                        // 刷新
                    }
                    this.time = this.time - 1
                }, 1000)
            },

            getMarkerOptions(autoOpen) {
                return {
                    id: Math.random() + '',
                    labelOptions: {
                        text: '显示label'
                        // style: this.labelStyle
                    },
                    // eslint-disable-next-line no-new-wrappers
                    content: new String(this.center),
                    position: {lng: '121.439283', lat: '31.344959'},
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
            }
        }
    }
</script>

<style scoped>
    .time {
        position: absolute;
        top: 135px;
        right: 100px;
        height: 30px;
        min-width: 65px;
        width: auto;
        padding: 10px;
        box-sizing: border-box;
        text-align: center;
        line-height: 10px;
        background-color: #ffffff;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, .5);
    }

    .time > span:last-child {
        font-size: 12px;
        color: #666666;
        font-weight: bold;
    }

    .time-color {
        color: red;
        margin-right: 5px;
        display: inline-block;
        min-width: 15px;
        font-size: 12px;
        font-weight: bold;
        width: auto;
        height: 100%;
    }
</style>
