<template>
    <div :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click">
        <wt-icon color="#fff" size="19px" name="wt-icon-zuidahua"></wt-icon>
    </div>
</template>

<script>
    import screenfull from 'screenfull'
    import WtIcon from '../WtIcon'

    export default {
        name: 'Screenfull',
        components: {WtIcon},
        data() {
            return {
                isFullscreen: false
            }
        },
        mounted() {
            this.init()
        },
        beforeDestroy() {
            this.destroy()
        },
        methods: {
            click() {
                if (!screenfull.enabled) {
                    this.$message({
                        message: 'you browser can not work',
                        type: 'warning'
                    })
                    return false
                }
                screenfull.toggle()
            },
            change() {
                this.isFullscreen = screenfull.isFullscreen
            },
            init() {
                if (screenfull.enabled) {
                    screenfull.on('change', this.change)
                }
            },
            destroy() {
                if (screenfull.enabled) {
                    screenfull.off('change', this.change)
                }
            }
        }
    }
</script>

<style scoped>

</style>
