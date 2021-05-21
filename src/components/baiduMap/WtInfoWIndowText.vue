<template>
    <div class="wt-baidu-map-info-window-item">
        <label>{{label}}：</label>
        <span v-html="value"></span>
    </div>
</template>

<script>
    import {InfoWindow} from './InfoWindow'

    export default {
        name: 'WtInfoWIndowText',
        props: {
            label: {
                type: String
            },
            value: {
                type: [String, Number]
            },
            infoWindow: {
                type: InfoWindow
            }
        }
    }
</script>

<style scoped>
    .wt-baidu-map-info-window-item {
       line-height: 1.1;
    }
    .wt-baidu-map-info-window-item label {
        color: #666;
        font-size: 12px;
    }
    .wt-baidu-map-info-window-item span {
        font-size: 12px;
    }
</style>
