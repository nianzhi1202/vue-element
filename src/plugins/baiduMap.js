import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'

import './baiduMap/DistanceTool.js'
import './baiduMap/baiduMap.css'

Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: ''
})
