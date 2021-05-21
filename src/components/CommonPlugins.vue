<template>
    <span v-if="main.ui.plugin === 'element'">
        <el-tip></el-tip>
        <el-modal></el-modal>
        <wt-modal></wt-modal>
    </span>
    <span v-else-if="main.ui.plugin === 'yd'">

    </span>
</template>

<script>
    import main from '../configs/main'
    import ElTip from './element/ElTip'
    import ElModal from './element/ElModal'
    import WtModal from './element/WtModal'
    export default {
        name: 'CommonPlugins',
        components: {
            ElTip,
            ElModal,
            WtModal
        },
        data() {
            return {
                main: main
            }
        }
    }
</script>

<style scoped>

</style>
