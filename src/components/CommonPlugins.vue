<template>
    <span v-if="config.ui.plugin === 'element'">
        <el-tip></el-tip>
        <el-modal></el-modal>
        <wt-modal></wt-modal>
        <el-loading></el-loading>
    </span>
    <span v-else-if="config.ui.plugin === 'yd'">

    </span>
</template>

<script>
    import config from '../configs/config'
    import ElTip from './element/ElTip'
    import ElModal from './element/ElModal'
    import WtModal from './element/WtModal'
    import ElLoading from './element/ElLoading'
    export default {
        name: 'CommonPlugins',
        components: {
            ElTip,
            ElModal,
            WtModal,
            ElLoading
        },
        data() {
            return {
                config: config
            }
        }
    }
</script>

<style scoped>

</style>
