<template>
    <div class="wt-baidu-map-info-window-item">
        <span
                class="button"
                v-for="(button, index) of list"
                :key="index"
                @click="click(button)"
        >
            {{button.label}}
        </span>
    </div>
</template>

<script>
    import {InfoWindow} from './InfoWindow'

    export default {
        name: 'WtInfoWIndowButton',
        props: {
            list: {
                type: Array
            },
            infoWindow: {
                type: InfoWindow
            }
        },
        methods: {
            click(button) {
                typeof button.click === 'function' ? button.click(button, this.infoWindow) : ''
            }
        }
    }
</script>

<style scoped>
    .wt-baidu-map-info-window-item .button {
        text-decoration: unset;
        color: #409eff;
        float: left;
        margin-right: 5px;
        cursor: pointer;
        font-size: 12px;
    }
</style>
