export default {
    // 地图初始化完成的回调
    ready: {
        type: Function
    },

    // 地图中心
    center: {
        type: [String, Object],
        default: ''
    },

    // 缩放组件
    showNavigation: {
        type: Boolean,
        default: true
    },

    // 缩放组件
    wheelZoom: {
        type: Boolean,
        default: true
    },

    // 全景
    showPanorama: {
        type: Boolean,
        default: true
    },

    // 缩放值
    zoom: {
        type: Number,
        default: 16
    },

    /**
     * 热力图配置
     */
    heatMapConfig: {
        type: Object,
        default() {
            return {
                max: 100, // 最大权重值
                radius: 10 // 热力元素半径
            }
        }
    },

    /**
     * 热力图点列表
     */
    heatMapPoints: {
        type: Array,
        default() {
            return []
        }
    },

    /**
     * 海量点配置
     * @see http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a3b21
     */
    shapeConfig: {
        type: Object,
        default() {
            return {
                color: '#ff0000', // 颜色
                size: 'BMAP_POINT_SIZE_NORMAL', // 尺寸
                shape: 'BMAP_POINT_SHAPE_CIRCLE' // 形状
            }
        }
    },

    /**
     * 海量点的点击回调函数
     */
    shapeOnClick: {
        type: Function,
        default: () => {

        }
    },

    /**
     * 海量点
     * [{lng, lat}, {...}, {...}]
     */
    shapePoints: {
        type: Array,
        default() {
            return []
        }
    },

    // 是否展示操作面板
    showBtn: {
        type: Boolean,
        default: true
    },

    // 需要隐藏的操作面板名称
    hideBtn: {
        type: Array,
        default() {
            return []
        }
    },

    /**
     * 自定义操作按钮
     */
    otherBtn: {
        type: Array,
        default() {
            return [

            ]
        }
    },

    /**
     * 折线
     */
    polylinePoints: {
        type: Array,
        default() {
            return []
        }
    },

    /**
     * 多边形
     */
    polygonPoints: {
        type: Array,
        default() {
            return [
            ]
        }
    },

    polylineConfig: {
        type: Object,
        default() {
            return {
                color: '#00f', // 颜色
                weight: 2, // 宽度
                opacity: 0.5 // 透明度
            }
        }
    },

    /**
     * 圆形
     */
    circlePoints: {
        type: Object,
        default() {
            return {
            }
        }
    },

    /**
     * 围栏配置
     */
    fenceConfig: {
        type: Object,
        default() {
            return {
                color: '#00f', // 颜色
                weight: 2, // 宽度
                opacity: 0.5, // 透明度
                onChange: (e, type, data) => { // 围栏编辑时回调
                    console.log(data)
                }
            }
        }
    },

    /**
     * 围栏编辑
     */
    fenceEdit: {
        type: Boolean,
        default: false
    },

    lushuPoints: {
        type: Array,
        default: () => {
            return []
        }
    },
    lushuPlay: {
        type: Boolean,
        default: false
    },
    lushuStop: {
        type: Function,
        default: () => {
        }
    },
    lushuSpeed: {
        type: Number,
        default: 4000
    },
    lushuIcon: {
        type: Object,
        default: () => {
            return {
                url: 'http://yk.tianyigps.com/images/type4.png',
                size: {width: 40, height: 40},
                opts: {anchor: {width: 27, height: 32}}
            }
        }
    },
    /**
     * 路书停止回放的回调函数
     */
    lushuRun: {
        type: Function,
        default() {

        }
    }
}
