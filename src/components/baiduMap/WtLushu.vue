<template>
    <bml-lushu
            @stop="lushuStop"
            @run="lushuRun"
            :path="path"
            :icon="icon"
            :speed="speed"
            :play="play"
            :rotation="true"
    ></bml-lushu>
</template>

<script>
    import {BmlLushu} from 'vue-baidu-map'
    import Lushu from 'bmaplib.lushu'

    // 重写路书load方法里会用到
    function createSize (BMap, options = {}) {
        const {width, height} = options
        return new BMap.Size(width, height)
    }

    // 重写路书load方法里会用到
    function createIcon (BMap, options = {}) {
        const {url, size, opts = {}} = options
        return new BMap.Icon(url, createSize(BMap, size), {
            anchor: opts.anchor && createSize(BMap, opts.anchor),
            imageSize: opts.imageSize && createSize(BMap, opts.imageSize),
            imageOffset: opts.imageOffset && createSize(BMap, opts.imageOffset),
            infoWindowAnchor: opts.infoWindowAnchor && createSize(BMap, opts.infoWindowAnchor),
            printImageUrl: opts.printImageUrl
        })
    }

    // 重写load方法，暴露run事件
    BmlLushu.methods.load = function() {
        const {BMap, map, path, landmarkPois, icon, speed, content, autoView, rotation, infoWindow, play} = this
        const lushu = this.originInstance = new Lushu(map, path, {
            enableRotation: rotation,
            landmarkPois,
            showInfoWindow: infoWindow,
            defaultContent: content,
            icon: icon && createIcon(BMap, icon),
            speed,
            autoView,
            // eslint-disable-next-line no-unused-vars
            onstart: e => {
                this._isEnd = false
                this.$emit('start')
            },
            // eslint-disable-next-line no-unused-vars
            onstop: e => {
                this._isEnd = true
                this.$emit('stop')
            },
            // eslint-disable-next-line no-unused-vars
            onpause: e => this.$emit('pause'),

            // 暴露run事件
            onrun: (lushu, index) => {
                this.$emit('run', {lushu: lushu, index: index})
            }
        })

        lushu._move = function(initPos, targetPos, effect) {
            var me = this
                var currentCount = 0
                var timer = 10
                var step = this._opts.speed / (1000 / timer)
                var init_pos = this._projection.lngLatToPoint(initPos)
                var target_pos = this._projection.lngLatToPoint(targetPos)
                var count = Math.round(me._getDistance(init_pos, target_pos) / step)
            if (count < 1) {
                me._moveNext(++me.i)
                return
            }
            me._intervalFlag = setInterval(function() {
                if (currentCount >= count) {
                    clearInterval(me._intervalFlag)
                    if (me.i > me._path.length) {
                        return
                    }
                    me._moveNext(++me.i)
                } else {
                    currentCount++
                    var x = effect(init_pos.x, target_pos.x, currentCount, count)
                        var y = effect(init_pos.y, target_pos.y, currentCount, count)
                        var pos = me._projection.pointToLngLat(new BMap.Pixel(x, y))
                    if (currentCount == 1) {
                        var proPos = null
                        if (me.i - 1 >= 0) {
                            proPos = me._path[me.i - 1]
                        }
                        if (me._opts.enableRotation == true) {
                            var _proPos = proPos ? new BMap.Point(proPos.lng, proPos.lat) : null
                            var _initPos = new BMap.Point(initPos.lng, initPos.lat)
                            var _targetPos = new BMap.Point(targetPos.lng, targetPos.lat)

                            me.setRotation(_proPos, _initPos, _targetPos)
                        }
                        if (me._opts.autoView) {
                            if (!me._map.getBounds().containsPoint(pos)) {
                                me._map.setCenter(pos)
                            }
                        }
                    }
                    me._marker.setPosition(pos)
                    me._setInfoWin(pos)
                    // 暴露run事件
                    me._opts.onrun ? me._opts.onrun(me, me.i - 1) : ''
                }
            }, timer)
        }
        play && path && path.length && lushu.start(this)
        path && path.length && (content && infoWindow ? lushu.showInfoWindow() : lushu.hideInfoWindow())
    }

    export default {
        name: 'WtLushu',
        components: {BmlLushu},
        props: {
            /**
             * 路书点集合
             */
            path: {
                type: Array,
                default() {
                    return []
                }
            },
            /**
             * 路书播放状态
             */
            play: {
                type: Boolean,
                default: false
            },
            /**
             * 路书播放速度
             */
            speed: {
                type: Number,
                default: 4000
            },
            /**
             * 路书播放状态
             */
            icon: {
                type: Object,
                default() {
                    return {
                        url: 'http://caixinyun.oss-cn-beijing.aliyuncs.com/frontend/images/track-car-icon.png',
                        size: {width: 40, height: 40},
                        opts: {anchor: {width: 27, height: 18}}
                    }
                }
            }
        },
        methods: {
            lushuStop() {
                this.$emit('stop')
            },
            lushuRun(p) {
                // 这个狗东西是从-1开始的
                p.index += 2
                this.$emit('run', p)
            }
        }
    }
</script>

<style scoped>

</style>
