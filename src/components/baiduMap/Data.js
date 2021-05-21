export default function() {
    return {
        /**
         * 默认地图类型
         * 普通2D地图: BMAP_NORMAL_MAP
         * 简洁的卫星图: BMAP_SATELLITE_MAP
         * 带路标信息的卫星图: BMAP_HYBRID_MAP
         */
        mapType: 'BMAP_NORMAL_MAP',

        getLabelba: {

        },
        setCenterFlag: undefined,

        centerData: '',

        jMap: undefined,

        bMap: undefined,

        /**
         * 是否显示交通流量
         */
        showTraffic: false,

        /**
         * 是否显示气泡框
         */
        showInfoWindow: false,

        /**
         * 气泡框位置
         */
        infoWindowPosition: {},

        /**
         * 气泡框内容
         */
        infoWindowContent: '',
// 202042618338
        infoWindowInstance: undefined,

        /**
         * 覆盖物列表
         */
        markerList: {},

        /**
         * 操作按钮
         */
        btn: [
            {
                title: '2D',
                placeholder: '普通2D地图',
                onClick: () => {
                    this.mapType = 'BMAP_NORMAL_MAP'
                }
            },
            {
                title: '卫星',
                placeholder: '简洁的卫星图',
                onClick: () => {
                    this.mapType = 'BMAP_SATELLITE_MAP'
                }
            },
            {
                title: '混合',
                placeholder: '带路标信息的卫星图',
                onClick: () => {
                    this.mapType = 'BMAP_HYBRID_MAP'
                }
            },
            {
                title: '测距',
                placeholder: '测量地图点与点之间的距离',
                onClick: () => {
                    if (this.distanceCtrl === undefined) {
                        // eslint-disable-next-line no-undef
                        this.distanceCtrl = new BMapLib.DistanceTool(this.jMap)
                    }
                    this.distanceCtrl.open()
                }
            },
            {
                title: '交通',
                placeholder: '显示道路交通流量',
                onClick: () => {
                    this.showTraffic = !this.showTraffic
                }
            }
            // {
            //     title: '获取最佳视野',
            //     placeholder:'获取最佳视野',
            //     onClick: () => {
            //         let position = [];
            //         this.jMap.getOverlays().forEach((item)=>{
            //             try {
            //                 position.push(item.getPosition())
            //             }catch (e) {
            //             }
            //         })
            //         let {center, zoom} = this.jMap.getViewport(position)
            //         this.jMap.centerAndZoom(center, zoom)
            //     }
            // }
        ]
    }
}
